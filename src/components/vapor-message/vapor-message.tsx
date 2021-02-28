import { message } from 'antd';

const VAPOR_MESSAGE_STYLE = {
  borderRadius: 16,
  padding: 8,
};

export class VaporMessage {
  static success({
    content,
    duration,
    onClose,
  }: {
    content: React.ReactNode;
    duration?: number;
    onClose?: () => void;
  }) {
    message.success({
      content,
      duration,
      onClose,
      style: VAPOR_MESSAGE_STYLE,
    });
  }

  static error({ content, duration, onClose }: { content: React.ReactNode; duration?: number; onClose?: () => void }) {
    message.error({
      content,
      duration,
      onClose,
      style: VAPOR_MESSAGE_STYLE,
    });
  }
}
