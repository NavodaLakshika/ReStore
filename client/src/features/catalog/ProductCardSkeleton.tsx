import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Skeleton,
} from "@mui/material";

export default function ProductCardSkeleton() {
  return (
    <Box
      sx={{
        width: 300,
        m: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Card>
        <CardHeader
          avatar={
            <Skeleton animation="wave" variant="circular" width={40} height={40} />
          }
          title={
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              sx={{ mb: 1 }}
            />
          }
        />
        <Skeleton
          sx={{ height: 190 }}
          animation="wave"
          variant="rectangular"
        />
        <CardContent>
          <Skeleton animation="wave" height={10} sx={{ mb: 1 }} />
          <Skeleton animation="wave" height={10} width="80%" />
        </CardContent>
        <CardActions>
          <Skeleton animation="wave" height={10} width="40%" />
          <Skeleton animation="wave" height={10} width="20%" />
        </CardActions>
      </Card>
    </Box>
  );
}
