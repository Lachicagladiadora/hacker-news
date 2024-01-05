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
import { Paragraph } from "./components/Paragraph";

const URL = "hn.algolia.com/api/v1/search_by_date?query";

const FetchData = async (param: string) => {
  try {
    const Data = await fetch(`${URL}=${param}`, {
      headers: {},
      method: "GET",
    }).then((res) => res.json);
    // .then((data) => data);
    console.log({ Data });
    return Data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

function App() {
  const [selectedValue, setSelectedValue] = useState<string>("react");
  const [visible, setVisible] = useState(false);

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
                onClick={() => {
                  setSelectedValue("angular");
                  FetchData("angular");
                }}
              />

              <SelectorOption
                children={"react"}
                onClick={() => setSelectedValue("react")}
              />

              <SelectorOption
                children={"vue"}
                onClick={() => setSelectedValue("vue")}
              />
            </ContainOptions>
          </Selector>
        </SectionForSelector>
        <SectionForArticles>
          <Article>
            <Paragraph
              time="1 minute"
              author="dardos"
              text="Eating fewer calories can ward off ageing"
            />
          </Article>
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
