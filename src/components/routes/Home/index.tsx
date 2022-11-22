import { useState, useEffect } from "react";
import dayjs from "dayjs";

import { getRequisition } from "../../../utils/api";
import { getContext } from "../../../hooks/UserContext";
import Loader from "../../layout/MicroElements/Loader";
import { Form } from "../../layout/MacroElements/Form";
import Input from "../../layout/MicroElements/Input";
import Button from "../../layout/MicroElements/Button";
import styled from "styled-components";
import { setItem, getItem } from "../../../utils/localStorage";

export default function Home() {
  const { contextData, setContext } = getContext();
  const {username} = getItem("userData");
  return <h1>Bem vindo {username}</h1>;
}
