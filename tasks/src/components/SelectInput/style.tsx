import styled, { css } from 'styled-components'

interface SelectInputProps {
}
export const SelectInputStyle = styled.select<SelectInputProps>`
  padding: 10px 10px;
  border: none;
  background-color: #f3f6f9;
`

export const OptionInput = styled.option`
  padding: 10px 100px;
  border: none;
  height: 10px;
  background-color: #f3f6f9;
`



