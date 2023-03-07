import { AppRoutes } from "./routes/AppRoutes";
import { persistor, store } from "./store";
import { Provider } from "react-redux";
import React from "react";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <React.Fragment>
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <AppRoutes />
        </Provider>
      </PersistGate>
    </React.Fragment>
  );
}

export default App;
