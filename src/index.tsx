import "./assets/scss/style.scss"

import * as React from "react";
import {createRoot} from "react-dom/client"
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { App } from "./assets/components/App"
import { store } from "./assets/stores/store";


const container: HTMLElement | null = document.getElementById("root")
const root = createRoot(container)

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);