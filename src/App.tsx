import "./App.css";
import TodoCard from "./components/TodoCard";
import { Grid, ThemeProvider } from "@mui/material";
import theme from "./utils/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;
