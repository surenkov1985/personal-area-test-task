import * as React from "react"
import { useSelector } from "react-redux"
import { Route, Routes } from "react-router-dom"
import { Layout } from "./Layout"
import { ContactsPage } from "./pages/ContactsPage"
import { Login } from "./pages/Login"

export const App:React.FC = () => {

    

    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route path="contacts" element={<ContactsPage/>}/>
                <Route path="login" element={<Login/>}/>
            </Route>
        </Routes>
        
    )
}
<div className="container">HELLO</div>