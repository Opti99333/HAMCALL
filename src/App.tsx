import { useRef, useState, useEffect } from "react";
import SplashOne from "./components/SplashScreen";
import SplashTwo from "./components/VideoPreview";
import VideoCall from "./components/VideoCall";
import MeetMusic from "./assets/google_meet_ringtone.mp3";
import avatarSrc from "./assets/AVATAR PNG.webp"
import { Analytics } from "@vercel/analytics/react";

type Step = "s1" | "s2" | "app";

export default function App() {
  const [step, setStep] = useState<Step>("s1");
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (step === "app") {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // перемотать в начало
      }
    }
  }, [step]);

  const handleEnterS1 = () => {
    audioRef.current?.play().catch(console.log);
    setStep("s2");
  };

  const handleEnterS2 = () => {
    setStep("app");
  };

  return (
    <>
      {step === "s1" && <SplashOne onDone={handleEnterS1} />}
      {step === "s2" && <SplashTwo avatarSrc={avatarSrc} onDone={handleEnterS2} />}
      {step === "app" && (
        <div>
          <VideoCall />
        </div>
      )}

      <audio ref={audioRef} src={MeetMusic} preload="auto" />

      <Analytics />
    </>
  );
}
