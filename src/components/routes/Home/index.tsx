import { useState, useEffect } from "react";
import dayjs from "dayjs";
import styled from "styled-components";

import { getRequisition, postRequisition } from "../../../utils/api";
import { getContext } from "../../../hooks/UserContext";
import ErrLabel from "../../layout/MicroElements/ErrLabel";
import Loader from "../../layout/MicroElements/Loader";
import { Form } from "../../layout/MacroElements/Form";
import TransactionForm from "./TransactionForm";
import Input from "../../layout/MicroElements/Input";
import Button from "../../layout/MicroElements/Button";
import { getItem } from "../../../utils/localStorage";
import HomeScreen from "./HomeScreen";
import Header from "../../layout/MacroElements/Header";

export default function Home() {
  const { contextData } = getContext();
  const [balance, setBalance] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [transactionData, setTransactionData] = useState({
    value: 0,
    creditedUsername: "",
  });
  const { username } = getItem("userData");

  useEffect(() => {
    if (contextData.config) {
      getBalance();
    }
  }, [contextData]);

  async function submitTransaction(e) {
    e.preventDefault();
    try {
      const {value, creditedUsername} = transactionData;
      await postRequisition("transactions", contextData, {creditedUsername, value:value*100});
      getBalance();
    } catch (error) {
      console.log(error);
      setErrorMessage(error.toString());
    }
  }

  async function getBalance() {
    try {
      const response = await getRequisition("balance", contextData);
      setBalance(response.balance / 100);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <HomeScreen>
      <Header username={username} />
      <PageContainer>
        <Balance>
          <p>Saldo:</p>
          <p>R$ {` ${balance.toFixed(2)}`}</p>
        </Balance>
        <TransactionForm
          submitTransaction={submitTransaction}
          transactionData={transactionData}
          setTransactionData={setTransactionData}
          errorMessage={errorMessage}
        />
      </PageContainer>
    </HomeScreen>
  );
}

const PageContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 200px;
  box-shadow: 0 0 8px var(--color-black);
  background-color: var(--color-white);
  border-radius: var(--border-radious-2);
  overflow: hidden;
`;

const Balance = styled.article`
  background-color: var(--color-black);
  width: 100%;
  height: 50px;
  color: var(--color-white);
  font-size: var(--font-size-6);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 0 20px;
  margin-bottom: 20px;
`;
