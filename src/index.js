import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer } from "./redux/reducers";
import { Provider } from "react-redux";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

ReactDOM.render(
    // <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>,
    // </React.StrictMode>,
    document.getElementById("root")
);
