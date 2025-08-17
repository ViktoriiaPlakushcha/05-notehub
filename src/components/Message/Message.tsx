import css from "./Message.module.css";
interface MessageProps {
  messageToShow: string;
  type?: "success" | "error" | "info";
}

export default function Message({
  messageToShow,
  type = "info",
}: MessageProps) {
  return (
    <div className={`${css.container} ${css[type]}`}>
      <span className={css.message}>{messageToShow}</span>
    </div>
  );
}
