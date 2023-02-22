import { useNavigate } from "react-router-dom";
import {TextInput} from "../../components/TextInput";
import {PageBlock} from "../../components/PageBlock";
import {PageFormBlock} from "../../components/PageFormBlock";
import {InputBox} from "../../components/InputBox";
import {LabelInput} from "../../components/LabelInput";
import {Button} from "@mui/material";
import React, {useState} from "react";
import {AppService} from "../../services/app.services";
const appServices = new AppService();

export const RegisterPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")


    const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setName(value);
    };

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setEmail(value);
    };

    const handleUser = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setLogin(value);
    };

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setPassword(value);
    };

    const saveUser = () => {
        let newUser = {
            name: name,
            email: email,
            username: login,
            password: password
        }
        appServices.postUser(newUser).then((response) => {
            navigate("/login");
        })
    }

    return (
        <PageBlock width="35%">
            <PageFormBlock>
                <InputBox width="100%">
                    <h1>Register Page</h1>
                </InputBox>
                <InputBox width="100%">
                    <LabelInput>Primeiro Nome:</LabelInput>
                    <TextInput onChange={handleName}/>
                </InputBox>
                <InputBox width="100%">
                    <LabelInput>Email:</LabelInput>
                    <TextInput onChange={handleEmail}/>
                </InputBox>
                <InputBox width="100%">
                    <LabelInput>Login:</LabelInput>
                    <TextInput onChange={handleUser}/>
                </InputBox>
                <InputBox width="100%">
                    <LabelInput>Senha:</LabelInput>
                    <TextInput type="password" onChange={handlePassword}/>
                </InputBox>
                <Button onClick={saveUser}>Registrar-se</Button>
                <Button>Ir até o Login</Button>
            </PageFormBlock>
        </PageBlock>
    );
}