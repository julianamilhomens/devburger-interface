import styled from "styled-components";

export const ContainerButton = styled.button `
      background-color: ${props => props.theme.purple};
      width: 100%;
      height: 52px;
      border: 0;
      border-radius: 5px;
      font-size: 30px;
      color: #ffffff;

      &:hover {
        background-color: #6f357c;
      }

`;