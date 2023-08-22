import { useEffect } from "react";
import ReactGA from "react-ga4";

type Props = {
  title: string;
};

function useSendAnalytics({ title }: Props) {
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname,
      title: title,
    });
  }, [title]);
}

export default useSendAnalytics;
