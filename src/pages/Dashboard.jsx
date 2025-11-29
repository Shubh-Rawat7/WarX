import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const [highScore, setHighScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedHighScore = parseInt(localStorage.getItem("highScore") || "0", 10);
    setHighScore(storedHighScore);
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="scoreboard">
        <p>Highest Score: {highScore}</p>
      </div>
      <button className="play-button" onClick={() => navigate("/game")}>
        ▶️ Play Game
      </button>
    </div>
  );
}
