import React, { useState, useEffect } from "react";
import axios from "axios";

const PasswordStrengthChecker = () => {
  const [password, setPassword] = useState("");
  const [steps, setSteps] = useState(0);
  const [result, setResult] = useState("");
  const [users, setUser] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUser(response.data);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCheckStrength = () => {
    const stepsNeeded = getStepsToMakeStrong(password);
    setSteps(stepsNeeded);
    if (!stepsNeeded) {
      setResult(`Password is strong!`);

      try {
        axios.post("http://localhost:5000/users", {
          password,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      setResult(`Password is weak!`);
    }
  };

  const getStepsToMakeStrong = (password) => {
    let stepsNeeded = 0;

    // Check password length
    if (password.length < 6) {
      //   console.log(password.length);
      stepsNeeded = 6 - password.length;
      //   console.log(stepsNeeded);
    } else if (password.length > 20) {
      stepsNeeded = password.length - 20;
    }

    // Check for repeating characters
    for (let i = 0; i < password.length - 2; i++) {
      if (
        password.charCodeAt(i) === password.charCodeAt(i + 1) &&
        password.charCodeAt(i + 1) === password.charCodeAt(i + 2)
      ) {
        stepsNeeded++;
        break;
      }
    }

    return stepsNeeded;
  };

  return (
    <div className="passwordCheck">
      <div className="container">
        <h1>Password Strength Checker</h1>
        <div className="form">
          <label htmlFor="password">Enter password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button onClick={handleCheckStrength}>Check Strength</button>
          <p>{result}</p>
          <p>
            <span>{steps}</span>Steps needed to make the password strong!
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordStrengthChecker;
