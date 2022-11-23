import styled from "styled-components";
import { BiLogOutCircle } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import { postRequisition } from "../../../utils/api";
import { getContext } from "../../../hooks/UserContext";
import { deleteItem } from "../../../utils/localStorage";

export default function Header(props) {
  const { username } = props;
  const { contextData } = getContext();
  const navigate = useNavigate();

  async function signOut() {
    try {
      await postRequisition("sign-out", contextData, "");
      deleteItem("token");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <StyledHeader>
      <div>
        <BsPersonCircle />
        <h2>
          <span>{username}</span>
        </h2>
      </div>
      <div
        onClick={() => {
          signOut();
        }}
      >
        <BiLogOutCircle />
        <h2>Sair</h2>
      </div>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-heigth);
  background-color: var(--color-black);
  z-index: var(--z-index-1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px 0 50px;
  border-bottom: var(--white-border);
  box-shadow: 0 0 5px var(--color-black);
  color: var(--color-white);
  h2,
  svg {
    font-size: var(--font-size-5);
    font-weight: 400;
    transition: all linear var(--hover-time);
  }
  span {
    font-weight: var(--font-bold);
  }
  & > div {
    transition: all linear var(--hover-time);
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: var(--white-border);
    h2 {
      margin: 0 0 5px 10px;
    }
    :hover {
      cursor: pointer;
      border-bottom: var(--red-border);
      svg,
      h2 {
        color: var(--color-error);
      }
    }
  }
`;
