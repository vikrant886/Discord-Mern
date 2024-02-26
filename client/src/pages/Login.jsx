import React from "react";
import LoginForm from "../components/forms/LoginForm";

export default function Login() {
  return (
    <div
      className="w-full h-screen bg-cover bg-no-repeat flex items-center justify-center bg-right"
      style={{
        backgroundImage: `url(${require("../images/OIG.jpeg")})`,
      }}
    >
        <LoginForm />
    </div>
  );
}
