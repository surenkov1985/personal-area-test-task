import * as React from "react"
import {useState, useEffect} from "react"
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useLoginMutation } from "../../stores/apiData";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { authUser, loginToggle } from "../../stores/loginReducer";
import { FormError } from "../FormError";


type email = string;
type password = string;
type User = {
    email: email;
    password: password;
}

interface InputPropsTypes {
    text: string,
    type: string,
    name: string,
    required: string,
    message: string,
    placeholder: string,
    pattern: any
}

const FormContainer = styled.form`
	display: flex;
	flex-direction: column;
	width: 640px;
    
`;
export const Label = styled.label`
	display: flex;
	flex-direction: column;
    row-gap: 10px;
    margin-top: 10px;
`   

export const LabelText = styled.div`
	font-weight: 400;
	font-size: 16px;
	line-height: 19px;
	color: #1F1F1F;
`;

export const InputError = styled.div`
	font-weight: 400;
	font-size: 14px;
	line-height: 17px;
	color: #E26F6F;
`;

export const InputEl = styled.input`
	width: 100%;
	height: 60px;
	padding: 20px;
	background: #F5F5F5;
	border-radius: 8px;
	font-size: 16px;
`;

export const CheckLabel = styled.label`
	display: flex;
		align-items: center;
		cursor: pointer;
		position: relative;
		margin-top: 12px;
`;

export const Submit = styled.input`
	width: 640px;
    height: 60px;
    left: 640px;
    top: 649px;
    background: #4A67FF;
    border-radius: 8px;
    color: #FFFFFF;
    cursor: pointer;
    margin-top: 41px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:disabled {
        cursor: default;
        opacity: 0.5;
    }
`

export const CheckInput = styled.input`
	margin-right: 20px;
    opacity: 0;
    position: relative;
    cursor: pointer;
    background: #f5f5f5;

    &:checked {
            & ~ .form__false-check > .form__false-bg{

            background: #4A67FF;
        }
    }	
`

const LoginContainer = styled.div`
    width: 100%;
    height: 100%; 
    display: flex;
    align-items: center;
    justify-content: center;
`

export const FalseCheck = styled.span`
	position: absolute;
	width: 20px;
	height: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid black;
	border-radius: 4px;
`;

export const FalseCheckBack = styled.span`
	display: block;
	width: 14px;
	height: 14px;
	border-radius: 2px;
`;


export const Login:React.FC = () => {

    const [onLogin,{isLoading, data: user, status, requestId, endpointName, isSuccess, error: loginError}] = useLoginMutation()

    const navigate = useNavigate()

    const {register, formState: {errors, isValid}, handleSubmit, reset} = useForm<User>({
        mode: "onBlur"
    });

    const dispatch = useAppDispatch();

    const [error, setError] = useState<string>(""); 
    const [valid, setValid] = useState<boolean>(isValid)

    useEffect(() => {setValid(isValid)},[isValid])
    useEffect(() => {
        dispatch(authUser(user))
        if (user) {localStorage.setItem("user", JSON.stringify(user))}
        console.log(user);
    }, [user])

    const loginInput:InputPropsTypes = {
        text: "Логин",
        type: "text",
        name: "email",
        required: "Обязательное поле",
        message: "Логин должен быть в формате test@test.io",
        placeholder: "Введите логин",
        pattern: /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u
    };

    const passwordInput:InputPropsTypes = {
        text: "Пароль",
        type: "password",
        name: "password",
        required: "Обязательное поле",
        message: "Пароль дожен содержать минимум 5 символов",
        placeholder: "Введите пароль",
        pattern: /\w{5,}/
    };

    const onSubmit: SubmitHandler<User> = async (data) => {

        try {
            await onLogin(data).unwrap()

            
            setError("")
            navigate("/contacts")
            // 
            
        } catch (err) {
            setError(err?.data)
            console.log(error);
        }
    }


    return (

        <LoginContainer>
            <FormContainer onSubmit={handleSubmit(onSubmit)}>
                {error && <FormError error={error}/>}
                <Label>
                    <LabelText>{loginInput.text}</LabelText>
                    <InputEl
                        type={loginInput.type}
                        placeholder={loginInput.placeholder}
                        autoFocus={true}
                        {...register("email", {required: "Обязательное поле", pattern: {value: /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u, message: "Логин должен быть в формате test@test.io"}})}
                    />
                    <InputError>
                        {errors?.email && <span>{errors?.email?.message || "Error!"}</span>}
                    </InputError>
                </Label>
                <Label>
                    <LabelText>{passwordInput.text}</LabelText>
                    <InputEl
                        type={passwordInput.type}
                        placeholder={passwordInput.placeholder}
                        {...register("password", {required: passwordInput.required, pattern: {value: passwordInput.pattern, message: passwordInput.message}})}
                    />
                    <InputError>
                        {errors?.password && <span>{errors?.password?.message || "Error!"}</span>}
                    </InputError>
                </Label>
                <CheckLabel>
                    <CheckInput type="checkbox"/>
                    <FalseCheck className="form__false-check" >
                        <FalseCheckBack className="form__false-bg"/>
                    </FalseCheck>
                    <span>Запомнить пароль</span>
                </CheckLabel>
                <Submit type="submit" disabled={!valid} value="Войти"/>
            </FormContainer>
        </LoginContainer>
    )
}