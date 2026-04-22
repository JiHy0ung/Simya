import { Analytics } from "@vercel/analytics/react";
import "./App.css";
import AppRouter from "./routes/AppRouter";
import { useState } from "react";
import Intro from "./commons/components/Intro";

function App() {
  const [showIntro, setShowIntro] = useState(() => {
    const visited = localStorage.getItem("visited");
    return !visited;
  });

  const handleIntroDone = () => {
    localStorage.setItem("visited", "true");
    setShowIntro(false);
  };

  return (
    <>
      {showIntro && <Intro onDone={handleIntroDone} />}

      <AppRouter />
      <Analytics />
    </>
  );
}

export default App;
