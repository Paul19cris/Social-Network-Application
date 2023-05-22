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
import Logo from '../images/logo/logo';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ProfilePicture from '../images/profilePicture/profilePicture';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getAllUsersByKey, getUnseenNr } from './actions';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../api/paths';
import { selectUserData } from '../Application/selectors';
import './Appbar.css'



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
  const [notNumber, setNotNumber] = React.useState(0);
  const [msgNumber, setMsgNumber] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const navigate = useNavigate();
  const userAccount = useAppSelector(selectUserData);

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
      <MenuItem onClick={() => {goToProfile(userAccount.data.returnValue.username)}}>Profile</MenuItem>
      <MenuItem onClick={() => {goToPage(paths.SETTINGS)}}>Settings</MenuItem>
    </Menu>
  );

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
        <IconButton size="large" aria-label="show new mails" color="inherit">
          <Badge badgeContent={msgNumber} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem onClick={() => goToPage(paths.NOTIFICATIONS)}>
        <IconButton
          size="large"
          aria-label="show new notifications"
          color="inherit"
        >
          <Badge badgeContent={notNumber} color="error">
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
        <p>Account</p>
      </MenuItem>
    </Menu>
  );

  const [open, setOpen] = React.useState(true);
  const componentRef = React.useRef(null);

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (componentRef.current && !componentRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [componentRef]);

  const handleSearch = (val) => {
    setOpen(val);
  }
  
  const [name, setName] = React.useState('');
  const [profiles, setProfiles] = React.useState([]);
  const dispatch = useAppDispatch();
  const searchProfiles = (event) => {
    if ( event.currentTarget.value.length > 2 ) {
      dispatch(getAllUsersByKey(event.currentTarget.value)).then((e) => {
        if(e.payload.data.isSuccess === true){
          setProfiles(e.payload.data.returnValue)
        }
        else setProfiles([])
      })
      if ( profiles.length > 0 && profiles.length < 5 ) handleSearch(true)
      else handleSearch(false)
    }
    else handleSearch(false)
  }

  const goToProfile = (key) => {
    handleMenuClose()
    setName("")
    setOpen(false)
    navigate(`${paths.PROFILE}/?username=${key}`);
    window.location.reload()
  };

  const goToPage = (path) => {
    handleMenuClose()
    setName("")
    setOpen(false)
    navigate(path);
  };

  const foundedProfiles = (
    profiles.map((val) => {
      return (<ListItemButton sx={{ width:'250.4px', pl: 1, marginLeft: '0', zIndex: '9999' }} style={{ backgroundColor: 'rgba(0,162,232,0.9)'}} key={val.username} onClick={() => {goToProfile(val.username)}}>
                <ListItemIcon>
                  <ProfilePicture className="App-profilePicture" />
                </ListItemIcon>
                <ListItemText primary={val.username} />
              </ListItemButton>)
    })
  )
  React.useEffect(() => {
    if( userAccount ) {
      dispatch(getUnseenNr(userAccount.data.returnValue.username)).then((e) => {
        setMsgNumber(e.payload.data.returnValue[0]);
        setNotNumber(e.payload.data.returnValue[1]);
    }); }
  }, [userAccount])

  return (
    <Box sx={{ flexGrow: 0 }}>
      <AppBar position="static" sx={{ height: '75px' }}>
        <Toolbar>
            <IconButton onClick={() => goToPage(paths.MENU)}
            size="large"
            edge="start"
            aria-label="open drawer"
            sx={{ mr: 0 }}
          >
            <Logo />
          </IconButton>
          <Box sx={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <Search position="fixed">
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={name}
                onChange={(event) => {setName(event.target.value)}}
                onKeyDown={(event) => {if(event.key === "Enter") searchProfiles(event)}}
              />
              <Box sx={{ position: 'absolute', top: '100%', left: '0px', display: 'flex', alignItems: 'flex-start' }} ref={componentRef}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {foundedProfiles}
                </List>
              </Collapse>
            </Box>
            </Search>
            
          </Box>
          
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label={`show ${msgNumber} new mails`} color="inherit" onClick={() => goToPage(paths.MESSAGES)}>
              <Badge badgeContent={msgNumber} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              onClick={() => goToPage(paths.NOTIFICATIONS)}
              size="large"
              aria-label={`show ${notNumber} new notifications`}
              color="inherit"
            >
              <Badge badgeContent={notNumber} color="error">
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