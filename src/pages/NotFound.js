import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import classes from "../styles/NotFound.module.css";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className={classes.container}>
      <div className={classes.text}>
        <WarningAmberIcon color="error" className={classes.icon} />
        Page not found, please return.
      </div>
      <Button
        variant="outlined"
        startIcon={<ChevronLeftIcon />}
        onClick={() => {
          navigate("./");
        }}
      >
        Return
      </Button>
    </div>
  );
}

export default NotFound;
