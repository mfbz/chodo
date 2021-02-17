import React, { useCallback, useRef } from 'react';
import { BVCBlockButton } from '../bvc-block-button';

export const BVCFileBlockButton = React.memo(function BVCFileBlockButton({
  text,
  icon,
  disabled,
  fileType,
  onFile,
  onError,
  onClickDisabled,
  style,
}: {
  text: string;
  icon: React.ReactNode;
  disabled?: boolean;
  fileType?: string;
  onFile: (data: string) => void;
  onError?: () => void;
  onClickDisabled?: () => void;
  style?: React.CSSProperties;
}) {
  const inputRef = useRef<HTMLInputElement>();

  const handleFileChosen = useCallback(
    (event: any) => {
      try {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = (event: any) => {
          onFile(event.target.result || '');
        };
        reader.readAsText(file);
      } catch (error) {
        console.error('An error occurred while importing the file:', error);

        if (onError) {
          onError();
        }
      } finally {
        // Clear input value so that it trigger the on change event also next time
        event.target.value = '';
      }
    },
    [onFile],
  );

  const onImportFromFileClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, []);

  return (
    <>
      <BVCBlockButton
        icon={icon}
        text={text}
        disabled={disabled}
        onClick={onImportFromFileClick}
        onClickDisabled={onClickDisabled}
        style={style}
      />
      <input
        ref={inputRef as any}
        id={'file'}
        type={'file'}
        accept={fileType}
        onChange={handleFileChosen}
        style={{ display: 'none' }}
      />
    </>
  );
});
