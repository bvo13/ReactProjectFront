import { Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../Helpers/apiHelper";
import Button from "./Button";
function AuthenticatedPageLayout({ children, title, className = "" }) {
  const nav = useNavigate();
  return (
    <div
      className={`min-h-screen min-w-screen bg-gray-500 flex flex-col font-serif text-black ${className}`}
    >
      <header className="p-4 flex justify-center items-center">
        <h1 className="text-5xl font-bold">{title}</h1>
      </header>
      <main className="flex-grow flex flex-col p-4">{children}</main>
      <footer className="h-12 border-t-2 border-t-black flex justify-around items-center">
        <Link to="/sessions">Sessions</Link>
        <Button
          onClick={() => {
            try {
              apiFetch("/api/auth/logout", {
                method: "POST",
              });
              nav("/");
            } catch (error) {
              throw new Error("error in logging out");
            }
          }}
        >
          Logout
        </Button>
      </footer>
    </div>
  );
}

export default AuthenticatedPageLayout;
