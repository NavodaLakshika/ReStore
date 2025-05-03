import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

interface Props {
  message?: string;
}

export default function LoadingComponent({ message = "Loading..." }: Props) {
  return (
    <Backdrop
      open={true}
      invisible={false}
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress color="inherit" size={40} thickness={4} />
        <Typography
          variant="h6"
          sx={{ mt: 2, fontWeight: "bold", textAlign: "center", color: "white" }}
        >
          {message}
        </Typography>
      </Box>
    </Backdrop>
  );
}
