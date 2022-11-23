import { useState, useEffect } from "react";
import styled from "styled-components";

import { getRequisition, postRequisition } from "../../../utils/api";
import { getContext } from "../../../hooks/UserContext";
import TransactionForm from "./TransactionForm";
import { getItem } from "../../../utils/localStorage";
import HomeScreen from "./HomeScreen";
import Header from "../../layout/MacroElements/Header";
import TransactionsOptions from "./TransactionsOptions";
import AllTransactions from "./AllTransactions";
import DateForm from "./DateForm";
import dayjs from "dayjs";

export default function Home() {
  const { contextData } = getContext();
  const [balance, setBalance] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [filter, setFilter] = useState("");
  const [transactionData, setTransactionData] = useState({
    value: 0,
    creditedUsername: "",
  });
  const { username } = getItem("userData");

  useEffect(() => {
    if (contextData.config) {
      getBalance();
      getTransactions();
    }
  }, [contextData]);

  useEffect(() => {
    if (contextData.config) {
      getTransactions();
    }
  }, [filter]);

  async function submitTransaction(e) {
    e.preventDefault();
    try {
      const { value, creditedUsername } = transactionData;
      await postRequisition("transactions", contextData, {
        creditedUsername,
        value: value * 100,
      });
      getBalance();
      getTransactions();
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

  async function getTransactions(date = undefined) {
    try {
      let response = null;
      if (date) {
        const formatedDate = dayjs(date).format("DD-MM-YYYY");
        response = await getRequisition(
          `transactions/${formatedDate}${filter}`,
          contextData
        );
      } else {
        setDateFilter("");
        response = await getRequisition(`transactions${filter}`, contextData);
      }
      setTransactions(response);
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
        <TransactionsBaner>
          <p>Transações</p>
        </TransactionsBaner>
        <TransactionsOptions
          setFilter={setFilter}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
        <DateForm
          getTransactions={getTransactions}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
        />
        <AllTransactions transactions={transactions} username={username} />
      </PageContainer>
    </HomeScreen>
  );
}

const PageContainer = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 200px;
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

const TransactionsBaner = styled.div`
  background-color: var(--color-black);
  width: 100%;
  height: 50px;
  color: var(--color-white);
  font-size: var(--font-size-6);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
