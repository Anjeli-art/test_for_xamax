import {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from "react";
import s from './Input.module.css';
import {Token} from "./Token";
import {Currency} from "./Currency";
import classNames from 'classnames/bind';

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type InputType=DefaultInputPropsType &{
    type?:string
    value?:string|number
    placeholder?:string
    onChange?:(e: ChangeEvent<HTMLInputElement>)=>void
    step?:string
    currency?:string
}

const cx = classNames.bind(s);

export const Input=({type,value,placeholder,onChange,step,currency}:InputType)=>{



    const currentCurrency = type==="text" ? "" : currency==="USD" ? <Currency/> : <Token/>

    const InputClass = cx({
        inputAmount: type === "number",
        inputWallet: type === "text"
    })

    return(
       <div>
           <input
               className={InputClass}
               type={type}
               value={value}
               onChange={onChange}
               placeholder={placeholder}
               step={step}
           />
           <div className={s.currencyInput}>{currentCurrency}</div>
       </div>
    )
}
