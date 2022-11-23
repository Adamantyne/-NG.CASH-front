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
  const [transactions, setTransactions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("all");
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
        response = await getRequisition(`transactions/${date}${filter}`, contextData);
      } else {
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
        <OptionsContainer selected={selectedOption}>
          <section>
            <OptionButton
              onClick={() => {
                setSelectedOption("all");
                setFilter("");
              }}
            >
              Tudo
            </OptionButton>
            <OptionButton
              onClick={() => {
                setSelectedOption("credited");
                setFilter("?filter=credited");
              }}
            >
              Recebidas
            </OptionButton>
            <OptionButton
              onClick={() => {
                setSelectedOption("debited");
                setFilter("?filter=debited");
              }}
            >
              Depositadas
            </OptionButton>
          </section>
          <div></div>
        </OptionsContainer>
        <TransactionsContainer>
          {transactions.map((transaction) => {
            const { id, value, createdAt } = transaction;
            const date = dayjs(createdAt).format("DD/MM/YYYY");
            const creditedName = transaction.credited.users[0].username;
            const debitedName = transaction.debited.users[0].username;
            return (
              <Transaction
                key={id}
                value={value / 100}
                date={date}
                username={username}
                creditedName={creditedName}
                debitedName={debitedName}
              />
            );
          })}
        </TransactionsContainer>
      </PageContainer>
    </HomeScreen>
  );
}

function Transaction(props) {
  const { value, date, creditedName, debitedName, username } = props;
  return (
    <TransactionContainer debited={username === debitedName}>
      <div>
        <p>
          <span>De:</span>
          {` ${debitedName}`}
        </p>
        <p>
          <span>Para:</span>
          {` ${creditedName}`}
        </p>
      </div>
      <div>
        <p>
          <span>Valor:</span>
        </p>
        <p>
          <span>R$</span>
          {` ${value}`}
        </p>
      </div>
      <div>
        <p>
          <span>Data:</span>
        </p>
        <p>{date}</p>
      </div>
    </TransactionContainer>
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

const TransactionsContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  overflow-y: hidden;
  width: 100%;
  height: 100%;
  padding: 10px;
`;

const TransactionContainer = styled.section`
  background-color: ${(props) =>
    props.debited ? "var(--color-light-red)" : "var(--color-light-green)"};
  padding: 20px;
  border-radius: var(--border-radious-1);
  border: ${(props) =>
    props.debited ? "var(--red-border)" : "var(--green-border)"};
  margin: 10px 0 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  overflow-y: hidden;
  width: 100%;
  height: 100%;
  padding: 10px 20% 10px 20%;
  div {
    margin: 5px 0 5px 0;
    border-bottom: var(--white-border-dashed);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    p {
      font-size: var(--font-size-4);
    }
    span {
      font-weight: var(--font-bold);
    }
  }
`;

const OptionsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 5%;
  div {
    @media (max-width: 380px) {
      display: none;
    }
    background-color: var(--color-green);
    width: 33.33%;
    min-height: 4px;
    border-radius: 5px;
    margin-left: none;
    transition: all 0.2s ease-out 0s;
    transform: ${(props) =>
      props.selected === "all"
        ? "translateX(0%)"
        : props.selected === "credited"
        ? "translateX(100%)"
        : "translateX(200%)"};
  }
  section {
    display: flex;
    width: 100%;
  }
`;

export const OptionButton = styled(Button)`
  border-radius: 0;
  width: 100%;
  height: 40px;
  margin-bottom: 5px;
  background-color: var(--color-main);
  :hover {
    background-color: var(--color-light-green);
    background-image: linear-gradient(
      180deg,
      var(--color-light-green),
      var(--color-white) 100%
    );
  }
`;
