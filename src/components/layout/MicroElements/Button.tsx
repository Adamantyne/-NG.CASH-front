import styled from "styled-components";

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: var(--objeects-height);
  font-size: var(--font-size-4);
  color: var(--color-black);
  background-color: var(--color-main-4);
  border-radius: var(--border-radious-2);
  border: var(--default-border);
  transition: all var(--hover-time) linear;
  font-weight: var(--font-bold);
  :hover {
    cursor: pointer;
    background-color: var(--color-white);
  }
`;

export default Button;
