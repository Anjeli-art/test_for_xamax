import { Token } from "../Token/Token";
import s from './Total.module.css';
import React from "react";

export type TotalType = {
  total: number;
};

export const Total: React.FC<TotalType> =React.memo( ({ total }) => {
  return (
    <div className={s.total}>
      <div className={s.totalText}>Total</div>
      <div className={s.totalBalance}>
        <div className={s.totalValue}>
          {total === 0 ? `${total}.00` : total}
        </div>
        <Token />
      </div>
    </div>
  );
});
