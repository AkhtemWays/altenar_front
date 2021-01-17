import React, { ChangeEvent } from 'react'

export interface IInputProps {
    value: string;
    handleChange: (ev: ChangeEvent) => void;
    label: string;
}

export const Input = ({value, handleChange, label}: IInputProps) => {

    return (
        <div>
            <label>{label}</label>
            <input value={value} onChange={handleChange} />
        </div>
    )
}
