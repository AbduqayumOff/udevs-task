import React from "react";
import styles from "./ImgByWeather.module.scss";
import Rain from "../assets/images/rain.jpg";
import Snow from "../assets/images/snow.jpg";
import Cloud from "../assets/images/cloud.jpg";
import Sunny from "../assets/images/sunny.jpg";

const weatherImg = {
  snow: Snow,
  rain: Rain,
  clear: Cloud,
  sunny: Sunny,
};

export default function ImgByWeahther({ type }) {
  const wheaterType = type?.toLowerCase();
  return (
    <img
      src={weatherImg[wheaterType] ? weatherImg[wheaterType] : Sunny}
      alt="wheater"
      className={styles.bg}
    />
  );
}
