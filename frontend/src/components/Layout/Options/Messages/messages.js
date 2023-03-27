import { Badge, Button, InputAdornment, List, ListItemButton, ListItemText, Paper, TextField } from '@mui/material';
import { Container } from '@mui/system';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../../api/paths';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { selectUserData } from '../../../Application/selectors';
import ProfilePicture from '../../../images/profilePicture/profilePicture';
import { getOrderedFriends, getUnseenMessagesData, sendMessageData, setToSeenMessageData } from './actions';

const Messages = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userAccount = useAppSelector(selectUserData);
    const [ orderedFriends, setOrderedFriends ]  = React.useState([]);
    const [ option, setOption ] = React.useState([]);
    const [ message, setMessage ] = React.useState("");
    const [postDate, setPostDate] = React.useState(true);
    const [currentFriend, setCurrentFriend] = React.useState([]);
    const [ unseenNr, setUnseenNr ] = React.useState({});

    React.useEffect (() => {
        if (userAccount) {
            dispatch(getOrderedFriends(userAccount.data.returnValue.username)).then((e) => {
                setOrderedFriends(e.payload.data.returnValue)
        })
    }
    }, [userAccount] )

    React.useEffect (() => {
        if (orderedFriends[0]) { setOption([orderedFriends[0].messageList]);
                                setCurrentFriend(orderedFriends[0].friendName) }
    }, [orderedFriends[0]])

    React.useEffect(() => {
        (orderedFriends || []).map((val) => {
            dispatch(getUnseenMessagesData([userAccount.data.returnValue.username, val.friendName])).then((e) => {
                setUnseenNr(count => ({
                    ...count,
                    [val.friendName] : e.payload.data.returnValue
                }
                ))
            })
            return true
        })
    }, [orderedFriends])

    const goToProfile = (key) => {
        navigate(`${paths.PROFILE}/?username=${key}`);
    };

    const handleMouseEnter = () => {
        setPostDate(false)
    }

    const handleMouseLeave = () => {
        setPostDate(true)
    }

    const friendNames = (
        (orderedFriends || []).map((val) => {
            return (
                <ListItemButton key={val.id} onClick={() => { setOption([val.messageList]); setCurrentFriend(val.friendName) }} style={{fontFamily: 'roman', fontSize:25, color: 'white'}} sx={{ height: '20%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'}}>
                    {unseenNr[val.friendName] > 0 && (
                        <Badge sx={{ position: 'absolute', left: 0 }} badgeContent={unseenNr[val.friendName]} color="error" />
                    )}    
                    {val.friendName}
                </ListItemButton>
                    
            )
        })
    )

    const sendMessage = () => {
        dispatch(sendMessageData([userAccount.data.returnValue.username, currentFriend, message])).then((e) => console.log(e))
        dispatch(getOrderedFriends(userAccount.data.returnValue.username)).then((e) => {
            setOrderedFriends(e.payload.data.returnValue)
        })
        setMessage("")
    }

    const setMessageToSeen = (e) => {
        if ( e.seen === false ) {
            dispatch(setToSeenMessageData([userAccount.data.returnValue.username, e.username, e.id]))
        }
    }

    const customColor = (e) => {
        if (e.seen === false) {
            return 'rgba(0,162,232,1)'
        }
        else return 'rgba(0,162,232,0.5)'
    }

    const displayy = option[0] && (
        option[0].map((e) => {
            return (
                <List style={{ background: customColor(e), display: 'flex', flexDirection: 'column', padding: '19px' }} key={e.id} onMouseEnter={() => { setMessageToSeen(e) }}> 
                    <List style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}} >
                        <div sx={{fullWidth: '350px'}}>
                            <ListItemButton style={{display: 'flex', flexDirection: 'row', gap: '19px'}} onClick={() => {goToProfile(e.username)}}>
                                <ProfilePicture />
                                <ListItemText primary={e.username} style={{color: 'rgba(255,255,255,0.75)'}}></ListItemText>
                            </ListItemButton>
                        </div>
                        <List style={{color: 'rgba(255,255,255,0.75)'}} sx={{right: '0px'}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            {postDate ? `${e.time.substring(11,19)}` : `${e.time.substring(0,10)}`}
                        </List>
                    </List>
                    <List style={{paddingLeft: '30px', fontSize: 50, color: 'white', fontFamily: 'roman'}}>{e.message}</List>
                </List>)
            }
    ))  

    return (
        <Paper style={{ maxHeight:'75vh', minHeight:'75vh', backgroundColor: 'rgba(171, 204, 219,0.97)', padding: 19, display: 'flex', flexDirection: 'row', rowGap: '19px'}}>
            <List sx={{overflowY: 'auto', height: 'auto', width: '30%', padding: 2}}>    
                {friendNames}
            </List>
            <Paper sx={{width: '70%', padding: 7 }} style={{display: 'flex', flexDirection: 'column-reverse', rowGap: 10}}>
                <TextField
                    label={`Type your message to ${currentFriend}...`}
                    fullWidth
                    value={message}
                    onChange={(event) => {setMessage(event.target.value)}} 
                    InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Button variant="contained" color="primary" onClick={() => {sendMessage()}}>SEND</Button>
                        </InputAdornment>
                    ),
                    }}
                />    
                <Container style={{backgroundColor: 'rgba(0,0,0,0)', maxHeight: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', rowGap: '19px' }}>
                    {displayy}
                </Container>
            </Paper>
        </Paper>
    )
}

export default Messages;