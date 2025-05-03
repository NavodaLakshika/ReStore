import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom"; // ✅ Add this line

export default function NotFound() {
  return (
    <Container
      component={Paper}
      sx={{
        height: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        gutterBottom
        variant="h4"
        sx={{ fontWeight: "bold", textAlign: "center" }}
      >
        Oooops - we could not find what you are looking for
      </Typography>
      <Divider />
      <Button
        fullWidth
        component={Link}
        to="/catalog"
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        Go back to shop
      </Button>
    </Container>
  );
}
