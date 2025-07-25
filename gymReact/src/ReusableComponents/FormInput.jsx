function Input({ type, name, value, id, onChange, placeholder, className = "" }) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      id={id}
      onChange={onChange}
      placeholder={placeholder}
      className={`bg-white border-2 border-blue-300 ${className}`}
    ></input>
  );
}
export default Input;
