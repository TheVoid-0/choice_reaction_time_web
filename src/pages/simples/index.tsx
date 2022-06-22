import { NextPage } from "next";
import { useCallback, useEffect, useRef, useState } from "react";
import { styled } from "../../../stitches.config";

const Wrapper = styled("div", {
  height: "100vh",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const Title = styled("span", {
  fontSize: "50px",
  fontWeight: "bold",
  color: "#0E0E0E",
  position: "absolute",
  top: "0px",
  padding: "8px 16px",
  textAlign: "center",
});

const Button = styled("button", {
  all: "unset",
  height: "200px",
  width: "200px",
  cursor: "pointer",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#F4F4F4",
  fontSize: "28px",
  fontWeight: "bold",
});

const ReactionList = styled("div", {
  position: "absolute",
  top: "8px",
  right: "8px",
  display: "flex",
  flexDirection: "column",
});

const Reaction = styled("div", {
  padding: "8px 16px",
});

const Simple: NextPage = () => {
  const [start, setStart] = useState<number>(0);
  const [isStarted, setIsStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [counterStarted, setCounterStarted] = useState(false);

  const [reactionTimes, setReactionTimes] = useState<number[]>([]);

  const startTimer = () => {
    setStart(Date.now());
    setCounterStarted(true);
  }

  const startCountdown = () => {
    if (isStarted) return;

    setIsStarted(true);
    const random = Math.floor(Math.random() * (5 - 2)) + 2;
    setTimeout(() => {
      startTimer();
    }, random * 1000);
  }

  const stopTimer = () => {
    setCounterStarted(false);
    reactionTimes.push(Date.now() - start);

    setTimeout(() => {
      setIsStarted(false);
    }, 400);
  }

  useEffect(() => {
    if (reactionTimes.length === 5) {
      setFinished(true);
    }
  }, [reactionTimes, reactionTimes.length])

  return (
    <Wrapper>
      <Title>Tempo de Reação Simples</Title>
      <Button
        css={{ backgroundColor: counterStarted ? "#38b000" : "#FF3C38" }}
        onClick={counterStarted ? stopTimer : startCountdown}
      >
        {!isStarted && "INICIAR"}
      </Button>
      <ReactionList>
        {reactionTimes.map((reaction, index) => (
          <Reaction key={index}>{`${reaction / 1000}ms`}</Reaction>
        ))}
      </ReactionList>
    </Wrapper>
  );
}
export default Simple;
