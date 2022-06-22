import { NextPage } from "next";
import { styled } from "../../../stitches.config";

const Wrapper = styled("div", {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "16px",
});

const SelectWrapper = styled("label", {
  display: "flex",
  flexDirection: "column",
  width: "fit-content",
});

const StyledSelect = styled("select", {
  
});

const StyledOption = styled("option", {

});

const GenerateLinkButton = styled("button", {
  all: "unset",
  width: "fit-content",
  display: "flex",
  padding: "8px 16px",
  borderRadius: "6px",
  cursor: "pointer",
  color: "#FFFFFF",
  backgroundColor: "#3262F2",
});

const Administrator: NextPage = () => {
  return (
    <Wrapper>
      Criar link para sala:
      <SelectWrapper>
        Selecione o tipo de análise de tempo de reação:
        <StyledSelect defaultValue={"simple"}>
          <StyledOption value="simple">Simples</StyledOption>
          <StyledOption value="choice">Escolha</StyledOption>
        </StyledSelect>
      </SelectWrapper>

      <GenerateLinkButton>
        Gerar link
      </GenerateLinkButton>
    </Wrapper>
  );
}
export default Administrator;
