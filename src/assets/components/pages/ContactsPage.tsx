
import * as React from "react"
import { useEffect } from "react"
import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "../../stores/hooks"
import * as uniqid from "uniqid"
import {IoSearchOutline} from "react-icons/io5"
import {Login} from "./Login"
import { useNavigate } from "react-router-dom"
import { authUser } from "../../stores/loginReducer"
import { useGetDataQuery } from "../../stores/apiData"

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
export  interface IContactProps {
    login: boolean
}

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
interface IContactsType {
    name: string,
    id:string,
    tel: string
}

export const ContactsPage:React.FC = () => {

    const dispatch = useAppDispatch()
    let userData = useAppSelector(state => state.login.user)
    const navigate = useNavigate()
    const {data} = useGetDataQuery(userData?.user?.email)
    console.log(data);

    useEffect(() => {
        dispatch(authUser(JSON.parse(localStorage.getItem("user"))))
    }, [])
    
    if (!userData) {
        navigate("/login")
    }

    const contacts:IContactsType[] = [
        {
            name:"Вася",
            id: uniqid(),
            tel: "+7-999-000-00-00"
        }, 
        {
            name: "Сергей",
            id: uniqid(),
            tel: "+7-999-000-00-01"
        }, 
        {
            name: "Алена",
            id: uniqid(),
            tel: "+7-999-000-00-02"
        }
    ]

    if (userData) {return (
            <Content>
                <ContentControl>
                    <Title>Контакты</Title>
                    <ButtonEl>Добавить</ButtonEl>
                    <ButtonEl>Удалить</ButtonEl>
                    <LabelEl>
                        <IoSearchOutline size={20}/>
                        <input type="text" placeholder="Поиск" style={{marginLeft: "10px"}}/>
                    </LabelEl>
                </ContentControl>
                <ContactList>
                    {contacts.map((cont) => {
                        return (
                            <ContactItem key={cont.id}>
                                <label>
                                    <span></span>
                                    <input type="checkbox" />
                                </label>
                                <div>{cont.name}</div>
                                <div>{cont.tel}</div>
                            </ContactItem>
                        )
                    })}
                </ContactList>
            </Content>
        )}


}