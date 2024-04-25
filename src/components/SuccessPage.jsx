import Supabase from "./Supabase";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const database = Supabase.database;

export default function SuccessPage() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      await database.auth.getUser().then((value) => {
        if (value.data?.user) {
          setUser(value.data.user);
        }
      });
    };
    getUserData()
  }, []);

  return (
    <>
      <div className="min-h-screen flex place-items-center justify-center">
        <h1 className="text-3xl text-center">Successfully Signed Up</h1>
      </div>
    </>
  );
}