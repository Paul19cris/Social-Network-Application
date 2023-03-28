import 'animate.css';
import './main.css';
import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Logo from '../images/logo/logo.png';
import { paths } from '../../api/paths';
import styled from '@emotion/styled';


const Main = () => {
    const navigate = useNavigate()

    return(
        <Content>
            <Stack className='mainMain' direction={'column'}>
                <IconButton
                    size="large"
                    edge="start"
                    aria-label="open drawer"  
                    className='mainLogo'
                    onClick={() => navigate('/')}
                >
                <img src={Logo} className="mainLogo" alt="logo" />
                </IconButton>
                <Stack className='mainStack' direction={'column'}>
                <Button variant="text" onClick={ () => navigate(paths.LOGIN) } className="mainButton"><p className='mainP'>Log In</p></Button>
                <Button variant="contained" onClick={() => navigate(paths.REGISTER)} className="mainButton"><p className='mainP'>Register</p></Button>
                </Stack>
            </Stack>
        </Content>
    )
}

export default Main



const Content = styled('div')`
  margin: 7%;
`