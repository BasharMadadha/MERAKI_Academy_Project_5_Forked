import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import { Provider } from 'react-redux';
import store from './components/store';

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
  </Router>
);
