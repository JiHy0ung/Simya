import { Analytics } from "@vercel/analytics/react";
import "./App.css";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <>
      <AppRouter />
      <Analytics />
    </>
  );
}

export default App;
