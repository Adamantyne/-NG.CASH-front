import { useState } from "react";
import styled from "styled-components";

import Button from "../../layout/MicroElements/Button";

export default function TransactionsOptions(props) {
  const { setFilter, selectedOption, setSelectedOption } = props;

  return (
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
  );
}

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
