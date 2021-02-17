import { useState, useEffect } from 'react';
import { addAlarmServicePrefix } from '../../../../../utils/alarm-service-url';
import { generateLangItems } from '../../../utils/generate-lang-items';

export type AlarmMessageReturn = {
  data: {
    allAlarmMessages: {
      messageSolutionList: any[];
    }[];
  };
};

export type AlarmSolution = {
  solutionKey: string;
  description: {
    [lang: string]: string;
  };
  title: {
    [lang: string]: string;
  };
  imageList: Image[];
  videoLink: VideoLink;
  videoPreviewImage: VideoPreviewImage;
};

export type VideoLink = {
  filename: string;
  publicUrl: string;
};

export type VideoPreviewImage = {
  filename: string;
  publicUrl: string;
};

export type Image = {
  image: {
    publicUrl: string;
  };
};

export function useAlarmSolutions(messageKey: string) {
  const [alarmSolutions, setAlarmSolutions] = useState<AlarmSolution[] | null>(null);

  useEffect(() => {
    const fetchAlarmSolutions = async () => {
      // Variable filled with message solution list fetched from message service
      let _alarmSolutions = null;

      try {
        const dataResponse = await fetch(addAlarmServicePrefix('/admin/api'), {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            variables: { messageKey },
            query: `query ($messageKey: String) {allAlarmMessages(where: {messageKey: $messageKey}) {messageSolutionList {  solutionKey ${generateLangItems(
              'title',
            )} ${generateLangItems(
              'description',
            )} imageList {image {publicUrl}} videoLink {filename, publicUrl} videoPreviewImage {filename, publicUrl}}}}`,
          }),
        });

        if (dataResponse?.ok) {
          const messageResponse: AlarmMessageReturn = await dataResponse?.json();

          if (messageResponse?.data.allAlarmMessages.length > 0) {
            // Add missing url prefix to all media
            messageResponse.data.allAlarmMessages.forEach(alarmMessage => {
              alarmMessage.messageSolutionList.forEach(messageSolution => {
                messageSolution.imageList.forEach((image: any) => {
                  image.image.publicUrl = addAlarmServicePrefix(image.image.publicUrl);
                });
                if (messageSolution.videoLink) {
                  messageSolution.videoLink.publicUrl = addAlarmServicePrefix(messageSolution.videoLink.publicUrl);
                }
                if (messageSolution.videoPreviewImage) {
                  messageSolution.videoPreviewImage.publicUrl = addAlarmServicePrefix(
                    messageSolution.videoPreviewImage.publicUrl,
                  );
                }
              });
            });

            // Assign retrieved value to message solution list to be saved in alarmSolutions
            _alarmSolutions = messageResponse.data.allAlarmMessages[0].messageSolutionList;

            // Assign description and title subjects cycling on solutions
            for (const alarmSolution of _alarmSolutions) {
              // The description and title map that will be set
              const descriptionMap: { [description: string]: string } = {};
              const titleMap: { [title: string]: string } = {};

              for (const [key, value] of Object.entries(alarmSolution)) {
                if (key.indexOf('description') >= 0) {
                  // Description case

                  // Get lang tag from key, otherwise use default if not without tag
                  // HY: Based on the hypotesis that data fields are description, descriptionLANG
                  const lang = key.length > 'description'.length ? key.substring(key.length - 2) : 'default';

                  // To lowercase so that it's easier to be used
                  descriptionMap[lang.toLowerCase()] = value as string;
                } else if (key.indexOf('title') >= 0) {
                  // title case

                  // Get lang tag from key, otherwise use default if not without tag
                  // HY: Based on the hypotesis that data fields are title, titleLANG
                  const lang = key.length > 'title'.length ? key.substring(key.length - 2) : 'default';

                  // To lowercase so that it's easier to be used
                  titleMap[lang.toLowerCase()] = value as string;
                }
              }

              // Set alarm message description from returned data
              alarmSolution.description = descriptionMap;
              // Set alarm message title from returned data
              alarmSolution.title = titleMap;
            }
          }
        }
      } catch (error) {
        // Just log the error because if something goes wrong i use default alarm message description
        console.error('A problem occurred while fetching message-service data:', error);
      }

      // Set retrieved data
      setAlarmSolutions(_alarmSolutions);
    };

    // Execute method to fetch message solutions
    fetchAlarmSolutions();
  }, [messageKey]);

  return alarmSolutions;
}
