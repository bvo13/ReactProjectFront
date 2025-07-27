import { useNavigate } from "react-router-dom";
import Button from "../ReusableComponents/Button";

function HomePage() {
    localStorage.setItem('token',null);
  const nav = useNavigate();
  return (
    <div className="flex flex-col h-screen w-screen">
      <h1 className="text-9xl font-serif mb-8 p-5">Get Started!</h1>

      <p className="items-center justify-center">
        Welcome to a tool built to assist you in logging your gym sessions
        without any complexities and complications!
      </p>
      <p>
        {" "}
        Features include session creations with dates to label, custom
        exercises, and set creation.
      </p>
      <div className="flex-grow flex flex-col items-center justify-center space-y-20">
        <Button
          className="m-2 h-16 w-56 text-2xl"
          onClick={() => {
            nav("/login");
          }}
        >
          Login
        </Button>
        <Button
          className="m-2 h-16 w-56 text-2xl"
          onClick={() => {
            nav("/register");
          }}
        >
          Register
        </Button>
      </div>
      <p className="m-20">
        Click "Login" if you already have an existing account or "Register" if
        you are planning to create one.
      </p>
    </div>
  );
}

export default HomePage;