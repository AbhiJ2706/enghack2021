import React, { useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import Login from "./components/login/login";
import SignUp from "./components/signup/signup";
import Marketplace from "./components/marketplace/marketplace";
import Settings from "./components/settings/settings";
import Cart from "./components/cart/cart";
import Dashboard from "./components/dashboard/Dashboard_Content";
import LandingPage from "./components/landing/landing";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { mainListItems, secondaryListItems } from "./listItems";
import Logo from "./images/PiggyBank_Logo.png"
import { validateSession_id } from "./requests";

function App() {
  const classes = useStyles();
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [name, setName] = React.useState("Loading")
  const [money, setMoney] = React.useState("Loading")
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect( async ()=>{
    const res = await validateSession_id();
    console.log(res)
    try {
      setName(res.username)
      setMoney(res.money.toFixed(2))
    } catch {
      console.log("")
    }
  });


  return (
    <div className="extendPage">
      <Switch>
        {/* NO-NAV ROUTES */}
        <Route path="/" component={LandingPage} exact />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />

        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="absolute"
            className={clsx(classes.appBar, open && classes.appBarShift)}
          >
            <Toolbar className={classes.toolbar}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                className={clsx(
                  classes.menuButton,
                  open && classes.menuButtonHidden
                )}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >
                {location.pathname.charAt(1).toUpperCase()+location.pathname.slice(2)}
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(
                classes.drawerPaper,
                !open && classes.drawerPaperClose
              ),
            }}
            open={open}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={handleDrawerClose} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <img src={Logo} style={{width: "170px", marginRight: "8px", marginTop: "-10px"}} alt="logo"/>
                <ChevronLeftIcon style={{marginRight: "-10px"}}/>
              </IconButton>
            </div>
            <Divider />
            <List>{mainListItems(name, money)}</List>
            <Divider />
            <List>{secondaryListItems}</List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
              {/* NAV ROUTES */}
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/marketplace" component={Marketplace} />
              <Route path="/settings" component={Settings} />
              <Route path="/cart" component={Cart} />
            </Container>
          </main>
        </div>
      </Switch>
    </div>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    backgroundColor: "#bb0236"
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
    fontSize: "1.5em",
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default App;
