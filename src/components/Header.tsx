import { HeaderSyle } from "./style/HeaderStyle";
import { Heading1 } from "./style/Heading1";

type HeaderProps = { children: string };

export const Header = ({ children }: HeaderProps) => {
  return (
    <HeaderSyle>
      <Heading1>{children}</Heading1>
    </HeaderSyle>
  );
};
