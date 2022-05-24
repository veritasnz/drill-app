import Head from "next/head";
import type { AppProps } from "next/app";

import "../src/styles/normalize.global.scss";
import "../src/styles/base.global.scss";

import StatsContextProvider from "../src/context/StatsContextProvider";
import SettingsContextProvider from "../src/context/SettingsContextProvider";
import ProgressContextProvider from "../src/context/ProgressContextProvider";

import Header from "../src/components/PageLayout/Header";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <StatsContextProvider>
            <SettingsContextProvider>
                <ProgressContextProvider>
                    <Head>
                        <title>Wonideto</title>
                        <meta
                            name="description"
                            content="A Japanese particle practicing app, developed by Sean Veritas"
                        />
                        <link rel="icon" href="img/favicon.svg" />
                    </Head>
                    <Header />
                    <main>
                        <Component {...pageProps} />
                    </main>
                </ProgressContextProvider>
            </SettingsContextProvider>
        </StatsContextProvider>
    );
}

export default MyApp;
