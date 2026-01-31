import { Outlet } from 'react-router-dom';

import { Footer, Header } from '../../components';


export function UserLayout() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}