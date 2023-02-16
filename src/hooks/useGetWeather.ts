import React, { useEffect, useState } from "react";

import {
  TodayWheatherData,
  WeatherDataPacket,
  WeatherForecastData,
} from "../Declarations/types";

function useGetWeather(
  userCoords: Array<number>
): [today: TodayWheatherData, forecasts: Array<WeatherForecastData>] {
  const [today, setToday] = useState<TodayWheatherData>();
  const [forecasts, setForecasts] = useState<Array<WeatherForecastData>>([]);

  useEffect(() => {
    getData();
    setInterval(() => {
      console.log("SETTING INTERVAL...");
      getData();
    }, 1000 * 60 * 60);
  }, [userCoords]);

  async function getData() {
    const URI = `https://api.weatherapi.com/v1/forecast.json?key=a45b31f57de748bc90a10746231302&q=${userCoords[0]},${userCoords[1]}&days=2&aqi=no&alerts=no`;

    const response = await fetch(URI);
    const jsonObj = (await response.json()) as WeatherDataPacket;
    setToday(jsonObj.current);
    setForecasts(jsonObj.forecast.forecastday);
  }

  return [today as TodayWheatherData, forecasts as Array<WeatherForecastData>];
}

export default useGetWeather;
