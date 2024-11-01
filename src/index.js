import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import reportWebVitals from "./reportWebVitals.js";
import { ChakraProvider, createSystem, defineConfig } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
const config = defineConfig({
  theme: {
    tokens: {
      colors: {},
    },
  },
});
const system = createSystem(config);
root.render(
  <React.StrictMode>
    <ChakraProvider value={system}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
