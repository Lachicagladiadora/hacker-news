import { IconButtonStyle } from "./style/IconButtonStyle";

type IconButtonProps = {
  children: React.SVGProps<SVGSVGElement> & React.SVGProps<SVGPathElement>;
  onClick: () => void;
};

export const IconButton = ({ children, onClick }: IconButtonProps) => {
  return <IconButtonStyle onClick={onClick}>{children}</IconButtonStyle>;
};
