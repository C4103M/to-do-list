function Button({ type = "button", children, onClick }) {
  return (
    <button
      className="py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors w-full"
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
