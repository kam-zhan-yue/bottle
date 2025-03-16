interface MessageProps {
  text: string;
  bg_color: string;
}

const MessageEntry = ({ text, bg_color }: MessageProps) => {
  return (
    <div className={`h-12${bg_color}`}>
      <h2>{text}</h2>
    </div>
  );
};

export default MessageEntry;
