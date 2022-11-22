import styled from "styled-components";

export const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  p {
    color: var(--color-black);
    margin-top: 10px;
    text-align: center;
  }
  div{
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
`;

export const AuthForm = styled(Form)`
  max-width: var(--auth-max-width);
  min-height: 100vh;
  padding: 0 30px 0 30px;
  background-color: var(--color-black);
  border-left: var(--white-border);
  border-right: var(--white-border);
  h1{
    text-align: center;
    font-size: var(--font-size-tittle);
    font-family: var(--font-family-tittle);
    color: var(--color-white);
    margin-bottom: 40px;
  }
  p{
    color: var(--color-white);
  }
`
