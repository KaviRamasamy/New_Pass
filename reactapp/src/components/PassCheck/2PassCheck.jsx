import React, { useState } from "react";

const PasswordStrengthChecker = () => {
  const [password, setPassword] = useState("");
  const [steps, setSteps] = useState(0);

  const checkPasswordStrength = () => {
    // Check if password meets all the conditions for strong password
    const isStrongPassword =
      password.length >= 6 &&
      password.length <= 20 &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /\d/.test(password) &&
      !/(.)\1\1/.test(password);

    if (isStrongPassword) {
      setSteps(0);
    } else {
      // Calculate the minimum number of steps required to make password strong
      let requiredSteps = 0;
      console.log(requiredSteps);
      console.log(password);

      if (password.length < 6) {
        console.log(requiredSteps);
        requiredSteps = 6 - password.length;
      } else if (password.length > 20) {
        requiredSteps = password.length - 20;
      }

      if (!/[a-z]/.test(password)) {
        console.log(requiredSteps);
        requiredSteps++;
      }

      if (!/[A-Z]/.test(password)) {
        console.log(requiredSteps);
        requiredSteps++;
      }

      if (!/\d/.test(password)) {
        requiredSteps++;
      }

      if (/(.)\1\1/.test(password)) {
        console.log(requiredSteps);
        requiredSteps++;
      }

      setSteps(requiredSteps);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={checkPasswordStrength}>Check Password Strength</button>
      <p>Minimum steps required to make password strong: {steps}</p>
    </div>
  );
};

export default PasswordStrengthChecker;
