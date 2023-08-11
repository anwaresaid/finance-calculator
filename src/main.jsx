import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import rootReducer from "./store/Reducers.jsx";

const store = createStore(rootReducer, applyMiddleware(thunk));
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
