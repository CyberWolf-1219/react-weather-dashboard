import React, { useEffect, useState } from "react";

import {
  TodayWheatherData,
  WeatherDataPacket,
  WeatherForecastData,
} from "../Declarations/types";

const URI =
  "https://api.weatherapi.com/v1/forecast.json?key=a45b31f57de748bc90a10746231302&q=Anuradhapura&days=1&aqi=no&alerts=no";

function useFetch(
  CityName: string
): [today: TodayWheatherData, tomorrow: WeatherForecastData] {
  const [today, setToday] = useState<TodayWheatherData>();
  const [tomorrow, setTomorrow] = useState<WeatherForecastData>();

  useEffect(() => {
    getData();

    setInterval(() => {
      getData();
    }, 1000 * 60 * 60);
  }, []);

  async function getData() {
    const response = await fetch(URI);
    const jsonObj = (await response.json()) as WeatherDataPacket;
    setToday(jsonObj.current);
    setTomorrow(jsonObj.forecast.forecastday[0]);
  }

  return [today as TodayWheatherData, tomorrow as WeatherForecastData];
}

export default useFetch;
