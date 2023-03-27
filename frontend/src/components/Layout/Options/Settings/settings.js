import * as React from 'react';
import { List, ListItem, ListItemButton, Paper, TextField } from '@mui/material';
import { Container } from '@mui/system';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { selectUserData } from '../../../Application/selectors';
import { deauthenticateUser } from '../../../Logout/actions';

const Settings = () => {
    const dispatch = useAppDispatch();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [cpassword, setCPassword] = React.useState("");
    const [newChange, setNewChange] = React.useState("");
    const [error, setError] = React.useState("");
    const userAccount = useAppSelector(selectUserData);
    
    const [option, setOption] = React.useState(["Username"])

    const setNull = () => {
        setEmail("")
        setPassword("")
        setCPassword("")
        setNewChange("")
    }

    const sendAccount = (e) => {
        // const acc = {email, password, newChange, e}
    }

    const logOut = () => {
        dispatch(deauthenticateUser(userAccount.data.returnValue))
        window.location.reload()
    }

    const changeData = (e) => {
        if ( email.length > 0 && password.length > 0 && cpassword.length > 0 && newChange.length > 0 ) {
            if ( password === cpassword ) {
                sendAccount(e)
            }
            else setError("Passwords don't match.")
        }
    }

    const displayy = (
        option.map((e) => {
            return ((e === 'Username' || e === 'Email' || e === 'Password') ? 
                <Container sx={{ overFlowY: 'auto', display: 'flex', flexDirection: 'column', gap: 4, position: 'center', width: '75%'}}>
                    <TextField id="settingEmail" label={"Email"} fullWidth value={email} onChange={(event) => {setEmail(event.target.value)}} />
                    <TextField id="settingsPassword" variant="filled" type="password" label={"Password"} fullWidth value={password} onChange={(event) => {setPassword(event.target.value)}} />
                    <TextField id="settingsCPassword" variant="filled" type="password" label={"Confirm Password"} fullWidth value={cpassword} onChange={(event) => {setCPassword(event.target.value)}} />
                    <TextField id="settingsNewChange" variant="standard" type={e} label={`New ${e}`} fullWidth value={newChange} onChange={(event) => {setNewChange(event.target.value)}} />
                    <Container style={{ display: 'flex', justifyContent: 'center' }}>{error}</Container>
                    <Container sx={{ width: '35%', height: '75px' }}>
                        <ListItemButton onClick={() => {changeData(e); setNull()}} style={{ fontFamily: 'roman', fontSize:25, backgroundColor: 'rgba(171, 204, 219,0.97)', minWidth: '100px', height: '100%', color: 'white', display: 'flex', justifyContent: 'center' }}>Change</ListItemButton>
                    </Container>
                </Container> : 
                (e === 'Delete') ? 
                    <div>Content for condition 2</div> :
                (e === 'Log Out') ?
                    <Container sx={{ padding: 7, display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
                        <Container style={{ fontFamily: 'roman', fontSize: 50, color: 'gray', display: 'flex', justifyContent: 'center' }}>Are you sure you want to log out?</Container>
                        <Container sx={{ width: '50%', height: '125px' }}>
                            <ListItemButton onClick={() => {logOut()}} style={{ fontFamily: 'roman', fontSize:50, backgroundColor: 'red', minWidth: '100px', height: '100%', color: 'white', display: 'flex', justifyContent: 'center' }}>Log Out</ListItemButton>
                        </Container>
                    </Container> : null
                    
        )})
    )

    return (
        <Paper style={{ maxHeight:'75vh', minHeight:'75vh', backgroundColor: 'rgba(171, 204, 219,0.97)', padding: 19, display: 'flex', flexDirection: 'row', rowGap: '19px'}}>
            <List sx={{height: 'auto', width: '30%', padding: 2}}>    
                <ListItemButton onClick={() => { setError(""); setNull(); setOption(['Username']) }} style={{fontFamily: 'roman', fontSize:25, color: 'white'}} sx={{ height: '20%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Change username</ListItemButton>
                <ListItemButton onClick={() => { setError(""); setNull(); setOption(['Email']) }} style={{fontFamily: 'roman', fontSize:25, color: 'white'}} sx={{ height: '20%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Change email</ListItemButton>
                <ListItemButton onClick={() => { setError(""); setNull(); setOption(['Password']) }} style={{fontFamily: 'roman', fontSize:25, color: 'white'}} sx={{ height: '20%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Change password</ListItemButton>
                <ListItemButton onClick={() => { setNull(); setOption(['Delete']) }} style={{fontFamily: 'roman', fontSize:25, color: 'red'}} sx={{ height: '20%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Delete account</ListItemButton>
                <ListItem sx={{ textAlign: 'center', height: '20%', padding: 3}}>
                    <ListItemButton onClick={() => {setOption(['Log Out'])}} style={{fontFamily: 'roman', fontSize:25, color: 'white', backgroundColor:'red'}} sx={{ textAlign: 'center', height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Log Out</ListItemButton>
                </ListItem>
            </List>
            <Paper sx={{width: '70%', padding: 7 }} style={{background: ''}}>
                {displayy}
            </Paper>
        </Paper>
    )
}

export default Settings;