import { IconButtonStyle } from "./style/IconButtonStyle";

type IconButtonProps = {
  children: string | JSX.Element;
  onClick: () => void;
};

export const IconButton = ({ children, onClick }: IconButtonProps) => {
  return <IconButtonStyle onClick={onClick}></IconButtonStyle>;
};
