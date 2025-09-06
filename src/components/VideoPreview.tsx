import {useState} from "react";
import "../styles/VideoPreview.css";

type Props = {
  avatarSrc: string;
  displayName?: string;     
  titleBelowButton?: string; 
  onDone: () => void;
};

export default function SplashPreview({
  avatarSrc,
  displayName = "BOSS",
  titleBelowButton = "BOSS CALLING",
  onDone,
}: Props) {
  const [leaving, setLeaving] = useState(false);

  const continueHandler = () => setLeaving(true);

  return (
    <div
      className={`preview-screen ${leaving ? "fade-out" : ""}`}
      onTransitionEnd={() => leaving && onDone()}
      role="dialog"
      aria-label="Incoming video call"
    >
      <div className="preview-top">
        <img className="avatar" src={avatarSrc} alt={displayName} />
        <div className="name" aria-live="polite">{displayName}</div>
        <div className="subtitle">Incoming video call</div>
      </div>

      <div className="preview-bottom">
        <div className="calling">{titleBelowButton}</div>

        <button
          className="call-btn"
          onClick={continueHandler}
          aria-label="Answer video call"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 8l5-3v14l-5-3v2H3V6h12v2z" fill="currentColor" />
          </svg>
        </button>
      </div>
    </div>
  );
}
