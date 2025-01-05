import { Grid, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import * as AiIcons from 'react-icons/ai';
import PersonPinIcon from '@mui/icons-material/PersonPin';
export const NavBar = (props: any) => {
    const cardId = localStorage.getItem('cardId');
    const finalcardId = cardId ? JSON.parse(cardId) : '';
    const { sidebar, showSidebar } = props;
    return (
        <Grid container justifyContent={'space-between'} item className="navbar">
            <Grid item>
                <Link to='#' className=''>
                    <AiIcons.AiOutlineDoubleRight onClick={showSidebar} style={{
                        transform: sidebar ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                        color: 'white',
                        fontSize: '2rem',
                    }} />
                </Link>
            </Grid>
            <Grid item>
                <Tooltip arrow title={finalcardId.toUpperCase()} placement="left-end" TransitionProps={{ timeout: 1000 }} leaveDelay={200}>
                    <PersonPinIcon color="primary" fontSize="large"></PersonPinIcon>
                </Tooltip>
            </Grid>

        </Grid>
    );
}
