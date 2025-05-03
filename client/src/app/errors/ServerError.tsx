import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

interface ServerErrorState {
    error: {
        detail: string;
        title: string;
        details?: string;
    };
}

export default function ServerError() {
    const { state } = useLocation() as { state?: ServerErrorState };
    const navigate = useNavigate();

    return (
        <Container component={Paper} sx={{ padding: 4 }}>
            {state?.error ? (
                <>
                    <Typography gutterBottom variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                        {state.error.title}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="body1" sx={{ mb: 2 }}>
                        {state.error.detail || 'Internal server error'}
                    </Typography>
                </>
            ) : (
                <Typography gutterBottom variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                    Server Error
                </Typography>
            )}

            <Button onClick={() => navigate('/')} variant="contained" color="primary">
                Back to Home
            </Button>
        </Container>
    );
}
