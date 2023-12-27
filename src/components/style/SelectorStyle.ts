import styled from "styled-components";

export const SelectorStyle = styled.div`
  width: 240px;
  height: 32px;
  border: solid 1px black;
  border-radius: 3px;
  background-color: white;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 0px 10px;
  cursor: pointer;
`;

export const ContainOptions = styled.div<{ $visibility?: string }>`
  /* border: solid 1px red; */
  width: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0px;
  top: 102%;
  box-shadow: 0px 0px 4px #00000040;
  visibility: ${(props) => props.$visibility};
`;

export const OptionStyle = styled.div<{
  $fontSize?: string;
  $paddingSize?: string;
  $backgroundColor?: string;
}>`
  border: transparent;
  background-color: ${(props) => props.$backgroundColor || "white"};
  padding: ${(props) => props.$paddingSize || "2px"};
  font-size: ${(props) => props.$fontSize || "16px"};
  text-transform: capitalize;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #dddddd;
  }
`;

export const OptionImageStyle = styled.img<{ $imageSize?: string }>`
  height: ${(props) => props.$imageSize || "24px"};
  margin: 10px;
`;
