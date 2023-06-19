import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeTransaction,
  createTransaction,
} from "../features/transactionSlice";

export default function Form() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [editMood, setEditMood] = useState(false);
  const dispatch = useDispatch();

  const { isLoading, isError, editing } = useSelector(
    (state) => state.transaction
  );

  //Reset form
  const reset = () => {
    setName("");
    setType("");
    setAmount("");
  };

  //Create new data submit handler
  const submitCreate = (e) => {
    e.preventDefault();
    dispatch(
      createTransaction({
        name,
        type,
        amount: Number(amount),
      })
    );
    reset();
  };

  //Cancel Transaction
  const cancelEditMood = () => {
    setEditMood(false);
  };

  //Listen for edit mood active
  useEffect(() => {
    if (editing.transaction?.id) {
      setEditMood(true);
      setName(editing.transaction?.name);
      setType(editing.transaction?.type);
      setAmount(editing.transaction?.amount);
    } else {
      reset();
      setEditMood(false);
    }
  }, [editing]);

  //update the expense

  const updateExpense = (e) => {
    e.preventDefault();

    dispatch(
      changeTransaction({
        id: editing.transaction?.id,
        data: {
          name,
          type,
          amount,
        },
      })
    );
    reset();
    setEditMood(false);
  };

  return (
    <>
      <div className="form">
        <h3>Add new transaction</h3>
        <form
          action=""
          onSubmit={
            editMood == true ? (e) => updateExpense(e) : (e) => submitCreate(e)
          }
        >
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
            {editMood == true ? "Update Transaction" : "Add Transaction"}
          </button>

          {!isLoading && isError && (
            <p className="error">There was an error occurred.</p>
          )}
        </form>
        {editMood && (
          <button className="btn cancel_edit" onClick={cancelEditMood}>
            Cancel Edit
          </button>
        )}
      </div>
    </>
  );
}
