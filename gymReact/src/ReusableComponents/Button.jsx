function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  className="",
  size = "h-12 w-36",
}) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`bg-blue-300 text-white hover:bg-blue-500 ${size} rounded-3xl ${className} disabled:bg-gray-500 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
}

export default Button;