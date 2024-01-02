import styled from "styled-components";

export const ArticleStyle = styled.article`
  max-width: 540px;
  height: 90px;
  border: solid 1px #979797;
  border-radius: 5px;
  display: flex;
  @media screen and (max-width: 720px) {
    max-width: 100%;
    line-height: 24px;
    /* margin: 0px auto; */
    /* grid-template-columns: auto; */
  }
`;
