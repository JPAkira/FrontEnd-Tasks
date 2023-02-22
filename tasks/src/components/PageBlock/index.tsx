import styled, { css } from 'styled-components'

interface PageBlockProps {
  readonly width: string;
}
export const PageBlock = styled.div<PageBlockProps>`
  border-radius: 3px;
  box-shadow: 2px 2px #f2f2f2;
  background-color: white;
  width: ${p => p.width};
  margin-bottom: 20px;
`


