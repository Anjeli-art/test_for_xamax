import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from "react";
import s from './Input.module.css';
import {Token} from "../Token/Token";
import {Currency} from "../Currency/Currency";
import classNames from 'classnames/bind';


type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type InputType=DefaultInputPropsType &{
    type?:string
    value?:string|number
    placeholder?:string
    onChange?:(e: ChangeEvent<HTMLInputElement>)=>void
    step?:string
    currency?:string
    onKeyDown?:(e:React.KeyboardEvent<HTMLInputElement>)=>void
}

const cx = classNames.bind(s);

export const Input: React.FC<InputType>=React.memo(({type,value,placeholder,onChange,step,currency,onKeyDown})=>{



    const currentCurrency = placeholder === "amount" ? "" : currency==="USD" ? <Currency/> : <Token/>

    const InputClass = cx({
        inputAmount: placeholder === "amount",
        inputWallet: placeholder === "wallet address"
    })

    return(
       <div>
           <input
               className={InputClass}
               type={type}
               value={value}
               onChange={onChange}
               onKeyDown={onKeyDown}
               placeholder={placeholder}
               step={step}
           />
           <div className={s.currencyInput}>{currentCurrency}</div>
           <div className={s.borderInput}></div>
       </div>
    )
})
