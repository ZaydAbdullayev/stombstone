import { useState } from "react";
import ZombieButton from "./components/button.components";
import "./home.css";
import "./index.scss";
import { stones } from "./context/data";
import { getCurrentDate, getRandomEpitaph } from "./context/service";
import {
  getCardAsImageData,
  saveCardAsImage,
  uploadToImgbb,
} from "./context/fetch.service";
import { GiFlowerPot } from "react-icons/gi";
import { BiLoaderCircle } from "react-icons/bi";
import x from "./assets/x.png";

export const App = () => {
  const [userInfo, setUserInfo] = useState({
    nickname: "",
    causeOfDeath: "",
    tombstone: 0,
  });
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);

  const genrate = () => {
    if (userInfo.nickname && userInfo.causeOfDeath) {
      setTimeout(() => {
        setDone(true);
      }, 1800);
    } else {
      alert("Please fill in all fields.");
    }
  };
  const classes = ["white", "", "brown", "beje"];

  const downloadCard = async () => {
    const cardElement = document.querySelector(".tombstone");
    saveCardAsImage(cardElement);
  };

  const shareOnX = async () => {
    setSending(true);
    const cardEl = document.querySelector(".tombstone");
    const imgUrl = await uploadToImgbb(await getCardAsImageData(cardEl));
    console.log(imgUrl);

    const tweetText = `
Rest in peace, my friend

$RIP
`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}&url=${encodeURIComponent(imgUrl)}`;
    window.open(tweetUrl, "_blank");
    setSending(false);
  };

  const reset = () => {
    setUserInfo({
      nickname: "",
      causeOfDeath: "",
      tombstone: 0,
    });
    setDone(false);
  };

  return (
    <div className="df fdc aic wrapper">
      <div className="w100 df fdc aic gap-20 main-content">
        <h1 data-aos="fade-up" data-aos-duration="700">
          RIPstone
        </h1>
        <p>The darkest project on Solana</p>
        <img
          src={x}
          alt="x icon"
          className="x-icon"
          onClick={() => window.open("https://x.com/ripstone_sol", "_blank")}
          data-aos="fade-up"
          data-aos-duration="700"
          data-aos-delay="100"
        />
        {done ? (
          <div
            className="w100 df fdc aic gap-20 result content"
            data-aos="fade-up"
            data-aos-duration="700"
          >
            <h3 data-aos="fade-up" data-aos-duration="700">
              Your Tombstone is Ready
            </h3>
            <figure
              className={`p-r df jcc tombstone ${classes[userInfo.tombstone]}`}
              data-aos="fade-up"
              data-aos-duration="700"
              data-aos-delay="100"
              data-aos-offset="0"
            >
              <img
                src={stones[userInfo.tombstone]}
                alt="tombstone"
                className="tombstone-img"
                data-aos="fade-up"
                data-aos-duration="700"
                data-aos-delay="150"
                data-aos-offset="0"
              />
              <figcaption
                className="df fdc aic gap-10"
                data-aos="fade-up"
                data-aos-duration="700"
                data-aos-delay="200"
                data-aos-offset="0"
              >
                <GiFlowerPot className="fs-20" />
                <h2>{userInfo.nickname}</h2>
                <p>{userInfo.causeOfDeath}</p>
                <span className="date">{getCurrentDate()}</span>
                <small className="epitaph">"{getRandomEpitaph()}"</small>
              </figcaption>
            </figure>
            <div
              className="df aic gap-20"
              data-aos="fade-up"
              data-aos-duration="700"
              data-aos-delay="230"
              data-aos-offset="0"
            >
              <div
                class="button brown"
                onClick={shareOnX}
                data-aos="fade-up"
                data-aos-duration="700"
                data-aos-delay="260"
                data-aos-offset="0"
              >
                Share to X {sending && <BiLoaderCircle className="loader" />}
              </div>
              <div
                class="button brown"
                onClick={downloadCard}
                data-aos="fade-up"
                data-aos-duration="700"
                data-aos-delay="280"
                data-aos-offset="0"
              >
                Download to Galery
              </div>
              <div
                class="button brown"
                onClick={reset}
                data-aos="fade-up"
                data-aos-duration="700"
                data-aos-delay="300"
                data-aos-offset="0"
              >
                Reset
              </div>
            </div>
          </div>
        ) : (
          <div
            className="df fdc aic gap-20 user-info-form"
            data-aos="fade-up"
            data-aos-duration="700"
          >
            <label
              className="w100 df fdc gap-10 fs-20"
              data-aos="fade-up"
              data-aos-duration="700"
              data-aos-delay="100"
              data-aos-offset="0"
            >
              <span
                data-aos="fade-up"
                data-aos-duration="700"
                data-aos-delay="130"
                data-aos-offset="0"
              >
                Nickname of the Deceased
              </span>
              <input
                type="text"
                placeholder="Enter the nickname"
                required
                data-aos="fade-up"
                data-aos-duration="700"
                data-aos-delay="170"
                data-aos-offset="0"
                onChange={(e) =>
                  setUserInfo({ ...userInfo, nickname: e.target.value })
                }
              />
            </label>
            <label
              className="w100 df fdc gap-10 fs-20"
              data-aos="fade-up"
              data-aos-duration="700"
              data-aos-delay="200"
              data-aos-offset="0"
            >
              <span
                data-aos="fade-up"
                data-aos-duration="700"
                data-aos-delay="230"
                data-aos-offset="0"
              >
                Cause of Death
              </span>
              <input
                type="text"
                placeholder="Enter the cause of death"
                required
                data-aos="fade-up"
                data-aos-duration="700"
                data-aos-delay="270"
                data-aos-offset="0"
                onChange={(e) =>
                  setUserInfo({ ...userInfo, causeOfDeath: e.target.value })
                }
              />
            </label>
            <div
              className="w100 df fdc gap-20 stones"
              data-aos="fade-up"
              data-aos-duration="700"
              data-aos-delay="300"
              data-aos-offset="0"
            >
              <span>Choose your Tombstone</span>
              <div className="w100 df gap-20 stones-container">
                {stones.map((stone, index) => (
                  <img
                    key={index}
                    src={stone}
                    alt={`stone-${index}`}
                    className={`stone ${
                      userInfo.tombstone === index ? "selected" : ""
                    }`}
                    onClick={() => {
                      setUserInfo({ ...userInfo, tombstone: index });
                    }}
                  />
                ))}
              </div>
            </div>
            <ZombieButton text={"Memorialize"} click={genrate} />
          </div>
        )}
      </div>
      <div className="w100 df aic jcc content footer">
        <p>© 2025 RIPstone - All rights reserved</p>
      </div>
    </div>
  );
};
