import React, { useState } from 'react';
import './App.css';
import { LoginFormWrapper } from './components/LoginFormWrapper';


function App() {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');


    return (
        <div className="altenar-app">
            <LoginFormWrapper username={username} password={password} setPassword={setPassword} setUsername={setUsername} />
        </div>
    );
}

export default App;
