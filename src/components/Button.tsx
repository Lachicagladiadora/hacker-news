import { ButtonStyle } from "./style/ButtonStyle";

type ButtonProps = {
  children: string;
  onClick: () => void;
  id?: string;
  focus?: boolean;
};

export const Button = ({ children, onClick, focus, id }: ButtonProps) => {
  return (
    <ButtonStyle id={id} onClick={onClick} autoFocus={focus}>
      {children}
    </ButtonStyle>
  );
};
