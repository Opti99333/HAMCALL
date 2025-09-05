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
    }, 500);
  };

  return (
    
    <div className="call-root">
      <div className="video-stage">
  <video
    className="remote-video"
    playsInline
    loop
    autoPlay
    src={videoFile}
  />
  <div className="hamcall-label">$HAMCALL</div>
</div>

      <div className="call-controls">
        <div className="time">{timeStr}</div>

        <div className="buttons">
          <button
            className={`circle danger ${hideButton ? "fade-out" : ""}`}
            onClick={handleHangup}
            aria-label="Hang up"
          >
            <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
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
          <a className="circle sm" href="https://x.com/HAMSTER_CALLING" target="_blank" rel="noopener noreferrer" aria-label="Open X" title="X" > <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"> <path fill="currentColor" d="M18.9 3H21l-6.5 7.4L22 21h-6.8l-4.3-5.6L5.9 21H3.8l7-8L3 3h6.8l4 5.3L18.9 3zm-1.2 16.2h1.2L8.4 4.7H7.1l10.6 14.5z" /> </svg> </a> <a className="circle sm" href="https://t.me/HAMSTER_CALLING" target="_blank" rel="noopener noreferrer" aria-label="Open Telegram" title="Telegram" > <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"> <path fill="currentColor" d="M9.03 15.31l-.37 5.3c.53 0 .76-.23 1.03-.5l2.48-2.38 5.14 3.77c.94.52 1.6.25 1.86-.86l3.38-15.84h.01c.3-1.4-.5-1.95-1.41-1.61L1.3 9.3C-.06 9.83-.04 10.62 1.06 10.96l5.43 1.69L18.86 5.5c.6-.37 1.15-.17.7.2L9.03 15.31z" /> </svg> </a>
        </div>
      </div>
    </div>
  );
}
