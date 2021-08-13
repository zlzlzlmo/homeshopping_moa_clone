import React from "react";
import styled from "styled-components";
import Main from "./pages/Main";

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
