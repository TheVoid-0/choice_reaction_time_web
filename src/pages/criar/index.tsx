import axios from "axios";
import { NextPage } from "next";
import { useState, useEffect } from "react";
import { styled } from "../../../stitches.config";

const Wrapper = styled("div", {
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const FormContainer = styled("div", {});

const StyledOption = styled("option", {});

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
  const [formData, setFormData] = useState({
    name: "",
    user: {
      email: "",
      age: 0,
    },
  });

  const [shortlink, setShortlink] = useState<string>("Seu link");

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
      Criar Sessão
      <FormContainer>
        <input
          id="email"
          type="text"
          onChange={({ target }) => {
            formData.user.email = target.value;
            setFormData(formData);
          }}
        />
        <input
          id="name"
          type="text"
          onChange={({ target }) => {
            formData.name = target.value;
            setFormData(formData);
          }}
        />
        <input
          id="age"
          type="text"
          onChange={({ target }) => {
            formData.user.age = Number.isNaN(+target.value) ? 0 : +target.value;
            setFormData(formData);
          }}
        />
        <GenerateLinkButton onClick={createSession.bind(formData)}>
          Gerar link
        </GenerateLinkButton>
      </FormContainer>
      <a href={shortlink}>{shortlink}</a>
    </Wrapper>
  );
};
export default Administrator;
