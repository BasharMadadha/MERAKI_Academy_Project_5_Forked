import React from "react";
import "./syle.css";

const FrontPage = () => {
  return (
    <div className="background-container">
      <div
        className="background-image"
        style={{
          backgroundImage:
            'url("https://r4.wallpaperflare.com/wallpaper/1009/711/692/trading-card-games-yu-gi-oh-hd-wallpaper-a9c03591b63a3bc03fea4d984b124d99.jpg")',
        }}
      >
        <div className="btn-page">OFFICIAL WEBSITE</div>
        <div className="languageSelect">
          <h1 className="languageSelec">en</h1>
        </div>
        <img
          src="data:image/png;base64,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"
          className="logo"
          alt="Logo"
        />
        <div>
          <img
            src="data:image/png;base64,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"
            alt="Description"
            lang="src"
            className="img-container"
          />
        </div>
        <div class="p1-btns">
          <a
            class="PC"
            href="javascript:void(0)"
            onclick="gtag('event', 'homepage PC download', { 'event_category': 'click', 'event_label': 'Branding'})"
          >
            <img
              src="https://webstatic.hoyoverse.com/upload/event/2023/06/16/f5675485246f78738f52cd9ba9d8bb80_5196703687952392730.png"
              alt="PC"
            />
          </a>
          <a
            class="steam"
            href="javascript:void(0)"
            onclick="gtag('event', 'homepage steam', { 'event_category': 'click', 'event_label': 'Branding'})"
          >
            <img
              src="https://webstatic.hoyoverse.com/upload/event/2023/04/19/5dbe040157bb6434b0b18b8292282b32_3632237727328970001.png"
              alt="Steam"
            />
          </a>
          <a
            class="epic"
            href="javascript:void(0)"
            onclick="gtag('event', 'homepage epic', { 'event_category': 'click', 'event_label': 'Branding'})"
          >
            <img
              src="https://webstatic.hoyoverse.com/upload/event/2023/06/16/2577fdf3178c59e64861b4d41c8def13_1289788108854828378.png"
              alt="Epic"
            />
          </a>
          <a
            class="apple"
            href="javascript:void(0)"
            onclick="gtag('event', 'homepage Appstore', { 'event_category': 'click', 'event_label': 'Branding'})"
          >
            <img
              src="https://webstatic.hoyoverse.com/upload/event/2023/06/16/dfd1d5393a451babbcf946ca340ca454_1048735058485620098.png"
              alt="Apple"
            />
          </a>
          <a
            class="google"
            href="javascript:void(0)"
            onclick="gtag('event', 'homepage googleplay', { 'event_category': 'click', 'event_label': 'Branding'})"
          >
            <img
              src="https://webstatic.hoyoverse.com/upload/event/2023/04/19/b844aa37a8f56c86dcb73ac608ef87bc_7486702195076102975.png"
              alt="Google"
            />
          </a>
        </div>
      </div>
      <div
        className="background-image"
        style={{
          backgroundImage:
            'url("https://c4.wallpaperflare.com/wallpaper/1020/1/213/world-of-warcraft-battle-for-azeroth-video-games-warcraft-alliance-wallpaper-preview.jpg")',
        }}
      >
        {" "}
      </div>
      <div
        className="background-image"
        style={{
          backgroundImage:
            'url("http://res.cloudinary.com/dv7ygzpv8/image/upload/v1696834590/hhbinzveeoenlsqnepe4.jpg")',
        }}
      ></div>
       <div
        className="background-imag"
        style={{
          backgroundImage:
            'url("http://res.cloudinary.com/dv7ygzpv8/image/upload/v1696864219/sejtxbs8eka6nllai00u.png")',
        }}
      ></div>
    </div>
  );
};

export default FrontPage;
