import UserService from "@/services/UserService";
import { StatusMessage } from "@/types";
import { ok } from "assert";
import { useRouter } from "next/router";
import React, { useState } from "react";

const UserLoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<StatusMessage[]>([]);
  const router = useRouter();

  const clearErrors = () => {
    setNameError(null);
    setPasswordError(null);
    setStatusMessage([]);
  };

  const validate = (): boolean => {
    let result = true;

    if (email! && email.trim() === "") {
      setNameError("Name cannot be empty");
      result = false;
    }

    if (password! && password.trim() === "") {
      setPasswordError("Password cannot be empty");
      result = false;
    }

    return result;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    clearErrors();

    if (!validate()) {
      return;
    }

    const user = { email, password };
    const response = await UserService.loginUser(user);

    if (response.status == 200) {
      setStatusMessage([
        {
          message: "Login successful",
          type: "success",
        },
      ]);
    }

    const userData = await response.json();

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify({
        token: userData.token,
        email: userData.email,
        role: userData.role,
      })
    );

    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  return <>
  <form onSubmit={handleSubmit} className="flex flex-col w-64 space-y-4">
    <label htmlFor="emailInput" className="text-lg">Email:</label>
    <input type="text"
    id="emailInput"
    value={email}
    onChange={(event) => setEmail(event.target.value)}
    className="border p-2 rounded" />
    <label htmlFor="passwordInput" className="text-lg">Password:</label>
    <input type="password"
    id="passwordInput"
    value={password}
    onChange={(event) => setPassword(event.target.value)}
    className="border p-2 rounded" />
    <button type="submit" className="bg-blue-500 text-white p-2 rounded">Login</button>
  </form>
  </>;
};

export default UserLoginForm;
