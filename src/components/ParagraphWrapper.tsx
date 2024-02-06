import { ImageSize } from "../constants";
import { DivTimeStyle } from "./style/DivTimeStyle";
import { ParagraphStyle } from "./style/ParagraphWrapperStyle";

type ParagraphWrapperProps = {
  time: string | undefined;
  author: string | undefined;
  title: string | undefined;
  url: string | undefined;
};

export const ParagraphWrapper = ({
  time,
  author,
  title,
  url,
}: ParagraphWrapperProps) => {
  return (
    <ParagraphStyle href={url}>
      <DivTimeStyle>
        <img
          src="https://dainty-rabanadas-77bfd0.netlify.app/iconmonstr-time-2_2.svg"
          alt="hours"
          height={ImageSize.S}
          style={{ marginRight: "10px" }}
        />
        {time} by {author}
      </DivTimeStyle>
      <p>{title}</p>
    </ParagraphStyle>
  );
};
