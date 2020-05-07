import React, { useState, useEffect } from "react";
import "./lib/slider.css";

/**
 * 学习交流:882577093
 * 提供基于时间间隔重复调用callback的hooks
 * @param {*} callback
 * @param {*} interval
 */
function useInterval(callback, interval) {
  useEffect(() => {
    const start = new Date().getTime();
    const I = setInterval(() => {
      callback(new Date().getTime() - start);
    }, interval);
    return () => clearInterval(I);
  }, []);
}

/**
 * 提供实现slider的底层
 * @param {*} N
 */
function useSlider(N, speed = 3000) {
  const [slider, setSlider] = useState(0);
  useInterval(diff => {
    setSlider(_ => Math.floor(diff / speed) % N);
  }, 300);
  return slider;
}

const imgs = [
  "http://5b0988e595225.cdn.sohucs.com/images/20190724/a801831af3c743a4b97e443121f44f30.jpeg",
  "https://th.bing.com/th?id=OIP.qsPu-MfQrZdhoLjWf0SDKwHaEo&pid=Api&rs=1",
  "https://th.bing.com/th?id=OIP.R_mn8O9thXZN4aXRk5XKJgHaEo&pid=Api&rs=1"
];

export default () => {
  const slider = useSlider(imgs.length);
  return (
    <div className="scroller">
      <div
        className="inner"
        style={{
          width: `${imgs.length * 100}%`,
          transform: `translateX(-${(100 * slider) / imgs.length}%)`
        }}
      >
        {imgs.map(src => {
          return (
            <img
              style={{
                width: `${100 / imgs.length}%`
              }}
              key={src}
              alt=""
              src={src}
            />
          );
        })}
      </div>
    </div>
  );
};
