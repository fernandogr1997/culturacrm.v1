import React ,{useState, useEffect}from 'react';
import { useDispatch } from 'react-redux';
import { SearchIcon, AtSymbolIcon, BellIcon } from '@heroicons/react/outline';
import { logout } from '../app/slices/credencialesSlice';

//material ui
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Cookies from 'js-cookie';

function TopBar(props) {
    
    // const router = useRouter();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const [name, setname] = useState();

    useEffect(() => {
        const name = Cookies.get('user');
        setname(name);
    }, [])
    
    
    const open = Boolean(anchorEl);
    
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
      setAnchorEl(null);
    };

    
    const preLogout = () => {
        handleClose();
        dispatch(logout());
    }

    return (
        <div className="h-16 pl-40 fixed bg-slate-50 shadow-2xl 
        to-blue-500 w-full flex items-center justify-between pr-5">
            <div className="flex px-5 items-center">
                <SearchIcon className="w-5 h-5 text-black" />
                <input type="text" placeholder="Search for tasks ..."
                    className=" bg-transparent border-0 text-black placeholder-gray-200
                outline-none focus:ring-0 text-lg"/>
            </div>
            <div className="flex space-x-6">
                <AtSymbolIcon className="w-7 h-7 text-black" />
                <BellIcon className="w-7 h-7 text-black" />
                <div className="flex items-center text-black">
                    { 
                        (name)
                        ?<h3 className="font-bold mr-3">{name}</h3>
                        :<h3 className="font-bold mr-3">usuario</h3>
                    
                    }
                    

                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <img
                            src="/avt.jpg"
                            alt='logo'
                            width="36"
                            height="36"
                            objectFit="cover"
                            className=" rounded-full "
                            onClick={handleClick}
                        />
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={preLogout}>Logout</MenuItem>
                    </Menu>
                </div>
            </div>
        </div>
    );
}

export default TopBar;