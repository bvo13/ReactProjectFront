function SetDisplay({ setData }) {
  const data = setData;
  return data.map((set) => (
    <li key={set.id}>{`${set.weight} x ${set.reps} ${set.rir} RIR`}</li>
  ));
}

export default SetDisplay;