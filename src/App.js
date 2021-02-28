import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeSearch from "./homeSearch";
import SearchResults from "./searchResRecipes";
import Recipe from "./recipe";
import Test from "./test";

function App() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <HomeSearch />
                        <SearchResults />
                        {/* <Test /> */}
                    </Route>
                    <Route
                        path="/recipe/:id"
                        render={(props) => (
                            <Recipe
                                match={props.match}
                                history={props.history}
                                key={props.match.url}
                            />
                        )}
                    />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
