
import * as React from "react"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "../../stores/hooks"
import {IoSearchOutline} from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import { authUser, modalToggle, updateUser } from "../../stores/loginReducer"
import { AddContact } from "../addContact"

const Content = styled.div`
    width: 100%;
    height: 100%;
    background: #f1f1f1;
    box-shadow: 0px 0px 10px 2px rgba(200, 219, 234, 0.59);
    display: flex;
    flex-direction: column;
`
const ContentControl = styled.div`
    width: 100%;
    padding: 20px;
    display: flex;
    align-items: center;
    column-gap: 20px;

`
const ButtonEl = styled.button`
    color: #000000;
    padding: 0 20px;
    min-width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    cursor: pointer;
    font-weight: 500;
    border-radius: 4px;
    border: 1px solid #71717A;

    &.active {
        background: #71717A;
        color:#FAFAFA;
        cursor: default;
    }

    &:hover {
        background: #71717A;
        color:#FAFAFA;
        border: 1px solid #FAFAFA;
    }
`
const LabelEl = styled.label`
    display: flex;
    align-items: center;
    max-width: 350px;
    border: 1px solid #71717A;
    border-radius: 4px;
    height: 40px;
    padding: 0 10px;
`

const ContactList = styled.ul`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    padding: 20px;
`

const Title = styled.h2`
    font-size: 25px;
    font-weight: 500;
`

const ContactItem = styled.li`
    display: flex;
    align-items: center;
    column-gap: 10px;
`
export  interface IContactProps {
    login: boolean
}
interface IContactsType {
    name: string,
    id:string,
    tel: string,
    email: string,
    lastName: string
}

export const ContactsPage:React.FC = () => {

    const dispatch = useAppDispatch()
    let userData = useAppSelector(state => state.login.user)
    let contacts = useAppSelector(state => state.login.data)
    let modal = useAppSelector(state => state.login.modal)
    const navigate = useNavigate()
    const [deletedElem, setDeletedElem] = useState<IContactsType>()
    
    console.log(userData, contacts);
    function getContacts() {
        fetch("http://localhost:3001/users/1")
            .then(res => res.json())
            .then(data => {
                dispatch(updateUser(data.contacts))
                console.log(data);
            })
            .catch(err => console.log(err))
    }

    function setContactsApi(data) {
        fetch("http://localhost:3001/users/1", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({contacts: data})
        })
    }
    
    useEffect(() => {
        dispatch(authUser(JSON.parse(localStorage.getItem("user"))))
        getContacts()
    }, [])

    useEffect(() => {
        contacts && setContactsApi(contacts)
    }, [contacts])

    if (!userData) {
        navigate("/login")
    }

    function deleteHandler():void {
        
        deletedElem && dispatch(updateUser(contacts.filter(el => el?.id !== deletedElem.id)))
    }
    function checkHandler(e, elem) {
        setDeletedElem(e.target.checked ? elem : {})
    }
    if (userData) {return (
            <Content>
                
                <ContentControl>
                    <Title>Контакты</Title>
                    <ButtonEl onClick={e => {dispatch(modalToggle(true))}}>Добавить</ButtonEl>
                    <ButtonEl onClick={deleteHandler}>Удалить</ButtonEl>
                    <LabelEl>
                        <IoSearchOutline size={20}/>
                        <input type="text" placeholder="Поиск" style={{marginLeft: "10px"}}/>
                    </LabelEl>
                </ContentControl>
                {modal && <AddContact/>}
                <ContactList>
                    {contacts?.map((cont) => {
                        return (
                            <ContactItem key={cont.id}>
                                <label>
                                    <span></span>
                                    <input type="checkbox" onClick={e => {checkHandler(e, cont)}}/>
                                </label>
                                <div>{cont.name} {cont?.lastName}</div>
                                <div>{cont?.email}</div>
                            </ContactItem>
                        )
                    })}
                    
                </ContactList>
                
            </Content>
        )}


}