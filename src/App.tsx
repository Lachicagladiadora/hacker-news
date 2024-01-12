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
import { DataType } from "./types";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

const URL = "https://hn.algolia.com/api/v1/search_by_date";

const fetchData = async (param: string) => {
  const urlWithParams = param ? `${URL}?query=${param}` : URL;
  const data = await fetch(urlWithParams);
  console.log({ data });
  const dataValue = await data.json();
  console.log({ dataValue });
  return dataValue;
};

TimeAgo.addDefaultLocale(en);

const timeAgo = new TimeAgo("en-US");
// todo : use library for get time

function App() {
  const [selectedValue, setSelectedValue] = useState<string>("reactjs");
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<DataType>();

  const onSelectOption = async (param: string) => {
    setSelectedValue(param);
    fetchData(param);
    setData(await fetchData(param));
  };

  const createdDate = (param: string): number => {
    param.get;
  };

  // onSelectOption("reactjs");

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
                children={"reactjs"}
                onClick={() => onSelectOption("reactjs")}
              />

              <SelectorOption
                children={"vuejs"}
                onClick={() => onSelectOption("vuejs")}
              />
            </ContainOptions>
          </Selector>
        </SectionForSelector>
        <SectionForArticles>
          {data?.hits.map((cur, idx) => (
            <Article key={idx}>
              <Paragraph
                time={timeAgo.format(Date.parse(cur.created_at))}
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
