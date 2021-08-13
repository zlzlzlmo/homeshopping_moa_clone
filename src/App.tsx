import React, { useEffect } from "react";
import styled from "styled-components";
import Main from "./pages/Main";
import axios from "axios";
import cheerio from "cheerio";
function App() {
  return (
    <Container>
      <Main />
    </Container>
  );
}

const Container = styled.div`
  padding-top: 76px;
`;
export default App;
