import { useEffect, useState } from "react";

function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}

async function getWeather(location) {
  try {
    // 1) Getting location (geocoding)
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
    );
    const geoData = await geoRes.json();
    console.log(geoData);

    if (!geoData.results) throw new Error("Location not found");

    const { latitude, longitude, timezone, name, country_code } =
      geoData.results.at(0);
    console.log(`${name} ${convertToFlag(country_code)}`);

    // 2) Getting actual weather
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
    );
    const weatherData = await weatherRes.json();
    console.log(weatherData.daily);
  } catch (err) {
    console.err(err);
  }
}

function App() {
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [displayLocation, setDisplayLocation] = useState("");
  const [weather, setWeather] = useState({});

  useEffect(() => {
    setLocation(localStorage.getItem("location") || "");
  }, []);

  useEffect(() => {
    if (location.length < 2) return;
    async function fetchWeather() {
      try {
        setIsLoading(true);
        // 1) Getting location (geocoding)
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
        );
        const geoData = await geoRes.json();
        if (!geoData.results) throw new Error("Location not found");

        const { latitude, longitude, timezone, name, country_code } =
          geoData.results.at(0);
        setDisplayLocation(`${name} ${convertToFlag(country_code)}`);

        // 2) Getting actual weather
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
        );
        const weatherData = await weatherRes.json();
        console.log(weatherData.daily);

        // Check if weatherData.daily contains the required properties
        if (weatherData.daily && weatherData.daily.time) {
          setWeather(weatherData.daily);
        } else {
          throw new Error("Weather data is missing required properties");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchWeather();
  }, [location]);

  return (
    <div className="app">
      <h1>Classy Weather</h1>
      <Input
        location={location}
        onChangeLocation={(e) => setLocation(e.target.value)}
      />
      {isLoading && <p className="loader">Loading...</p>}

      {weather.time && (
        <Weather
          temperature_2m_max={weather.temperature_2m_max}
          temperature_2m_min={weather.temperature_2m_min}
          time={weather.time}
          weathercode={weather.weathercode}
          location={displayLocation}
        />
      )}
    </div>
  );
}

function Weather({
  temperature_2m_max: max,
  temperature_2m_min: min,
  time: dates,
  weathercode: codes,
  location,
}) {
  return (
    <div>
      <h2>Weather {location}</h2>
      <ul className="weather">
        {dates.map((date, i) => (
          <Day
            date={date}
            max={max.at(i)}
            min={min.at(i)}
            code={codes.at(i)}
            key={date}
            isToday={i === 0}
          />
        ))}
      </ul>
    </div>
  );
}

function Day({ date, max, min, code, isToday }) {
  return (
    <li className="day">
      <span>{getWeatherIcon(code)}</span>
      <p>{isToday ? "Today" : formatDay(date)}</p>
      <p>
        {Math.floor(min)}&deg; &mdash; <strong>{Math.ceil(max)} &deg;</strong>
      </p>
    </li>
  );
}

function Input({ location, onChangeLocation }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search for location..."
        value={location}
        onChange={onChangeLocation}
      />
    </div>
  );
}

export default App;
