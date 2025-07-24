import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import { jwtDecode } from "jwt-decode";
import { useParams } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/sessions", element: <SessionsPage /> },
  { path: `/sessions/:sessionId`, element: <SessionDisplay /> },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  className,
}) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`bg-blue-300 text-white hover:bg-blue-500 h-12 w-36 rounded-3xl disabled:bg-gray-500 disabled:cursor-not-allowed${className}`}
    >
      {children}
    </button>
  );
}

function HomePage() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col h-screen">
      <h1 className="text-9xl font-serif mb-8">Get Started!</h1>
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
      <p class="m-20">
        Click "Login" if you already have an existing account or "Register" if
        you are planning to create one.
      </p>
    </div>
  );
}
function LoginPage() {
  const nav = useNavigate();

  const [login, setLogin] = useState({ email: "", password: "" });
  async function handleLoginSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(login),
      });
      if (response.ok) {
        alert("login successful!");
        const data = await response.json();
        localStorage.setItem("token", data.jwtToken);
        nav("/sessions");
      } else {
        alert("Login failed, incorrect credentials");
      }
    } catch (error) {
      alert("Incorrect Credentials, or other error");
    }
  }

  function handleChange(e) {
    setLogin({ ...login, [e.target.name]: e.target.value });
  }
  const areFilled = login.email != "" && login.password != "";

  return (
    <div>
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
          <label htmlFor="email">
            Email:{" "}
          </label>
          <input
            className="border-2 border-blue-300"
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-center space-x-5">
          <label htmlFor="password">
            Password:{" "}
          </label>
          <input
            className="border-2 border-blue-300"
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
function RegisterPage() {
  const nav = useNavigate();

  const [registration, setRegistration] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function handleRegistrationSubmit(e) {
    e.preventDefault();
    console.log("button clicked");
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registration),
      });
      console.log("response" + response.status);
      if (response.ok) {
        alert("Successfully registered!");
        setRegistration({ name: "", email: "", password: "" });
        nav("/sessions");
      } else {
        alert("failed");
      }
    } catch (error) {
      alert("an error occurred");
    }
  }
  function handleChange(e) {
    setRegistration({ ...registration, [e.target.name]: e.target.value });
  }
  const areFilled =
    registration.name != "" &&
    registration.email != "" &&
    registration.password != "";

  return (
    <div>
      <div className="relative">
        <Button className=" absolute top-0 left-0 m-4" onClick={() => nav("/")}>
          Home
        </Button>
        <div className="flex-grow flex justify-center">
          <h1 className="m-10 font-serif text-9xl">Register Page</h1>
        </div>
        </div>
      
      <form className="flex-col flex justify-center items-center space-y-10 m-10" onSubmit={handleRegistrationSubmit}>
        <div className="flex space-x-5">
        <label htmlFor="name">Name: </label>
        <input className="border-2 border-blue-300"
          type="text"
          id="name"
          name="name"
          value={registration.name}
          onChange={handleChange}
        />
        </div>
        <div className="flex space-x-5">
        <label htmlFor="email">Email: </label>
        <input className="border-2 border-blue-300"
          type="email"
          id="email"
          name="email"
          value={registration.email}
          onChange={handleChange}
        />
      </div>
      <div className="flex space-x-5">
        <label htmlFor="password">Password: </label>
        <input className="border-2 border-blue-300"
          type="password"
          id="password"
          name="password"
          value={registration.password}
          onChange={handleChange}
        />
        </div>
      <p className="m-10"></p>
        <Button type="submit" disabled={!areFilled}>
          Register
        </Button>
      </form>
    </div>
  );
}

function SessionsPage() {
  return (
    <div>
      <h1>Sessions</h1>
      <SessionList />
    </div>
  );
}

function SessionList() {
  const nav = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [addingSession, setAddingSession] = useState(false);
  const [date, setDate] = useState("");

  async function getSessions() {
    const response = await fetch(
      `http://localhost:8080/users/
        ${jwtDecode(localStorage.getItem("token")).userId}/sessions`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("not found or error");
    }
    const data = await response.json();
    setSessions(data);
  }
  useEffect(() => {
    getSessions();
  }, []);

  async function handleSessionCreation(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/users/${
          jwtDecode(localStorage.getItem("token")).userId
        }/sessions`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ date: date, movements: [] }),
        }
      );
      if (response.ok) {
        alert("session created!");
        await getSessions();
        setAddingSession(false);
      } else {
        alert("failed");
      }
    } catch (error) {
      new Error("error");
    }
  }
  return (
    <div>
      {sessions.length === 0 ? (
        <p>No sessions found</p>
      ) : (
        sessions.map((session) => {
          return (
            <button
              type="button"
              key={session.id}
              onClick={() => {
                nav(`/sessions/${session.id}`);
              }}
            >
              {session.date}
            </button>
          );
        })
      )}
      {!addingSession ? (
        <button type="button" onClick={() => setAddingSession(true)}>
          +
        </button>
      ) : (
        <form onSubmit={handleSessionCreation}>
          <input
            type="date"
            placeholder="enter date in format year-month-day"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          ></input>
          <button type="submit">Create Session</button>
          <button type="button" onClick={() => setAddingSession(false)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

function SessionDisplay() {
  return <Session />;
}
function Session() {
  const [sessionData, setSessionData] = useState({});
  const { sessionId } = useParams();
  const [isAdding, setIsAdding] = useState(false);
  const [movementName, setMovementName] = useState("");
  const [sets, setSets] = useState([{ weight: "", reps: "", rir: "" }]);
  const [movementId, setMovementId] = useState("");
  const [editingId, setEditingId] = useState("");
  const [editingDate, setEditingDate] = useState(false);
  const [dateForm, setDateForm] = useState("");
  const nav = useNavigate();

  async function getSession() {
    try {
      const response = await fetch(
        `http://localhost:8080/users/${
          jwtDecode(localStorage.getItem("token")).userId
        }/sessions/${sessionId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("error, returning to sessions list");
      }
      const data = await response.json();
      console.log(data);
      setSessionData(data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    setSessionData({});
    getSession();
  }, [sessionId]);

  async function handleEditSubmission(e) {
    e.preventDefault();
    try {
      const movement = { name: movementName, sets: sets };
      const response = await fetch(
        `http://localhost:8080/users/${
          jwtDecode(localStorage.getItem("token")).userId
        }/sessions/${sessionId}/movements/${movementId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(movement),
        }
      );
      if (response.ok) {
        alert("successful edit");
        setEditingId("");
        await getSession();
      } else {
        alert("error in saving");
      }
    } catch (error) {
      throw new Error("error");
    }
  }
  async function handleAddSubmission(e) {
    e.preventDefault();
    try {
      const movement = { name: movementName, sets: sets };
      const response = await fetch(
        `http://localhost:8080/users/${
          jwtDecode(localStorage.getItem("token")).userId
        }/sessions/${sessionId}/movements`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(movement),
        }
      );
      if (response.ok) {
        alert("movement added!");
        await getSession();
        setIsAdding(false);
        setMovementName("");
        setSets([{ weight: "", reps: "", rir: "" }]);
      }
    } catch (error) {
      throw new Error("error");
    }
  }

  async function handleDelete() {
    try {
      const response = await fetch(
        `http://localhost:8080/users/${
          jwtDecode(localStorage.getItem("token")).userId
        }/sessions/${sessionId}/movements/${movementId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        alert("deleted movement");
        setMovementId("");
        await getSession();
      }
    } catch (error) {
      throw new Error("error");
    }
  }
  {
    if (movementId !== "" && editingId === "") {
      handleDelete();
    }
  }

  async function deleteSession() {
    try {
      const response = await fetch(
        `http://localhost:8080/users/${
          jwtDecode(localStorage.getItem("token")).userId
        }/sessions/${sessionId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        alert("session deleted");
        nav("/sessions");
      } else {
        alert("delete failed");
      }
    } catch (error) {
      throw new Error("error");
    }
  }
  async function handleDateChange(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/users/${
          jwtDecode(localStorage.getItem("token")).userId
        }/sessions/${sessionId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ date: dateForm }),
        }
      );
      if (response.ok) {
        alert("date changed");
        setEditingDate(false);
        await getSession();
      } else {
        alert("date change failed");
        console.log(dateForm);
      }
    } catch (error) {
      throw new Error("error");
    }
  }

  return !sessionData || !Array.isArray(sessionData.movements) ? (
    <div>loading data</div>
  ) : (
    <div key={sessionId}>
      <button type="button" onClick={deleteSession}>
        Delete Session
      </button>
      {!editingDate ? (
        <div>
          <h1>{sessionData.date}</h1>{" "}
          <button
            type="button"
            onClick={() => {
              setEditingDate(true);
              setDateForm(sessionData.date);
            }}
          >
            Change Date
          </button>
        </div>
      ) : (
        <form onSubmit={handleDateChange}>
          <input
            type="date"
            onChange={(e) => setDateForm(e.target.value)}
            value={dateForm}
          ></input>
          <button type="submit">Confirm</button>{" "}
          <button type="button" onClick={() => setEditingDate(false)}>
            Cancel
          </button>
        </form>
      )}
      <MovementDisplay
        movementData={sessionData.movements}
        onSubmission={handleEditSubmission}
        movementName={movementName}
        setMovementName={setMovementName}
        sets={sets}
        setSets={setSets}
        setMovementId={setMovementId}
        editingId={editingId}
        setEditingId={setEditingId}
      />

      {isAdding ? (
        <AddMovementForm
          onCancel={() => {
            setIsAdding(false);
            setMovementName("");
            setSets([{ weight: "", reps: "", rir: "" }]);
          }}
          onSubmission={handleAddSubmission}
          movementName={movementName}
          setMovementName={setMovementName}
          sets={sets}
          setSets={setSets}
        />
      ) : (
        <button type="button" onClick={() => setIsAdding(true)}>
          Add Movement
        </button>
      )}
    </div>
  );
}

function MovementDisplay({
  movementData,
  onSubmission,
  movementName,
  setMovementName,
  sets,
  setSets,
  setMovementId,
  editingId,
  setEditingId,
}) {
  const data = movementData;

  return (
    <div>
      {data.map((movement) =>
        editingId !== movement.id ? (
          <ul key={movement.id}>
            {movement.name}
            <SetDisplay setData={movement.sets} />
            <button
              type="button"
              onClick={() => {
                setEditingId(movement.id);
                setMovementId(movement.id);
                setMovementName(movement.name);
                setSets(movement.sets);
              }}
            >
              Edit Movement
            </button>
            <button type="button" onClick={() => setMovementId(movement.id)}>
              Delete Movement
            </button>
          </ul>
        ) : (
          <AddMovementForm
            onCancel={() => setEditingId("")}
            onSubmission={onSubmission}
            movementName={movementName}
            setMovementName={setMovementName}
            sets={sets}
            setSets={setSets}
          />
        )
      )}
    </div>
  );
}

function SetDisplay({ setData }) {
  const data = setData;
  return data.map((set) => (
    <li key={set.id}>{`${set.weight} x ${set.reps} ${set.rir} RIR`}</li>
  ));
}

function AddMovementForm({
  onCancel,
  onSubmission,
  movementName,
  setMovementName,
  sets,
  setSets,
}) {
  function handleAddSetForm() {
    setSets([...sets, { weight: "", reps: "", rir: "" }]);
  }
  function removeSetForm(index) {
    setSets(sets.filter((_, i) => index !== i));
  }

  function handleSetChange(index, setData) {
    setSets(sets.map((set, i) => (i === index ? setData : set)));
  }

  return (
    <form onSubmit={onSubmission}>
      <input
        type="text"
        name="name"
        placeholder="Movement Name"
        onChange={(e) => setMovementName(e.target.value)}
        value={movementName}
      ></input>
      {sets.map((set, i) => (
        <AddSetForm
          key={i}
          setData={set}
          index={i}
          onRemove={removeSetForm}
          onChange={handleSetChange}
        />
      ))}
      <button type="button" onClick={handleAddSetForm}>
        Add Set
      </button>
      <button type="submit">Confirm</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}
function AddSetForm({ setData, index, onRemove, onChange }) {
  const i = index;

  function handleChange(e) {
    onChange(i, { ...setData, [e.target.name]: e.target.value });
  }
  return (
    <div>
      <input
        type="number"
        name="weight"
        placeholder="weight"
        onChange={handleChange}
        value={setData.weight}
      ></input>
      <input
        type="number"
        name="reps"
        placeholder="reps"
        onChange={handleChange}
        value={setData.reps}
      ></input>
      <input
        type="number"
        name="rir"
        placeholder="rir"
        onChange={handleChange}
        value={setData.rir}
      ></input>
      <button type="button" onClick={() => onRemove(i)}>
        Remove Set
      </button>
    </div>
  );
}

export default App;
