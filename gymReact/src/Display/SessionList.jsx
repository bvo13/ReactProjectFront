import { useNavigate } from "react-router-dom";
import { apiFetch } from "../Helpers/apiHelper";
import Button from "../ReusableComponents/Button";
import Input from "../ReusableComponents/FormInput";
import { useEffect, useState } from "react";


function SessionList() {
  const nav = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [addingSession, setAddingSession] = useState(false);
  const [date, setDate] = useState("");

  
  async function getSessions() {
    try {
      const data = await apiFetch(`/users/me/sessions`, {
        method: "GET",
      });
      setSessions(data);
    } catch (error) {
      throw new Error("failed");
    }
  }
  useEffect(() => {
    getSessions();
  }, []);

  async function handleSessionCreation(e) {
    e.preventDefault();
    try {
      const data = await apiFetch(`/users/me/sessions`, {
        method: "POST",
        body: JSON.stringify({ date: date, movements: [] }),
      });
      alert("session created");
      await getSessions();
      setAddingSession(false);
    } catch (error) {
      throw new Error("failed");
    }
  }
  return (
    <div>
      {sessions.length === 0 ? (
        <p>No sessions found</p>
      ) : (
        sessions.map((session) => {
          return (
            <Button
              key={session.id}
              onClick={() => {
                nav(`/sessions/${session.id}`);
              }}
            >
              {session.date}
            </Button>
          );
        })
      )}
      {!addingSession ? (
        <Button size="h-6 w-6" onClick={() => setAddingSession(true)}>
          +
        </Button>
      ) : (
        <form onSubmit={handleSessionCreation}>
          <Input
            type="date"
            placeholder="enter date in format year-month-day"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button type="submit">Create Session</button>
          <button type="button" onClick={() => setAddingSession(false)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}
export default SessionList;
