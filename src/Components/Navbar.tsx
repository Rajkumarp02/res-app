import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import { useOidc, useOidcUser } from '@axa-fr/react-oidc';
import { Avatar, Button } from '@mui/material';
import { deepOrange, pink } from '@mui/material/colors';
import BubbleChartTwoToneIcon from '@mui/icons-material/BubbleChartTwoTone';


const drawerWidth = 240;
const navItems = [
  { label: 'Student-List', path: '/studentlist' },
  { label: 'Profile', path: '/profile-page' },

];

const sideBar = [
  { label: 'TotalCount', path: '/totalcount' },
  { label: 'NewForm', path: '/new-form' },

];

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { logout, isAuthenticated } = useOidc();
  const { oidcUser } = useOidcUser();
  const firstLetter = oidcUser && oidcUser.name ? oidcUser.name.charAt(0).toUpperCase() : '';

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Icon
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton component={NavLink} to={item.path} sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} component="nav" sx={{ p: 2 }} >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
        
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 2,
              display: { xs: 'none', sm: 'block' },
            }}
          >
            <NavLink to='/'>
              <HomeIcon sx={{ width: "60px" }} />
            </NavLink>
       
          </Typography>
          <Box
            sx={{
              display: { xs: 'none', sm: 'block',md:'flex' },
              'a': { marginRight: "30px", color: '#fff', textDecoration: 'none' },
              'justifyContent': 'space-between',
              'alignItems': 'center',
              gap:"10px"
            }}
          >
            {navItems.map((item) => (
              <NavLink key={item.label} to={item.path}>
                <Button variant="contained" color="info">
                  {item.label}
                </Button>
              </NavLink>
            ))}
            {isAuthenticated ? (
              <Button variant="contained" color="info" onClick={() => logout()}>
                Logout
              </Button>
            ) : (
              <></>
            )}
            {oidcUser ? (
              <Link to="/profile-page">
              <Avatar sx={{ bgcolor: deepOrange[500],
              '&:hover': {
            bgcolor:pink[700],
          }, }}>
                {firstLetter}
              </Avatar>
              </Link>
            ) : (
              <></>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {sideBar.map((text, index) => (
            <NavLink key={text.label} to={text.path} style={{
          color: 'gray', textDecoration: 'none',fontSize:"18px",fontWeight:"bold"
            }}>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <BubbleChartTwoToneIcon /> : <BubbleChartTwoToneIcon/>}
                </ListItemIcon>
                <ListItemText primary={text.label} />
              </ListItemButton>
            </NavLink>
          ))}
        </List>
        <Divider />
      </Drawer>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        {/* Main content */}
      </Box>
    </Box>
  );
}
