import styled from "styled-components";

export default function InfoLabel(props) {
  const { message } = props;
  return <LabelContainer>
    <Label>
        {message?message:"message"}
    </Label>
  </LabelContainer>;
}

const LabelContainer = styled.div`
  width: 100%;
  margin: 5px 0 2px 0;
  padding-left: 10px;
`;
const Label = styled.label`
  font-size: var(--font-size-4);
  color: var(--color-main);
  font-weight: bold;
`;
