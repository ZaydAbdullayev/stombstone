import { Outlet } from "react-router-dom";
import bg from "../assets/bg.png";
import { useEffect, useState } from "react";
import music from "../assets/mc.mp3";

export const Layout = () => {
  const [audio] = useState(new Audio(music));
  const [isMusicStarted, setIsMusicStarted] = useState(false);
  useEffect(() => {
    const playMusic = () => {
      if (!isMusicStarted) {
        audio.loop = true;
        audio.volume = 0.3;
        audio.play().catch((err) => console.log("Autoplay blocked:", err));
        setIsMusicStarted(true);
      }
    };

    document.addEventListener("click", playMusic, { once: true });

    return () => document.removeEventListener("click", playMusic);
  }, [isMusicStarted, audio]);

  return (
    <div className="w100 h100 df fdc aic p-r">
      <Outlet />
      <img src={bg} alt="background" className="bg" />
    </div>
  );
};
