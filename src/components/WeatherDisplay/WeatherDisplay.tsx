import React, { useEffect, useState } from "react";

import CurrentWeatherCard from "../CurrentWeatherCard/CurrentWeatherCard";
import useGetWeather from "../../hooks/useGetWeather";
import WeatherForecastCard from "../WeatherFoercastCard/WeatherForecastCard";

import { icons } from "../../assets";

let lngLat: Array<number> = [];
navigator.geolocation.getCurrentPosition((position) => {
  lngLat.push(position.coords.latitude);
  lngLat.push(position.coords.longitude);
});

function WeatherDisplay() {
  const [icon, setIcon] = useState<string>();
  const [today, forecasts] = useGetWeather(lngLat);

  useEffect(() => {
    const conditionCode = today?.condition.code;

    if (conditionCode) {
      const conditionIconsArray = icons[conditionCode];
      if (today?.is_day) {
        setIcon(conditionIconsArray[0]);
      } else {
        setIcon(conditionIconsArray[1]);
      }
    }
  }, [today, forecasts]);

  return (
    <div className="grow shrink basis-[30%] w-full h-full p-4 flex flex-col items-center justify-start gap-4 bg-transparent rounded-lg">
      {/* TODAY */}
      <CurrentWeatherCard
        icon={icon!}
        condition={today?.condition.text}
        temp={today?.temp_c ?? ""}
        humidity={today?.humidity ?? ""}
        uvIndex={today?.uv ?? ""}
        windSpeed={today?.wind_kph ?? ""}
        windDir={today?.wind_dir ?? ""}
      />
      {/* TOMMOROW */}
      {forecasts.map((forecastObj) => {
        return (
          <WeatherForecastCard
            key={`$weatherForecast_${Math.random()}`}
            date={forecastObj.date}
            conditionCode={forecastObj.day.condition.code}
            temp={forecastObj.day.avgtemp_c}
            humidity={forecastObj.day.avghumidity}
            uvIndex={forecastObj.day.uv}
            windSpeed={forecastObj.day.maxwind_kph}
          />
        );
      })}
    </div>
  );
}

export default WeatherDisplay;
