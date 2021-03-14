import "./App.css";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeFilter from "./components/HomeFilter";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route
            path="/launches/limit=:limit/launch_success=:launchquery/land_success=:landquery/launch_year=:lyear"
            render={(props) => {
              const launchquery = props.match.params.launchquery;
              const limit = props.match.params.limit;
              const lyear = props.match.params.lyear
                ? props.match.params.lyear
                : 2020;
              const landquery = props.match.params.landquery;

              return (
                <HomeFilter
                  query={{
                    limit,
                    launchquery,
                    lyear,
                    landquery,
                  }}
                />
              );
            }}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
