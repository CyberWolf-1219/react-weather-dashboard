import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import thermostatIcon from "../../assets/thermometer-celsius.svg";
import windIcon from "../../assets/wind.svg";
import humidityIcon from "../../assets/humidity.svg";
import uvIcon from "../../assets/uv-index.svg";
import windsockIcon from "../../assets/windsock.svg";

let lngLat = "";

navigator.geolocation.getCurrentPosition((position) => {
  lngLat = `${position.coords.latitude},${position.coords.longitude}`;
  console.log(lngLat);
});

function WeatherDisplay() {
  const [icon, setIcon] = useState<string>();
  const [forecastIcon, setForecastIcon] = useState<string>();
  const [today, tomorrow] = useFetch(lngLat);

  useEffect(() => {
    console.log(today);
    console.log(tomorrow);
    setIcon(today?.condition.icon);
    setForecastIcon(tomorrow?.day.condition.icon);
  }, [today, tomorrow]);

  return (
    <div className="grow shrink basis-[30%] w-full h-full p-4 flex flex-col items-center justify-start gap-4 border-2 border-red-500 bg-white/30 rounded-lg">
      {/* TODAY */}
      <div className="grow shrink basis-[50%] w-full h-full p-4 flex flex-col items-center justify-start gap-2 bg-white rounded-lg">
        <h1 className="font-bold text-black">TODAY</h1>
        {/* ICON */}
        <div>
          <picture>
            <img src={icon} className="aspect-[1/1] w-[100px] h-auto" />
          </picture>
        </div>
        {/* DATA */}
        <div className="w-full h-fit flex flex-row items-start justify-center gap-2 flex-wrap">
          {/* TEMPARATURE */}
          <div className="w-fit h-fit px-3 py-1 flex flex-row items-center justify-center gap-0 bg-gray-100 rounded-full ">
            <b className="text-black">{today?.temp_c}</b>
            <img
              src={thermostatIcon}
              alt=""
              className="aspect-[1/1] w-[30px] h-auto object-cover"
            />
          </div>
          {/* WIND DIR */}
          <div className="w-fit h-fit px-3 py-1 flex flex-row items-center justify-center gap-0 bg-gray-100 rounded-full ">
            <b className="text-black">{today?.wind_dir}</b>
            <img
              src={windsockIcon}
              alt=""
              className="aspect-[1/1] w-[30px] h-auto object-cover"
            />
          </div>
          {/* HUMIDITY */}
          <div className="w-fit h-fit px-3 py-1 flex flex-row items-center justify-center gap-0 bg-gray-100 rounded-full ">
            <b className="text-black">{today?.humidity}</b>
            <img
              src={humidityIcon}
              alt=""
              className="aspect-[1/1] w-[30px] h-auto object-cover"
            />
          </div>
          {/* UV INDEX */}
          <div className="w-fit h-fit px-3 py-1 flex flex-row items-center justify-center gap-0 bg-gray-100 rounded-full ">
            <b className="text-black">{today?.uv}</b>
            <img
              src={uvIcon}
              alt=""
              className="aspect-[1/1] w-[30px] h-auto object-cover"
            />
          </div>
          {/* WIND FLOW SPEED */}
          <div className="w-fit h-fit px-3 py-1 flex flex-row items-center justify-center gap-0 bg-gray-100 rounded-full ">
            <b className="text-black">{today?.wind_kph}Kmph</b>
            <img
              src={windIcon}
              alt=""
              className="aspect-[1/1] w-[30px] h-auto object-cover"
            />
          </div>
        </div>
      </div>
      {/* TOMMOROW */}
      <div className="grow shrink basis-[50%] w-full h-full p-4 flex flex-col items-center justify-start gap-2 bg-white rounded-lg">
        <h1 className="font-bold text-black">TOMORROW</h1>
        {/* ICON */}
        <div>
          <picture>
            <img src={forecastIcon} className="aspect-[1/1] w-[100px] h-auto" />
          </picture>
        </div>
        {/* DATA */}
        <div className="w-full h-fit flex flex-row items-start justify-center gap-2 flex-wrap">
          {/* TEMPARATURE */}
          <div className="w-fit h-fit px-3 py-1 flex flex-row items-center justify-center gap-0 bg-gray-100 rounded-full ">
            <b className="text-black">{tomorrow?.day.avgtemp_c}</b>
            <img
              src={thermostatIcon}
              alt=""
              className="aspect-[1/1] w-[30px] h-auto object-cover"
            />
          </div>
          {/* HUMIDITY */}
          <div className="w-fit h-fit px-3 py-1 flex flex-row items-center justify-center gap-0 bg-gray-100 rounded-full ">
            <b className="text-black">{tomorrow?.day.avghumidity}</b>
            <img
              src={humidityIcon}
              alt=""
              className="aspect-[1/1] w-[30px] h-auto object-cover"
            />
          </div>
          {/* UV INDEX */}
          <div className="w-fit h-fit px-3 py-1 flex flex-row items-center justify-center gap-0 bg-gray-100 rounded-full ">
            <b className="text-black">{tomorrow?.day.uv}</b>
            <img
              src={uvIcon}
              alt=""
              className="aspect-[1/1] w-[30px] h-auto object-cover"
            />
          </div>
          {/* WIND FLOW SPEED */}
          <div className="w-fit h-fit px-3 py-1 flex flex-row items-center justify-center gap-0 bg-gray-100 rounded-full ">
            <b className="text-black">{tomorrow?.day.maxwind_kph}Kmph</b>
            <img
              src={windIcon}
              alt=""
              className="aspect-[1/1] w-[30px] h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherDisplay;
