import * as React from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "../stores/hooks"
import { authUser, loginToggle } from "../stores/loginReducer"
import { IContactProps } from "./pages/ContactsPage"

const HeaderEl = styled.header`
    width: 100%;
    height: 60px;
    background: #484848;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0px 5px 10px -3px rgba(51, 63, 72, 0.81);
`

const ControlsCont = styled.div`
    display: flex;
    align-items: center;
    column-gap: 10px;
    height: 100%;
`

const Control = styled(NavLink)`
    color: #FFFFFF;
    padding: 0 20px;
    min-width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    cursor: pointer;

    &.active {
        color:#4A67FF;
        text-decoration: underline;
        cursor: default;
    }

    &:hover {
        color:#4A67FF;
    }
`
const ButtonEl = styled.button`
    color: #FFFFFF;
    padding: 0 20px;
    min-width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &.active {
        color:#4A67FF;
        text-decoration: underline;
        cursor: default;
    }

    &:hover {
        color:#4A67FF;
    }
`

export const Header:React.FC = () => {

    const dispatch = useAppDispatch()
    // let onLogin = useAppSelector(state => state.login.login)

    const navigate = useNavigate()
    function buttonHandler() {
       
        dispatch(authUser(null))
        localStorage.removeItem("user")
        navigate("login")
        console.log(111);
    }

    return (
        <HeaderEl>
           <ControlsCont>
                <Control to="contacts">Контакты</Control>
           </ControlsCont>
           <ControlsCont>
                <ButtonEl onClick={buttonHandler}>Выход</ButtonEl>
           </ControlsCont>

        </HeaderEl>
    )
}