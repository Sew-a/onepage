import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Main } from "./components/pages/Main";
import { Home } from "./components/pages/Home";
import { Roster } from "./components/pages/Roster";
import Api from "./components/pages/Api";

function App() {
  return (
    <Router>
      <Main />
      <div className="main-app">
        <Switch>
          <Route exact path={"/"} component={Home} />
          <Route path={"/roster"} component={Roster} />
          <Route path={"/api"} component={Api} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
