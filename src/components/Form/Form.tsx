import {DataType} from "../../App";
import s from './Form.module.css';
import {Button} from "../Button/Button";
import React, {ChangeEvent} from "react";
import {Input} from "../Input/Input";


export type FormType ={
    data:DataType[]
    changeWalletValue: (e: ChangeEvent<HTMLInputElement>, id: string) =>void
    changeAmountValue : (e: ChangeEvent<HTMLInputElement>, id: string) =>void
    removeFields : (id: string) =>void
    clearFields : (id: string) =>void
    onKeyDown:(e:React.KeyboardEvent<HTMLInputElement>)=>void
}

export const Form: React.FC<FormType> = React.memo(({data,changeWalletValue,changeAmountValue,removeFields,clearFields,onKeyDown})=>{

    return(
        <form className={s.form} action="#">
            {data.map((wallet) => (
                <div className={s.formContent} key={wallet.id}>
                    <Button variant = "remove"
                        onClick={() => removeFields(wallet.id)}
                    >
                        remove row
                    </Button>
                    <Input
                        type="text"
                        value={wallet.walletNumber}
                        onChange={(e) => changeWalletValue(e, wallet.id)}
                        placeholder="wallet address"
                    />
                    <Input
                        type="number"
                        value={wallet.walletAmount}
                        onChange={(e) => changeAmountValue(e, wallet.id)}
                        onKeyDown={(e)=>onKeyDown(e)}
                        placeholder="amount"
                        step="any"
                        currency={wallet.currency}
                    />
                    <Button variant = "clear"
                        onClick={() => clearFields(wallet.id)}
                    >
                        Clear
                    </Button>
                </div>
            ))}
        </form>
    )
})
