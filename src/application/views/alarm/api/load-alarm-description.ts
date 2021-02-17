import { Alarm } from '../../../interfaces/alarm';
import { getAlarmServiceUrl } from '../../../utils/alarm-service-url';
import { isSubject } from '../../../utils/is-subject';
import { generateLangItems } from '../utils/generate-lang-items';

export type AlarmMessageDescriptionReturn = {
  data: {
    allAlarmMessages: {
      [description: string]: string;
    }[];
  };
};

export async function loadAlarmDescription(alarm: Alarm) {
  try {
    // Get alarm message from message service and set it to alarm object if present
    const dataResponse = await fetch(getAlarmServiceUrl() + '/admin/api', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        variables: { messageKey: alarm.messageId },
        query: `query ($messageKey: String) { allAlarmMessages(where: {messageKey: $messageKey}) { ${generateLangItems(
          'description',
        )} } }`,
      }),
    });

    if (dataResponse?.ok) {
      const _dataList: AlarmMessageDescriptionReturn = await dataResponse?.json();

      if (_dataList?.data.allAlarmMessages.length > 0 && isSubject(alarm.description)) {
        // The description map that will be emitted after processing
        const descriptionMap: { [description: string]: string } = {};

        for (const [key, value] of Object.entries(_dataList.data.allAlarmMessages[0])) {
          // Get lang tag from key, otherwise use default if not without tag
          // HY: Based on the hypotesis that data fields are description, descriptionLANG
          const lang = key.length > 'description'.length ? key.substring(key.length - 2) : 'default';

          // To lowercase so that it's easier to be used
          descriptionMap[lang.toLowerCase()] = value;
        }

        // Set alarm message description from returned data
        alarm.description.next(descriptionMap);
      }
    }
  } catch (e) {
    // Just log the error because if something goes wrong i use default alarm message description
    console.error('A problem occurred while fetching alarm description (' + alarm.messageId + '):', e);
  }
}
