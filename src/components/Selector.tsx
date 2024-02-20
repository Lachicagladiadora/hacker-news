import { ImageSize } from "../constants";
import { SelectedOption } from "./SelectedOption";
import { SelectorStyle } from "./style/SelectorStyle";

type SelectorProps = {
  value: string;
  onClick: () => void;
  children: string | JSX.Element;
  id?: string;
  selectedImage: string;
};

export const Selector = ({
  value,
  children,
  selectedImage,
  id,
  onClick,
}: SelectorProps) => {
  return (
    <SelectorStyle onClick={onClick} id={id}>
      <SelectedOption children={value} selectedImage={selectedImage} />
      <img src={"./public/arrow.svg"} alt="" height={ImageSize.S} />
      {children}
    </SelectorStyle>
  );
};
