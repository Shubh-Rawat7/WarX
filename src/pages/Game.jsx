import { useEffect, useRef, useState } from "react";
import playerImg from "../assets/player.png";
import enemyImg from "../assets/enemy.png";
import "./Game.css";

export default function Game({ onScoreUpdate }) {
  const canvasRef = useRef(null);
  const [player, setPlayer] = useState({ x: 180, y: 380, health: 3 });
  const [enemy, setEnemy] = useState({ x: 100, y: 50, direction: 1, health: 3 });
  const [playerBullets, setPlayerBullets] = useState([]);
  const [enemyBullets, setEnemyBullets] = useState([]);
  const [score, setScore] = useState(0);

  // Player move LEFT or RIGHT
  const movePlayer = (dir) => {
    setPlayer((prev) => ({
      ...prev,
      x: Math.max(0, Math.min(350, prev.x + dir * 20)), // clamp inside canvas
    }));
  };

  // Player shoot
  const shoot = () => {
    setPlayerBullets((prev) => [...prev, { x: player.x + 20, y: player.y - 10 }]);
  };

  // Enemy shoot
  const enemyShoot = () => {
    setEnemyBullets((prev) => [...prev, { x: enemy.x + 20, y: enemy.y + 40 }]);
  };

  const collide = (b, e) =>
    b.x < e.x + 40 && b.x + 5 > e.x && b.y < e.y + 40 && b.y + 10 > e.y;

  // --- Keyboard Event Handlers ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") movePlayer(-1);
      if (e.key === "ArrowRight") movePlayer(1);
      if (e.key === " " || e.key === "Spacebar") shoot();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [player]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const playerImage = new Image();
    const enemyImage = new Image();
    playerImage.src = playerImg;
    enemyImage.src = enemyImg;

    const interval = setInterval(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Player
      ctx.drawImage(playerImage, player.x, player.y, 50, 50);

      // Draw Enemy
      ctx.drawImage(enemyImage, enemy.x, enemy.y, 50, 50);

      // Enemy horizontal movement
      setEnemy((prev) => {
        let newX = prev.x + prev.direction * 2;
        let newDir = prev.direction;
        if (newX > 350 || newX < 0) newDir = -prev.direction;
        return { ...prev, x: newX, direction: newDir };
      });

      // Update and draw player bullets
      setPlayerBullets((prev) =>
        prev
          .map((b) => ({ ...b, y: b.y - 8 }))
          .filter((b) => b.y > 0)
      );
      playerBullets.forEach((b) => {
        ctx.fillStyle = "yellow";
        ctx.fillRect(b.x, b.y, 5, 10);
      });

      // Enemy bullets
      if (Math.random() < 0.02) enemyShoot();
      setEnemyBullets((prev) =>
        prev
          .map((b) => ({ ...b, y: b.y + 5 }))
          .filter((b) => b.y < 450)
      );
      enemyBullets.forEach((b) => {
        ctx.fillStyle = "red";
        ctx.fillRect(b.x, b.y, 5, 10);
      });

      // Collisions
      playerBullets.forEach((b) => {
        if (collide(b, enemy)) {
          setEnemy((prev) => ({ ...prev, health: prev.health - 1 }));
          setPlayerBullets((prev) => prev.filter((p) => p !== b));
          setScore((prev) => prev + 10);
          onScoreUpdate && onScoreUpdate(score + 10);
        }
      });

      enemyBullets.forEach((b) => {
        if (collide(b, player)) {
          setPlayer((prev) => ({ ...prev, health: prev.health - 1 }));
          setEnemyBullets((prev) => prev.filter((p) => p !== b));
        }
      });

      // Respawn enemy
      if (enemy.health <= 0) {
        setEnemy({ x: Math.random() * 350, y: 50, direction: 1, health: 3 });
      }

      // Game Over
      if (player.health <= 0) {
        alert("Game Over! Final Score: " + score);
        clearInterval(interval);
      }

      // Draw Health Bars
      ctx.fillStyle = "green";
      ctx.fillRect(20, 20, player.health * 30, 10);
      ctx.strokeStyle = "white";
      ctx.strokeRect(20, 20, 90, 10);

      ctx.fillStyle = "green";
      ctx.fillRect(300, 20, enemy.health * 30, 10);
      ctx.strokeStyle = "white";
      ctx.strokeRect(300, 20, 90, 10);

      // Draw Score
      ctx.fillStyle = "white";
      ctx.font = "16px Arial";
      ctx.fillText("Score: " + score, 170, 20);
    }, 30);

    return () => clearInterval(interval);
  }, [player, enemy, playerBullets, enemyBullets, score]);

  return (
    <div className="game-container">
      <canvas ref={canvasRef} width={400} height={450} className="gameCanvas" />
      <div className="controls">
        <button onClick={() => movePlayer(-1)}>⬅️</button>
        <button onClick={shoot}>🔫 SHOOT</button>
        <button onClick={() => movePlayer(1)}>➡️</button>
      </div>
    </div>
  );
}
