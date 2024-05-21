import React, { useState, useContext } from "react";
import { PostsContext } from "./PostsProvider.js";
import axios from "axios";

export default function SignInOrUp() {
  const [mode, setMode] = useState(true); // true: SignIn , false: SignUp
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signedIn, setSignedIn, userID, setUserId } = useContext(PostsContext);
  const handleModeToggle = () => {
    setMode(!mode);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (mode) {
      // SignIn 모드일 때
      try {
        const response = await axios.post("/users/login", {
          email,
          password,
        });
        console.log("Signin successful:", response.data);
        setSignedIn(true);
        setUserId(response.data._id);
      } catch (error) {
        console.error("Signin error:", error);
      }
    } else {
      // SignUp 모드일 때
      try {
        const response = await axios.post("/users/signup", {
          email,
          password,
        });
        console.log("Signup successful:", response.data);
      } catch (error) {
        console.error("Signup error:", error);
      }
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ fontSize: "14px" }}>{mode ? "SIGN IN" : "SIGN UP"}</div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100px", height: "10px", marginBottom: "3px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100px", height: "10px", marginBottom: "3px" }}
        />
        <div
          style={{
            display: "flex",
            width: "100px",
            justifyContent: "space-evenly",
          }}
        >
          <button
            type="button"
            onClick={handleModeToggle}
            style={{ width: "50%", height: "15px", fontSize: "10px" }}
          >
            {mode ? "Switch to Sign Up" : "Switch to Sign In"}
          </button>
          <button
            type="submit"
            style={{ width: "50%", height: "15px", fontSize: "10px" }}
          >
            {mode ? "SIGN IN" : "SIGN UP"}
          </button>
        </div>
      </form>
    </div>
  );
}
