import styled from "styled-components";

export const FormContainer = styled.form`
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

export const LoginContainer = styled.div`
    position: absolute;
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