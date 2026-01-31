import { UserCircle, ShoppingCart } from "@phosphor-icons/react";
import { useNavigate, useResolvedPath } from "react-router-dom";
import { useUser } from '../../hooks/UserContext';
import { useCart } from '../../hooks/CartContext'; 
import { 
    Container, 
    HeaderLink, 
    LinkContainer, 
    Logout, 
    Navigation, 
    Options, 
    Profile, 
    Content,
    CartBadge 
} from './styles';

export function Header() {
    const navigate = useNavigate();
    const { logout, userInfo } = useUser();
    const { cartProducts } = useCart(); // 
    const { pathname } = useResolvedPath();

    const cartItemsCount = cartProducts?.reduce((total, product) => {
        return total + product.quantity;
    }, 0) || 0;

    function logoutUser() {
        logout();
        navigate('/login');
    }

    return (
        <Container>
            <Content>
                <Navigation>
                    <div>
                        <HeaderLink to="/" $isActive={pathname === '/'}>Home</HeaderLink>
                        <hr></hr>
                        <HeaderLink to="/cardapio" $isActive={pathname === '/cardapio'}>Cardápio</HeaderLink>
                    </div>
                </Navigation>
                <Options>
                    <Profile>
                        <UserCircle color="#fff" size={24} />
                        <div>
                            <p>
                                Olá, <span>{userInfo.name}</span>
                            </p>
                            <Logout onClick={logoutUser}>Sair</Logout>
                        </div>
                    </Profile>
                    <LinkContainer to="/carrinho">
                        <ShoppingCart color="#fff" size={24} />
                        
                        {cartItemsCount > 0 && (
                            <CartBadge>{cartItemsCount}</CartBadge>
                        )}
                    </LinkContainer>
                </Options>
            </Content>
        </Container>
    );
}