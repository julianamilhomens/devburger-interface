import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Row } from './row';
import { orderStatusOptions } from './orderStatus';
import { api } from '../../../services/api';
import { FilterOption, Filter } from './styles';

export function Orders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [activeStatus, setActiveStatus] = useState(0);

  useEffect(() => {
    async function loadOrders() {
      const { data } = await api.get('orders');

      const activeOrders = data.filter((order) => !order.deleted);

      setOrders(activeOrders);
      setFilteredOrders(activeOrders);
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

  useEffect(() => {
    if (activeStatus === 0) {

      const filtered = orders.filter(
        (order) => order.status !== 'Entregue'
      );

      setFilteredOrders(filtered);
      return;
    }

    const statusOption = orderStatusOptions.find(
      (item) => item.id === activeStatus
    );

    if (statusOption) {
      setFilteredOrders(
        orders.filter((order) => order.status === statusOption.value)
      );
    }
  }, [orders, activeStatus]);

  function handleStatus(status) {
    setActiveStatus(status.id);
  }

  const rows = filteredOrders.map((order) => createData(order));

  return (
    <>
      <Filter>
        {orderStatusOptions.map((status) => (
          <FilterOption
            key={status.id}
            onClick={() => handleStatus(status)}
            $isActiveStatus={activeStatus === status.id}
          >
            {status.label}
          </FilterOption>
        ))}
      </Filter>

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="center">Pedido</TableCell>
              <TableCell align="center">Cliente</TableCell>
              <TableCell align="center">Data do Pedido</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <Row
                key={row.orderId}
                row={row}
                orders={orders}
                setOrders={setOrders}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}