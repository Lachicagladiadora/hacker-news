import { IconButtonStyle } from "./style/IconButtonStyle";
import React, { ReactElement } from "react";

type SVGProps = React.SVGProps<SVGSVGElement>;

type IconButtonProps = {
  children: ReactElement<SVGProps> | ReactElement<SVGProps & { d: string }>;
  onClick: () => void;
  title: string;
};

export const IconButton = ({ children, onClick, title }: IconButtonProps) => {
  return (
    <IconButtonStyle onClick={onClick} title={title}>
      {children}
    </IconButtonStyle>
  );
};
