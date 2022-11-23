import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { getContext } from "../../../hooks/UserContext";
import { setItem } from "../../../utils/localStorage";
import { postRequisition, getRequisition } from "../../../utils/api";
import persistUser from "../../../hooks/persistUser";
import SignInForm from "./SignInForm";

export default function SignIn() {
  const [signInData, setSignInData] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const { contextData, setContext } = getContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (contextData.config) {
      checkToken();
    }
  }, [contextData]);

  async function checkToken() {
    try {
      await getRequisition("token", contextData);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  }

  async function submitData(e) {
    e.preventDefault();
    try {
      const response = await postRequisition(
        "sign-in",
        contextData,
        signInData
      );
      persistUser(response.token, contextData, setContext);
      setItem("token", response.token);
      setItem("userData", response.userData);
      navigate("/home");
    } catch (error) {
      console.log(error);
      setErrorMessage(error.toString());
    }
  }

  return (
    <SignInForm
      submitData={submitData}
      signInData={signInData}
      setSignInData={setSignInData}
      errorMessage={errorMessage}
    />
  );
}
