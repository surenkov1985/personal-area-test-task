import * as React from "react"
import { Outlet } from "react-router-dom"
import styled from "styled-components"
import { Header } from "./Header"

const Content = styled.main`
    width:100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px;
`

export const Layout:React.FC = () => {

    return (
        <>
            <Header/>

            <Content>
                <Outlet/>
            </Content>
            
        </>
    )
}