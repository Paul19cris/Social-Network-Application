import * as React from 'react';
import { List, ListItem, ListItemButton, Paper, TextField } from '@mui/material';
import { Container } from '@mui/system';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { selectUserData } from '../../../Application/selectors';
import { deauthenticateUser } from '../../../Logout/actions';
import { changeEmailData, changePasswordData, changeUsernameData, deleteAccountData } from './actions';

const Settings = () => {
    const dispatch = useAppDispatch();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [cpassword, setCPassword] = React.useState("");
    const [newChange, setNewChange] = React.useState("");
    const [error, setError] = React.useState("");
    const [ changeAccount, setChangeAccount ] = React.useState([]);
    const [ changeOption, setChangeOption ] = React.useState([]);
    const userAccount = useAppSelector(selectUserData);
    
    const [option, setOption] = React.useState(["Username"])

    const setNull = () => {
        setEmail("")
        setPassword("")
        setCPassword("")
        setNewChange("")
    }

    const sendAccount = (e) => {
        setChangeAccount([userAccount.data.returnValue.username, newChange, email, password ])
        setChangeOption(e)
    }

    React.useEffect((e) => {
        if(changeAccount.length>0) {
            switch (changeOption) {
            case "Username":
                dispatch(changeUsernameData(changeAccount)).then((e) => {
                    if (e.payload.data.isSuccess === false) {
                        setError (e.payload.data.errorMessage)
                    }
                })
                break
            case "Email":
                dispatch(changeEmailData(changeAccount)).then((e) => {
                    if (e.payload.data.isSuccess === false) {
                        setError (e.payload.data.errorMessage)
                    }
                })
                break
            case "Password":
                dispatch(changePasswordData(changeAccount)).then((e) => {
                    if (e.payload.data.isSuccess === false) {
                        setError (e.payload.data.errorMessage)
                    }
                })
                break
            case "Delete":
                dispatch(deleteAccountData(changeAccount)).then((e) => {
                    console.log(e)
                    if (e.payload.data.isSuccess === false) {
                        setError (e.payload.data.errorMessage)
                    }
                    else logOut()
                })
                break
            default:
                break
            }}
    }, [changeAccount]);

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
        option.map((e, index) => {
            return ((e === 'Username' || e === 'Email' || e === 'Password') ? 
                <Container key={`option${index}`} sx={{ overFlowY: 'auto', display: 'flex', flexDirection: 'column', gap: 4, position: 'center', width: '75%'}}>
                    <TextField key={`${e}Email`} id="settingEmail" label={"Email"} fullWidth value={email} onChange={(event) => {setEmail(event.target.value)}} />
                    <TextField key={`${e}Password`} id="settingsPassword" variant="filled" type="password" label={"Password"} fullWidth value={password} onChange={(event) => {setPassword(event.target.value)}} />
                    <TextField key={`${e}CPassword`} id="settingsCPassword" variant="filled" type="password" label={"Confirm Password"} fullWidth value={cpassword} onChange={(event) => {setCPassword(event.target.value)}} />
                    <TextField key={`${e}NewChange`} id="settingsNewChange" variant="standard" type={e} label={`New ${e}`} fullWidth value={newChange} onChange={(event) => {setNewChange(event.target.value)}} />
                    <Container key={`${e}Error`} style={{ display: 'flex', justifyContent: 'center', color: 'red', fontFamily:'roman'}}>{error}</Container>
                    <Container sx={{ width: '35%', height: '75px' }}>
                        <ListItemButton onClick={() => {changeData(e); setNull()}} style={{ fontFamily: 'roman', fontSize:25, backgroundColor: 'rgba(171, 204, 219,0.97)', minWidth: '100px', height: '100%', color: 'white', display: 'flex', justifyContent: 'center' }}>Change</ListItemButton>
                    </Container>
                </Container> : 
                (e === 'Delete') ? 
                    <Container key={`option${index}`} sx={{ overFlowY: 'auto', display: 'flex', flexDirection: 'column', gap: 4, position: 'center', width: '75%'}}>
                        <TextField id="settingEmailDelete" label={"Email"} fullWidth value={email} onChange={(event) => {setEmail(event.target.value)}} />
                        <TextField id="settingsPasswordDelete" variant="filled" type="password" label={"Password"} fullWidth value={password} onChange={(event) => {setPassword(event.target.value)}} />
                        <TextField id="settingsCPasswordDelete" variant="filled" type="password" label={"Confirm Password"} fullWidth value={cpassword} onChange={(event) => {setCPassword(event.target.value)}} />
                        <TextField id="settingsNewChange" variant="standard" type={e} label={`Type YES to confirm`} fullWidth value={newChange} onChange={(event) => {setNewChange(event.target.value)}} />
                        <Container style={{ display: 'flex', justifyContent: 'center', color: 'red', fontFamily:'roman'}}>{error}</Container>
                        <Container sx={{ width: '35%', height: '75px' }}>
                            <ListItemButton onClick={() => {changeData(e); setNull()}} style={{ fontFamily: 'roman', fontSize:25, backgroundColor: 'red', minWidth: '100px', height: '100%', color: 'white', display: 'flex', justifyContent: 'center' }}>Delete</ListItemButton>
                        </Container> 
                    </Container>:
                (e === 'Log Out') ?
                    <Container key={`option${index}`} sx={{ padding: 7, display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
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
                <ListItemButton key={'Username'} onClick={() => { setError(""); setNull(); setOption(['Username']) }} style={{fontFamily: 'roman', fontSize:25, color: 'white'}} sx={{ height: '20%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Change username</ListItemButton>
                <ListItemButton key={'Email'} onClick={() => { setError(""); setNull(); setOption(['Email']) }} style={{fontFamily: 'roman', fontSize:25, color: 'white'}} sx={{ height: '20%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Change email</ListItemButton>
                <ListItemButton key={'Password'} onClick={() => { setError(""); setNull(); setOption(['Password']) }} style={{fontFamily: 'roman', fontSize:25, color: 'white'}} sx={{ height: '20%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Change password</ListItemButton>
                <ListItemButton key={'Delete'} onClick={() => { setNull(); setOption(['Delete']) }} style={{fontFamily: 'roman', fontSize:25, color: 'red'}} sx={{ height: '20%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Delete account</ListItemButton>
                <ListItem key={'ButtonItem'} sx={{ textAlign: 'center', height: '20%', padding: 3}}>
                    <ListItemButton key={'Button'} onClick={() => {setOption(['Log Out'])}} style={{fontFamily: 'roman', fontSize:25, color: 'white', backgroundColor:'red'}} sx={{ textAlign: 'center', height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Log Out</ListItemButton>
                </ListItem>
            </List>
            <Paper sx={{width: '70%', padding: 7 }} style={{background: ''}}>
                {displayy}
            </Paper>
        </Paper>
    )
}

export default Settings;