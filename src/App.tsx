import { useState } from "react";
import { Article } from "./components/Article";
import { Button } from "./components/Button";
import { Header } from "./components/Header";
import { Selector } from "./components/Selector";
import { SelectorOption } from "./components/SelectorOption";
import { Main } from "./components/style/Main";
import { SectionForButtons } from "./components/style/SectionForButtons";
import { ContainOptions } from "./components/style/SelectorStyle";
import { SectionForArticles } from "./components/style/SectionForArticles";
import { SectionForSelector } from "./components/style/SectionForSelector";
import { Paragraph } from "./components/ParagraphWrapper";

const URL = "https://hn.algolia.com/api/v1/search_by_date";

const fetchData = async (param: string) => {
  const urlWithParams = param ? `${URL}?query=${param}` : URL;
  const data = await fetch(urlWithParams);
  console.log({ data });
  const dataValue = await data.json();
  console.log({ dataValue });
  return dataValue;
};

// try {
// } catch (error) {
//   console.log(error);
//   return error;
// }

type ArticleType = {
  author: string;
  comment_text: string;
  created_at: string;
  created_at_i: number;
  objectID: string;
  parent_id: number;
  story_id: number;
  story_title: string;
  story_url: string;
  updated_at: string;
  _highlightResult: {
    author: object;
    comment_text: object;
    story_title: object;
    story_url: object;
  };
  _tags: string[];
};

type DataType = {
  exhaustive: { nbHits: boolean; typo: boolean };
  exhaustiveNbHits: boolean;
  exhaustiveTypo: boolean;
  hits: ArticleType[];
  hitsPerPage: number;
  nbHits: number;
  nbPages: number;
  page: number;
  params: string;
  processingTimeMS: number;
  processingTimingsMS: {
    afterFetch: number[] | object[];
    fetch: number[];
    _request: number[];
  };
  query: string;
  serverTimeMS: number;
};

function App() {
  const [selectedValue, setSelectedValue] = useState<string>("react");
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<DataType>();

  const onSelectOption = async (param: string) => {
    setSelectedValue(param);
    fetchData(param);
    setData(await fetchData(param));
  };

  return (
    <>
      <Header>Hacker News</Header>
      <Main>
        <SectionForButtons>
          <Button
            id="button-all"
            onClick={() => onClickAllButton("button-all")}
          >
            All
          </Button>
          <Button onClick={() => console.log("My faves")}>My faves</Button>
        </SectionForButtons>
        <SectionForSelector>
          <Selector
            value={selectedValue}
            onClick={() => setVisible((prev) => !prev)}
          >
            <ContainOptions $visibility={visible ? "visible" : "hidden"}>
              <SelectorOption
                children={"angular"}
                onClick={() => onSelectOption("angular")}
              />

              <SelectorOption
                children={"react"}
                onClick={() => onSelectOption("reactjs")}
              />

              <SelectorOption
                children={"vue"}
                onClick={() => onSelectOption("vuejs")}
              />
            </ContainOptions>
          </Selector>
        </SectionForSelector>
        <SectionForArticles>
          {data?.hits.map((cur, idx) => (
            <Article key={idx}>
              <Paragraph
                time={cur.created_at}
                author={cur.author}
                text={cur.story_title}
              />
            </Article>
          ))}
        </SectionForArticles>
      </Main>
    </>
  );
}

export default App;

const onClickAllButton = (id: string) => {
  if (!id) return;
  else {
    console.log("all");
    document.getElementById("button-all")?.focus();
  }
};
