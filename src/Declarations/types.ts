export type condition =
  | "Sunny"
  | "Clear"
  | "Partly cloudy"
  | "Cloudy"
  | "Overcast"
  | "Mist"
  | "Patchy rain possible"
  | "Patchy snow possible"
  | "Patchy sleet possible"
  | "Patchy freezing drizzle possible"
  | "Thundery outbreaks possible"
  | "Blowing snow"
  | "Blizzard"
  | "Fog"
  | "Freezing fog"
  | "Patchy light drizzle"
  | "Light drizzle"
  | "Freezing drizzle"
  | "Heavy freezing drizzle"
  | "Patchy light rain"
  | "Light rain"
  | "Moderate rain at times"
  | "Moderate rain"
  | "Heavy rain at times"
  | "Heavy rain"
  | "Light freezing rain"
  | "Moderate or heavy freezing rain"
  | "Light sleet"
  | "Moderate or heavy sleet"
  | "Patchy light snow"
  | "Light snow"
  | "Patchy moderate snow"
  | "Moderate snow"
  | "Patchy heavy snow"
  | "Heavy snow"
  | "Ice pellets"
  | "Light rain shower"
  | "Moderate or heavy rain shower"
  | "Torrential rain shower"
  | "Light sleet showers"
  | "Moderate or heavy sleet showers"
  | "Light snow showers"
  | "Moderate or heavy snow showers"
  | "Light showers of ice pellets"
  | "Moderate or heavy showers of ice pellets"
  | "Patchy light rain with thunder"
  | "Moderate or heavy rain with thunder"
  | "Patchy light snow with thunder"
  | "Moderate or heavy snow with thunder";

export type WeatherDataPacket = {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  current: {
    last_updated: string;
    temp_c: string;
    is_day: 1 | 0;
    condition: {
      text: condition;
      icon: string;
      code: number;
    };
    wind_kph: number;
    wind_dir:
      | "N"
      | "S"
      | "E"
      | "W"
      | "NE"
      | "SE"
      | "SW"
      | "NW"
      | "NNE"
      | "ENE"
      | "ESE"
      | "SSE"
      | "SSW"
      | "WSW"
      | "WNW"
      | "NNW";
    humidity: number;
    cloud: number;
    feelslike_c: number;
    uv: number;
  };
  forecast: {
    forecastday: [
      {
        date: string;
        day: {
          avgtemp_c: 23.8;
          maxwind_kph: 12.2;
          totalsnow_cm: 0;
          avghumidity: 74;
          daily_chance_of_rain: 0;
          daily_chance_of_snow: 0;
          condition: {
            text: "Sunny";
            icon: "//cdn.weatherapi.com/weather/64x64/day/113.png";
            code: 1000;
          };
          uv: 6;
        };
        astro: {
          sunrise: "06:27 AM";
          sunset: "06:17 PM";
          moonrise: "No moonrise";
          moonset: "11:29 AM";
          moon_phase: "Last Quarter";
          moon_illumination: "57";
          is_moon_up: 1;
          is_sun_up: 0;
        };
        hour: Array<object>;
      }
    ];
  };
};

export type TodayWheatherData = {
  last_updated: string;
  temp_c: string;
  is_day: 1 | 0;
  condition: {
    text: condition;
    icon: string;
    code: number;
  };
  wind_kph: number;
  wind_dir:
    | "N"
    | "S"
    | "E"
    | "W"
    | "NE"
    | "SE"
    | "SW"
    | "NW"
    | "NNE"
    | "ENE"
    | "ESE"
    | "SSE"
    | "SSW"
    | "WSW"
    | "WNW"
    | "NNW";
  humidity: number;
  cloud: number;
  feelslike_c: number;
  uv: number;
};

export type WeatherForecastData = {
  date: string;
  day: {
    avgtemp_c: number;
    maxwind_kph: number;
    totalsnow_cm: number;
    avghumidity: number;
    daily_chance_of_rain: number;
    daily_chance_of_snow: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    uv: number;
  };
  astro: {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moon_phase: string;
    moon_illumination: string;
    is_moon_up: 1 | 0;
    is_sun_up: 1 | 0;
  };
  hour: Array<Object>;
};
