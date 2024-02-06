import styled from "styled-components";

export const SectionForArticlesStyle = styled.section`
  width: 100%;
  max-width: 1120px;
  margin: 0px auto;
  height: auto;
  padding-top: 40px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  @media screen and (max-width: 720px) {
    width: 100%;
    margin: 0px auto;
    grid-template-columns: auto;
  }
`;
