import React, { useEffect, useState } from 'react';
import { List, ListItemButton, ListItemText, Paper } from "@mui/material";
import { Container } from "@mui/system";
import ProfilePicture from "../../../images/profilePicture/profilePicture";
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { selectUserData } from '../../../Application/selectors';
import { paths } from '../../../../api/paths';
import { useNavigate } from 'react-router-dom';
import { setNotToSeenData } from './actions';

const Notifications = () => {
    const navigate = useNavigate();
    const userAccount = useAppSelector(selectUserData);
    const [user, setUser] = useState({});
    const [postDate, setPostDate] = useState(false);
    const dispatch = useAppDispatch();

    const customColor = (val) => {
        if (val.seen === true) {
            return 'rgba(0,162,232,0.5)'
        }
        else return 'rgba(0,162,232,0.0)'
    }
    
    useEffect(() => {
        if (userAccount) {
            setUser(userAccount.data.returnValue);
        }
    }, [userAccount]);

    const handleMouseEnter = () => {
        setPostDate(false)
    }

    const handleMouseLeave = () => {
        setPostDate(true)
    }

    const goToProfile = (key) => {
        navigate(`${paths.PROFILE}/?username=${key}`);
    }

    const setNotToSeen = (key) => {
        user.notifications.map((val) => {
            if (val.id === key) {
                if (val.seen === false) {
                    dispatch(setNotToSeenData([user.username, key]))
                }
            }
            return null
        })
    }

    const getNotifications = (
        (user.notifications || []).map((val) => {
            return (
                <List style={{ background: customColor(val), display: 'flex', flexDirection: 'column', padding: '19px' }} key={val.id} onMouseEnter={() => setNotToSeen(val.id)} > 
                    <List style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}} >
                        <div sx={{fullWidth: '350px'}}>
                            <ListItemButton style={{display: 'flex', flexDirection: 'row', gap: '19px'}} onClick={() => {goToProfile(val.friendName)}}>
                                <ProfilePicture />
                                <ListItemText primary={`${val.friendName}`} style={{color: 'rgba(255,255,255,0.75)'}}></ListItemText>
                            </ListItemButton>
                        </div>
                        <ListItemText sx={{ textAlign: 'center'}} style={{fontSize: 50, color: 'rgba(255,255,255,0.75)'}}>{val.type}</ListItemText>
                        <List style={{color: 'rgba(255,255,255,0.75)'}} sx={{right: '0px'}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            {postDate ? `${val.time.substring(11,19)}` : `${val.time.substring(0,10)}`}
                        </List>
                    </List>
                    <List style={{paddingLeft: '30px', fontSize: 50, color: 'white', fontFamily: 'roman'}}>{val.message}</List>
                </List>
            )
        }).reverse()
    )

    return (
        <Paper style={{minHeight:'75vh', maxHeight:'75vh', backgroundColor: 'rgba(171, 204, 219,0.97)', padding: 19, display: 'flex', flexDirection: 'column', rowGap: '19px'}}>
            <Container style={{backgroundColor: 'rgba(0,0,0,0)', maxHeight: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', rowGap: '19px'}}>
                {getNotifications}
            </Container>
        </Paper>
    )
}

export default Notifications;