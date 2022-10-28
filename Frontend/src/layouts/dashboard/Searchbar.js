import { useState } from 'react';
import {  useNavigate } from 'react-router-dom';

// material
import { styled, alpha } from '@mui/material/styles';
import { Input, Slide, Button, IconButton, InputAdornment, ClickAwayListener } from '@mui/material';
// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const SearchbarStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: APPBAR_MOBILE,
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
  [theme.breakpoints.up('md')]: {
    height: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

export default function Searchbar() {
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [query , setQuery] = useState("");

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearchButton = () => {
    navigate(`/dashboard/products?query=${query}`);

  };

  const search = (e) => {
    navigate(`/dashboard/products?query=${e.target.value}`);
  }

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!isOpen && (
          <IconButton onClick={handleOpen}>
            <Iconify icon="eva:search-fill" width={20} height={20} />
          </IconButton>
        )}

        <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
          <SearchbarStyle>
            <Input
              autoFocus
              fullWidth
              disableUnderline
              placeholder="Search…"
              startAdornment={
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                </InputAdornment>
              }
              sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
              onChange={(e) => search(e)}
            />
            <Button variant="contained" onClick={handleSearchButton}>
              Search
            </Button>
          </SearchbarStyle>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
