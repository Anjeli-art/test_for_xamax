import React, {ChangeEvent, DragEventHandler, useEffect, useState} from "react";
import {v1} from "uuid";
import s from './App.module.css';

import {Total} from "./components/Total/Total";
import {Wallet} from "./components/Wallet/Wallet";
import {Form} from "./components/Form/Form";
import {Button} from "./components/Button/Button";
import readXlsxFile from "read-excel-file";

export type DataType = {
    id: string;
    walletNumber: string;
    walletAmount: string;
    currency: string
};


const App: React.FC = () => {
    const [data, setData] = useState<DataType[]>([]);

    const [total, setTotal] = useState(0.0);

    useEffect(() => {
        changeTotal()
    }, [data])

    const addFields = () => {
        const newFields = {
            id: v1(),
            walletNumber: "",
            walletAmount: "",
            currency: ""
        };

        setData([...data, newFields]);
    };


    const changeTotal = () => {
        let result = 0

        for (let i = 0; i < data.length; i++) {
            if (data[i].walletAmount === "") {
                result = parseFloat((result + 0).toFixed(16));
            } else {
                result = parseFloat((result + Number(data[i].walletAmount)).toFixed(16));
            }
        }

        setTotal(result);
    };


    const removeFields = (id: string) => {
        const newData = data.filter((fields) => fields.id !== id);
        setData(newData);
    };

    const clearFields = (id: string) => {
        const newData = data.map((fields) =>
            id === fields.id
                ? {...fields, walletNumber: "", walletAmount: ""}
                : fields
        );
        setData(newData);
    };

    const changeWalletValue = (e: ChangeEvent<HTMLInputElement>, id: string) => {
        const walletValue = e.currentTarget.value;
        const newData = data.map((fields) =>
            id === fields.id ? {...fields, walletNumber: walletValue} : fields
        );
        setData(newData);
    };


    const changeAmountValue = (e: ChangeEvent<HTMLInputElement>, id: string) => {
        console.log(e.currentTarget.value)


        let amountValue = e.currentTarget.value
        const newData = data.map((fields) =>
            id === fields.id ? {...fields, walletAmount: amountValue} : fields
        );

        setData(newData);
    };

    // const onKeyDown=(e:React.KeyboardEvent<HTMLInputElement>) => {
    //
    //     if (e.keyCode == 189 ||
    //         e.keyCode == 190 ||
    //         e.keyCode == 188 ||
    //         e.keyCode == 46 ||
    //         e.keyCode == 8 ||
    //         e.keyCode == 9 ||
    //         e.keyCode == 27 ||
    //         (e.keyCode == 65 && e.ctrlKey) ||
    //         (e.keyCode >= 35 && e.keyCode <= 39)
    //     ) {
    //         return;
    //     } else {
    //         if (
    //             (e.keyCode < 48 || e.keyCode > 57) &&
    //             (e.keyCode < 96 || e.keyCode > 105)
    //         ) {
    //             e.preventDefault();
    //         }
    //     }
    // }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        console.log(e.keyCode)
        let success = e.keyCode == 190 || e.keyCode == 188 || e.keyCode == 46
            || e.keyCode == 8 || e.keyCode == 9 || e.keyCode == 27 ||
            (e.keyCode == 65 && e.ctrlKey) ||
            (e.keyCode >= 35 && e.keyCode <= 39)

        let failure = (e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105) && e.keyCode == 189

        if (success) {
            return;
        } else {
            if (failure) {
                e.preventDefault();
            }
        }
    }


    const dragStartHendler: DragEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
    };

    const dragEndHendler: DragEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
    };

    const dragLeaveHendler: DragEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
    };


    const onDropHendler: DragEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        let fileData = new FileReader();

        fileData.onload = () => {

            readXlsxFile(file).then((rows) => {

                const newData = rows.slice(2).map(wallet => ({
                    id: v1(),
                    walletNumber: String(wallet[0]),
                    walletAmount: String(wallet[1]) ?? "",
                    currency: String(wallet[2]) ?? ""
                }))

                setData(newData)
            })

        };
        fileData.readAsText(file);
    };


    return (
        <div className={s.app}>
            <div
                className={s.content}
                onDrop={onDropHendler}
                onDragStart={dragStartHendler}
                onDragLeave={dragLeaveHendler}
                onDragEnd={dragEndHendler}
            >
                <h4 className={s.contentSubtitle}>FROM</h4>
                <Wallet/>
                <Form data={data} changeAmountValue={changeAmountValue} changeWalletValue={changeWalletValue}
                      onKeyDown={onKeyDown}
                      clearFields={clearFields} removeFields={removeFields}/>
                <Button onClick={addFields} variant="add">
                    add row
                </Button>
                <Total total={total}/>
                <div className={s.submit}>
                    <Button variant="submit">
                        Withdraw
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default App;
