import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTransaction } from "../features/transactionSlice";

export default function Form() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");

  const dispatch = useDispatch();

  const { isLoading, isError } = useSelector((state) => state.transaction);

  const submitCreate = (e) => {
    e.preventDefault();
    dispatch(
      createTransaction({
        name,
        type,
        amount: Number(amount),
      })
    );
  };

  return (
    <>
      <div className="form">
        <h3>Add new transaction</h3>
        <form action="" onSubmit={(e) => submitCreate(e)}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              name="transaction_name"
              placeholder="My Salary"
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>

          <div className="form-group radio">
            <label>Type</label>
            <div className="radio_group">
              <input
                type="radio"
                value="income"
                name="transaction_type"
                onChange={() => setType("income")}
                required
                checked={type === "income"}
              />
              <label>Income</label>
            </div>
            <div className="radio_group">
              <input
                type="radio"
                value="expense"
                name="transaction_type"
                placeholder="Expense"
                onChange={() => setType("expense")}
                checked={type === "expense"}
              />
              <label>Expense</label>
            </div>
          </div>

          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              value={amount}
              placeholder="300"
              name="transaction_amount"
              required
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
          </div>

          <button disabled={isLoading} className="btn" type="submit">
            Add Transaction
          </button>

          {!isLoading && isError && (
            <p className="error">There was an error occurred.</p>
          )}
        </form>
        <button className="btn cancel_edit">Cancel Edit</button>
      </div>
    </>
  );
}
