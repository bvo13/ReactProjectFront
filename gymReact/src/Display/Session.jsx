import { apiFetch } from "../Helpers/apiHelper";
import Button from "../ReusableComponents/Button";
import Input from "../ReusableComponents/FormInput";
import MovementDisplay from "./MovementDisplay";
import AuthenticatedPageLayout from "../ReusableComponents/AuthenticatedPageLayout";
import AddMovementForm from "../Forms/AddMovementForm";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
      const data = await apiFetch(`/users/me/sessions/${sessionId}`, {
        method: "GET",
      });

      console.log(data);
      setSessionData(data);
    } catch (error) {
      console.error(error);
      nav("/sessions");
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
      const data = await apiFetch(
        `/users/me/sessions/${sessionId}/movements/${movementId}`,
        {
          method: "PUT",
          body: JSON.stringify(movement),
        }
      );
      alert("successful edit");
      setEditingId("");
      setMovementId("");
      setSets([{ weight: "", reps: "", rir: "" }]);
      setMovementName("");
      await getSession();
    } catch (error) {
      throw new Error("error");
    }
  }
  async function handleAddSubmission(e) {
    e.preventDefault();
    try {
      const movement = { name: movementName, sets: sets };
      const data = await apiFetch(`/users/me/sessions/${sessionId}/movements`, {
        method: "POST",
        body: JSON.stringify(movement),
      });
      alert("movement added!");
      await getSession();
      setIsAdding(false);
      setMovementName("");
      setSets([{ weight: "", reps: "", rir: "" }]);
      setEditingId("");
      setMovementId("");
    } catch (error) {
      throw new Error("error");
    }
  }

  async function handleDelete(id) {
    try {
      const data = await apiFetch(
        `/users/me/sessions/${sessionId}/movements/${id}`,
        {
          method: "DELETE",
        }
      );
      alert("deleted movement");
      await getSession();
    } catch (error) {
      console.error(error);
      alert("an error occurred while deleting");
    }
  }

  async function deleteSession() {
    try {
      await apiFetch(`/users/me/sessions/${sessionId}`, {
        method: "DELETE",
      });
      alert("session deleted");
      nav("/sessions");
    } catch (error) {
      throw new Error("error");
    }
  }
  async function handleDateChange(e) {
    e.preventDefault();
    try {
      const data = await apiFetch(`/users/me/sessions/${sessionId}`, {
        method: "PATCH",
        body: JSON.stringify({ date: dateForm }),
      });
      alert("date changed");
      setEditingDate(false);
      await getSession();
    } catch (error) {
      throw new Error("error");
    }
  }

  return !sessionData || !Array.isArray(sessionData.movements) ? (
    <div>loading data</div>
  ) : (
    <AuthenticatedPageLayout title={sessionData.date}>
      <div className="" key={sessionId}>
        <Button className="absolute left-0 top-0" onClick={deleteSession}>
          Delete Session
        </Button>
        {!editingDate ? (
          <div>
            <Button
              className="mb-10"
              onClick={() => {
                setEditingDate(true);
                setDateForm(sessionData.date);
              }}
            >
              Change Date
            </Button>
          </div>
        ) : (
          <form onSubmit={handleDateChange}>
            <Input
              type="date"
              onChange={(e) => setDateForm(e.target.value)}
              value={dateForm}
            />
            <Button type="submit">Confirm</Button>{" "}
            <Button onClick={() => setEditingDate(false)}>Cancel</Button>
          </form>
        )}
        <div className="flex flex-col flex-grow items-center justify-center">
          <MovementDisplay
            isAdding={isAdding}
            handleDelete={handleDelete}
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
            <Button
              disabled={editingId !== ""}
              onClick={() => setIsAdding(true)}
            >
              Add Movement
            </Button>
          )}
        </div>
      </div>
    </AuthenticatedPageLayout>
  );
}

export default Session;
