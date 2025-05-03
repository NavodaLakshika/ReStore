import {
    Alert,
    AlertTitle,
    Button,
    ButtonGroup,
    Container,
    List,
    ListItem,
    ListItemText,
    Typography
  } from "@mui/material";
  import { useState } from "react";
  import { agent } from "../../app/api/agent";
  
  export default function AboutPage() {
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
  
    function getValidationError() {
      agent.TestErrors.GetValidationError()
        .then(() => console.log("This should not be called."))
        .catch((error: string[]) => {
          setValidationErrors(error);
        });
    }
  
    return (
      <Container>
        <Typography
          gutterBottom
          variant="h4"
          style={{ fontWeight: "bold", textAlign: "center" }}
        >
          Errors for testing purposes
        </Typography>
  
        <ButtonGroup orientation="vertical" fullWidth>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              agent.TestErrors.Get400Error().catch((error: any) =>
                console.log(error)
              )
            }
          >
            Test 400 Error
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              agent.TestErrors.Get401Error().catch((error: any) =>
                console.log(error)
              )
            }
          >
            Test 401 Error
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              agent.TestErrors.Get404Error().catch((error: any) =>
                console.log(error)
              )
            }
          >
            Test 404 Error
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              agent.TestErrors.Get500Error().catch((error: any) =>
                console.log(error)
              )
            }
          >
            Test 500 Error
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={getValidationError}
          >
            Test Validation Error
          </Button>
        </ButtonGroup>
  
        {validationErrors.length > 0 && (
          <Alert severity="error" style={{ marginTop: "20px" }}>
            <AlertTitle>Validation Errors</AlertTitle>
            <List>
              {validationErrors.map((error) => (
                <ListItem key={error}>
                  <ListItemText primary={error} />
                </ListItem>
              ))}
            </List>
          </Alert>
        )}
      </Container>
    );
  }
  