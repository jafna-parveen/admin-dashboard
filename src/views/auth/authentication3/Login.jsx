import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { Box, Button, Card, IconButton, InputAdornment, Stack, Typography, Divider } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import FormikTextField from 'ui-component/common/loginInput';
import { userLogin } from 'container/LoginContainer/slice';
import { getRatingCount } from 'container/RatingContainer/slice';

import logo from 'assets/images/logo-removebg-preview.png';
const AppVersion = import.meta.env.VITE_APP_VERSION;

const AuthLogin = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = Yup.object({
    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    ['user_id', 'full_name', 'sid', 'user_image'].forEach((cookie) => Cookies.remove(cookie));
  }, []);

  useEffect(() => {
    if (props.failAction?.statusText) {
      setLoginError(props.failAction.statusText);
      const timeout = setTimeout(() => setLoginError(''), 3000);
      return () => clearTimeout(timeout);
    }
  }, [props.failAction]);

  const handleTogglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: "rgb(230, 237, 248)",
        px: 2
      }}
    >
      <Card
        sx={{
          width: { xs: '100%', sm: '400px', md: '450px' },
          p: { xs: 3, sm: 4 },
          borderRadius: 3,

          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow:
            "1px 8px 10px #0f172a",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5
          }}
        >
          <Box component="img" src={logo} sx={{ height: 60 }} />

          {/* Text Container */}
          <Box sx={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>

            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 24,
                color: "#ea580c",
                fontFamily: "Times New Roman",
              }}
            >
              NXTSTEP
            </Typography>

            <Typography
              sx={{
                fontFamily: "Times New Roman",
                fontSize: 15,
                color: "#0f172a",
                lineHeight: 1,
                mb: 3

              }}
            >
              Design Your Future
            </Typography>

          </Box>
        </Box>

        <Typography
          variant="h4"
          component="h1"
          sx={{
            mb: 2,
            fontWeight: 700,
            textAlign: 'center',
            letterSpacing: 0.5,
            color: '#0f172a'
          }}
        >
          Welcome Back
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 3,
            textAlign: 'center',
            color: '#0f172a'
          }}
        >
          Log in to your account to continue
        </Typography>

        <Formik
          initialValues={{ client_id: 'webapp', client_secret: 'saqw21!@', email: '', password: '' }}
          validationSchema={validate}
          onSubmit={(values) => dispatch(userLogin({ ...values, navigate }))}
        >
          {() => (
            <Form style={{ width: '100%' }}>
              <Stack spacing={2}>
                <FormikTextField name="email" label="Email Address" type="text" fullWidth />
                <FormikTextField
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 1,
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: 16,
                    color: '#fff',
                    backgroundColor: '#ea580c',
                    borderRadius: 2,
                    border: '1px solid #0f172a',
                    boxShadow: '0px 4px 10px rgba(0,0,0,0.15)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#0f172a',
                      color: '#ea580c',
                      border: '1px solid #0f172a'
                    }
                  }}
                >
                  Login
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>

        {loginError && (
          <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
            {loginError}
          </Typography>
        )}

        <Divider sx={{ my: 3, width: '100%' }} />

        <Typography variant="body2" sx={{ textAlign: 'center', padding: '10px', textDecoration: 'none' }}>
          Designed and Developed by NXT STEP
        </Typography>
        <Typography color="primary.main" fontWeight="100">
          Version : {AppVersion}
        </Typography>
      </Card>
    </Box>
  );
};

export default AuthLogin;