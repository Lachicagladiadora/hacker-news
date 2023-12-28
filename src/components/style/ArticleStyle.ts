import styled from "styled-components";

export const ArticleStyle = styled.article`
  max-width: 540px;
  height: 90px;
  border: solid 1px #979797;
  border-radius: 5px;
  display: flex;
`;

export const Paragraph = styled.p`
  width: 100%;
  height: 100%;
  color: #979797;
  /* border: solid 1px red; */
  padding: 20px;
  flex: 1;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-size: 14px;
  &:hover {
    opacity: 0.6;
  }
`;
