import './login.css';
import React, { useState } from 'react';
import { Button, IconButton, Paper, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Logo from '../images/logo/logo.png';
import { Stack } from '@mui/system';
import { paths } from '../../api/paths';
import { useAppDispatch } from '../../redux/hooks';
import { authenticateUser } from './actions';

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const paperStyle = {backgroundColor: 'rgba(255,255,255,0.7)'}

    const[error, setError] = useState('')
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')

    const handleClick = (e) => {
        const account = {email, password};
        if(account){
            dispatch(authenticateUser(account)).then((e) => {
                if( e.payload.returnValue !== null ){
                    navigate(paths.MENU)
                    window.location.reload()
                }
                else(        
                    setError(e.payload.errorMessage)
                )
            })
        }
    }

    return(
        <Stack className='loginMain' direction={'column'}>
            <IconButton
            size="large"
            edge="start"
            aria-label="open drawer"  
            className='loginLogo'
            onClick={() => navigate('/')}
            >   
                <img src={Logo} className="loginLogo" alt="logo" />
            </IconButton>
            <Paper elevation={24} className='loginTextField' style={paperStyle}>
                <Stack className='loginStackTextField'>
                    <TextField id="loginEmail" className='loginButtons' label="Email" variant="outlined"
                        value={email}
                        onChange={(e) => {setEmail(e.target.value)}} />
                    <TextField id="loginPassword" className='loginButtons' label="Password" variant="filled" type="password"
                        value={password}
                        onChange={(e) => {setPassword(e.target.value)}} />
                </Stack>
                <p className='loginError'>{error}</p>
                <Button variant="contained" onClick={handleClick} className="loginButton"><p className='loginP'>Log In</p></Button>
            </Paper>
        </Stack>
    )
}

export default Login

