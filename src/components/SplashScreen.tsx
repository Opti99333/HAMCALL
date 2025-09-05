import React, { useState, useCallback } from "react";
import bg from "../assets/background.png";
import GoogleMeet from "../assets/google_meet_logo.png";
import "../styles/SplashScreen.css";

type Props = {
  onDone: () => void;
};

export default function SplashScreen({ onDone }: Props) {
  const [clicked, setClicked] = useState(false);

  const finish = useCallback(() => {
    // вызываем onDone после анимации (должна совпадать с --fade-duration в css)
    onDone();
  }, [onDone]);

  const handleClick = () => {
    if (clicked) return;
    setClicked(true);
    setTimeout(finish, 600);
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={`splash-screen ${clicked ? "fade-out" : ""}`}
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div
        className="logo-wrapper"
        onClick={handleClick}
        onKeyDown={onKeyDown}
        role="button"
        tabIndex={0}
        aria-label="Enter Google Meet"
      >
        <img className="google-meet-logo" src={GoogleMeet} alt="Google Meet" />
        <h2 className="brand">Google Meet</h2>
      </div>
    </div>
  );
}
