import React, { ChangeEvent, useState } from 'react';
import { Input } from './Input';
const bcrypt = require('bcryptjs');

export enum LOGIN_FORM_FIELDS {
    username = 'username',
    password = 'password'
}

export interface ILoginFormWrapperProps {
    username: string;
    setUsername: (username: string) => void;
    password: string;
    setPassword: (password: string) => void;
}

export const LoginFormWrapper = ({username, setUsername, password, setPassword}: ILoginFormWrapperProps) => {

    const [hashedPassword, setHashedPassword] = useState<string>('');
    const [serverResponseOk, setServerResponseOk] = useState<boolean>(false);
    const [saltRounds, setSaltRounds] = useState<number>(10);

    const handleUsername = (ev: ChangeEvent) => {
        setUsername((ev.target as HTMLInputElement).value)
    }

    const handlePassword = (ev: ChangeEvent) => {
        setPassword((ev.target as HTMLInputElement).value)
        if (serverResponseOk) {
            const salt = bcrypt.genSaltSync(saltRounds);
            const hashed = bcrypt.hashSync(password, salt);
            setHashedPassword(hashed);
        }
    }

    const handleSalt = (ev: ChangeEvent) => {
        setSaltRounds(Number.parseInt((ev.target as HTMLInputElement).value))
    }

    const handleSubmit = () => {
        const init: RequestInit = {
            body: JSON.stringify({username: username, password: password}),
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            },
            mode: 'no-cors',
        };
        fetch('http://localhost:8080/api/v1/users/authorize', init)
            .then((response: Response) => {
                if (response.ok) {
                    setServerResponseOk(true)
                }
            })
            .catch((error) => console.log(error));
    }

    return (
        <div className="container">
            <Input value={username} label={LOGIN_FORM_FIELDS.username} handleChange={
                handleUsername
            } />
            <Input value={password} label={LOGIN_FORM_FIELDS.password} handleChange={
                handlePassword
            } />
            <button onClick={handleSubmit}>Login</button>
            <div>
                <span>Choose complexity of password: </span>
                <input type='number' value={saltRounds} onChange={handleSalt}/>
            </div>
            <div>Your hashed password would be: {hashedPassword}</div>
        </div>
    )
}
