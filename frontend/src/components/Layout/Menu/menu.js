import './menu.css';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { selectUserData } from '../../Application/selectors';
import { Button, Container, InputAdornment, List, ListItemButton, ListItemText, Paper, TextField } from '@mui/material';
import { fetchNewsData, getNewsData } from '../actions';
import ProfilePicture from '../../images/profilePicture/profilePicture'
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../api/paths';

const Menu = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const userAccount = useAppSelector(selectUserData);
    const [message, setMessage] = useState(``);
    const [newsMessage, setNewsMessage] = useState("");
    const [user, setUser] = useState({});
    const [news, setNews] = useState([]);
    const [postDate, setPostDate] = useState(true);
    
    // useEffect(() => {
    //     const ws = new WebSocket('ws://localhost:3000')

    //     ws.onmessage = (event) => {
    //         const nw = JSON.parse(event.data);
    //         setNews((news) => [...news, nw]);
    //     }

    //     return () => {
    //         ws.close()
    //     };
    // })

    useEffect(() => {
        if (userAccount) {
            setUser(userAccount.data.returnValue);
            setMessage(`What's on your mind, ${user.username}?`);
            dispatch(getNewsData(userAccount.data.returnValue.username)).then((e) => {
                setNews(e.payload.data.returnValue)
            })
        }
    }, [userAccount]);

    const postNews = () => {
        if (newsMessage.length > 5) {
            dispatch(fetchNewsData([user.username, newsMessage])).then((e) => {
                // const ws = new WebSocket('ws://localhost:4000');

                // ws.onopen = () => {
                // ws.send(JSON.stringify(e.data.returnValue.message));
                // ws.close();
                // };
                setNewsMessage("")
            })
        }
    }

    const handleMouseEnter = () => {
        setPostDate(false)
    }

    const handleMouseLeave = () => {
        setPostDate(true)
    }

    const goToProfile = (key) => {
        navigate(`${paths.PROFILE}/?username=${key}`);
      };

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
        <Paper style={{minHeight:'75vh', maxHeight:'75vh', backgroundColor: 'rgba(171, 204, 219,0.97)', padding: 19, display: 'flex', flexDirection: 'column', rowGap: '19px'}}>
            <TextField
                id="MenuTextField"
                label={message}
                fullWidth
                value={newsMessage}
                onChange={(event) => {setNewsMessage(event.target.value)}} 
                InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <Button variant="contained" color="primary" onClick={() => {postNews()}}>POST</Button>
                    </InputAdornment>
                ),
                }}
            />
            <Container style={{backgroundColor: 'rgba(0,0,0,0)', maxHeight: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', rowGap: '19px'}}>
                {getNews}
            </Container>
        </Paper>
    )
}

export default Menu