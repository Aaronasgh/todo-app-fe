import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Add from "@mui/icons-material/Add";
import {
  List,
  ListItem,
  Typography,
  CardContent,
  CardActions,
  Box,
  TextField,
  Checkbox,
  IconButton,
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
  const [showCheckmarks, setShowCheckmarks] = useState(false);
  const [selectedTodos, setSelectedTodos] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const TODOS_PER_PAGE = 5;

  const paginatedTodos = todos.slice(
    currentPage * TODOS_PER_PAGE,
    currentPage * TODOS_PER_PAGE + TODOS_PER_PAGE
  );

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

  const deleteTodos = async () => {
    const res = await fetch(`http://localhost:4000/todos`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedTodos),
    });
    const data = (await res.json()) as Todo[];
    console.log(data);
    setTodos(data);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleAddTodo = () => {
    addTodos();
    setShowInput(false);
    setNewTodoText("");
  };

  const handleDeleteTodos = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${selectedTodos.length} Todos?`
    );
    if (confirmed) {
      deleteTodos();
      setSelectedTodos([]);
    }
  };

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
                if (event.key === "Enter" && newTodoText != "") {
                  handleAddTodo();
                } else if (
                  (event.key === "Enter" && newTodoText === "") ||
                  event.key === "Escape"
                ) {
                  setShowInput(false);
                  return;
                }
              }}
            />
          )}
        </Box>

        {/* Todo List */}
        <Typography variant="h5" sx={{ wordBreak: "break-word" }}>
          <List sx={{ listStyleType: "disc", marginLeft: 5 }}>
            {paginatedTodos.map((todo) => {
              return (
                <ListItem
                  key={todo.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingLeft: 0,
                    listStyleType: "disc",
                  }}
                >
                  {todo.text}
                  {/* Checkboxes */}
                  {showCheckmarks && (
                    <Checkbox
                      color="error"
                      checked={selectedTodos.includes(todo.id)}
                      sx={{
                        marginLeft: 2,
                        padding: 0, // remove padding inside checkbox container to avoid ListItems being pushed down
                      }}
                      onChange={(event) => {
                        console.log(selectedTodos);
                        if (event.target.checked) {
                          setSelectedTodos((prev) => [...prev, todo.id]);
                        } else {
                          setSelectedTodos((prev) =>
                            prev.filter((id) => id !== todo.id)
                          );
                        }
                      }}
                    />
                  )}
                </ListItem>
              );
            })}
          </List>
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: 5,
          marginBottom: 2,
        }}
      >
        <Box>
          {/* Delete IconButton */}
          <IconButton
            onClick={() => {
              setShowCheckmarks(!showCheckmarks);
              if (showCheckmarks === false) setSelectedTodos([]);
            }}
          >
            <DeleteIcon
              sx={{
                color: showCheckmarks && todos.length != 0 ? "red" : "inherit",
              }}
            />
          </IconButton>
          {/* Delete Confirm Button */}
          {selectedTodos.length != 0 && showCheckmarks === true && (
            <Button
              size="small"
              sx={{ color: "red", marginLeft: 3 }}
              onClick={() => {
                handleDeleteTodos();
                console.log(selectedTodos);
              }}
            >
              Delete Todos
            </Button>
          )}
        </Box>

        {/* Pageselect Buttons */}
        <Box>
          <Button
            size="small"
            sx={{ marginRight: 3 }}
            disabled={currentPage === 0}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          >
            Previous Page
          </Button>
          <Button
            size="small"
            disabled={(currentPage + 1) * TODOS_PER_PAGE >= todos.length}
            onClick={() =>
              setCurrentPage((prev) =>
                (prev + 1) * TODOS_PER_PAGE < todos.length ? prev + 1 : prev
              )
            }
          >
            Next Page
          </Button>
        </Box>
      </CardActions>
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", marginRight: 12 }}
      >
        <Typography sx={{ marginBottom: 8 }}>{currentPage + 1}</Typography>
      </Box>
    </Card>
  );
}
