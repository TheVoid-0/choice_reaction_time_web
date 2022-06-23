import { styled } from "@stitches/react";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Header, PageWrapper } from "../../styles/escolhas.style";

const colors = ["Vermelho", "Amarelo", "Azul", "Verde"];

const FormContainer = styled("div", {});



const Escolha: NextPage = () => {
  const router = useRouter();
  const [currentColor, setCurrentColor] = useState("");

  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");

  const { sessionId } = router.query;

  const startSession = () => {
    axios.post("http://localhost:3002/users", { email }).then(({data}) => {
      // Iniciar sessao
      setUserId(data.id)
    });
  };

  const endSession = () => {
    axios.post(`http://localhost:3002/test-sessions/:${sessionId}/attempts`,{
      results: JSON.stringify({1: 400.40, 2: 353.20}),
      userId
    }).then(() => {
      console.log(`sucesso`)
    }).catch(console.log)
  }

  const generateColor = () => {
    const random = Math.floor(Math.random() * (3 - 0) + 0);
    setCurrentColor(colors[random]);
  };

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
          onChange={({ target }) => setEmail(target.value)}
        />

        <button onClick={() => startSession()}> Iniciar</button>
      </FormContainer>
    </PageWrapper>
  );
};
export default Escolha;
