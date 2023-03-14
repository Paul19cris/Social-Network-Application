import './menu.css';
import React from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { selectUserData } from '../../Application/selectors';
import { Paper } from '@mui/material';
import { Stack } from '@mui/system';

const Menu = () => {
    const userAccount = useAppSelector(selectUserData);
    
    if ( userAccount ) {
        // console.log(userAccount.data.isSuccess);
    }

    return(
        <Stack className="MenuMain">
            <Paper elevation={3} className="MenuPaper"></Paper>
        </Stack>
    )
}

export default Menu

// import { styled } from '@mui/material';
//
// const Paragraph = styled('p')`
//   color: red;
// `