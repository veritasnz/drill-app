import Head from "next/head";
import type { AppProps } from "next/app";

import "../styles/normalize.global.scss";
import "../styles/base.global.scss";

import StatsContextProvider from "../context/StatsContextProvider";
import SettingsContextProvider from "../context/SettingsContextProvider";
import ProgressContextProvider from "../context/ProgressContextProvider";

import Header from "../components/PageLayout/Header";

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
