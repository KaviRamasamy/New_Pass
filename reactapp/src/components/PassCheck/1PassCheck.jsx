import React, { useState } from "react";

const PasswordStrengthChecker = () => {
  const [password, setPassword] = useState("");
  const [steps, setSteps] = useState(0);

  const checkPasswordStrength = () => {
    // Initialize the conditions to check
    let conditionsMet = {
      length: false,
      lowercase: false,
      uppercase: false,
      digit: false,
      repeatingChars: false,
    };

    // Check length condition
    conditionsMet.length = password.length >= 6 && password.length <= 20;

    // Check lowercase condition
    conditionsMet.lowercase = /[a-z]/.test(password);

    // Check uppercase condition
    conditionsMet.uppercase = /[A-Z]/.test(password);

    // Check digit condition
    conditionsMet.digit = /[0-9]/.test(password);

    // Check repeating characters condition
    for (let i = 2; i < password.length; i++) {
      if (password[i] === password[i - 1] && password[i] === password[i - 2]) {
        conditionsMet.repeatingChars = true;
        break;
      }
    }

    // Calculate the number of steps required to make the password strong
    let stepsRequired = 0;
    for (const condition in conditionsMet) {
      if (!conditionsMet[condition]) {
        stepsRequired++;
      }
    }

    // Set the number of steps in the state
    setSteps(stepsRequired);
  };

  return (
    <div>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={checkPasswordStrength}>Check</button>
      <p>Steps required to make the password strong: {steps}</p>
    </div>
  );
};

export default PasswordStrengthChecker;
