import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";

import { ToastContextProvider } from "@/shared/context";
import { WindowResizeProvider } from "@/shared/context/WindowResizeProvider";

import "@/shared/styles/global.scss";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-blue/theme.css";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
        },
    },
});
function App({ Component, ...rest }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <WindowResizeProvider>
                <ToastContextProvider>
                    <Component {...rest.pageProps} />
                </ToastContextProvider>
            </WindowResizeProvider>
        </QueryClientProvider>
    );
}

export default App;
