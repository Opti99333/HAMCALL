import React, { useEffect, useState } from "react";
import "../styles/VideoCall.css";
import videoFile from "../assets/video-squirell.mp4";

type Props = {
  onHangup?: () => void;
  buyerTag?: string;
  rightBadgeText?: string;
};

export default function VideoCall({
  onHangup,
  buyerTag = "BUY",
  rightBadgeText = "CA",
}: Props) {
  const [now, setNow] = useState(new Date());
  const [copied, setCopied] = useState(false);
  const [hideButton, setHideButton] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const timeStr = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(now);

  const handleCopy = async (e: React.MouseEvent<HTMLDivElement>) => {
    try {
      const textToCopy = e.currentTarget.dataset.tooltip || "";
      if (!textToCopy) return;

      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Ошибка копирования:", err);
    }
  };

  const handleHangup = () => {
    setHideButton(true);
    setTimeout(() => {
      onHangup?.();
    }, 500); // 0.5s = длительность анимации
  };

  return (
    <div className="call-root">
      <div className="video-stage">
        <video
          className="remote-video"
          playsInline
          loop
          autoPlay
          controls
          src={videoFile}
        />
      </div>

      <div className="call-controls">
        <div className="time">{timeStr}</div>

        <div className="buttons">
          <button
            className={`circle danger ${hideButton ? "fade-out" : ""}`}
            onClick={handleHangup}
          >
            <svg viewBox="0 0 24 24" width="26" height="26">
              <path
                fill="currentColor"
                d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C11.85 21 3 12.15 3 1a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z"
              />
            </svg>
          </button>

          <a href="https://dexscreener.com/solana/coming soon">
            <button className="pill success">{buyerTag}</button>
          </a>

          <div
            className={`badge${copied ? " copied" : ""}`}
            onClick={handleCopy}
            data-tooltip="0x1234567890ABCDEF"
            aria-label={`Copy ${rightBadgeText}`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleCopy(e as any)}
          >
            {copied ? "✓" : rightBadgeText}
          </div>
        </div>
      </div>
    </div>
  );
}
