import editImage from "../../assets/images/edit.svg";
import deleteImage from "../../assets/images/delete.svg";
import { useDispatch, useSelector } from "react-redux";
import { editActive, removeTransaction } from "../../features/transactionSlice";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
export default function Transaction({ transaction }) {
  const { amount, type, name, id } = transaction || {};

  const dispatch = useDispatch();

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(editActive({ transaction }));
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(removeTransaction(id));
  };

  return (
    <div>
      <li className={`transaction ${type}`}>
        <p>
          {type === "income" ? "Earned" : "Expensed"} {name}
        </p>
        <div className="right">
          <p>৳ {amount}</p>
          <button className="link">
            <img
              className="icon"
              src={editImage}
              alt="Edit"
              onClick={(e) => handleEdit(e)}
            />
          </button>
          <button className="link">
            <img
              className="icon"
              src={deleteImage}
              alt="Delete"
              onClick={(e) => {
                handleDelete(e);
              }}
            />
          </button>
        </div>
      </li>
    </div>
  );
}
