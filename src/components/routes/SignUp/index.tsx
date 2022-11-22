import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getContext } from "../../../hooks/UserContext";
import { postRequisition } from "../../../utils/api";
import SignUpForm from "./SignUpForm";

export default function SignUp() {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { contextData } = getContext();
  const navigate = useNavigate();

  async function submitData(e) {
    e.preventDefault();
    try {
      const data = await postRequisition("sign-up", contextData, signUpData);
      if (signUpData.password !== signUpData.confirmPassword) {
        throw new Error("repeat your password correctly");
      }
      console.log(data);
      navigate("/");
    } catch (error) {
      console.log(error);
      setErrorMessage(error.toString());
    }
  }

  return (
    <SignUpForm
      submitData={submitData}
      signUpData={signUpData}
      setSignUpData={setSignUpData}
      errorMessage={errorMessage}
    />
  );
}
