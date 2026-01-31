import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { api } from '../../../services/api';
import { formatDate } from '../../../utils/formatDate';
import { ProductImage, SelectStatus, selectStyles } from './styles';
import { orderStatusOptions } from './orderStatus';

export function Row({ row, setOrders, orders }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const products = row.products || [];
  const currentStatus = orderStatusOptions.find(
    (status) => status.value === row.status
  );

  async function newStatusOrder(id, status) {
    try {
      setLoading(true);

      await api.put(`orders/${id}`, { status });
      
      const newOrders = orders.map((order) =>
        order._id === id ? { ...order, status } : order
      );
      setOrders(newOrders);

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Status atualizado!',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
      });

    } catch (err) {
      console.error('Erro ao atualizar status:', err);
      Swal.fire({
        title: 'Erro!',
        text: 'Não foi possível atualizar o status do pedido.',
        icon: 'error',
        confirmButtonColor: '#dc3545'
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleMoveToTrash(orderId) {
    try {
   
      const result = await Swal.fire({
        title: 'Mover para Lixeira?',
        html: `
          <p style="font-size: 16px;">Tem certeza que deseja mover este pedido para a lixeira?</p>
          <p style="font-size: 14px; color: #6c757d; margin-top: 10px;">
            Você poderá restaurá-lo depois se necessário.
          </p>
        `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ffc107',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sim, mover!',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      });
      
      if (!result.isConfirmed) return;

      setLoading(true);

      await api.put(`orders/${orderId}`, { deleted: true });

      setOrders((prevOrders) => 
        prevOrders.filter((order) => order._id !== orderId)
      );

  
      Swal.fire({
        title: 'Movido!',
        text: 'O pedido foi movido para a lixeira com sucesso.',
        icon: 'success',
        confirmButtonColor: '#28a745',
        timer: 2000
      });
      
    } catch (error) {
      console.error('Erro ao mover pedido para lixeira:', error);
      Swal.fire({
        title: 'Erro!',
        text: 'Não foi possível mover o pedido para a lixeira. Tente novamente.',
        icon: 'error',
        confirmButtonColor: '#dc3545'
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell align="center">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          {row.orderId}
        </TableCell >
        <TableCell align="center">{row.name}</TableCell>
        <TableCell align="center">{formatDate(row.date)}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap', textAlign: 'center' }}>
          <SelectStatus
            value={currentStatus}
            options={orderStatusOptions.filter((status) => status.id !== 0)}
            onChange={(status) => newStatusOrder(row.orderId, status.value)}
            isLoading={loading}
            isDisabled={loading}
            styles={selectStyles}
            menuPortalTarget={document.body}
            menuPlacement="auto"
            menuPosition="fixed"
          />
          {row.status === 'Entregue' && (
            <Tooltip title="Mover para lixeira">
              <IconButton 
                color="error"
                onClick={() => handleMoveToTrash(row.orderId)}
                disabled={loading}
                size="small"
                sx={{ ml: 5, padding: '4px', verticalAlign: 'middle', display: 'inline-flex' }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Pedido
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Quantidade</TableCell>
                    <TableCell>Produto</TableCell>
                    <TableCell>Categoria</TableCell>
                    <TableCell>Imagem do Produto</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell component="th" scope="row">
                        {product.quantity}
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>
                        <ProductImage
                          src={product.url}
                          alt={product.name}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  orders: PropTypes.array.isRequired,
  setOrders: PropTypes.func.isRequired,
  row: PropTypes.shape({
    orderId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    products: PropTypes.array.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};