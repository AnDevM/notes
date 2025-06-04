import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PrivateRoute = ({ children }) => {
  const [valid, setValid] = useState(null);

  useEffect(() => {
    async function verify() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/check-token`, {
          credentials: "include",
        });
        const data = await res.json();
        setValid(data.valid);
      } catch {
        setValid(false);
      }
    }

    verify();
  }, []);

  if (valid === null) return <div>Loading...</div>;
  if (!valid) return <Navigate to="/login" replace />;
  return children;
};

export default PrivateRoute;
