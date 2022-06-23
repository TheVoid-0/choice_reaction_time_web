import axios from "axios";
import { NextPage } from "next";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { styled } from "../../../stitches.config";

const Wrapper = styled("div", {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const FormContainer = styled("form", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: "8px",
  padding: "32px 48px",
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

const ListWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "16px",
  width: "100%",
  maxWidth: "fit-content",
  paddingBottom: "32px"
});

const ListItem = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

const ItemTitle = styled("span", {
  fontSize: "22px",
});

const ItemContent = styled("ul", {
  all: "unset",
});

const Attempt = styled("li", {
  all: "unset",
  borderRadius: "6px",
  boxShadow: "0px 2px 6px 0px #45454599",
  padding: "8px 16px",
})

interface SessionType {
  id: string;
  name: string;
}

const Buscar: NextPage = () => {
  const email = useRef<string>("");
  const [sessions, setSessions] = useState<SessionType[]>([]);

  const handleSearch = (ev: FormEvent) => {
    ev.preventDefault();
    setSessions([])
    axios.get(`${process.env.NEXT_PUBLIC_CHOICE_REACTION_API}/users`, { params: { email: email.current } }).then(({ data }) => {
      console.log("sessoes", data);
      data.sessions.forEach((session: { id: string, name: string }) => {
        console.log(session)
        setSessions((prevState) => [...prevState, {
          id: session.id,
          name: session.name,
        }]);
      })
    }).catch((error) => {
      console.log(error);
    })
  };

  const getSessionAttempts = async (sessionId: string) => {
    const attempts: Record<string, {
      id: string
      results: string
      testSessionId: string
      userId: string;
      avg: number
    }> = {};
    await axios.get(`${process.env.NEXT_PUBLIC_CHOICE_REACTION_API}/test-sessions/${sessionId}`).then(({ data }) => {
      Object.entries(data.testAttempts).map(([idade, tentativas]: [string, any]) => {
        attempts[idade] = tentativas;
      })
    });

    console.log(JSON.parse(attempts[22].results))

    return (
      <React.Fragment>
        {Object.entries(attempts).map(([idade, tentativas], index) => (
          <Attempt key={index}>
            <b>Idade:</b><span>{idade}</span>
            <span>Tentativas</span>
            <ul>
            </ul>
          </Attempt>
        ))}
      </React.Fragment>
    )
  }

  useEffect(() => {
    console.log(sessions.length);
  }, [sessions.length])

  return (
    <Wrapper>
      <FormContainer onSubmit={handleSearch}>
        <FormField>
          <input
            id="email"
            placeholder="Email"
            type="email"
            required
            onChange={({ target }) => email.current = target.value}
          />
        </FormField>

        <Button type="submit">
          Buscar
        </Button>
      </FormContainer>

      {sessions.length > 0 && (
        <ListWrapper>
          <h2>Resultados</h2>
          {sessions.map((session, index) => (
            <ListItem key={index}>
              <ItemTitle>{session.name}</ItemTitle>
              <ItemContent>
                {getSessionAttempts(session.id)}
              </ItemContent>
            </ListItem>
          ))}
        </ListWrapper>
      )}
    </Wrapper>
  );
};
export default Buscar;