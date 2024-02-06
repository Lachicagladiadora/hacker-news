import { ImageSize, TextSize } from "../constants";
import { SelectorOption } from "./SelectorOption";

type SelectedOptionProps = {
  children: string;
  selectedImage: string;
};

export const SelectedOption = ({
  children,
  selectedImage,
}: SelectedOptionProps) => {
  return (
    <SelectorOption
      paddingSize="0px"
      imageSize={ImageSize.S}
      textSize={TextSize.S}
      backgroundColor="transparent"
      imageName={selectedImage}
    >
      {children ? `${children}` : "reactjs"}
    </SelectorOption>
  );
};
