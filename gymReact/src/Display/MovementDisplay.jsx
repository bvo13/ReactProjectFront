import SetDisplay from "./SetDisplay";
import Button from "../ReusableComponents/Button";
import AddMovementForm from "../Forms/AddMovementForm";

function MovementDisplay({
  isAdding,
  handleDelete,
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

  return (<div className="w-full max-w-md mx-auto">
    <div className="max-h-[500px] overflow-y-auto flex flex-col items-center w-full space-y-4 mb-7 border-2">
      {data.map((movement) =>
        editingId !== movement.id ? (
          <div key={movement.id} className="w-full max-w-md bg-white rounded-lg shadow p-4 flex flex-col items-center space-y-2 mb-5">
          <ul >
            <h2 className="text-lg font-semibold text-center">
            {movement.name}
            </h2>
            <SetDisplay setData={movement.sets} />
            <div className= "flex space-x-2">
            <Button
              disabled={isAdding}
              onClick={() => {
                setEditingId(movement.id);
                setMovementId(movement.id);
                setMovementName(movement.name);
                setSets(movement.sets);
              }}
            >
              Edit Movement
            </Button>
            <Button
              disabled={isAdding}
              onClick={() => {handleDelete(movement.id)}}
            >
              Delete Movement
            </Button>
            </div>
          </ul>
          </div>
        ) : (
          <AddMovementForm
            onCancel={() => {
              setEditingId("");
              setMovementId("");
              setSets([{ weight: "", reps: "", rir: "" }]);
              setMovementName('')
            }}
            onSubmission={onSubmission}
            movementName={movementName}
            setMovementName={setMovementName}
            sets={sets}
            setSets={setSets}
          />
        )
      )}
    </div>
    </div>
  );
}
export default MovementDisplay;