import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { paths } from "../../api/paths";
import Appbar from "../Appbar/Appbar";
import styled from "@emotion/styled";
import { useAppDispatch } from "../../redux/hooks";
import { fetchUserData } from "./actions";

const Layout = () => {
    const isAuthenticated = localStorage.getItem('email');
    const dispatch = useAppDispatch();

    if ( !isAuthenticated ) {
        return <Navigate to={paths.MAIN}/>
    }
    else {
        dispatch(fetchUserData(isAuthenticated));
    }

    return (
        <Content>
            <Appbar />
            <Outlet />
        </Content>
    )
}

export default Layout

const Content = styled('div')`
    width: 95%;
    display: flex;
    align-self: center;
    margin-left: auto;
    margin-right: auto;
    flex-flow: column wrap;
    gap: 15px;
    padding-top: 10px;
`