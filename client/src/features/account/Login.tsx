import React from 'react';
import {
  Box,
  CssBaseline,
  FormControl,
  TextField,
  Typography,
  Link,
  Container,
  Paper,
} from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch } from '../../app/store/configureStore';
import { signInUser } from './accountSlice'; // ✅ Only keep the necessary imports

interface LoginFormInputs {
  username: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm<LoginFormInputs>({ mode: 'onTouched' });

  async function submitForm(data: LoginFormInputs) {
    try {
      await dispatch(signInUser(data)).unwrap(); // ✅ unwrap to throw on failure
      navigate(location.state?.from || '/catalog');
    } catch (error) {
      console.error('Login failed:', error);
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
        Sign in
      </Typography>

      <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 2 }}>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            autoFocus
            {...register('username', { required: 'Username is required' })}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            label="Password"
            type="password"
            placeholder="••••••"
            fullWidth
            margin="normal"
            {...register('password', { required: 'Password is required' })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </FormControl>

        <LoadingButton
          disabled={!isValid}
          loading={isSubmitting}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign in
        </LoadingButton>

        <Link
          component={RouterLink}
          to="/register"
          sx={{ display: 'block', mt: 2, textAlign: 'center' }}
        >
          Don’t have an account? Sign Up
        </Link>
      </Box>
    </Container>
  );
}
