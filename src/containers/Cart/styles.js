import styled from "styled-components";

import Background from '../../assets/background.svg'
import Texture from '../../assets/texture.svg'


export const Container = styled.div`
     width: 100%;
     width: 100vw;
     background: linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url('${Background}');
     min-height: 100vh;
`;
export const Banner = styled.div`
      background: url('${Texture}');
      background-color: #1f1f1f;
      background-size: cover;
      background-position: center;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      height: 180px;

      img {
        height: 130px;
      }
`;
export const Title = styled.div`
     font-size: 25px;
     font-weight: 800;
     margin-top: 18px;
     padding-bottom: 12px;
     color: #61a120;
     text-align: center;
     position: relative;

     &::after {
        position: absolute;
        left: calc(50% + -20px);
        bottom: 0;
        content: '';
        width: 56px;
        height: 4px;
        background-color: #61a120;
     }
`;
export const Content = styled.div`
       display: grid;
       grid-template-columns: 1fr 30%;
       gap: 40px;
       width: 100%;
       max-width: 1280px;
       padding: 40px;
       margin: 0 auto;

`;