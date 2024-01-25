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
import { Story, DataType } from "./types";
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
  // const [fave, setFave] = useState(false);
  const [myFaves, setMyFaves] = useState<Story[]>([]);

  const onChangeProgrammingLanguage = async (param: string) => {
    setSelectedValue(param);
    const newData = await fetchData(param); // change data for news
    setData(newData);
  };

  const onDisplayAllNews = async (param: string) => {
    if (!param) return;

    const news = await fetchData(param);
    setData(news);
  };

  const onToggleFave = (article: Story): void => {
    // TODO: fix funtion for add to 'myFaves'
    console.log("added fave");
    console.log({ myFaves });
    console.log({ param: article });
    const myFavesIds = myFaves.map((c) => c.story_id);
    if (myFavesIds.includes(article.story_id)) {
      setMyFaves((prev) => prev.filter((c) => c.story_id !== article.story_id));
      console.log({ myFaves });
    } else {
      setMyFaves((prev) => [article, ...prev]);
    }
  };

  const storyIsFave = (article: Story) => {
    const myFavesIds = myFaves.map((c) => c.story_id);
    return myFavesIds.includes(article.story_id) ? true : false;
  };

  return (
    <>
      <Header>Hacker News</Header>
      <Main>
        <SectionForButtons>
          <Button
            id="button-all"
            // focus={selectedValue ? true : false}
            onClick={() => onDisplayAllNews(selectedValue)}
          >
            All
          </Button>
          <Button onClick={() => setData(myFaves)}>My faves</Button>
        </SectionForButtons>
        <SectionForSelector>
          <Selector
            value={selectedValue}
            onClick={() => setVisible((prev) => !prev)}
            //change onclick for onchange in selector
          >
            <ContainOptions $visibility={visible ? "visible" : "hidden"}>
              <SelectorOption
                children={"angular"}
                onClick={() => onChangeProgrammingLanguage("angular")}
              />

              <SelectorOption
                children={"reactjs"}
                onClick={() => onChangeProgrammingLanguage("reactjs")}
              />

              <SelectorOption
                children={"vuejs"}
                onClick={() => onChangeProgrammingLanguage("vuejs")}
              />
            </ContainOptions>
          </Selector>
        </SectionForSelector>
        <SectionForArticles>
          {/* {!data && <p>Loading</p>} */}
          {data.hits.map((cur, idx) => (
            <Article
              key={idx}
              fave={storyIsFave(cur)}
              title="Add to faves"
              onClick={() => onToggleFave(cur)}
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
