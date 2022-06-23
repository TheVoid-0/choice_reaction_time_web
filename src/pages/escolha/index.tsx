import { styled } from "@stitches/react";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
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

const FormContainer = styled("form", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: "8px"
});

const FormField = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "4px",

  input: {
    all: "unset",
    border: "1px solid #ababab",
    borderRadius: "4px",
    padding: "8px 16px",
    boxSizing: "border-box",
  }
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
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
});

const Button = styled("button", {
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

const CirclesContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "500px",
  height: "350px",
  border: "solid 1px #ccc",
  borderRadius: "4px",
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
  height: "100%",
  width: "fit-content",
  padding: "0 15px",
  display: "flex",
  flexShrink: 0,
  justifyContent: "center",
  alignItems: "center",
  fontSize: "32px",
  fontWeight: "bold",
  userSelect: "none",
});

const FinishContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "16px"
})

const Escolha: NextPage = () => {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [currentColor, setCurrentColor] = useState<string>();
  const [startTime, setStartTime] = useState<number>(0);

  const [reactionTimes, setReactionTimes] = useState<number[]>([])

  const email = useRef<string>("");
  const nome = useRef<string>("");
  const idade = useRef<string>("");
  const [userId, setUserId] = useState("");

  const { sessionId } = router.query;

  const startSession = (e: FormEvent) => {
    e.preventDefault();
    const formData = {
      name: nome.current,
      email: email.current,
      age: idade.current,
    }
    axios.post(`${process.env.NEXT_PUBLIC_CHOICE_REACTION_API}/users`, formData).then(async ({ data }) => {
      setStarted(true);
      setUserId(data.id);
      generateColor();
    });
  };

  const endSession = () => {
    const results: Record<number, number> = {};
    reactionTimes.forEach((value, index) => {
      results[index + 1] = value;
    });
    axios.post(`${process.env.NEXT_PUBLIC_CHOICE_REACTION_API}/test-sessions/${sessionId}/attempts`, {
      results: JSON.stringify(results),
      userId
    }).then(() => {
      console.log(`sucesso`)
    }).catch(console.log)
  }

  const generateColor = () => {
    const random = Math.floor(Math.random() * (7 - 0) + 0);
    setCurrentColor(colors[random > 3 ? Math.floor(random / 2) : random]);
    setStartTime(Date.now());
  };

  const handleButtonClick = useCallback((color: string) => {
    console.log(color, currentColor)
    if (color === currentColor) {
      console.log(Date.now() - startTime);
      reactionTimes.push(Date.now() - startTime);
      generateColor();
    }
  }, [currentColor, reactionTimes, startTime]);
  
  const getAverage = () => {
    let sum = 0;
    reactionTimes.forEach((reaction) => {
      sum += reaction;
    });

    return sum / reactionTimes.length;
  }

  useEffect(() => {
    const handleKeyPress = (ev: KeyboardEvent) => {
      if (!started) return;

      switch (ev.key) {
        case "q":
        case "Q":
          handleButtonClick("Vermelho");
          break;
        case "p":
        case "P":
          handleButtonClick("Verde");
          break;
        case "z":
        case "Z":
          handleButtonClick("Azul");
          break;
        case "m":
        case "M":
          handleButtonClick("Amarelo");
          break;
        default:
          break;
      }
    }

    window.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    }
  }, [handleButtonClick, started]);

  useEffect(() => {
    if (reactionTimes.length === 10) {
      setStarted(false);

    }
  }, [reactionTimes.length]);

  return (
    <PageWrapper>
      <Header>
        <h2>Instruções</h2>
        <p>Para começar, informe seus dados e clique no botão INICIAR.</p>
      </Header>

      <FormContainer onSubmit={startSession}>
        <FormField>
          <input
            id="email"
            type={"email"}
            placeholder="Email"
            required
            onChange={({ target }) => email.current = target.value}
          />
        </FormField>

        <FormField>
          <input
            id="name"
            type={"text"}
            placeholder="Nome"
            required
            onChange={({ target }) => nome.current = target.value}
          />
        </FormField>

        <FormField>
          <input
            id="age"
            type={"number"}
            min={"0"}
            placeholder="Idade"
            required
            onChange={({ target }) => idade.current = target.value}
          />
        </FormField>

        <Button type="submit">Iniciar</Button>
      </FormContainer>

      <CirclesContainer>
        <RowBetween>
          <Circle css={{ backgroundColor: "red" }}>Q</Circle>
          <Circle css={{ backgroundColor: "green" }}>P</Circle>
        </RowBetween>

        <RowCenter>
          {reactionTimes.length === 10 ? (
            <FinishContainer>
              <span><b>{"Média: "}</b>{getAverage()}</span>
              <Button onClick={endSession}>
                Finalizar
              </Button>
            </FinishContainer>
          ) : (
            <ResultContent css={{ color: colorsObject[currentColor as keyof Colors] || "black" }}>{currentColor || "Cor que deverá clicar"}</ResultContent>
          )}
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
