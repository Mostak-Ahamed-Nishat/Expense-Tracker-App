import { useDispatch, useSelector } from "react-redux";
import Transaction from "./Transaction";
import { useEffect } from "react";
import { fetchTransaction } from "../../features/transactionSlice";


export default function Transactions() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransaction());
  }, [dispatch]);

  const { transactions, isLoading, isError, error } = useSelector(
    (state) => state.transaction
  );

  let content = null;

  if (isLoading) {
    content = <p className="error">Loading Data</p>;
  }
  if (!isLoading && isError) {
    content = <p className="error">{error}</p>;
  }
  if (!isLoading && !isError && transactions.length > 0) {
    content = transactions.map((transaction) => (
      <Transaction key={transaction.id} transaction={transaction} />
    ));
  }
  if (!isLoading && !isError && transactions.length === 0) {
    content = <p className="">Did not Transits any amount</p>;
  }

  return (
    <>
      <p className="second_heading">Your Transactions:</p>

      <div className="conatiner_of_list_of_transactions">
        <ul>{content}</ul>
      </div>
    </>
  );
}
