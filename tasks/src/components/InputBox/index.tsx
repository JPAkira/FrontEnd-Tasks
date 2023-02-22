import styled from "styled-components";

interface InputBoxProps {
  readonly width: string;
}

export const InputBox = styled.div<InputBoxProps>`
  padding: 11px;
  width: ${p => p.width};
  display: flex;
  flex-direction: column;
`
