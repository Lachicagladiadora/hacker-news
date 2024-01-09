import { ImageSize, TextSize } from "../constants";
import { SelectorOption } from "./SelectorOption";

type SelectedOptionProps = {
  children: string;
};

export const SelectedOption = ({ children }: SelectedOptionProps) => {
  return (
    <SelectorOption
      paddingSize="0px"
      imageSize={ImageSize.S}
      textSize={TextSize.S}
      backgroundColor="transparent"
    >
      {children ? `${children}` : "reactjs"}
    </SelectorOption>
  );
};
