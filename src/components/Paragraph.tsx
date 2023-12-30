import { ParagraphStyle } from "./style/ParagraphStyle";

type ParagraphProps = {
  time: string;
  author: string;
  text: string;
};

export const Paragraph = ({ time, author, text }: ParagraphProps) => {
  return (
    <ParagraphStyle>
      <div>
        <img
          src="https://dainty-rabanadas-77bfd0.netlify.app/iconmonstr-time-2_2.svg"
          alt="hours"
          height={16}
        />{" "}
        1 {time} ago by {author}
      </div>
      <p>{text}</p>
    </ParagraphStyle>
  );
};
