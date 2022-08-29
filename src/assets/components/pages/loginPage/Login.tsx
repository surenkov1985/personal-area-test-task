import * as React from "react"
import {useState, useEffect} from "react"
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../stores/apiData";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { authUser } from "../../../stores/loginReducer";
import { FormError } from "../../FormError";
import { LoginContainer, Label, LabelText, InputEl, InputError, FormContainer, FalseCheck, Submit, CheckInput, CheckLabel, FalseCheckBack } from "./styled"


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