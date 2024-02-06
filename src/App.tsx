import { useCallback, useEffect, useState } from "react";
import { useIntersection } from "./hooks/useIntersection";

import { Article } from "./components/Article";
import { Button } from "./components/Button";
import { Header } from "./components/Header";
import { Selector } from "./components/Selector";
import { SelectorOption } from "./components/SelectorOption";
import { MainStyle } from "./components/style/MainStyle";
import { SectionForButtonsStyle } from "./components/style/SectionForButtonsStyle";
import { ContainOptions } from "./components/style/SelectorStyle";
import { SectionForArticlesStyle } from "./components/style/SectionForArticlesStyle";
import { SectionForSelectorStyle } from "./components/style/SectionForSelectorStyle";
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
  const [stories, setStories] = useState<Story[]>([]);
  const [pageInformation, setPageInformation] = useState<{
    currentPage: number;
    totalPages: number;
  }>({ currentPage: 1, totalPages: 0 });
  const [myFaves, setMyFaves] = useState<Story[]>(() => {
    const localFaves = localStorage.getItem("Stories Faves");
    return localFaves ? JSON.parse(localFaves) : [];
  });
  const [displayFaves, setDisplayFaves] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [elementRef, isIntersection] = useIntersection({ threshold: 0.5 });

  const onChangeProgrammingLanguage = async (param: string) => {
    if (!param) return;

    setSelectedValue(param);
    setIsLoading(true);
    const newStory = await fetchData(param, 1);
    setIsLoading(false);
    setPageInformation({
      currentPage: 2,
      totalPages: newStory.nbPages,
    });
    setStories(newStory.hits);
    onDisplayAllStories(param);
  };

  const onDisplayAllStories = async (param: string) => {
    if (!param) return;

    setDisplayFaves(false);
    setIsLoading(true);
    const stories = await fetchData(param, pageInformation.currentPage);
    setIsLoading(false);
    setPageInformation({
      currentPage: (stories.page += 1),
      totalPages: stories.nbPages,
    });
    setStories(stories.hits);
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

  // Local Storage
  useEffect(() => {
    localStorage.setItem("Stories Faves", JSON.stringify(myFaves));
  }, [myFaves]);

  const getNextStoriesPage = useCallback(async () => {
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
    setStories((prev) => {
      return [...prev, ...data.hits];
    });
  }, [setStories, selectedValue, pageInformation]);

  useEffect(() => {
    if (!isIntersection) return;
    if (isLoading) return;

    getNextStoriesPage();
  }, [isIntersection, getNextStoriesPage, isLoading]);

  return (
    <>
      <Header>Hacker News</Header>
      <MainStyle>
        <SectionForButtonsStyle>
          <Button
            id="button-all"
            focus={true}
            onClick={() => onDisplayAllStories(selectedValue)}
          >
            All
          </Button>
          <Button onClick={() => setDisplayFaves((prev) => !prev)}>
            My faves
          </Button>
        </SectionForButtonsStyle>
        <SectionForSelectorStyle>
          <Selector
            value={selectedValue}
            onClick={() => setVisible((prev) => !prev)}
            selectedImage={`/${selectedValue}.png`}
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
        </SectionForSelectorStyle>

        <SectionForArticlesStyle>
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

          {!isLoading && Boolean(!stories.length) && (
            <p>Again try letter... </p>
          )}

          {/* news */}
          {!displayFaves &&
            stories.map((cur, idx) => (
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
        </SectionForArticlesStyle>
      </MainStyle>
    </>
  );
};
