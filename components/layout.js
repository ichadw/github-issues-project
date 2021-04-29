import React from "react";
import Head from "next/head";
import Link from "@material-ui/core/Link";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { useLayoutStyles } from "./styles";

const Layout = (props) => {
  const classes = useLayoutStyles();

  return (
    <>
      <Head>
        <title>Angular Github Issues</title>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
        <Link color="inherit" href={"/"}>
          <Typography variant="h6">Angular Github Issues</Typography>
        </Link>
        </AppBar>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {props.children}
        </main>
      </div>
    </>
  );
};

export default Layout;
