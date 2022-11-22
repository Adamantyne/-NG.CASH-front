import styled from "styled-components";

export default function ErrLabel(props) {
  const { color,message } = props;
  return <LabelContainer>
    <Label color={color?color:"var(--color-transparent)"}>
        {message?message:"message"}
    </Label>
  </LabelContainer>;
}

const LabelContainer = styled.div`
  width: 100%;
  margin: 3px 0 10px 0;
  padding-left: 10px;
`;
const Label = styled.label`
  font-size: var(--font-size-2);
  text-decoration: underline;
  color: ${(props)=>props.color};
`;
