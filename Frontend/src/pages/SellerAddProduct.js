import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import * as React from 'react';

// material
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {
  Button,
  Card,
  Container,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';

// api
import { getProducts, updateProduct, deleteProduct, addProduct } from '../api/queries';

// components
import Iconify from '../components/Iconify';
import Page from '../components/Page';

// mock

export default function User() {
  const [open, setOpen] = React.useState(false);

  const [selectedImage, setSelectedImage] = useState();
  const [newProduct, setNewProduct] = useState(null);

  const { data, isError, isLoading, refetch } = useQuery('products', getProducts);
  const { mutate: editMutation, isSuccess: editSuccess } = useMutation(updateProduct);
  const { mutate: deleteMutation, isSuccess: deleteSuccess } = useMutation(deleteProduct);
  const { mutate: addMutation, isSuccess: addSuccess } = useMutation(addProduct);

  React.useEffect(() => {
    if (editSuccess || deleteSuccess || addSuccess) {
      refetch();
    }
  }, [editSuccess, deleteSuccess, addSuccess]);

  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      paddingTop: 20,
      paddingLeft: 5,
      height: '20px',
    },
    preview: {
      marginTop: 50,
      display: 'flex',
      flexDirection: 'column',
    },
    image: { maxWidth: '40%', maxHeight: 100 },
    delete: {
      cursor: 'pointer',
      padding: 5,
      background: 'red',
      color: 'white',
      border: 'none',
      fontSize: '9px',
      width: '100px',
      marginLeft: '-10px',
    },
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage();
  };

  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = (product) => {
    setEditProduct({ ...product });
    setOpenEdit(true);

    // set values
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleDelete = (data) => {
    deleteMutation(data);
  };

  const handleAdd = () => {
    if (newProduct !== null) addMutation(newProduct);
    handleClose();
  };

  const [editProduct, setEditProduct] = useState({});

  if (isLoading || isError) return <Skeleton />;

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Add Product
          </Typography>
          <Button
            onClick={handleClickOpen}
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Product
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add a New Product</DialogTitle>
            <DialogContent>
              <DialogContentText>Please fill the following fields to add a new product item</DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="ProductName"
                label="Product Name"
                type="productName"
                fullWidth
                variant="standard"
                value={newProduct?.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
              <TextField
                autoFocus
                margin="dense"
                id="price"
                label="Price"
                type="number"
                fullWidth
                variant="standard"
                value={newProduct?.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />

              <TextField
                autoFocus
                margin="dense"
                id="amount"
                label="Amount"
                type="number"
                fullWidth
                variant="standard"
                value={newProduct?.amount}
                onChange={(e) => setNewProduct({ ...newProduct, amount: e.target.value })}
              />

              <div style={styles.container}>
                <input accept="image/*" type="file" onChange={imageChange} />

                {selectedImage && (
                  <div style={styles.preview}>
                    <img src={URL.createObjectURL(selectedImage)} style={styles.image} alt="Thumb" />
                    <Button onClick={removeSelectedImage} style={styles.delete}>
                      Remove This Image
                    </Button>
                  </div>
                )}
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleAdd}>Add Product</Button>
            </DialogActions>
          </Dialog>
        </Stack>
        <Card>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Edit</TableCell>
                  <TableCell align="right">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">{row.amount}</TableCell>
                    <TableCell align="right">
                      {/* <IconButton onClick={handleEdit}> */}
                      <IconButton onClick={() => handleOpenEdit(row)}>
                        <EditOutlinedIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleDelete(row)}>
                        <DeleteOutlineOutlinedIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Container>
      <EditModal data={editProduct} openEdit={openEdit} handleCloseEdit={handleCloseEdit} editMutation={editMutation} />
    </Page>
  );
}

function createData(name, price, quantity, carbs, protein) {
  return { name, price, quantity, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

// eslint-disable-next-line react/prop-types
function EditModal({ data, openEdit, handleCloseEdit, editMutation }) {
  const [product, setProduct] = useState({ ...data });

  const handleEdit = () => {
    editMutation(product);
    handleCloseEdit();
  };

  React.useEffect(() => {
    setProduct(data);
  }, [data]);

  return (
    <Dialog
      open={openEdit}
      onClose={handleCloseEdit}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <DialogTitle>Edit Item</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="ProductName"
          label="Product Name"
          type="productName"
          fullWidth
          variant="standard"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />
        <TextField
          autoFocus
          margin="dense"
          id="price"
          label="Price"
          type="price"
          fullWidth
          variant="standard"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />
        <TextField
          autoFocus
          margin="dense"
          id="quantity"
          label="Quantity"
          type="price"
          fullWidth
          variant="standard"
          value={product.amount}
          onChange={(e) => setProduct((prev) => ({ ...prev, amount: e.target.value }))}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseEdit}>Cancel</Button>
        <Button onClick={handleEdit}>Edit Product</Button>
      </DialogActions>
    </Dialog>
  );
}
