import type { AppProps } from "next/app";

import { WindowResizeProvider } from "@/shared/context/WindowResizeProvider";

import "@/shared/styles/global.scss";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-blue/theme.css";

function App({ Component, ...rest }: AppProps) {
    return (
        <WindowResizeProvider>
            <Component {...rest.pageProps} />
        </WindowResizeProvider>
    );
}

export default App;
