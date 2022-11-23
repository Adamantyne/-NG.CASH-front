import styled from "styled-components";

import Button from "../../layout/MicroElements/Button";
import Input from "../../layout/MicroElements/Input";
import ErrLabel from "../../layout/MicroElements/ErrLabel";
import { Form } from "../../layout/MacroElements/Form";

export default function TransactionForm(props) {
  const {
    submitTransaction,
    transactionData,
    setTransactionData,
    errorMessage,
  } = props;
  return (
    <>
      <StyledForm onSubmit={submitTransaction}>
        <Input
          className="l1"
          placeholder="Nome de usuário"
          required
          minLength={3}
          value={transactionData.creditedUsername}
          onChange={(e) =>
            setTransactionData({
              ...transactionData,
              creditedUsername: e.target.value,
            })
          }
        />
        <Input
          placeholder="Valor"
          type="number"
          value={transactionData.value}
          onChange={(e) =>
            setTransactionData({ ...transactionData, value: e.target.value })
          }
        />
        <Button type="submit">Tranferir</Button>
      </StyledForm>
      <ErrLabel
        color={
          ["username", "funds", "you"].some((element) => {
            return errorMessage.includes(element);
          })
            ? "var(--color-error)"
            : "var(--color-transparent)"
        }
        message={
          errorMessage.includes("username")
            ? "Usuário não cadastrado"
            : errorMessage.includes("you")
            ? "Impossível transferir para sí mesmo"
            : "Saldo insuficiente"
        }
      />
    </>
  );
}

const StyledForm = styled(Form)`
  button {
    max-width: 20%;
    min-width: 100px;
  }
  input {
    max-width: 25%;
    border: var(--default-border);
    color: var(--color-black);
  }
  .l1 {
    max-width: 40%;
  }
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;
