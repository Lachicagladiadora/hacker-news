import { useState } from "react";
import { Article } from "./components/Article";
import { Button } from "./components/Button";
import { Header } from "./components/Header";
import { Selector } from "./components/Selector";
import { SelectorOption } from "./components/SelectorOption";
import { Paragraph } from "./components/style/ArticleStyle";
import { Main } from "./components/style/Main";
import { SectionForButtons } from "./components/style/SectionForButtons";
import { ContainOptions } from "./components/style/SelectorStyle";
import { SectionForArticles } from "./components/style/SectionForArticles";
import { SectionForSelector } from "./components/style/SectionForSelector";

function App() {
  const [selectedValue, setSelectedValue] = useState<string>("react");
  const [visible, setVisible] = useState(false);

  // const onChangeSelected = (children: string) => {
  //   console.log("onClickSelector");
  //   setSelectedValue(children);
  // };

  // const onShowOptions = (boolean: boolean) => {
  //   console.log("show");
  //   // return boolean ? "visible" : "hidden";
  // };

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
                onClick={() => setSelectedValue("angular")}
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
            <Paragraph>
              dkjsl kfgsdlgl;jd iooooosv l d fkl fkdl ssssss ssss glkdf gjv lkb
              dfgn kl sdkjsl kfgsdlgl;jd iooooosv l d fkl fkdl ssssss ssss glkdf
              gjv lkb dfgn kl s
            </Paragraph>
          </Article>
          <Article>
            <Paragraph>
              dkjsl kfgsdlgl;jd iooooosv l d fkl fkdl ssssss ssss glkdf gjv lkb
              dfgn kl sdkjsl kfgsdlgl;jd iooooosv l d fkl fkdl ssssss ssss glkdf
              gjv lkb dfgn kl s
            </Paragraph>
          </Article>
          <Article>
            <Paragraph>
              dkjsl kfgsdlgl;jd iooooosv l d fkl fkdl ssssss ssss glkdf gjv lkb
              dfgn kl sdkjsl kfgsdlgl;jd iooooosv l d fkl fkdl ssssss ssss glkdf
              gjv lkb dfgn kl s
            </Paragraph>
          </Article>
          <Article>
            <Paragraph>
              dkjsl kfgsdlgl;jd iooooosv l d fkl fkdl ssssss ssss glkdf gjv lkb
              dfgn kl sdkjsl kfgsdlgl;jd iooooosv l d fkl fkdl ssssss ssss glkdf
              gjv lkb dfgn kl s
            </Paragraph>
          </Article>
          <Article>
            <Paragraph>
              dkjsl kfgsdlgl;jd iooooosv l d fkl fkdl ssssss ssss glkdf gjv lkb
              dfgn kl sdkjsl kfgsdlgl;jd iooooosv l d fkl fkdl ssssss ssss glkdf
              gjv lkb dfgn kl s
            </Paragraph>
          </Article>
          <Article>
            <Paragraph>
              dkjsl kfgsdlgl;jd iooooosv l d fkl fkdl ssssss ssss glkdf gjv lkb
              dfgn kl sdkjsl kfgsdlgl;jd iooooosv l d fkl fkdl ssssss ssss glkdf
              gjv lkb dfgn kl s
            </Paragraph>
          </Article>
          <Article>
            <Paragraph>
              dkjsl kfgsdlgl;jd iooooosv l d fkl fkdl ssssss ssss glkdf gjv lkb
              dfgn kl sdkjsl kfgsdlgl;jd iooooosv l d fkl fkdl ssssss ssss glkdf
              gjv lkb dfgn kl s
            </Paragraph>
          </Article>
          <Article>
            <Paragraph>
              dkjsl kfgsdlgl;jd iooooosv l d fkl fkdl ssssss ssss glkdf gjv lkb
              dfgn kl sdkjsl kfgsdlgl;jd iooooosv l d fkl fkdl ssssss ssss glkdf
              gjv lkb dfgn kl s
            </Paragraph>
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
