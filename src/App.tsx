import "./App.css";
import TodoCard from "./components/todoCard";
import { Grid } from "@mui/material";

function App() {
  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="flex-start"
        sx={{ minHeight: "66vh" }}
      >
        <Grid>
          <TodoCard />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
