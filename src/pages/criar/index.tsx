import { NextPage } from "next";
import { styled } from "../../../stitches.config";

const Wrapper = styled("div", {
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const FormContainer = styled("div", {

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
      Criar Sessão

      <GenerateLinkButton>
        Gerar link
      </GenerateLinkButton>
    </Wrapper>
  );
}
export default Administrator;
