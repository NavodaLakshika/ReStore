import React, { useState } from 'react';
import {
  Box,
  CssBaseline,
  FormControl,
  TextField,
  Typography,
  Link,
  Container,
  Paper,
  Alert,
  AlertTitle,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm, FieldValues } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { agent } from '../../app/api/agent';
import { toast } from 'react-toastify';

export default function Register() {
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors, isValid },
  } = useForm<FieldValues>({
    mode: 'all',
  });

  function handleApiErrors(errors: any) {
    if (Array.isArray(errors)) {
      setValidationErrors(errors);
      errors.forEach((error: string) => {
        if (error.toLowerCase().includes('password')) {
          setError('password', { message: error });
        } else if (error.toLowerCase().includes('email')) {
          setError('email', { message: error });
        } else if (error.toLowerCase().includes('username')) {
          setError('username', { message: error });
        }
      });
    } else if (errors?.data?.errors) {
      const flatErrors = Object.values(errors.data.errors).flat() as string[];
      setValidationErrors(flatErrors);
      flatErrors.forEach((error: string) => {
        if (error.toLowerCase().includes('password')) {
          setError('password', { message: error });
        } else if (error.toLowerCase().includes('email')) {
          setError('email', { message: error });
        } else if (error.toLowerCase().includes('username')) {
          setError('username', { message: error });
        }
      });
    } else {
      setValidationErrors(['An unexpected error occurred.']);
    }
  }

  return (
    <Container
      component={Paper}
      maxWidth="sm"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}
    >
      <CssBaseline />
      <Typography component="h1" variant="h5" align="center" gutterBottom>
        Register
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit((data) =>
          agent.Account.register(data)
          .then(()=>{
            toast.success('Registration successful - you can now login');
            navigate('/login');
          })
          .catch((error) => handleApiErrors(error))
        )}
        noValidate
        sx={{ mt: 1 }}
      >
        {/* Username */}
        <FormControl fullWidth margin="normal">
          <TextField
            label="Username"
            fullWidth
            {...register('username', { required: 'Username is required' })}
            error={!!errors.username}
            helperText={errors.username ? String(errors.username.message) : ''}
          />
        </FormControl>

        {/* Email */}
       <FormControl fullWidth margin="normal">
  <TextField
    label="Email"
    fullWidth
    {...register('email', { 
      required: 'Email is required',
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address',
      },
    })}
    error={!!errors.email}
    helperText={errors.email ? String(errors.email.message) : ''}
  />
</FormControl>

        {/* Password */}
        <FormControl fullWidth margin="normal">
  <TextField
    label="Password"
    type="password"
    fullWidth
    {...register('password', {
      required: 'Password is required',
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
        message: 'Password must be at least 6 characters and include uppercase, lowercase, and a number',
      },
    })}
    error={!!errors.password}
    helperText={errors.password ? String(errors.password.message) : ''}
  />
</FormControl>
        {/* Server Validation Errors */}
        {validationErrors.length > 0 && (
          <Alert severity="error" sx={{ mt: 2 }}>
            <AlertTitle>Validation Errors</AlertTitle>
            <List>
              {validationErrors.map((err, index) => (
                <ListItem key={index}>
                  <ListItemText primary={err} />
                </ListItem>
              ))}
            </List>
          </Alert>
        )}

        {/* Submit Button */}
        <LoadingButton
          disabled={!isValid}
          loading={isSubmitting}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Register
        </LoadingButton>

        {/* Link to Login */}
        <Link
          component={RouterLink}
          to="/login"
          sx={{ display: 'block', mt: 2, textAlign: 'center' }}
        >
          Already have an account? Sign In
        </Link>
      </Box>
    </Container>
  );
}
