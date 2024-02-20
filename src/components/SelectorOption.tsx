import { OptionImageStyle, OptionStyle } from "./style/SelectorStyle";

type SelectorOptionProps = {
  children: string | JSX.Element;
  imageName: string;
  imageAlt?: string;
  imageSize?: string;
  textSize?: string;
  paddingSize?: string;
  backgroundColor?: string;

  onClick?: () => void;
};

export const SelectorOption = ({
  children,
  imageName,
  imageAlt = "",
  imageSize,
  textSize,
  paddingSize,
  backgroundColor,
  onClick,
}: SelectorOptionProps) => {
  return (
    <OptionStyle
      $fontSize={textSize}
      $paddingSize={paddingSize}
      $backgroundColor={backgroundColor}
      onClick={onClick}
    >
      <OptionImageStyle src={imageName} alt={imageAlt} $imageSize={imageSize} />
      {children}
    </OptionStyle>
  );
};
