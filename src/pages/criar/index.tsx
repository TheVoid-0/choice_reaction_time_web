import axios from "axios";
import { NextPage } from "next";
import { useState } from "react";
import { styled } from "../../../stitches.config";

const Wrapper = styled("div", {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const Container = styled("div", {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: "32px",
  padding: "16px 50px",
  borderRadius: "6px",
  boxShadow: "2px 2px 6px 0px #4b4b4b5a"
});

const Title = styled("span", {
  fontSize: "28px",
})

const FormContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: "12px",
});

const FormField = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
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
  marginTop: "12px",
  transition: "background-color .2s",

  "&:hover": {
    backgroundColor: "#2445aa",
  }
});

const Administrator: NextPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    user: {
      email: "",
      age: 0,
    },
  });

  const [shortlink, setShortlink] = useState<string>("");

  const createSession = () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_CHOICE_REACTION_API}/test-sessions`,
        formData
      )
      .then(({ data }) => {
        console.log(data);
        setShortlink(data.shortlink);
      })
      .catch(console.log);
  };

  return (
    <Wrapper>
      <Container>
        <Title>Criar Sessão</Title>
        <FormContainer>
          <FormField>
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="text"
              onChange={({ target }) => {
                formData.user.email = target.value;
                setFormData(formData);
              }}
            />
          </FormField>

          <FormField>
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              type="text"
              onChange={({ target }) => {
                formData.name = target.value;
                setFormData(formData);
              }}
            />
          </FormField>

          <FormField>
            <label htmlFor="age">Idade</label>
            <input
              id="age"
              type="text"
              onChange={({ target }) => {
                formData.user.age = Number.isNaN(+target.value) ? 0 : +target.value;
                setFormData(formData);
              }}
            />
          </FormField>

          <GenerateLinkButton onClick={createSession.bind(formData)}>
            Gerar link
          </GenerateLinkButton>
        </FormContainer>
        <a href={shortlink}>
          {shortlink && (
            <span><b>Seu link: </b>{shortlink}</span>
          )}
        </a>
      </Container>
    </Wrapper>
  );
};
export default Administrator;
