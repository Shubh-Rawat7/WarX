import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate(); // ✅ correct
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/dashboard"); // ✅ redirect after successful login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <h2>{isSignUp ? "Create Account" : "Sign In"}</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" className="sign-btn">
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
      </form>
      <p className="toggle-text">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <span className="toggle-link" onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? "Sign In" : "Create Account"}
        </span>
      </p>
    </div>
  );
}
