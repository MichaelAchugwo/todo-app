import CircularProgress from "@mui/material/CircularProgress";

const Loader = ({ when, children }) => {
  if (when) {
    return (
      <div className="flex min-h-80 min-w-full place-items-center justify-center">
        <CircularProgress color="inherit" />
      </div>
    );
  }
  return children;
};

export default Loader;