import styled from "styled-components";
import dayjs from "dayjs";

import Transaction from "./Transaction";

export default function AllTransactions(props) {
  const {transactions, username} = props;
  return (
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
  );
}

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