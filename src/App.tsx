import React from "react";
import styled from "styled-components";
import Main from "./pages/Main";

function App() {
  return (
    <Container className="App">
      <Main />
    </Container>
  );
}

const Container = styled.div`
  min-width: 900px;
  max-width: 1200px;
  margin: 0 auto;
`;

export default App;
