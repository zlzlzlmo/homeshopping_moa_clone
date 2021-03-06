import styled from "styled-components";
import Main from "./pages/Main";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Container>
        <Switch>
          <Route exact path="/" component={Main} />
        </Switch>
      </Container>
    </Router>
  );
}

const Container = styled.div`
  padding-top: 76px;
`;
export default App;
