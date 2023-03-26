import './register.css';
import React, { useState } from 'react';
import { Button, IconButton, Paper, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Logo from '../images/logo/logo.png';
import { Stack } from '@mui/system';
import { paths } from '../../api/paths';
import { registerUser } from './actions';
import { useAppDispatch } from '../../redux/hooks';

const Register = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const paperStyle = {backgroundColor: 'rgba(255,255,255,0.7)'}
    const[error,setError] = useState('')
    const[username,setUsername] = useState('')
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const[confirmPassword,setConfirmPassword] = useState('')

    const sendAccount = () => {
        const account = {username, email, password};
        if(account){
            dispatch(registerUser(account)).then((e) => {
                if( e.payload.returnValue !== null ){
                    navigate(paths.MENU)
                    window.location.reload()
                }
                else(        
                    setError(e.payload.errorMessage)
                )
            }
            )
        }
    }

    const handleClick = () => {
        if(password === confirmPassword){
            sendAccount()
        }
        else{ 
            setError("Passwords don't match.")
        }

    }

    return(
        <Stack className='registerMain' direction={'column'}>
            <IconButton
            size="large"
            edge="start"
            aria-label="open drawer"  
            className='registerLogo'
            onClick={() => navigate('/')}
            >   
                <img src={Logo} className="registerLogo" alt="logo" />
            </IconButton>
            <Paper elevation={24} className='registerTextField' style={paperStyle}>
                <Stack className='registerStackTextField'>
                    <TextField className='registerButtons' label="Username" variant="standard"
                        value={username}
                        onChange={(e) => {setUsername(e.target.value)}} />
                    <TextField className='registerButtons' label="Email" variant="outlined"
                        value={email}
                        onChange={(e) => {setEmail(e.target.value)}} />
                    <TextField className='registerButtons' label="Password" variant="filled" type="password"
                        value={password}
                        onChange={(e) => {setPassword(e.target.value)}} />
                    <TextField className='registerButtons' label="Confirm Password" variant="filled" type="password"
                        value={confirmPassword}
                        onChange={(e) => {setConfirmPassword(e.target.value)}} />
                </Stack>
                <p className='registerError'>{error}</p>
                <Button variant="contained" onClick={handleClick} className="mainButton"><p className='registerP'>Register</p></Button>
            </Paper>
        </Stack>
    )
}

export default Register