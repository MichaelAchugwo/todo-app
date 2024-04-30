import Supabase from "./extras/Supabase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const database = Supabase.database

export default function LogoutPage() {
  useEffect(() => {
    logUserOut();
  }, []);
  const navigate = useNavigate();
  const logUserOut = async () => {
    try {
      const { error } = await database.auth.signOut();
      if (error) {
        throw error;
      }
      navigate("/");
    } catch (error) {
      console.error(error.message);
      alert("Check your internet connection");
      navigate("/home");
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col place-items-center justify-center">
        <h1 className="text-3xl text-center mb-3">Logging Out...</h1>
        <CircularProgress color="inherit" />
      </div>
    </>
  );
}
