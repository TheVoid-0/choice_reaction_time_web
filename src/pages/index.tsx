import type { NextPage } from 'next'
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import { styled } from '../../stitches.config';

const Wrapper = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  height: "100vh",
  gap: "16px"
});

const Button = styled("a", {
  all: "unset",
  width: "fit-content",
  display: "flex",
  padding: "8px 16px",
  borderRadius: "6px",
  cursor: "pointer",
  height: "fit-content",
  color: "#FFFFFF",
  backgroundColor: "#d00000",
  transition: "background-color 0.2s",

  "&:hover": {
    backgroundColor: "#9d0208"
  }
});

const Title = styled("span", {
  fontSize: "28px",
  textAlign: "center",
  marginBottom: "150px",
});

const Home: NextPage = () => {
  return (
    <Wrapper>
      <Title>Avaliador de Tempo de Reação de Escolha</Title>
      <Link href={"/criar"} passHref>
        <Button>
          Criar Sessão
        </Button>
      </Link>
      <Link href={"/buscar"} passHref>
        <Button>
          Buscar Sessão
        </Button>
      </Link>
    </Wrapper>
  )
}

export default Home
