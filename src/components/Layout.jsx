export default function layout({ children }) {
  return (
    <>
      <div className="App">
        <div className="header">
          <h1>Expense Tracker App</h1>
        </div>

        <div className="main">
          <div className="container">{children}</div>
        </div>

        <div className="footer">&copy;2023 Mostak Ahamed</div>
      </div>
    </>
  );
}
