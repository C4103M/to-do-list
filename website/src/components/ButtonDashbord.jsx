function ButtonDashbord({ children, ...props}) {
  return (
    <button {...props} className="hover:bg-gray-200 p-2 rounded transition duration-300 block">
      {children}
    </button>
  );
}

export default ButtonDashbord;
