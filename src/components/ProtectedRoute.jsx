import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export default function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p>Loading...</p>; // show loading while checking auth
  if (!user) return <Navigate to="/login" />; // redirect if not logged in

  return children;
}
