// import { filter } from 'lodash';
// import { sentenceCase } from 'change-case';
// import { useEffect, useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// // material
// import {
//   Card,
//   Table,
//   Stack,
//   Avatar,
//   Button,
//   Checkbox,
//   TableRow,
//   TableBody,
//   TableCell,
//   Container,
//   Typography,
//   TableContainer,
//   TablePagination,
// } from '@mui/material';
// // components
// import Page from '../components/Page';
// import Label from '../components/Label';
// import Scrollbar from '../components/Scrollbar';
// import Iconify from '../components/Iconify';
// import SearchNotFound from '../components/SearchNotFound';
// import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
// // mock
// import USERLIST from '../_mock/user';
// // import { element } from 'prop-types';

// // ----------------------------------------------------------------------

// // const TABLE_HEAD = [
// //   { id: 'name', label: 'Name', alignRight: false },
// //   { id: 'company', label: 'Company', alignRight: false },
// //   { id: 'role', label: 'Role', alignRight: false },
// //   { id: 'isVerified', label: 'Verified', alignRight: false },
// //   { id: 'status', label: 'Status', alignRight: false },
// //   { id: '' },
// // ];

// // // ----------------------------------------------------------------------

// // function descendingComparator(a, b, orderBy) {
// //   if (b[orderBy] < a[orderBy]) {
// //     return -1;
// //   }
// //   if (b[orderBy] > a[orderBy]) {
// //     return 1;
// //   }
// //   return 0;
// // }

// // function getComparator(order, orderBy) {
// //   return order === 'desc'
// //     ? (a, b) => descendingComparator(a, b, orderBy)
// //     : (a, b) => -descendingComparator(a, b, orderBy);
// // }

// // function applySortFilter(array, comparator, query) {
// //   const stabilizedThis = array.map((el, index) => [el, index]);
// //   stabilizedThis.sort((a, b) => {
// //     const order = comparator(a[0], b[0]);
// //     if (order !== 0) return order;
// //     return a[1] - b[1];
// //   });
// //   if (query) {
// //     return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
// //   }
// //   return stabilizedThis.map((el) => el[0]);
// // }

// // const TAX_RATE = 0.07;

// // function ccyFormat(num) {
// //   return `${num.toFixed(2)}`;
// // }

// // function priceRow(qty, unit) {
// //   return qty * unit;
// // }

// // function createRow(desc, qty, unit) {
// //   const price = priceRow(qty, unit);
// //   return { desc, qty, unit, price };
// // }

// // interface Row {
// //   desc: string;
// //   qty: number;
// //   unit: number;
// //   price: number;
// // }

// // function subtotal(items: readonly Row[]) {
// //   return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
// // }

// // const rows = [
// //   createRow('Paperclips (Box)', 100, 1.15),
// //   createRow('Paper (Case)', 10, 45.99),
// //   createRow('Waste Basket', 2, 17.99),
// // ];

// // const invoiceSubtotal = subtotal(rows);
// // const invoiceTaxes = TAX_RATE * invoiceSubtotal;
// // const invoiceTotal = invoiceTaxes + invoiceSubtotal;

// // function createData(name,price) {
// //   return {
// //     name,
// //     price,
    
// //   };
// // }

// // // const rows = [];

// // const cartFromLocalStorage = JSON.parse(localStorage.getItem("cartItems")) || "[]"

// // export default function User() {


// //   console.log(localStorage.getItem("cartItems"));
// //   const [cart,setCart] = useState(cartFromLocalStorage)

// //   useEffect(() => {
// //     localStorage.setItem("cartItems",JSON.stringify(cart))
// //   },[cart])

// //   console.log(cartFromLocalStorage[0].price)
  
// //     console.log(cart)

// //     let Total = 0;

// //    const getTotal = () => {
// //     // eslint-disable-next-line no-plusplus
// //     for(let i=0;i<cart.length;i++){
// //       Total += cart[i].price
// //     }
// //     return Total
// //    } 

// //    // eslint-disable-next-line no-plusplus
// //    for(let i=0;i<cart.length;i++){
// //     rows.push(createData(cart[i].name,cart[i].price))
// //    }
  


//   // const [page, setPage] = useState(0);

//   // const [order, setOrder] = useState('asc');

//   // const [selected, setSelected] = useState([]);

//   // const [orderBy, setOrderBy] = useState('name');

//   // const [filterName, setFilterName] = useState('');

//   // const [rowsPerPage, setRowsPerPage] = useState(5);

//   // const handleRequestSort = (event, property) => {
//   //   const isAsc = orderBy === property && order === 'asc';
//   //   setOrder(isAsc ? 'desc' : 'asc');
//   //   setOrderBy(property);
//   // };

//   // const handleSelectAllClick = (event) => {
//   //   if (event.target.checked) {
//   //     const newSelecteds = USERLIST.map((n) => n.name);
//   //     setSelected(newSelecteds);
//   //     return;
//   //   }
//   //   setSelected([]);
//   // };

//   // const handleClick = (event, name) => {
//   //   const selectedIndex = selected.indexOf(name);
//   //   let newSelected = [];
//   //   if (selectedIndex === -1) {
//   //     newSelected = newSelected.concat(selected, name);
//   //   } else if (selectedIndex === 0) {
//   //     newSelected = newSelected.concat(selected.slice(1));
//   //   } else if (selectedIndex === selected.length - 1) {
//   //     newSelected = newSelected.concat(selected.slice(0, -1));
//   //   } else if (selectedIndex > 0) {
//   //     newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
//   //   }
//   //   setSelected(newSelected);
//   // };

//   // const handleChangePage = (event, newPage) => {
//   //   setPage(newPage);
//   // };

//   // const handleChangeRowsPerPage = (event) => {
//   //   setRowsPerPage(parseInt(event.target.value, 10));
//   //   setPage(0);
//   // };

//   // const handleFilterByName = (event) => {
//   //   setFilterName(event.target.value);
//   // };

//   // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

//   // const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

//   // const isUserNotFound = filteredUsers.length === 0;

//   // return (
    

//   //   <TableContainer component={Paper}>
//   //     <Table sx={{ minWidth: 700 }} aria-label="spanning table">
//   //       <TableHead>
//   //         <TableRow>
//   //           <TableCell align="center" colSpan={3}>
//   //              Cart Details
//   //           </TableCell>
//   //         </TableRow>
//   //         <TableRow>
//   //           <TableCell>Item</TableCell>
//   //           <TableCell align="right">Quantity</TableCell>
//   //           <TableCell align="right">Price</TableCell>
//   //         </TableRow>
//   //       </TableHead>
//   //       <TableBody>
//   //         {rows.map((row) => (
//   //           <TableRow key={row.desc}>
//   //             <TableCell>{row.desc}</TableCell>
//   //             <TableCell align="right">{row.qty}</TableCell>
//   //             <TableCell align="right">{ccyFormat(row.price)}</TableCell>
//   //           </TableRow>
//   //         ))}
//   //         <TableRow>
//   //           <TableCell rowSpan={2} />
//   //           <TableCell colSpan={1}>Subtotal</TableCell>
//   //           <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
//   //         </TableRow>
//   //         <TableRow>
//   //           <TableCell>Tax</TableCell>
//   //           <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
//   //         </TableRow>          
//   //         <TableRow>
//   //            <TableCell rowSpan={2} />
//   //           <TableCell colSpan={1}>Total</TableCell>
//   //           <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
//   //         </TableRow> 
//   //       </TableBody>
//   //     </Table>
//   //   </TableContainer>




//     // <Page title="User">
//     //   <Container>
//     //     <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
//     //       <Typography variant="h4" gutterBottom>
//     //         User
//     //       </Typography>
//     //       <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
//     //         New User
//     //       </Button>
//     //     </Stack>

//     //     <Card>
//     //       <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

//     //       <Scrollbar>
//     //         <TableContainer sx={{ minWidth: 800 }}>
//     //           <Table>
//     //             <UserListHead
//     //               order={order}
//     //               orderBy={orderBy}
//     //               headLabel={TABLE_HEAD}
//     //               rowCount={USERLIST.length}
//     //               numSelected={selected.length}
//     //               onRequestSort={handleRequestSort}
//     //               onSelectAllClick={handleSelectAllClick}
//     //             />
//     //             <TableBody>
//     //               {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
//     //                 const { id, name, role, status, company, avatarUrl, isVerified } = row;
//     //                 const isItemSelected = selected.indexOf(name) !== -1;

//     //                 return (
//     //                   <TableRow
//     //                     hover
//     //                     key={id}
//     //                     tabIndex={-1}
//     //                     role="checkbox"
//     //                     selected={isItemSelected}
//     //                     aria-checked={isItemSelected}
//     //                   >
//     //                     <TableCell padding="checkbox">
//     //                       <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} />
//     //                     </TableCell>
//     //                     <TableCell component="th" scope="row" padding="none">
//     //                       <Stack direction="row" alignItems="center" spacing={2}>
//     //                         <Avatar alt={name} src={avatarUrl} />
//     //                         <Typography variant="subtitle2" noWrap>
//     //                           {name}
//     //                         </Typography>
//     //                       </Stack>
//     //                     </TableCell>
//     //                     <TableCell align="left">{company}</TableCell>
//     //                     <TableCell align="left">{role}</TableCell>
//     //                     <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>
//     //                     <TableCell align="left">
//     //                       <Label variant="ghost" color={(status === 'banned' && 'error') || 'success'}>
//     //                         {sentenceCase(status)}
//     //                       </Label>
//     //                     </TableCell>

//     //                     <TableCell align="right">
//     //                       <UserMoreMenu />
//     //                     </TableCell>
//     //                   </TableRow>
//     //                 );
//     //               })}
//     //               {emptyRows > 0 && (
//     //                 <TableRow style={{ height: 53 * emptyRows }}>
//     //                   <TableCell colSpan={6} />
//     //                 </TableRow>
//     //               )}
//     //             </TableBody>

//     //             {isUserNotFound && (
//     //               <TableBody>
//     //                 <TableRow>
//     //                   <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
//     //                     <SearchNotFound searchQuery={filterName} />
//     //                   </TableCell>
//     //                 </TableRow>
//     //               </TableBody>
//     //             )}
//     //           </Table>
//     //         </TableContainer>
//     //       </Scrollbar>

//     //       <TablePagination
//     //         rowsPerPageOptions={[5, 10, 25]}
//     //         component="div"
//     //         count={USERLIST.length}
//     //         rowsPerPage={rowsPerPage}
//     //         page={page}
//     //         onPageChange={handleChangePage}
//     //         onRowsPerPageChange={handleChangeRowsPerPage}
//     //       />
//     //     </Card>
//     //   </Container>
//     // </Page>
// //   );
// // }
