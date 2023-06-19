import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Balance() {
  let [currentBalance, setCurrentBalance] = useState(0);

  const { transactions } = useSelector((state) => state.transaction);

  let calculate = transactions.reduce((current, transaction) => {
    let balance=current

    if (transaction.type === "income") {
      balance=current + transaction.amount;
    }
    if (transaction.type === "expense") {
      balance=current - transaction.amount;
    }
    console.log(balance);
    return balance;
  }, 0);

  console.log(calculate);

  useEffect(() => {
    setCurrentBalance(calculate);
  }, [calculate]);

  // const dispatch = useDispatch();

  return (
    <div>
      <div className="top_card">
        <p>Your Current Balance</p>
        <h3>
          <span>৳</span>
          <span>{currentBalance}</span>
        </h3>
      </div>
    </div>
  );
}
