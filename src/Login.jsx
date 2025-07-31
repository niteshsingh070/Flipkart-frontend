import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    setError("");
    const res = await fetch(
      "https://flipkart-backend-6frd.onrender.com/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      }
    );
//     //new change 
//     const data = await res.json();
//    if (data.success || data.token || data.user) {
//   localStorage.setItem("token", data.token);          // ✅ Save token
//   localStorage.setItem("userId", data.user._id);      // ✅ Save userId temporarily
//   navigate("/");                                      // ✅ Redirect after login
// } else {
//   setError(data.error || "Login failed");
// }
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      navigate("/");
    } else {
      setError(data.error || "Login failed");
    }
  };
  return (
    <Box maxWidth={400} mx="auto" p={2}>
      <TextField
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Email"
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        fullWidth
        margin="normal"
        variant="outlined"
      />
      {error && (
        <Box color="red" my={1}>
          {error}
        </Box>
      )}
      <Button
        onClick={handleLogin}
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Login
      </Button>
      <Box mt={2} textAlign="center">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </Box>
    </Box>
  );
}
export default Login;
