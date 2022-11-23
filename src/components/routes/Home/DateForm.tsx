import { useState } from "react";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";

import Input from "../../layout/MicroElements/Input";
import Button from "../../layout/MicroElements/Button";

export default function DateForm(props) {
  const { getTransactions,dateFilter,setDateFilter } = props;

  return (
    <DateFormContainer>
      <Input
        type="date"
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
        minLength={10}
        placeholder="DD/MM/AAAA"
      ></Input>
      <Button onClick={() => getTransactions(dateFilter)} type="submit">
        <AiOutlineSearch />
      </Button>
    </DateFormContainer>
  );
}

const DateFormContainer = styled.div`
  margin-top: 20px;
  padding: 0 20px 0 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  button {
    max-width: 100px;
    min-width: 100px;
    margin: 0 10px 0 10px;
  }
  input {
    max-width: 200px;
    border: var(--default-border);
    color: var(--color-black);
    margin: 0 10px 0 10px;
  }
`;
