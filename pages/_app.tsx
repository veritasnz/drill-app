import Head from "next/head";
import type { AppProps } from "next/app";

import "../src/styles/normalize.global.scss";
import "../src/styles/base.global.scss";

import StatsContextProvider from "../src/context/StatsContextProvider";
import SettingsContextProvider from "../src/context/SettingsContextProvider";
import ProgressContextProvider from "../src/context/ProgressContextProvider";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <StatsContextProvider>
            <SettingsContextProvider>
                <ProgressContextProvider>
                    <Head>
                        <title>Wonideto</title>
                        <meta
                            name="description"
                            content="A particle practicing app developed by Sean Veritas"
                        />
                        <link rel="icon" href="/favicon.png" />
                    </Head>
                    <Component {...pageProps} />
                </ProgressContextProvider>
            </SettingsContextProvider>
        </StatsContextProvider>
    );
}

export default MyApp;
