import styled from "styled-components";

export const Container = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 40px;
      padding: 20px;
      border-radius: 8px;
      background-color: #ffffff;
      cursor: grab;
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      position: relative;

div {
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 5px;
}

p {
    font-size: 18px;
    color: #FF8C05;
    line-height: 20px;
    font-weight: 700;
    margin-top: 40px;
}

strong {
     font-size: 22px;
     color: #363636;
     font-weight: 800;
     line-height: 20px;
}

`;
export const CardImage = styled.img`
     height: 100px;
     position: absolute;
     top: -50px;
`;
