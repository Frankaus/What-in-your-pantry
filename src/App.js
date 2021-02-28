import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeSearch from "./homeSearch";
import SearchResults from "./searchResults";
import Recipe from "./recipe";
import Test from "./test";

function App() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <div className=" border-black border-2">
                            <HomeSearch />
                        </div>
                        <div>
                            <SearchResults />
                        </div>
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
