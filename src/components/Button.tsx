import { ButtonStyle } from "./style/ButtonStyle";

type ButtonProps = {
  children: string;
  onClick: () => void;
  id?: string;
  focus?: boolean;
  style?: React.CSSProperties;
};

export const Button = ({
  children,
  onClick,
  focus,
  id,
  style,
}: ButtonProps) => {
  return (
    <ButtonStyle id={id} onClick={onClick} autoFocus={focus} style={style}>
      {children}
    </ButtonStyle>
  );
};
