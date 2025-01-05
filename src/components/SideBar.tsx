import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { IconContext } from 'react-icons';
import * as IoIcons from 'react-icons/io';
import Grid from '@mui/material/Grid';
const cardId = localStorage.getItem('cardId');
let finalcardId:string='';
if (cardId) {
    finalcardId = JSON.parse(cardId);
    console.log(finalcardId);
}
const UserSidebarData = [
    {
        title: 'Home',
        path: '/home',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Order',
        path: '/order',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
    },
    {
        title: 'Logout',
        path: '/',
        icon: <IoIcons.IoMdHelpCircle />,
        cName: 'nav-text',
    }
];
const AdminSidebarData=[
    {
        title: 'Home',
        path: '/home',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Update Products',
        path: '/products',
        icon: <FaIcons.FaCartPlus />,
        cName: 'nav-text'
    },
    {
        title: 'Add User',
        path: '/adduser',
        icon: <IoIcons.IoMdPeople />,
        cName: 'nav-text'
    },
    {
        title: 'Add Product',
        path: '/addProduct',
        icon: <FaIcons.FaCartArrowDown />,
        cName: 'nav-text'
    },
    {
        title: 'Logout',
        path: '/',
        icon: <IoIcons.IoMdHelpCircle />,
        cName: 'nav-text',
    }
];

export const SideBar: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('card');
        localStorage.removeItem('cardId');
        navigate('/'); 
    };

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <Grid>
                    <ul className='nav-menu-items'>
                        {finalcardId.toLowerCase() !=="admin" && UserSidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path} onClick={item.title === 'Logout' ? handleLogout : undefined}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                        {finalcardId.toLowerCase() ==="admin" && AdminSidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path} onClick={item.title === 'Logout' ? handleLogout : undefined}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </Grid>
            </IconContext.Provider>
        </>
    );
}
