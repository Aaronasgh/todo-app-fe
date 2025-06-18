import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

export default function TodoCard() {
  return (
    <Card
      variant="outlined"
      sx={{
        width: 400,
        minHeight: 600,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "stretch",
      }}
    >
      <CardContent
        sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}
      >
        <Typography variant="h5">Todo List</Typography>
        <Typography variant="h5">Todo List</Typography>
        <Typography variant="h5">Todo List</Typography>
        <Typography variant="h5">Todo List</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
