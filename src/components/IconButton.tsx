import { IconButtonStyle } from "./style/IconButtonStyle";
import React, { ReactElement } from "react";

type SVGProps = React.SVGProps<SVGSVGElement>;

type IconButtonProps = {
  children: ReactElement<SVGProps> | ReactElement<SVGProps & { d: string }>;
  onClick: () => void;
  title: string;
  id?:string
};

export const IconButton = ({ children, onClick, title,id }: IconButtonProps) => {
  return (
    <IconButtonStyle onClick={onClick} title={title} id={id}>
      {children}
    </IconButtonStyle>
  );
};
