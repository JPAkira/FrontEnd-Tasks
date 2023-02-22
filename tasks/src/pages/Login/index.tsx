import {useNavigate} from "react-router-dom";
import {TextInput} from "../../components/TextInput";
import {PageBlock} from "../../components/PageBlock";
import {PageFormBlock} from "../../components/PageFormBlock";
import {InputBox} from "../../components/InputBox";
import {LabelInput} from "../../components/LabelInput";
import {Button} from "@mui/material";
import React, {useState} from "react";
import {AppService} from "../../services/app.services";
const appServices = new AppService();

export const LoginPage = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")

    const handleUser = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setLogin(value);
    };

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setPassword(value);
    };

    const createLogin = () => {
        let newUser = {
            username: login,
            password: password
        }
        appServices.postAuth(newUser).then((response) => {
            let tokenuser = { token: 'Bearer '.concat(response.access), refresh: response.refresh }
            localStorage.setItem('token', JSON.stringify(tokenuser))
            navigate("/");
        })
    };


    return (
        <PageBlock width="35%">
            <PageFormBlock>
                <InputBox width="100%">
                    <h1>Login Page</h1>
                </InputBox>
                <InputBox width="100%">
                    <LabelInput>Login:</LabelInput>
                    <TextInput onChange={handleUser}/>
                </InputBox>
                <InputBox width="100%">
                    <LabelInput>Senha:</LabelInput>
                    <TextInput type="password" onChange={handlePassword}/>
                </InputBox>
                <Button onClick={createLogin}>Acessar</Button>
                <Button>Registrar-se</Button>
            </PageFormBlock>
        </PageBlock>
    );
}