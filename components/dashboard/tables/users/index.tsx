import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useQuery } from 'react-query';
import { getUsers } from 'utils/dbFetching';
import { Users } from 'app/types'


function Row(props: { row: Users }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} className="bg-pwgreen-300" >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.lastName}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.firstName}
        </TableCell>
        <TableCell >{row.email}</TableCell>
        <TableCell >{row.gender}</TableCell>
        <TableCell align='center' >{row.birthday}</TableCell>
        <TableCell >{row.role}</TableCell>
        <TableCell >{row.active}</TableCell>
        <TableCell >{row.createdAt}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6} className='bg-pwgreen-200 w-screen'>
          <Collapse in={open} timeout="auto" unmountOnExit >
            <Box sx={{ margin: 1 }} >
              <Typography variant="h6" gutterBottom component="div">
                Localizacion
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Direccion</TableCell>
                    <TableCell>Telefono</TableCell>
                    <TableCell >Ciudad</TableCell>
                    <TableCell >Provincia/Estado</TableCell>
                    <TableCell >Correo</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={row.id}>
                    <TableCell >{row.province}</TableCell>
                    <TableCell >{row.city}</TableCell>
                    <TableCell >{row.address}</TableCell>
                    <TableCell >{row.postCode}</TableCell>
                    <TableCell >{row.phone}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
//   createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
//   createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
//   createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
// ];

const TableUser = () => {
  const {
    data: users,
    error,
    isLoading,
    isSuccess
  } = useQuery(['users'], getUsers)

  return (
    <TableContainer component={Paper}  >
      <Table aria-label="collapsible table">
        <TableHead className="bg-pwgreen-400 text-xl">
          <TableRow>
            <TableCell />
            <TableCell>Id</TableCell>
            <TableCell >Nombre</TableCell>
            <TableCell >Apellido</TableCell>
            <TableCell >Email</TableCell>
            <TableCell >Genero</TableCell>
            <TableCell align='center' >Fecha de Nacimiento</TableCell>
            <TableCell >Role</TableCell>
            <TableCell >Activo</TableCell>
            <TableCell >Registrado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isSuccess && users.map((row:Users) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default TableUser