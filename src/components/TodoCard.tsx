import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { List, ListItem, Typography } from "@mui/material";
import { useEffect } from "react";

export default function TodoCard() {
  const cardMinHeight = 900;
  const cardWidth = 600;
  const cardBorderRadius = "16px";

  const getTodos = async () => {
    const res = await fetch(`http://localhost:4000/todos`);
    const data = await res.json();
    console.log(data);
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Card
      variant="outlined"
      sx={{
        width: cardWidth,
        minHeight: cardMinHeight,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        borderColor: "black",
        borderRadius: cardBorderRadius,
      }}
    >
      {/* flexGrow set to 1 so CardContent fills remaining container space, resulting in CardActions staying at the bottom */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h4"
          fontFamily="Apple Chancery"
          sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}
        >
          Todo List
        </Typography>
        <Typography variant="h5" sx={{ wordBreak: "break-word" }}>
          <List sx={{ listStyleType: "disc", margin: 5 }}>
            <ListItem sx={{ display: "list-item" }}>Buy Milk</ListItem>
            <ListItem sx={{ display: "list-item" }}>Do Laundry</ListItem>
            <ListItem sx={{ display: "list-item" }}>Buy Present</ListItem>
            <ListItem sx={{ display: "list-item" }}>Buy Present</ListItem>
            <ListItem sx={{ display: "list-item" }}>Buy Present</ListItem>
          </List>
        </Typography>
      </CardContent>
      <CardActions sx={{ margin: 5 }}>
        <Button size="small">Next Page</Button>
      </CardActions>
    </Card>
  );
}
