import App from "next/app";
import { elementType, object } from "prop-types";
import "../styles/globals.css";
import LayoutWrapper from "../components/layout";

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: {
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}),
      },
    };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <LayoutWrapper {...pageProps}>
        <Component {...pageProps} />
      </LayoutWrapper>
    );
  }
}

MyApp.propTypes = {
  Component: elementType.isRequired,
  pageProps: object.isRequired,
};