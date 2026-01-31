import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import RestoreIcon from '@mui/icons-material/Restore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
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
import { ProductImage } from '../Orders/styles';

export function TrashRow({ row, setTrashOrders }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const products = row.products || [];

  async function handleRestoreOrder(orderId) {
    try {
     
      const result = await Swal.fire({
        title: 'Restaurar Pedido?',
        text: 'Este pedido voltará para a lista de pedidos ativos.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sim, restaurar!',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      });
      
      if (!result.isConfirmed) return;

      setLoading(true);

      await api.put(`orders/${orderId}`, { deleted: false });

      setTrashOrders((prevOrders) => 
        prevOrders.filter((order) => order._id !== orderId)
      );

     
      Swal.fire({
        title: 'Restaurado!',
        text: 'O pedido foi restaurado com sucesso.',
        icon: 'success',
        confirmButtonColor: '#28a745',
        timer: 2000
      });
      
    } catch (error) {
      console.error('Erro ao restaurar pedido:', error);
      Swal.fire({
        title: 'Erro!',
        text: 'Não foi possível restaurar o pedido. Tente novamente.',
        icon: 'error',
        confirmButtonColor: '#dc3545'
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleDeletePermanently(orderId) {
    try {
    
      const firstConfirm = await Swal.fire({
        title: '⚠️ ATENÇÃO!',
        html: `
          <p style="font-size: 16px; margin-bottom: 10px;">Esta ação é <strong>IRREVERSÍVEL</strong>!</p>
          <p style="font-size: 14px; color: #dc3545;">O pedido será deletado permanentemente do banco de dados.</p>
        `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Continuar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      });
      
      if (!firstConfirm.isConfirmed) return;

      const doubleConfirm = await Swal.fire({
        title: 'Tem certeza absoluta?',
        html: `
          <p style="font-size: 16px; color: #dc3545; font-weight: bold;">Esta ação NÃO pode ser desfeita!</p>
          <p style="font-size: 14px; margin-top: 10px;">Digite <strong>"DELETAR"</strong> para confirmar:</p>
        `,
        icon: 'error',
        input: 'text',
        inputPlaceholder: 'Digite DELETAR',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Deletar Permanentemente',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
        inputValidator: (value) => {
          if (value !== 'DELETAR') {
            return 'Você precisa digitar "DELETAR" para confirmar!';
          }
        }
      });

      if (!doubleConfirm.isConfirmed) return;

      setLoading(true);

      await api.delete(`orders/${orderId}`);

      setTrashOrders((prevOrders) => 
        prevOrders.filter((order) => order._id !== orderId)
      );

      Swal.fire({
        title: 'Deletado!',
        text: 'O pedido foi removido permanentemente.',
        icon: 'success',
        confirmButtonColor: '#28a745',
        timer: 2000
      });
      
    } catch (error) {
      console.error('Erro ao deletar pedido:', error);
      Swal.fire({
        title: 'Erro!',
        text: 'Não foi possível deletar o pedido. Tente novamente.',
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
        <TableCell>
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
        </TableCell>
        <TableCell align="center">{row.name}</TableCell>
        <TableCell align="center">{formatDate(row.date)}</TableCell>
        <TableCell align="center">{row.status}</TableCell>
        <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

          <Tooltip title="Restaurar pedido">
            <IconButton
              color="success"
              onClick={() => handleRestoreOrder(row.orderId)}
              disabled={loading}
              sx={{ ml: 8, padding: '4px', verticalAlign: 'middle', display: 'inline-flex' }}
            >
              <RestoreIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Deletar permanentemente">
            <IconButton
              color="error"
              onClick={() => handleDeletePermanently(row.orderId)}
              disabled={loading}
              sx={{ ml: 1, padding: '4px', verticalAlign: 'middle', display: 'inline-flex' }}
            >
              <DeleteForeverIcon />
            </IconButton>
          </Tooltip>
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

TrashRow.propTypes = {
  setTrashOrders: PropTypes.func.isRequired,
  row: PropTypes.shape({
    orderId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    products: PropTypes.array.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};