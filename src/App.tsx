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
        sx={{ minHeight: "100vh", pt: 25 }}
      >
        <Grid>
          <TodoCard />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
