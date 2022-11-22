import styled from "styled-components";

const CustonButon = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width};
  height: var(--objeects-height);
  font-size: var(--font-size-4);
  border: none;
  color: white;
  background-color: ${(props) => props.backgroundColor};
  border-radius: var(--border-radious-2);
  margin: ${(props) => props.margin};
  :hover {
    cursor: pointer;
    background-color: ${(props) => props.hoverBackgroundColor};
  }
`;

export default CustonButon;

