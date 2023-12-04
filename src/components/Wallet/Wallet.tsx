import React from "react";
import { Token } from "../Token/Token";
import s from './Wallet.module.css';


export const Wallet : React.FC= React.memo(() => {
  return (
    <div className={s.wallet}>
      <div className={s.walletContent}>
        <div className={s.walletInfo}>
          <div className={s.walletCircle}></div>
          <p className={s.walletText}>BALANCE USDT(ERC-20)</p>
        </div>
        <div className={s.walletBalance}>
          <div className={s.walletValue}>141 241.5121</div>
          <Token />
        </div>
      </div>
      <p className={s.walletNumber}>
        bc1qfg9t7fwn0atn4yf9spca5502vk8dyhq8a9aqd8
      </p>
    </div>
  );
});
