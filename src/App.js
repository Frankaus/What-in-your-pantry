import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeSearch from "./homeSearch";
import SearchResults from "./searchResults";
import Recipe from "./recipe";
import Header from "./header";
import Comments from "./comments";

function App() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <div>
                            <HomeSearch />
                        </div>
                        <div>
                            <SearchResults />
                        </div>
                    </Route>
                    <Route
                        path="/recipe/:id"
                        render={(props) => (
                            <div>
                                <Header />
                                <Recipe
                                    match={props.match}
                                    history={props.history}
                                    key={props.match.url}
                            
                                />
                            </div>
                        )}
                    />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
