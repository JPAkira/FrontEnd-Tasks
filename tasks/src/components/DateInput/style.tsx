import styled from "styled-components";

interface DatetimeInputProps {
  readonly width: string;
}
export const DatetimeInputStyle = styled.input<DatetimeInputProps>`
  padding: 11px;
  border: none;
  background-color: #f3f6f9;
  width: ${p => p.width};
`
