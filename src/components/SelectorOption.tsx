import { OptionImageStyle, OptionStyle } from "./style/SelectorStyle";

type SelectorOptionProps = {
  children: string | JSX.Element;
  imageSize?: string;
  textSize?: string;
  paddingSize?: string;
  backgroundColor?: string;
  onClick?: () => void;
};

export const SelectorOption = ({
  children,
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
      <OptionImageStyle
        src={`./public/${children}.png`}
        alt={`image of ${children}`}
        $imageSize={imageSize}
      />
      {children}
    </OptionStyle>
  );
};
