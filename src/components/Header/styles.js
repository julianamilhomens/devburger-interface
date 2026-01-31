import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
    background-color: ${props => props.theme.mainBlack};
    width: 100%;
    height: 72px;
    padding: 0 56px;
    width: 100vw;
`;

export const Content = styled.div`
     display: flex;
     align-items: center;
     justify-content: space-between;

     width: 100%;
     max-width: 1280px;
     margin: 0 auto;
`;

export const Navigation = styled.nav`
      display: flex;
      align-items: center;
      justify-content: center;
      height: 72px;

      div {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;

        hr {
            height: 24px;
            border: 1px solid #625E5E;
        }
      }
`;

export const HeaderLink = styled(Link)`
       color: ${(props) => props.$isActive ? (props) => props.theme.purple : (props) => props.theme.white};
       border-bottom: ${(props) => props.$isActive ? `1px solid ${(props) => props.theme.purple}` : 'none'};
       padding-bottom: 5px;
       text-decoration: none;
       font-size: 14px;
       transition: color 200ms;

       &:hover {
        color: ${props => props.theme.purple};
       }
`;

export const Options = styled.div`
       display: flex;
       align-items: center;
       justify-content: center;
       gap: 48px;
`;

export const Profile = styled.div`
       display: flex;
       align-items: center;
       gap: 12px;
       font-size: 14px;

       p {
        color: #fff;
        line-height: 90%;
        font-weight: 300;

        span {
            font-weight: 700;
            color: ${props => props.theme.purple};
        }
       }
`;

export const Logout = styled.button`
       color: #ff3205;
       text-decoration: none;
       font-weight: 700;
       background-color: transparent;
       border: none;
       cursor: pointer;
`;

export const LinkContainer = styled(Link)`
        display: flex;
        align-items: center;
        gap: 10px;
        text-decoration: none;
        position: relative;
        color: ${props => props.theme.white};

        &:hover {
            color: ${props => props.theme.purple};
        }
`;

export const CartBadge = styled.span`
    position: absolute;
    top: -8px;
    right: -12px;
    background-color: #ff3205;
    color: #fff;
    font-size: 12px;
    font-weight: 700;
    border-radius: 50%;
    min-width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px;
    animation: scaleIn 0.3s ease-in-out;

    @keyframes scaleIn {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.2);
        }
        100% {
            transform: scale(1);
        }
    }
`;