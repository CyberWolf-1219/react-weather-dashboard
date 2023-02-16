import React from "react";
import Card from "../Card/Card";
import Chip from "../Chip/Chip";

import thermostatIcon from "../../assets/thermometer-celsius.svg";
import windIcon from "../../assets/wind.svg";
import humidityIcon from "../../assets/humidity.svg";
import uvIcon from "../../assets/uv-index.svg";
import windsockIcon from "../../assets/windsock.svg";

interface IWeatherCard {
  icon: string;
  temp: string;
  windDir: string;
  windSpeed: number;
  humidity: number;
  uvIndex: number;
}

function CurrentWeatherCard(props: IWeatherCard) {
  return (
    <Card
      width="full"
      height="full"
      classes="h-[60%] grow shrink flex flex-col items-center justify-start gap-2 "
    >
      <h1 className="font-bold text-white">TODAY</h1>
      {/* ICON */}
      <div>
        <picture>
          <img src={props.icon} className="aspect-[1/1] w-[100px] h-auto" />
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
        {/* WIND DIR */}
        <Chip>
          <b className="text-black">{props.windDir}</b>
          <img
            src={windsockIcon}
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
    </Card>
  );
}

export default CurrentWeatherCard;
