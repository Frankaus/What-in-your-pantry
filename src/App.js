import { BrowserRouter as Router} from "react-router-dom";
import HomeSearch from "./homeSearch";

function App() {

    return (
        <Router>
            <div>
                <HomeSearch />
            </div>
        </Router>
    );
}

export default App;
