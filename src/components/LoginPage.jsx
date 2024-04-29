import Supabase from "./Supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function LoginPage() {
  const database = Supabase.database;
  const navigate = useNavigate();
  const handleAuthStateChange = async (event, session) => {
    if (event === "SIGNED_IN") {
      navigate("/");
    }
  };
  const hideEmailLogin = () => {
    document.querySelector("form").style.display = "none";
    document
      .querySelectorAll(".supabase-auth-ui_ui-divider")
      .forEach((element) => {
        element.style.display = "none";
      });
    document
      .querySelectorAll(".supabase-auth-ui_ui-button")
      .forEach((element) => {
        element.style.minWidth = "25vw";
        element.style.fontWeight = "400";
        element.style.color = "white";
        element.style.backgroundColor = "black";
      });
  };

  useEffect(() => {
    hideEmailLogin();
    database.auth.onAuthStateChange(handleAuthStateChange);
  });

  return (
    <div
      id="loginPage"
      className="flex flex-col place-items-center justify-center min-h-screen"
    >
      <a
        className="text-2xl font-semibold inline-block text-blue-700 mb-7"
        href="/"
      >
        <i className="fa-solid fa-list pr-3"></i>TODO Assistant
      </a>
      <div id="loginContainer" className="w-3/4 flex justify-center">
        <Auth
          supabaseClient={database}
          appearance={{
            theme: ThemeSupa,
          }}
          providers={["google"]}
        />
      </div>
    </div>
  );
}
