import styled from "styled-components";

export default function Loader(props) {
  const { text } = props;
  return (
    <Container>
      {text ? (
        <p>{text}</p>
      ) : (
        <>
          <span></span>
          <p>Loading ...</p>
        </>
      )}
    </Container>
  );
}

const Container = styled.article`
  width: 100%;
  height: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px 0 100px 0;
  p {
    font-size: 22px;
    letter-spacing: 0.05em;
    color: var(--color-main-1);
  }
  span {
    margin-bottom: 16px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: inline-block;
    border-top: 3px solid var(--color-main-2);
    border-right: 3px solid transparent;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;

    @keyframes rotation {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;
