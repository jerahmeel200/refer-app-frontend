import React, { useState } from "react";
import Button from "@mui/material/Button";

function App() {
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleSnackbarClick = () => {
    setShowSnackbar(true);

    // Hide the snackbar after 3 seconds
    setTimeout(() => {
      setShowSnackbar(false);
    }, 4000);
  };

  return (
    <div style={{ margin: 20 }}>
      {showSnackbar && (
        <div
          style={{
            background: "whitesmoke",
          }}
        >
          Please be nice 😊{" "}
        </div>
      )}
      <input
        style={{ border: "1px solid red" }}
        type="text"
        placeholder="Enter text"
      />
      <br />
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, width: "fit-content" }}
        onClick={handleSnackbarClick}
      >
        Check profanity
      </Button>
    </div>
  );
}

export default App;
