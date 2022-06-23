import { styled } from "../../stitches.config";

export const PageWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  height: "100vh",
});

export const Header = styled("section", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "16px 48px",
  gap: "12px",

  h2: {
    margin: 0,
  }
});