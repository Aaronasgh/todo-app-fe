import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Add from "@mui/icons-material/Add";
import {
  List,
  ListItem,
  Typography,
  CardContent,
  CardActions,
  Box,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function TodoCard() {
  const cardMinHeight = 900;
  const cardWidth = 600;
  const cardBorderRadius = "16px";

  type Todo = {
    id: number;
    text: string;
  };

  const [todos, setTodos] = useState<Todo[]>([]);
  const [showInput, setShowInput] = useState(false);
  const [newTodoText, setNewTodoText] = useState("");

  const getTodos = async () => {
    const res = await fetch(`http://localhost:4000/todos`);
    const data = (await res.json()) as Todo[];
    console.log(data);
    setTodos(data);
  };

  const addTodos = async () => {
    const res = await fetch(`http://localhost:4000/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newTodoText }),
    });
    const data = (await res.json()) as Todo[];
    console.log(data);
    setTodos(data);
  };

  const handleAddTodo = () => {
    addTodos();
    setShowInput(false);
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
        justifyItems: "flex-start",
        borderColor: "black",
        borderRadius: cardBorderRadius,
      }}
    >
      {/* flexGrow set to 1 so CardContent fills remaining container space, resulting in CardActions staying at the bottom */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
          <Typography variant="h4">Todo List</Typography>
        </Box>

        {/* AddButton and Textfield */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            marginTop: 5,
            marginLeft: 5,
          }}
        >
          <Button
            component="label"
            variant="text"
            startIcon={<Add />}
            onClick={() => {
              setShowInput(true);
            }}
          >
            Add Todo
          </Button>
          {showInput && (
            <TextField
              autoFocus
              label="New Todo"
              value={newTodoText}
              onChange={(event) => {
                setNewTodoText(event.target.value);
                console.log(event.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleAddTodo();
                }
              }}
            />
          )}
        </Box>

        {/* Todo List */}
        <Typography variant="h5" sx={{ wordBreak: "break-word" }}>
          <List sx={{ listStyleType: "disc", marginLeft: 5 }}>
            {todos.map((todo) => {
              return (
                <ListItem key={todo.id} sx={{ display: "list-item" }}>
                  {todo.text}
                </ListItem>
              );
            })}
            {/* <ListItem sx={{ display: "list-item" }}>Buy Milk</ListItem>
            <ListItem sx={{ display: "list-item" }}>Do Laundry</ListItem>
            <ListItem sx={{ display: "list-item" }}>Buy Present</ListItem>
            <ListItem sx={{ display: "list-item" }}>Buy Present</ListItem>
            <ListItem sx={{ display: "list-item" }}>Buy Present</ListItem> */}
          </List>
        </Typography>
      </CardContent>
      <CardActions
        sx={{ display: "flex", justifyContent: "space-between", margin: 5 }}
      >
        <Button size="small">Previous Page</Button>
        <Button size="small">Next Page</Button>
      </CardActions>
    </Card>
  );
}
