import { ImageSize } from "../constants";
import { SelectedOption } from "./SelectedOption";
import { SelectorStyle } from "./style/SelectorStyle";

type SelectorProps = {
  value: string;
  onClick: () => void;
  children: string | JSX.Element;
};

export const Selector = ({ value, children, onClick }: SelectorProps) => {
  return (
    <SelectorStyle onClick={onClick}>
      <SelectedOption children={value} />
      <img src="./public/arrow.svg" alt="" height={ImageSize.S} />
      {children}
    </SelectorStyle>
  );
};
