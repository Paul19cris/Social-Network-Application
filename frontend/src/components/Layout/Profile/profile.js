import { Button, List, ListItemButton, ListItemText, Paper } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { paths } from "../../../api/paths";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectUserData } from "../../Application/selectors";
import ProfilePicture from "../../images/profilePicture/profilePicture";
import profilePicture from "../../images/profilePicture/profilePicture.png";
import { fetchVisitData, getFriendStatus, getUserNewsData, sendFriendRequestData } from "../actions";
import "./profile.css"

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const userAccount = useAppSelector(selectUserData);
    const url = new URLSearchParams(window.location.search);
    const visitUsername = url.get("username");
    const [visitAccount, setVisitAccount] = useState({});
    const [user, setUser] = useState({});
    const [news, setNews] = useState([]);
    const [postDate, setPostDate] = useState(false);
    const [friendStatus, setFriendStatus] = useState("");

    useEffect(() => {
        if (userAccount) {
            setUser(userAccount.data.returnValue);
            dispatch(fetchVisitData(visitUsername)).then((result) => {
                setVisitAccount(result.payload.data.returnValue);
            })
            dispatch(getUserNewsData(visitUsername)).then((e) => {
                setNews(e.payload.data.returnValue)
            })
        }
    }, [userAccount]);

    useEffect(() => {
        if (user.username !== visitUsername) {
            dispatch(getFriendStatus([user.username, visitUsername])).then((e) => {
                setFriendStatus(e.payload.data.returnValue)
            })
        }
        else setFriendStatus("My account.")
    }, [friendStatus])

    const handleMouseEnter = () => {
        setPostDate(false)
    }

    const handleMouseLeave = () => {
        setPostDate(true)
    }

    const goToProfile = (key) => {
        navigate(`${paths.PROFILE}/?username=${key}`);
      };

    const sendFriendRequest = (key) => {
        if (user.username !== key) {
            dispatch(sendFriendRequestData([user.username, key])).then((e) => {
                setFriendStatus(e.payload.data.returnValue)
            })
        }
    }

    const getNews = (
        news.map((val) => {
            return (
                <List style={{ background: 'rgba(0,162,232,0.5)', display: 'flex', flexDirection: 'column', padding: '19px' }} key={val.id} > 
                    <List style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}} >
                        <div sx={{fullWidth: '350px'}}>
                            <ListItemButton style={{display: 'flex', flexDirection: 'row', gap: '19px'}} onClick={() => {goToProfile(val.username)}}>
                                <ProfilePicture />
                                <ListItemText primary={val.username} style={{color: 'rgba(255,255,255,0.75)'}}></ListItemText>
                            </ListItemButton>
                        </div>
                        <List style={{color: 'rgba(255,255,255,0.75)'}} sx={{right: '0px'}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            {postDate ? `${val.localDateTime.substring(11,19)}` : `${val.localDateTime.substring(0,10)}`}
                        </List>
                    </List>
                    <List style={{paddingLeft: '30px', fontSize: 50, color: 'white', fontFamily: 'roman'}}>{val.message}</List>
                </List>)
        })
      )

    return(
        <Paper style={{ maxHeight:'75vh', minHeight:'75vh', backgroundColor: 'rgba(171, 204, 219,0.97)', padding: 19, display: 'flex', flexDirection: 'column', rowGap: '19px'}}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Container sx={{ textAlign: 'center' }} className="profilePictureHeader">
                    <img src={profilePicture} className="Profile-profilePicture" alt="profilePicture"/>
                </Container>
                <Button onClick={() => {goToProfile(visitAccount.username)}}>{visitAccount.username}</Button>
                <Button onClick={() => {sendFriendRequest(visitAccount.username)}}>{friendStatus}</Button>
            </div>
            <Container style={{backgroundColor: 'rgba(0,0,0,0)', maxHeight: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', rowGap: '19px'}}>
                {getNews}
            </Container>
        </Paper>
    )
}

export default Profile;