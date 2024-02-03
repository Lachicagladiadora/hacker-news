import { useCallback, useEffect, useState } from "react";
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
import { LoadingStyle } from "./components/style/LoadingStyle";

type pathProps = { param: string; page?: number };

const getPath = ({ param, page }: pathProps): string => {
  const URL = "https://hn.algolia.com/api/v1/search_by_date";
  if (!page) return `${URL}?query=${param}`;
  return `${URL}?query=${param}&page=${page}`;
};

const fetchData = async (param: string, page: number): Promise<DataType> => {
  const urlWithParams = getPath({ param: param, page: page });
  const data = await fetch(urlWithParams);
  const dataValue = await data.json();
  return dataValue;
};

const fetchDataForPage = async (
  param: string,
  page: number
): Promise<DataType> => {
  const urlWithParams = getPath({ param: param, page: page });
  const data = await fetch(urlWithParams);
  const dataValue = await data.json();
  return dataValue;
};

TimeAgo.addLocale(en);

const timeAgo = new TimeAgo("en-US");

export const App = () => {
  const [selectedValue, setSelectedValue] = useState<string>("reactjs");
  const [visible, setVisible] = useState(false);
  const [news, setNews] = useState<Story[]>([]);
  const [pageInformation, setPageInformation] = useState<{
    currentPage: number;
    totalPages: number;
  }>({ currentPage: 1, totalPages: 0 });
  const [myFaves, setMyFaves] = useState<Story[]>([]);
  const [displayFaves, setDisplayFaves] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [elementRef, isIntersection] = useIntersection({ threshold: 0.5 });

  console.log(pageInformation);

  const onChangeProgrammingLanguage = async (param: string) => {
    if (!param) return;

    setSelectedValue(param);
    setIsLoading(true);
    const newStory = await fetchData(param, 1);
    setIsLoading(false);
    console.log({ pageInformation });
    setPageInformation({
      currentPage: 2,
      totalPages: newStory.nbPages,
    });
    setNews(newStory.hits);
    onDisplayAllNews(param);
  };

  const onDisplayAllNews = async (param: string) => {
    if (!param) return;

    setDisplayFaves(false);
    setIsLoading(true);
    const news = await fetchData(param, pageInformation.currentPage);
    setIsLoading(false);
    setPageInformation({
      currentPage: (news.page += 1),
      totalPages: news.nbPages,
    });
    setNews(news.hits);
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

  useEffect(() => {
    localStorage.setItem("My Faves Stories", JSON.stringify(myFaves));
  }, [myFaves]);

  const getNextNewsPage = useCallback(async () => {
    setIsLoading(true);
    const data = await fetchDataForPage(
      selectedValue,
      pageInformation.currentPage
    );
    setIsLoading(false);
    setPageInformation({
      currentPage: (data.page += 1),
      totalPages: data.nbPages,
    });
    setNews((prev) => {
      return [...prev, ...data.hits];
    });
  }, [setNews, selectedValue, pageInformation]);

  useEffect(() => {
    if (!isIntersection) return;
    if (isLoading) return;

    getNextNewsPage();
  }, [isIntersection, getNextNewsPage, isLoading]);

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
                imageName="/angular.png"
                imageAlt="Angular icon"
                onClick={() => onChangeProgrammingLanguage("angular")}
              />

              <SelectorOption
                children={"reactjs"}
                imageName="/reactjs.png"
                imageAlt="React icon"
                onClick={() => onChangeProgrammingLanguage("reactjs")}
              />

              <SelectorOption
                children={"vuejs"}
                imageName="/vuejs.png"
                imageAlt="Vue icon"
                onClick={() => onChangeProgrammingLanguage("vuejs")}
              />
            </ContainOptions>
          </Selector>
        </SectionForSelector>

        <SectionForArticles>
          {!isLoading && displayFaves && myFaves.length === 0 && (
            <p>... You don't have faves ...</p>
          )}

          {/* faves */}
          {displayFaves &&
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

          {!isLoading && Boolean(!news.length) && <p>Again try letter... </p>}

          {/* news */}
          {!displayFaves &&
            news.map((cur, idx) => (
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

          {isLoading && <LoadingStyle> Loading...</LoadingStyle>}

          {/* observer */}
          {!displayFaves && <div ref={elementRef} />}
        </SectionForArticles>
      </Main>
    </>
  );
};
