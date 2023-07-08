import React, { useEffect, useState } from "react";
import { useGetWakeUpServerQuery } from "../state/api";

const FreeHostingServerWakeUpAlarm = () => {
  const [message, setMessage] = useState("Ringing .. ");

const {data} = useGetWakeUpServerQuery()

console.log('data')
  return <div>{message}</div>;
};

export default FreeHostingServerWakeUpAlarm;
