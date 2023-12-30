import { IconButtonStyle } from "./style/IconButtonStyle";
import React, { ReactElement } from "react";

type SVGProps = React.SVGProps<SVGSVGElement>;

type IconButtonProps = {
  children: ReactElement<SVGProps> | ReactElement<SVGProps & { d: string }>;
  onClick: () => void;
};

export const IconButton = ({ children, onClick }: IconButtonProps) => {
  return <IconButtonStyle onClick={onClick}>{children}</IconButtonStyle>;
};
