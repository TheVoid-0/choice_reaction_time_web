import { styled } from "@stitches/react";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Header, PageWrapper } from "../../styles/escolhas.style";

const colors = ["Vermelho", "Amarelo", "Azul", "Verde"];

interface Colors {
  Vermelho: string;
  Amarelo: string;
  Azul: string;
  Verde: string;
}

const colorsObject = {
  Vermelho: "red",
  Amarelo: "yellow",
  Azul: "blue",
  Verde: "green",
}

const FormContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const RowBetween = styled("div", {
  display: "flex",
  flexDirection: "row",
  width: "100%",
  justifyContent: "space-between",
});

const RowCenter = styled("div", {
  display: "flex",
  flexDirection: "row",
  width: "100%",
  justifyContent: "center",
});

const InitButton = styled("button", {
  all: "unset",
  width: "fit-content",
  display: "flex",
  padding: "8px 16px",
  borderRadius: "6px",
  cursor: "pointer",
  color: "#FFFFFF",
  backgroundColor: "#3262F2",
  marginLeft: "20px"
});

const CirclesContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "500px",
  height: "350px",
  border: "solid 1px #ccc",
  padding: "20px",
  margin: "20px auto 20px auto",
});

const Circle = styled("div", {
  all: "unset",
  height: "100px",
  width: "100px",
  cursor: "pointer",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#F4F4F4",
  fontSize: "28px",
  fontWeight: "bold",
  backgroundColor: "red"
});

const ResultContent = styled("div", {
  all: "unset",
  height: "100px",
  width: "fit-content",
  padding: "0 15px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "32px",
  fontWeight: "bold",
  color: "red",
  userSelect: "none",
});

const Escolha: NextPage = () => {
  const router = useRouter();
  const [currentColor, setCurrentColor] = useState("");

  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");

  const { sessionId } = router.query;

  const startSession = () => {
    axios.post(`${process.env.NEXT_PUBLIC_CHOICE_REACTION_API}/users`, { email }).then(({ data }) => {
      setUserId(data.id);
      generateColor();
    });
  };

  const endSession = () => {
    axios.post(`${process.env.NEXT_PUBLIC_CHOICE_REACTION_API}/test-sessions/:${sessionId}/attempts`, {
      results: JSON.stringify({ 1: 400.40, 2: 353.20 }),
      userId
    }).then(() => {
      console.log(`sucesso`)
    }).catch(console.log)
  }

  const generateColor = () => {
    const random = Math.floor(Math.random() * (3 - 0) + 0);
    setCurrentColor(colors[random]);
  };

  useEffect(() => {
    const handleKeyPress = (ev: KeyboardEvent) => {
      console.log(ev.key)
    }

    window.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    }
  }, [])

  useEffect(() => {

  }, [currentColor]);

  return (
    <PageWrapper>
      <Header>
        <h2>Instruções</h2>
        <p>Para começar, informe seus dados e clique no botão INICIAR.</p>
      </Header>

      <FormContainer>
        <input
          id="email"
          type="text"
          placeholder="email"
          onChange={({ target }) => setEmail(target.value)}
        />

        <InitButton onClick={() => startSession()}> Iniciar</InitButton>
      </FormContainer>

      <CirclesContainer>
        <RowBetween>
          <Circle css={{ backgroundColor: "red" }}>Q</Circle>
          <Circle css={{ backgroundColor: "green" }}>P</Circle>
        </RowBetween>

        <RowCenter>
          <ResultContent css={{ color: colorsObject[currentColor as keyof Colors] || "black" }}>{currentColor}</ResultContent>
        </RowCenter>

        <RowBetween>
          <Circle css={{ backgroundColor: "blue" }}>Z</Circle>
          <Circle css={{ backgroundColor: "yellow" }}>M</Circle>
        </RowBetween>

      </CirclesContainer>
    </PageWrapper>
  );
};
export default Escolha;
