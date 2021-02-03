import React, { useEffect } from "react";
import ReactGA from "react-ga";
import { GA_TAG } from "./config";

// send GA events only on production build, not in dev
if (process.env.NODE_ENV === "production") {
  ReactGA.initialize(GA_TAG);
} else {
  ReactGA.initialize(GA_TAG, { testMode: true });
}

const withTracker = (WrappedComponent, options = {}) => {
  const trackPage = (page) => {
    ReactGA.set({
      page,
      ...options,
    });
    ReactGA.pageview(page);
  };

  const HOC = (props) => {
    useEffect(() => trackPage(props.location.pathname), [
      props.location.pathname,
    ]);

    return <WrappedComponent {...props} />;
  };

  return HOC;
};

export default withTracker;
