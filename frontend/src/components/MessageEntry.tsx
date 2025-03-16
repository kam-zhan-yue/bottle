interface MessageProps {
  text: string;
  bg_color: string;
}

const MessageEntry = ({ text, bg_color }: MessageProps) => {
  return (
    <div className={`w-full bg-[${bg_color}]`}>
      <h2 className="m-1 mx-5">{text}</h2>
    </div>
  );
};

export default MessageEntry;
