import s from './Currency.module.css';
import React from "react";

export const Currency: React.FC = React.memo(() => {
    return (
        <div className={s.currency}>
            <div> USD</div>
        </div>
    );
});
