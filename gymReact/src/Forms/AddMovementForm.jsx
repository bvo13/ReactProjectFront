import Input from "../ReusableComponents/FormInput";
import Button from "../ReusableComponents/Button";
import AddSetForm from "./AddSetForm";

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
      <Input
        type="text"
        name="name"
        placeholder="Movement Name"
        onChange={(e) => setMovementName(e.target.value)}
        value={movementName}
      />
      {sets.map((set, i) => (
        <AddSetForm
          key={i}
          setData={set}
          index={i}
          onRemove={removeSetForm}
          onChange={handleSetChange}
        />
      ))}
      <Button onClick={handleAddSetForm}>Add Set</Button>
      <Button type="submit">Confirm</Button>
      <Button onClick={onCancel}>Cancel</Button>
    </form>
  );
}
export default AddMovementForm;