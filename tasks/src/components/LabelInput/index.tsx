import styled, { css } from 'styled-components'

interface LabelInputProps {
      readonly marginl?: string;
      readonly translatey?: string;
}
export const LabelInput = styled.label<LabelInputProps>`
  font-size: 16px;
  text-transform: uppercase;
  margin-right: 20px;
  margin-bottom: 10px;
  font-family: 'Roboto', sans-serif;
  color: #444;
  transform: translateY(${p => p.translatey});
  margin-left: ${p => p.marginl};
  font-weight: bold;    
`


