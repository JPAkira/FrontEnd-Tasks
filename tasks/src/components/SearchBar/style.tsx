import styled, { css } from 'styled-components'

interface SearchInputProps {
}
export const SearchInputStyle = styled.input<SearchInputProps>`
  padding: 11px;
  width: 94%;
  border: none;
  background-color: #f3f6f9;
  
  &:hover {
    background-color: #f3f6f9;
    border: none;
  }
`

export const SearchButton = styled.button`
  padding: 10px;
  margin-left: 10px;
  background-color: #50c3e6;
  color: white;
  border: #27a0c0 1px solid;
  cursor: pointer;

  &:hover {
    background-color: #76d7f6;
    border: #27a0c0 1px solid;
  }
`

export const FormStyle = styled.form`
  padding: 20px 30px;
`



