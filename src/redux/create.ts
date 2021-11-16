import TokenService from "../services/TokenService";
import createSagaMiddleware from "redux-saga";
import { applyMiddleware, createStore } from "redux";
import reducer from "./modules/reducer";
import history from "../history";
import { composeWithDevTools } from "redux-devtools-extension";
import { routerMiddleware } from "connected-react-router";
import rootSaga from "./modules/rootSaga";

const create = () => {
  const token = TokenService.get();
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducer(history),
    {
      auth: {
        token,
        loading: false,
        errorMsg: null,
      },
    },
    composeWithDevTools(
      applyMiddleware(sagaMiddleware, routerMiddleware(history))
    )
  );
  sagaMiddleware.run(rootSaga);

  return store;
};

export default create;
