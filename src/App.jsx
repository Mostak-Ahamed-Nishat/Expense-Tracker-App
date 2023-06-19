import { Provider } from "react-redux";
import Balance from "./components/Balance";
import Form from "./components/Form";
import Layout from "./components/Layout";
import Transactions from "./components/transactions/Transactions";
import store from "./app/store";
function App() {
  return (
    <>
      <Provider store={store}>
        <Layout>
          <Balance />
          <Form />
          <Transactions />
        </Layout>
      </Provider>
    </>
  );
}

export default App;
