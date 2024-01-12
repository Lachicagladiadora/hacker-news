import { ImageSize } from "../constants";
import { DivTime } from "./style/DivTime";
import { ParagraphStyle } from "./style/ParagraphWrapperStyle";

type ParagraphProps = {
  time: string;
  author: string;
  text: string;
};

export const Paragraph = ({ time, author, text }: ParagraphProps) => {
  return (
    <ParagraphStyle>
      <DivTime>
        <img
          src="https://dainty-rabanadas-77bfd0.netlify.app/iconmonstr-time-2_2.svg"
          alt="hours"
          height={ImageSize.S}
          style={{ marginRight: "10px" }}
        />
        {time} by {author}
      </DivTime>
      <p>{text}</p>
    </ParagraphStyle>
  );
};
