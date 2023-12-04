import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import s from './Button.module.css';
import classNames from 'classnames/bind';

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type ButtonType =DefaultButtonPropsType &{
    onClick?:()=>void
    disabled?:boolean
    variant?:string
}



const cx = classNames.bind(s);

export const Button: React.FC<ButtonType> =React.memo(({children,disabled,variant,onClick})=>{

    const ButtonClass = cx({
        buttonRemove:variant === "remove",
        buttonClear:variant === "clear",
        buttonAdd:variant ==="add",
        buttonSubmit:variant ==="submit"
    })


    return(
        <button onClick={onClick} disabled={disabled} className={ButtonClass}>
            {children}
        </button>)
})
