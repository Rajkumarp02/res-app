import { ThemeProvider, createTheme } from "@mui/material";
import Dashboard from "./Dashboard/Dashboard";

const Home = () => {
    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });
    return (
        <ThemeProvider theme={ darkTheme }>

            <Dashboard />

        </ThemeProvider>
    );
};

export default Home;
