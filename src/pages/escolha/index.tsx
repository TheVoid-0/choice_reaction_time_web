import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Header, PageWrapper } from "../../styles/escolhas.style";

const colors = ["Vermelho", "Amarelo", "Azul", "Verde"];

const Escolha: NextPage = () => {
  const [currentColor, setCurrentColor] = useState("");

  const generateColor = () => {
    const random = Math.floor(Math.random() * (3 - 0) + 0);
    setCurrentColor(colors[random]);
  }

  return (
    <PageWrapper>
      <Header>
        <h2>Instruções</h2>
        <p>
          Para começar, informe seus dados e clique no botão INICIAR.
        </p>
      </Header>
    </PageWrapper>
  );
}
export default Escolha;