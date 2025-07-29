import { useNavigate } from "react-router-dom";

import { apiFetch } from "../Helpers/apiHelper";
import Button from "../ReusableComponents/Button";
import Label from "../ReusableComponents/FormLabel";
import Input from "../ReusableComponents/FormInput";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

function LoginPage() {
  const nav = useNavigate();

  const [login, setLogin] = useState({ email: "", password: "" });
  async function handleLoginSubmit(e) {
    e.preventDefault();

    try {
      const data = await apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(login),
      });
      alert("logged in succesfully");

      nav("/sessions");
    } catch (error) {
      alert("Incorrect Credentials, or other error");
    }
  }

  function handleChange(e) {
    setLogin({ ...login, [e.target.name]: e.target.value });
  }
  const areFilled = login.email != "" && login.password != "";

  return (
    <div className="h-screen w-screen">
      <div className="relative">
        <Button className=" absolute top-0 left-0 m-4" onClick={() => nav("/")}>
          Home
        </Button>
        <div className="flex-grow flex justify-center">
          <h1 className="m-10 font-serif text-9xl">Login Page</h1>
        </div>
      </div>

      <form
        className="flex-col flex items-center justify-center space-y-10 m-10"
        onSubmit={handleLoginSubmit}
      >
        <div className="flex items-center justify-center space-x-5">
          <Label htmlFor="email">Email: </Label>
          <Input type="email" id="email" name="email" onChange={handleChange} />
        </div>
        <div className="flex items-center justify-center space-x-5">
          <Label htmlFor="password">Password: </Label>
          <Input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <p className="m-10"></p>
        <Button className="" type="submit" disabled={!areFilled}>
          Login
        </Button>
      </form>
    </div>
  );
}

export default LoginPage;
