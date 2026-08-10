import "../styles/globals.scss";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../createEmotionCache";
import theme from "../theme";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
  } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title key="title">2081 BSc. CSIT</title>

        <meta
          key="og:title"
          property="og:title"
          content="2081 BSc. CSIT"
        />
        <meta
          key="og:description"
          property="og:description"
          content="CSIT21 is a comprehensive platform offering study materials, classroom routines, exam schedules, front page generator, and more for CSIT students."
        />
        <meta
          key="og:url"
          property="og:url"
          content="https://csit2081.vercel.app/"
        />

        {/* PWA primary color */}
        <meta
          key="theme-color"
          name="theme-color"
          content={theme.palette.primary.main}
        />
        <link
          rel="shortcut icon"
          href="/static/favicon/favicon.ico"
        />
        <meta name="emotion-insertion-point" content="" />
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="description"
          content="CSIT21 is a comprehensive platform built specifically for our class offering study materials, classroom routines, exam schedules, front page generator, and more."
        />
        <meta property="og:type" content="website" />
        <meta property="fb:app_id" content="1265498347173300" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/static/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/static/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/static/favicon/favicon-16x16.png"
        />
        <link
          rel="mask-icon"
          href="/static/favicon/safari-pinned-tab.svg"
          color={theme.palette.primary.main}
        />
        <meta name="msapplication-TileColor" content="#fbddeb" />

        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta
          name="mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="mobile-web-app-title" content="CSIT21" />
        <meta name="mobile-web-app-capable" content="yes" />

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
