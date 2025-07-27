import Input from "../ReusableComponents/FormInput";
import Button from "../ReusableComponents/Button";
function AddSetForm({ setData, index, onRemove, onChange }) {
  const i = index;

  function handleChange(e) {
    onChange(i, { ...setData, [e.target.name]: e.target.value });
  }
  return (
    <div className="flex flex-col items-center m-3">
      <Input
        type="number"
        name="weight"
        placeholder="weight"
        onChange={handleChange}
        value={setData.weight}
      />
      <Input
        type="number"
        name="reps"
        placeholder="reps"
        onChange={handleChange}
        value={setData.reps}
      />
      <Input
        type="number"
        name="rir"
        placeholder="rir"
        onChange={handleChange}
        value={setData.rir}
      />
      <Button size="h-6 w-6 rounded-full" onClick={() => onRemove(i)}>
        -
      </Button>
    </div>
  );
}
export default AddSetForm;