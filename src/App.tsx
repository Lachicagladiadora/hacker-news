import { useState } from "react";
import { useIntersection } from "./hooks/useIntersection";

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

let newPage = 0;

type pathProps = { param: string; page?: number };

const getPath = ({ param }: pathProps): string => {
  const URL = "https://hn.algolia.com/api/v1/search_by_date";
  newPage += 1;
  return `${URL}?query=${param}&page=${newPage}`;
};

console.log(getPath({ param: "angular", page: 6 }));

const fetchData = async (param: string, page: number) => {
  const urlWithParams = getPath({ param: param, page: page });
  const data = await fetch(urlWithParams);
  const dataValue = await data.json();
  console.log({ dataValue });
  return !dataValue ? "Loading..." : dataValue;
};

const fetchDataForPage = async (param: string, page: number) => {
  const urlWithParams = getPath({ param: param, page: page });
  const data = await fetch(urlWithParams);
  const dataValue = await data.json();
  console.log({ dataValue });
  return !dataValue ? "Loading..." : dataValue;
};

TimeAgo.addLocale(en);

const timeAgo = new TimeAgo("en-US");

const INITIAL_DATA: DataType = await fetchData("reactjs", newPage);

function App() {
  const [selectedValue, setSelectedValue] = useState<string>("reactjs");
  const [visible, setVisible] = useState(false);
  const [news, setNews] = useState<DataType>(INITIAL_DATA);
  const [myFaves, setMyFaves] = useState<Story[]>([]);
  const [displayFaves, setDisplayFaves] = useState(false);

  const [elementRef, isIntersection] = useIntersection({});

  const finalData: DataType = async () =>
    await fetchDataForPage(selectedValue, newPage);
  // todo: fix type of promise

  const onChangeProgrammingLanguage = async (param: string) => {
    if (!param) return;

    setSelectedValue(param);
    const newStory = await fetchData(param, newPage);
    setNews(newStory);
    onDisplayAllNews(param);
  };

  const onDisplayAllNews = async (param: string) => {
    if (!param) return;

    setDisplayFaves(false);
    const news = await fetchData(param, newPage);
    setNews(news);
  };

  const onToggleFave = (article: Story): void => {
    const myFavesIds = myFaves.map((c) => c.story_id);
    if (myFavesIds.includes(article.story_id)) {
      setMyFaves((prev) => prev.filter((c) => c.story_id !== article.story_id));
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
            focus={true}
            onClick={() => onDisplayAllNews(selectedValue)}
          >
            All
          </Button>
          <Button onClick={() => setDisplayFaves((prev) => !prev)}>
            My faves
          </Button>
        </SectionForButtons>
        <SectionForSelector>
          <Selector
            value={selectedValue}
            onClick={() => setVisible((prev) => !prev)}
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
          {displayFaves && myFaves.length === 0 && (
            <p>... You don't have faves ...</p>
          )}
          {<p>Loading...</p> &&
            displayFaves &&
            myFaves.length > 0 &&
            myFaves.map((cur, idx) => (
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
          {(typeof news === "string" && <p>Loading... </p>) ||
            (typeof news !== "string" &&
              !displayFaves &&
              news.hits.map((cur, idx) => (
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
              )))}
          <div
            ref={elementRef}
            style={{ background: `${isIntersection ? "green" : "red"}` }}
          >
            {isIntersection
              ? !displayFaves &&
                finalData.hits.map((cur, idx) => (
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
                ))
              : "loading"}
          </div>
        </SectionForArticles>
      </Main>
    </>
  );
}

export default App;
