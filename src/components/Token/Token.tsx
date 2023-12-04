import s from './Token.module.css';
import React from "react";

export const Token: React.FC = React.memo(() => {
  return (
    <div className={s.token}>
      <div> USDT</div>
      <p className={s.tokenRule}>(ERC-20)</p>
    </div>
  );
});
