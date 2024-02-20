import { useCallback, useEffect, useRef, useState } from "react";
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
import { Story } from "./types";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { LoadingStyle } from "./components/style/LoadingStyle";
import { getStoriesByPage } from "./utils";

TimeAgo.addLocale(en);

const timeAgo = new TimeAgo("en-US");

export const App = () => {
  const [selectedValue, setSelectedValue] = useState<string>("reactjs");
  const [observerIsVisible, setVisible] = useState(false);
  const [stories, setStories] = useState<Story[]>([]);

  const pageInformationRef = useRef<{
    currentPage: number;
    totalPages: number;
  }>({ currentPage: 0, totalPages: 0 });

  const [myFaves, setMyFaves] = useState<Story[]>(() => {
    const localFaves = localStorage.getItem("Stories Faves");
    return localFaves ? JSON.parse(localFaves) : [];
  });

  const [displayFaves, setDisplayFaves] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [observerRef, observerIsIntersection] = useIntersection({
    threshold: 0.5,
  });

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
    return myFavesIds.includes(article.story_id);
  };

  type OnGetStoriesByPageInput = { query: string; page: number };
  const onGetStoriesByPage = useCallback(
    async ({ query, page = 1 }: OnGetStoriesByPageInput) => {
      setIsLoading(true);
      const data = await getStoriesByPage({ query, page });
      setIsLoading(false);
      pageInformationRef.current = {
        currentPage: data.page,
        totalPages: data.nbPages,
      };
      setStories((prev) => [...prev, ...data.hits]);
    },
    []
  );

  const onChangeProgrammingLanguage = async (language: string) => {
    pageInformationRef.current.currentPage = 0;
    setSelectedValue(language);
    setIsLoading(true);
    setStories([]);
    const data = await getStoriesByPage({ query: language, page: 1 });
    pageInformationRef.current = {
      currentPage: data.page,
      totalPages: data.nbPages,
    };
    setStories((prev) => [...prev, ...data.hits]);
    setIsLoading(false);
  };

  // get stories when observer is intersecting
  useEffect(() => {
    if (!observerIsIntersection) return;
    if (isLoading) return;

    onGetStoriesByPage({
      query: selectedValue,
      page: pageInformationRef.current.currentPage + 1,
    });
  }, [observerIsIntersection, onGetStoriesByPage, isLoading, selectedValue]);

  // Local Storage
  useEffect(() => {
    localStorage.setItem("Stories Faves", JSON.stringify(myFaves));
  }, [myFaves]);

  return (
    <>
      <Header>Hacker News</Header>
      <MainStyle>
        <SectionForButtonsStyle>
          <Button
            onClick={() => setDisplayFaves(false)}
            style={{
              ...(!displayFaves && {
                border: "solid 2px royalBlue",
                color: "royalblue",
              }),
            }}
          >
            All
          </Button>
          <Button
            onClick={() => setDisplayFaves(true)}
            style={{
              ...(displayFaves && {
                border: "solid 2px royalBlue",
                color: "royalblue",
              }),
            }}
          >
            My faves
          </Button>
        </SectionForButtonsStyle>
        <SectionForSelectorStyle>
          <Selector
            value={selectedValue}
            onClick={() => setVisible((prev) => !prev)}
            selectedImage={`/${selectedValue}.png`}
            id="news-types"
          >
            <ContainOptions
              $visibility={observerIsVisible ? "visible" : "hidden"}
            >
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
            myFaves.map((cur) => (
              <Article
                key={cur.story_id}
                id={cur.story_id.toString()}
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
            stories.map((cur) => (
              <Article
                key={cur.story_id.toString()}
                id={cur.story_id.toString()}
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
          {!displayFaves && <div ref={observerRef} />}
        </SectionForArticlesStyle>
      </MainStyle>
    </>
  );
};
