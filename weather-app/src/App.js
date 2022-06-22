import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherAction } from "./redux/slices/weatherSlices";

import React from "react";
import styles from "./App.module.scss";
import search from "./assets/icons/search.png";
import ImgByWeahther from "./components/ImgByWeahther";

const regions = [
  {
    id: 1,
    title: "Andijon",
    country: "andijan",
  },
  {
    id: 2,
    title: "Buxoro",
    country: "bukhara",
  },
  {
    id: 3,
    title: "Fargʻona",
    country: "fergana",
  },
  {
    id: 3,
    title: "Jizzax",
    country: "jizzax",
  },
  {
    id: 3,
    title: "Urganch",
    country: "urgench",
  },
  {
    id: 3,
    title: "Namangan",
    country: "namangan",
  },
  {
    id: 3,
    title: "Navoiy",
    country: "navoiy",
  },
  {
    id: 3,
    title: "Qashqadaryo",
    country: "qashqadaryo",
  },
  {
    id: 3,
    title: "Samarqand",
    country: "samarqand",
  },
  {
    id: 3,
    title: "Sirdaryo",
    country: "sirdaryo",
  },
  {
    id: 3,
    title: "Termiz",
    country: "termiz",
  },
  {
    id: 3,
    title: "Toshkent",
    country: "toshkent",
  },
];

const App = () => {
  const [city, setCity] = useState("");
  const changeHandler = (e) => {
    setCity(e.currentTarget.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(fetchWeatherAction(city));
    setCity("");
  };

  const handleClick = (item) => {
    dispatch(fetchWeatherAction(item?.country));
  };
  //dispatch action
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWeatherAction("tashkent"));
  }, [dispatch]);

  //select state from store
  const state = useSelector((state) => state);
  const { weather, loading, error } = state;
  return (
    <div className={styles.wrapper}>
      {loading ? (
        <h1>Loading please wait...</h1>
      ) : error ? (
        <h1>{error?.message}</h1>
      ) : (
        <>
          <ImgByWeahther type={weather?.weather[0]["main"]} />
          <div className={styles.weather}>
            <div className={styles.logo}>the.weather</div>
            <div className={styles.title}>
              <h1>
                {Math.floor(weather?.main.temp - 273.15)}
                <span>°</span>
              </h1>

              <div>
                <h2>{weather?.name}</h2>
              </div>
              <div className={styles.icon}>
                <img
                  src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
                  alt="/"
                />
                <h3>{weather?.weather[0].main}</h3>
              </div>
            </div>
          </div>
          <div className={styles.panel}>
            <form onSubmit={submitHandler}>
              <input
                value={city}
                type="text"
                onChange={changeHandler}
                placeholder="Another location"
              />
              <button type="submit">
                <img src={search} alt="" />
              </button>
            </form>
            <div className={styles.wrapperMobile}>
              <div className={styles.regions}>
                {regions.map((item, index) => (
                  <h5 key={index} onClick={() => handleClick(item)}>
                    {item?.title}
                  </h5>
                ))}
              </div>
              <div className={styles.deatails}>
                <h1>Weather Deatails</h1>
                <div className={styles.row}>
                  <span>Pressure</span>
                  <span>{weather?.main.pressure}</span>
                </div>
                <div className={styles.row}>
                  <span>Humidity</span>
                  <span>{weather?.main.humidity}%</span>
                </div>
                <div className={styles.row}>
                  <span>Coord</span>
                  <span>{weather?.coord.lat}</span>
                </div>
                <div className={styles.row}>
                  <span>Description</span>
                  <span>{weather?.weather[0].description}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      ;
    </div>
  );
};

export default App;
