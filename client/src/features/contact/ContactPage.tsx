import {
  Box,
  Typography,
  Button,
  ButtonGroup,
  Paper,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { decrement, increment } from "./counterSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";

export default function ContactPage() {
  const dispatch = useAppDispatch();
  const { data, title } = useAppSelector((state) => state.counter);

  return (
    <Box
      minHeight="100vh"
      bgcolor="#f0f4f8"
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={2}
    >
      <Paper
        elevation={4}
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          width: "100%",
          maxWidth: 520,
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        {/* Gradient Header */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #4f46e5, #3b82f6)",
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h5"
            fontWeight={700}
            color="#fff"
            fontFamily="Poppins"
          >
            {title}
          </Typography>
        </Box>

        {/* Content Area */}
        <Box px={4} py={3} bgcolor="#fff">
          <Typography
            variant="body1"
            color="text.secondary"
            textAlign="center"
            mb={2}
          >
            Current Value: <strong>{data}</strong>
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Box display="flex" justifyContent="center">
            <ButtonGroup
              variant="contained"
              sx={{
                "& .MuiButton-root": {
                  backgroundColor: "#3b82f6",
                  color: "#fff",
                  fontWeight: 600,
                  textTransform: "none",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#2563eb",
                    transform: "scale(1.05)",
                  },
                },
              }}
            >
              <Button startIcon={<RemoveIcon />} onClick={() => dispatch(decrement(1))}>
                Decrement
              </Button>
              <Button startIcon={<AddIcon />} onClick={() => dispatch(increment(1))}>
                Increment
              </Button>
              <Button onClick={() => dispatch(increment(5))}>
                Increment 5
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
