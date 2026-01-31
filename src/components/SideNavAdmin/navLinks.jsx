import { List, ListPlus, Receipt, Trash } from "@phosphor-icons/react";

export const navLinks = [
    {
        id: 1,
        label: 'Pedidos',
        path: '/admin/pedidos',
        icon: <Receipt />
    },
    {
        id: 2,
        label: 'Produtos',
        path: '/admin/produtos',
        icon: <List />
    },
    {
        id: 3,
        label: 'Adicionar Produto',
        path: '/admin/novo-produto',
        icon: <ListPlus />
    },
];

export const footerLinks = [
    {
        id: 4,
        label: 'Lixeira',
        path: '/admin/lixeira',
        icon: <Trash />
    },
];