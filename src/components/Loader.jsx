const Loader = ({ when, children }) => {
  if (when) {
    return <div className="flex min-h-screen min-w-full place-items-center justify-center">Loading...</div>;
  }
  return children;
};

export default Loader;