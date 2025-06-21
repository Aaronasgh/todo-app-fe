import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { List, ListItem, Typography } from "@mui/material";

export default function TodoCard() {
  const cardMinHeight = 600;
  const cardWidth = 400;
  const cardBorderRadius = "16px";

  return (
    <Card
      variant="outlined"
      sx={{
        width: cardWidth,
        minHeight: cardMinHeight,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        borderRadius: cardBorderRadius,
      }}
    >
      {/* flexGrow set to 1 so CardContent fills remaining container space, resulting in CardActions staying at the bottom */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h5"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          Todo List
        </Typography>
        <Typography
          sx={{
            wordBreak: "break-word",
          }}
        >
          <List sx={{ listStyleType: "disc", margin: 5 }}>
            <ListItem sx={{ display: "list-item" }}>
              abcdefghajklmnopqrstuvxyzabcdefghajklmnopqrstuvxyzabcdefghajklmnopqrstuvxyz
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>Test</ListItem>
            <ListItem sx={{ display: "list-item" }}>Test</ListItem>
          </List>
        </Typography>
      </CardContent>
      <CardActions sx={{ margin: 5 }}>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
