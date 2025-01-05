import { Grid } from "@mui/material"
import { NavBar } from "./NavBar"
import { DashBoard } from "./DashBoard"
import { useState } from "react";
import { SideBar } from "./SideBar";

export const Home = () => {
    const [sidebar, setSidebar] = useState(true);
    const showSidebar = () => {
        setSidebar(!sidebar);
    }
    return (
        <Grid container style={{ height: '100vh' }}>
            <Grid container item>
                <NavBar showSidebar={showSidebar} sidebar={sidebar} />
            </Grid>
            <Grid container item>
                <Grid container item xs={2} className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <SideBar />
                </Grid>
                <Grid container item xs style={{ overflowY: 'auto', margin: '15px', borderRadius: '10px' }}>
                    <DashBoard />
                </Grid>
            </Grid>
        </Grid>
    )
}