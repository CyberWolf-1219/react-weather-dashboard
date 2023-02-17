import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import Chip from "../Chip/Chip";

import thermostatIcon from "../../assets/thermometer-celsius.svg";
import windIcon from "../../assets/wind.svg";
import humidityIcon from "../../assets/humidity.svg";
import uvIcon from "../../assets/uv-index.svg";

import { icons } from "../../assets";

interface IWeatherForecastCard {
  date: string;
  conditionCode: number;
  temp: number;
  humidity: number;
  uvIndex: number;
  windSpeed: number;
}

function WeatherForecastCard(props: IWeatherForecastCard) {
  const [icon, setIcon] = useState("");

  useEffect(() => {
    const conditionIconArray = icons[props.conditionCode];
    setIcon(conditionIconArray[0]);
  }, []);

  return (
    <Card
      width="full"
      height="fit"
      classes="grow shrink gap-2 flex flex-col items-center justify-start"
    >
      <h1 className="font-bold text-white">{props.date}</h1>
      <hr className="w-full h-fit border-[0.5px] border-white/50" />
      <div className="w-full h-fit flex flex-row items-center justify-start gap-4">
        {/* ICON */}
        <div>
          <picture>
            <img src={icon} className="aspect-[1/1] w-[100px] h-auto" />
          </picture>
        </div>
        {/* DATA */}
        <div className="w-full h-fit flex flex-row items-start justify-center gap-2 flex-wrap">
          {/* TEMPARATURE */}
          <Chip>
            <b className="text-black">{props.temp}</b>
            <img
              src={thermostatIcon}
              alt=""
              className="aspect-[1/1] w-[30px] h-auto object-cover"
            />
          </Chip>
          {/* HUMIDITY */}
          <Chip>
            <b className="text-black">{props.humidity}</b>
            <img
              src={humidityIcon}
              alt=""
              className="aspect-[1/1] w-[30px] h-auto object-cover"
            />
          </Chip>
          {/* UV INDEX */}
          <Chip>
            <b className="text-black">{props.uvIndex}</b>
            <img
              src={uvIcon}
              alt=""
              className="aspect-[1/1] w-[30px] h-auto object-cover"
            />
          </Chip>
          {/* WIND FLOW SPEED */}
          <Chip>
            <b className="text-black">{props.windSpeed}Kph</b>
            <img
              src={windIcon}
              alt=""
              className="aspect-[1/1] w-[30px] h-auto object-cover"
            />
          </Chip>
        </div>
      </div>
    </Card>
  );
}

export default WeatherForecastCard;
