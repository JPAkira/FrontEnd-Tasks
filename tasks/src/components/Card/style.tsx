import styled from "styled-components";

interface CardBodyItemProps {
      readonly justifycontent?: string;
}

export const CardMain = styled.div`
  box-shadow: #ececec 2px 2px 2px 2px;
  width: 23%;
  margin-top: 20px;    
`

export const CardHeader = styled.div`
      border-bottom: #e7e7e7 1px solid;
      padding: 10px 20px;
      text-transform: uppercase;
      color: #20B1AA;
      font-weight: bold;
`

export const CardBody = styled.div`
  border-bottom: #d5d5d5 1px solid;
  padding: 10px 20px;
  display: flex;
`

export const CardBodyItem = styled.div<CardBodyItemProps>`
  padding: 10px 0;
  display: flex;
  justify-content: ${p => p.justifycontent};
  width: 50%;
  font-weight: 400;
  text-transform: uppercase;
  color: #444;
  font-family: 'Roboto', sans-serif;
`