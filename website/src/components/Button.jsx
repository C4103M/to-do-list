function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className=" py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
    >
      {children}
    </button>
  );
}

export default Button;
