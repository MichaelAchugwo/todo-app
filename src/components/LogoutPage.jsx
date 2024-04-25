import Supabase from "./Supabase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const database = Supabase.database;

export default function LogoutPage() {
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
      alert("Check your internet connection")
      navigate("/home")
    }
  };
  useEffect(() => {
    logUserOut();
  }, []);
  return (
    <>
      <div className="min-h-screen flex place-items-center justify-center">
        <h1 className="text-3xl text-center">Logging Out...</h1>
      </div>
    </>
  );
}
