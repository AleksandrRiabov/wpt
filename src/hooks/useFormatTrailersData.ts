import { useMemo } from "react";
import { GetTrailersDataResponse } from "../state/types";
import { format, parse } from "date-fns";

const useFormatTrailersData = (data: GetTrailersDataResponse[] | undefined) => {
  const formatedData = useMemo(() => {
    return data?.map((trailer) => {
      const shortSentDate = trailer.sentDate
        ? format(new Date(trailer.sentDate), "dd-MM-yy")
        : "";
      // const shortDeliveryDate = trailer.deliveryDate ? format(new Date(trailer.deliveryDate), "dd-MM-yy") : "";
      const sent = `${format(
        parse(shortSentDate, "dd-MM-yyyy", new Date()),
        "EE"
      )} ${shortSentDate}`;
      // const delivery = `${format(parse(shortDeliveryDate, "dd-MM-yyyy", new Date()), "EEE")} ${shortDeliveryDate}`;

      return {
        ...trailer,
        sentDate: sent,
        // deliveryDate: delivery,
      };
    });
  }, [data]);

  return formatedData;
};

export default useFormatTrailersData;
