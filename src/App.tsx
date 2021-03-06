import React, { useContext } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import "./normalize.css";
import { useQuery } from "@apollo/client";
import { JDpreloader } from "@janda-com/front";
import { IPost } from "./type/interface";
import { filterDataBySuperClass } from "./utils/utils";
import HomeIndex from "./components/HomeIndex";
import HighRouter from "./pages/HighRouter";
import MainSearcher from "./components/MainSearcher";
import EntryContextProvider from "./context/entryContext";
import { EntryContext } from "./context/entryContext";
import { POST_LIST } from "./apollo/query";
import { postList, postListVariables, SuperClass } from "./apollo/api";

const { version } = require("../package.json");

function App() {
  const { data, loading } = useQuery<postList, postListVariables>(POST_LIST, {
    variables: {
      pagingInput: {
        pageIndex: 0,
        pageItemCount: 999
      }
    }
  });

  const { pathChk } = useContext(EntryContext);

  if (loading) return <JDpreloader page />;
  if (!data?.PostList) return <div>ERR</div>;

  const Data: IPost[] = data.PostList.items;

  return (
    <EntryContextProvider>
      <div className="App">
        <BrowserRouter>
          {pathChk && <MainSearcher posts={Data} />}
          <Switch>
            <Route path="/" exact render={() => <HomeIndex />}></Route>
            <Route
              path="/booking"
              render={() => (
                <HighRouter
                  superClass={SuperClass.BOOKING}
                  bookingData={filterDataBySuperClass(
                    Data,
                    SuperClass.BOOKING
                  )}
                />
              )}
            ></Route>
            <Route
              path="/template"
              render={() => (
                <HighRouter
                  superClass={SuperClass.TEMPLATEA}
                  bookingData={filterDataBySuperClass(
                    Data,
                    SuperClass.TEMPLATEA
                  )}
                />
              )}
            ></Route>
            <Route
              path="/timespace"
              render={() => (
                <HighRouter
                  superClass={SuperClass.TIMESPACE}
                  bookingData={filterDataBySuperClass(
                    Data,
                    SuperClass.TIMESPACE
                  )}
                />
              )}
            ></Route>
          </Switch>
        </BrowserRouter>
        <div className="guideVersion">{version}</div>
      </div>
    </EntryContextProvider>
  );
}

export default App;
