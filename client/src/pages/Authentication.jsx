import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  FormControl,
  FormLabel,
  Link,
  TextField,
  Typography,
  Stack,
  Card as MuiCard,
  Divider,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { styled, alpha } from "@mui/material/styles";
import { AuthContext } from "../contexts/AuthContext.jsx";

/* === Styled components === */
const Card = styled(MuiCard)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";

  return {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: "auto",
    borderRadius: 12,
    // sizing
    [theme.breakpoints.up("sm")]: {
      maxWidth: "450px",
    },
    // glass-like background
    backgroundColor: isDark
      ? alpha(theme.palette.background.paper, 0.12)
      : theme.palette.background.paper,
    // subtle border in dark
    border: isDark ? `1px solid ${alpha("#ffffff", 0.04)}` : undefined,
    // boxShadow: heavier and darker in dark mode
    boxShadow: isDark
      ? "0 6px 24px rgba(0,0,0,0.65), 0 12px 48px rgba(0,0,0,0.45)"
      : "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
    // backdrop blur for glass effect (nice in dark)
    backdropFilter: isDark ? "blur(6px)" : undefined,
  };
});

const SignInContainer = styled(Stack)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";

  return {
    minHeight: "100dvh",
    padding: theme.spacing(2),
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    // container background fallback color
    backgroundColor: isDark ? "#07060a" : "#f7fbff",
    // pseudo element for radial gradient / vignette
    "&::before": {
      content: '""',
      display: "block",
      position: "absolute",
      zIndex: -1,
      inset: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "50% 50%",
      backgroundSize: "cover",
      // dark radial gradient with subtle vignette
      backgroundImage: isDark
        ? "radial-gradient(1200px 600px at 10% 20%, rgba(70, 43, 120, 0.18), transparent 20%), radial-gradient(1000px 600px at 100% 50%, rgba(84, 55, 160, 0.18), transparent 20%), linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.6))"
        : "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
      // slight overlay for darkness
      opacity: 1,
    },
  };
});

/* === Dark theme provider (self-contained) === */
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#FF9839" }, // accent color similar to your sample
    background: {
      default: "#07060a",
      paper: "#0d0b10",
    },
    text: {
      primary: "#ffffff",
      secondary: alpha("#ffffff", 0.8),
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

/* === Page component === */
export default function Authentication() {
  //LetsMeet
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [formState, setFormState] = useState(0);

  const [open, setOpen] = useState(false);

  const { handleRegister, handleLogin } = useContext(AuthContext);

  let handleAuth = async (e) => {
    e.preventDefault();
    try {
      if(formState ===0){
        let result = await handleLogin(username,password)
        setMessage(result);
      }
      if (formState === 1) {
        let result = await handleRegister(name, username, password);
        console.log(result);
        setMessage(result);
      }
      setMessage("");
      setUsername("");
      setOpen(true);
      setError("");
      setFormState(0);
      setPassword("");
    } catch (err) {
      let message = err?.response?.data?.message || "Something went wrong!";
      setError(message);
      setTimeout(() => {
        setError("");
      }, 1000);
    }
  };

//   let handleAuth = async (e) => {
//   e.preventDefault();

//   try {
//     let result;

//     if (formState === 1) {
//       // --- Sign Up ---
//       result = await handleRegister(name, username, password);
//       setMessage("Registration successful! You can now sign in.");
//     } else {
//       // --- Sign In ---
//       result = await handleLogin(username, password);
//       setMessage("Login successful! Welcome back.");
//     }

//     console.log(result);

//     // --- Only reset fields on success ---
//     setUsername("");
//     setPassword("");
//     if (formState === 1) setName("");

//     // --- Optional: switch to login after signup ---
//     if (formState === 1) setFormState(0);

//     setError("");
//     setOpen(true);
//   } catch (err) {
//     // --- Handle errors gracefully ---
//     const message = err?.response?.data?.message || "Something went wrong!";
//     setError(message);
//     console.error("Auth error:", message);

//     setTimeout(() => {
//       setMessage("");
//       setError("");
//     }, 2000);
//   }
// };


  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <SignInContainer direction="column">
        <Card variant="outlined">
          {/* Header */}
          {/* <Typography
            component="h1"
            variant="h4"
            sx={{
              width: "100%",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              color: "text.primary",
              fontSize: { xs: "1.6rem", sm: "2rem" },
            }}
          >
            <Box component="span" sx={{ color: "primary.main", mr: 1 }}>
              Connect
            </Box>
            with your loved Ones
          </Typography> */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2, // spacing between buttons
              mb: 2, // optional margin bottom
            }}
          >
            <Button
              variant={formState === 0 ? "contained" : "outlined"}
              onClick={() => setFormState(0)}
            >
              Sign In
            </Button>
            <Button
              variant={formState === 1 ? "contained" : "outlined"}
              onClick={() => setFormState(1)}
            >
              Sign Up
            </Button>
          </Box>
          {/* Form */}
          <Box
            component="form"
            onSubmit={handleAuth}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
              mt: 1,
            }}
          >
            {formState === 1 ? (
              <FormControl fullWidth>
                <FormLabel sx={{ color: "text.secondary", mb: 1 }}>
                  FullName
                </FormLabel>
                <TextField
                  onChange={(e) => setName(e.target.value)}
                  id="fullname"
                  name="fullname"
                  placeholder="Enter your Fullname"
                  required
                  fullWidth
                  variant="filled"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  sx={{
                    bgcolor: alpha("#ffffff", 0.02),
                    borderRadius: 1,
                    "& .MuiFilledInput-root": { background: "transparent" },
                  }}
                />
              </FormControl>
            ) : (
              <></>
            )}

            <FormControl fullWidth>
              <FormLabel sx={{ color: "text.secondary", mb: 1 }}>
                Username
              </FormLabel>
              <TextField
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                name="username"
                type="email"
                placeholder="Enter your Username"
                required
                fullWidth
                variant="filled"
                InputProps={{
                  disableUnderline: true,
                }}
                sx={{
                  bgcolor: alpha("#ffffff", 0.02),
                  borderRadius: 1,
                  "& .MuiFilledInput-root": { background: "transparent" },
                }}
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel sx={{ color: "text.secondary", mb: 1 }}>
                Password
              </FormLabel>
              <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                type="password"
                placeholder="••••••"
                required
                fullWidth
                variant="filled"
                InputProps={{
                  disableUnderline: true,
                }}
                sx={{
                  bgcolor: alpha("#ffffff", 0.02),
                  borderRadius: 1,
                }}
              />
            </FormControl>

            <p style={{ color: "red" }}>{error}</p>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              // onClick={handleAuth}
              sx={{
                py: 1.2,
                fontWeight: 700,
                letterSpacing: 0.2,
                bgcolor: "primary.main",
                "&:hover": { bgcolor: "primary.dark" },
              }}
            >
              {formState === 0 ? "LogIn" : "Register"}
            </Button>
          </Box>
        </Card>
        <Snackbar open={open} autoHideDuration={4000} message={message} />
      </SignInContainer>
    </ThemeProvider>
  );
}
