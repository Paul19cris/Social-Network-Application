import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Logo from '../images/logo/logo';
import './Appbar.css'
import { paths } from '../../api/paths';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllUsers, getAllUsersByKey } from './actions';
import { useEffect } from 'react';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Appbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [anchorSearch, setAnchorSearch] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isSearchOpen = Boolean(anchorSearch);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleSearchOpen = (event) => {
    setAnchorSearch(event.currentTarget);
  };

  const handleSearchClose = () => {
    setAnchorSearch(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToPage = (path) => {
    handleMenuClose()
    navigate(path);
  };

  const goToProfile = (profile) => {

  };

  // const users = []
  //   useEffect(
  //   dispatch(getAllUsers()).then((e) => {
  //     e.payload.data.returnValue.forEach(element => {
  //       users.push(element)
  //     });
  // }), [users])
  // console.log(users[1])

  const searchProfiles = (event) => {
      if( event.currentTarget.value.length > 2 ) {
        dispatch(getAllUsersByKey(event.currentTarget.value)).then((e) => {
          setProfiles(e.payload.data.returnValue)
        }) 
        handleSearchOpen(event)
      }
    }

  const[searchName, setSearchName] = useState('');
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
    <MenuItem onClick={() => {goToPage(paths.PROFILE)}}>Profile</MenuItem>
    <MenuItem onClick={() => goToPage(paths.SETTINGS)}>Settings</MenuItem>
    </Menu>
  );
  
  const [profiles, setProfiles] = useState([]);
  const foundProfiles = (
    profiles.map((val) => {
      return <ToProfile onClick={() => {goToPage(paths.PROFILE); setAnchorSearch(null)}}>{val.username}</ToProfile>;
    })
  )
  const searchId = 'primary-search-account-search';
  const renderSearch = (
    <SearchMenu
      anchorSearch={anchorSearch}
      // anchorOrigin={{
      //   horizontal: 'center',
      //   vertical: 'top',
      // }}
      id={searchId}
      keepMounted
      // transformOrigin={{
      //   vertical: 'bottom',
      //   horizontal: 'center',
      // }}
      open={isSearchOpen}
      onClose={handleSearchClose}
    >
    {foundProfiles}
    </SearchMenu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => goToPage(paths.MESSAGES)}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem onClick={() => goToPage(paths.NOTIFICATIONS)}>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={() => goToPage(paths.MENU)}
            size="large"
            edge="start"
            aria-label="open drawer"
            sx={{ mr: 0 }}
          >
            <Logo />
          </IconButton>
          <Search sx={{position: "relative"}}>
            <SearchIconWrapper >
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value= {searchName}
              aria-controls={searchId}
              onChange= { (e) => { setSearchName(e.target.value)
                                  searchProfiles(e) }} 
            />
            {renderSearch}
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

export default Appbar;

const ToProfile = styled(MenuItem) `
  background-color: red;
  width: 200px;
`

const SearchMenu = styled(Menu)`
  position: absolute;
  top: -5%;
  left: 10%;
`