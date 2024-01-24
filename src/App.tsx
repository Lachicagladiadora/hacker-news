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
import { ParagraphWrapper } from "./components/ParagraphWrapper";
import { ArticleType, DataType } from "./types";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

const URL = "https://hn.algolia.com/api/v1/search_by_date";

const fetchData = async (param: string) => {
  const urlWithParams = param ? `${URL}?query=${param}` : URL;
  const data = await fetch(urlWithParams);
  const dataValue = await data.json();
  console.log({ dataValue });
  return dataValue;
};

TimeAgo.addLocale(en);

const timeAgo = new TimeAgo("en-US");

const INITIAL_DATA: DataType = await fetchData("reactjs");

function App() {
  const [selectedValue, setSelectedValue] = useState<string>("reactjs");
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<DataType>(INITIAL_DATA);
  const [fave, setFave] = useState(false);
  const [myFaves, setMyFaves] = useState<DataType>({ hits: [] });

  const onSelectOption = async (param: string) => {
    setSelectedValue(param);
    fetchData(param);
    setData(await fetchData(param));
  };

  const onClickAllButton = async (param: string) => {
    if (!param) return;
    setData(await fetchData(param));
  };

  const onAddFave = (param: ArticleType): void => {
    // TODO: fix funtion for add to 'myFaves'
    console.log("added fave");
    console.log({ myFaves });
    console.log({ param });
    if (param.is_fave === fave) {
      setFave((prev) => !prev);
      console.log({ myFaves });
      param.is_fave === true
        ? setMyFaves((prev): DataType => prev.hits.push(param))
        : console.log("error from param");
    }
  };

  return (
    <>
      <Header>Hacker News</Header>
      <Main>
        <SectionForButtons>
          <Button
            id="button-all"
            onClick={() => onClickAllButton(selectedValue)}
          >
            All
          </Button>
          <Button onClick={() => setData(myFaves)}>My faves</Button>
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
          {/* {!data && <p>Loading</p>} */}
          {data.hits.map((cur, idx) => (
            <Article
              key={idx}
              fave={fave}
              title="Add to faves"
              onClick={() => onAddFave(cur)}
            >
              <ParagraphWrapper
                url={cur.story_url || cur._highlightResult?.story_url}
                time={timeAgo.format(Date.parse(String(cur.created_at)))}
                author={cur.author}
                title={
                  typeof cur.story_title === "string"
                    ? cur.story_title
                    : cur.title
                }
              />
            </Article>
          ))}
        </SectionForArticles>
      </Main>
    </>
  );
}

export default App;
