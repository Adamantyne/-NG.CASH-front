import styled from "styled-components";

export default function Transaction(props) {
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
