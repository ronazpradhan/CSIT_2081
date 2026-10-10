import "../styles/globals.scss";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../createEmotionCache";
import theme, { fontClassNames } from "../theme";
import { useEffect } from "react";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
  } = props;

  // Expose font CSS variables on <html> so portals (menus, dialogs) inherit them too.
  useEffect(() => {
    document.documentElement.classList.add(...fontClassNames.split(" "));
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title key="title">CSIT 2081 · Syllabus, exams and front pages</title>

        <meta
          key="og:title"
          property="og:title"
          content="CSIT 2081 · Syllabus, exams and front pages"
        />
        <meta
          key="og:description"
          property="og:description"
          content="Subjects and syllabus, exam countdowns, and an assignment front page generator for the 2081 BSc. CSIT batch."
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
          content={theme.palette.background.default}
        />
        <link rel="icon" type="image/svg+xml" href="/static/favicon/logo.svg?v=2" />
        <link
          rel="shortcut icon"
          href="/static/favicon/favicon.ico?v=2"
        />
        <meta name="emotion-insertion-point" content="" />
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="description"
          content="Subjects and syllabus, exam countdowns, and an assignment front page generator for the 2081 BSc. CSIT batch."
        />
        <meta property="og:type" content="website" />
        <meta property="fb:app_id" content="1265498347173300" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/static/favicon/apple-touch-icon.png?v=2"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/static/favicon/favicon-32x32.png?v=2"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/static/favicon/favicon-16x16.png?v=2"
        />
        <link
          rel="mask-icon"
          href="/static/favicon/safari-pinned-tab.svg?v=2"
          color="#a32a17"
        />
        <meta name="msapplication-TileColor" content="#a32a17" />

        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta
          name="mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="mobile-web-app-title" content="CSIT 2081" />
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
