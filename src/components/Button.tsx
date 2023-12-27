import { ButtonStyle } from "./style/ButtonStyle";

type ButtonProps = {
  children: string;
  onClick: () => void;
  id?: string;
};

export const Button = ({ children, onClick, id }: ButtonProps) => {
  return (
    <ButtonStyle id={id} onClick={onClick}>
      {children}
    </ButtonStyle>
  );
};
