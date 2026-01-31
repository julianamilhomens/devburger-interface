import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { api } from '../../../services/api';
import { TrashRow } from './TrashRow'; 

export function Trash() {
  const [trashOrders, setTrashOrders] = useState([]);

  useEffect(() => {
    async function loadOrders() {
      try {
        const { data } = await api.get('orders');

        const onlyDeleted = data.filter((order) => order.deleted === true);
        
        console.log('Todos os pedidos:', data);
        console.log('Pedidos deletados:', onlyDeleted);
        
        setTrashOrders(onlyDeleted);
      } catch (error) {
        console.error('Erro ao carregar pedidos da lixeira:', error);
      }
    }

    loadOrders();
  }, []);

  function createData(order) {
    return {
      name: order.user?.name || 'Sem nome',
      orderId: order._id,
      date: order.createdAt,
      status: order.status,
      products: order.products || [],
    };
  }

  const rows = trashOrders.map((order) => createData(order));

  return (
    <>
      <Typography align="center"
        variant="h5"
        sx={{ marginBottom: 5, fontWeight: 600 }}
      >
        🗑️♻️ Lixeira
      </Typography>

      {rows.length === 0 ? (
        <Typography align="center" color="text.secondary" sx={{ marginLeft: 6, fontWeight: 600 }}>
          Lixeira vazia. Você não tem pedidos excluídos no momento.
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="trash table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell align="center">Pedido</TableCell>
                <TableCell align="center">Cliente</TableCell>
                <TableCell align="center">Data do Pedido</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <TrashRow
                  key={row.orderId}
                  row={row}
                  setTrashOrders={setTrashOrders}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}