import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Main from "./component/Main";
import Update from "./component/Update";
import { InfoProvider } from "./AppContext";

function App() {
  return (
    <InfoProvider>
      <Router>
        <Container className="App" fluid>
          <Routes>
            <Route exact path="/college-money-tracker" element={<Main />} />
            <Route
              exact
              path="/college-money-tracker/update"
              element={<Update />}
            />
          </Routes>
        </Container>
      </Router>
    </InfoProvider>
  );
}

export default App;
