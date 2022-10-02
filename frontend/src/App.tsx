import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from './routers/pages/Main';
import Favorite from './routers/pages/Favorite/Favorite';
import FavoriteIndexPage from './routers/pages/Favorite/FavoriteIndex';
import FavoriteListSelection from './routers/pages/Favorite/FavoriteListSelection';
import CheckLists from './routers/pages/CheckList/CheckLists';
import CheckList from './routers/pages/CheckList/CheckList';
import CheckListSelection from '@pages/CheckList/CheckListSelection';
import DetailPage from './routers/pages/Detail/Detail'

import NotFound from './routers/NotFound';
import NavBtn from './routers/NavBtn';
import SignUp from './routers/pages/user/SignUpPage';
import LogInPage from './routers/pages/user/LogIn';

interface AppProps {}

const App: React.FunctionComponent<AppProps> = () => {
  const isLogin = () => !!localStorage.getItem("jwtToken");
  console.log(isLogin());
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBtn />}>
          <Route index element={<Main />}></Route>
          
          <Route path="favorite" element={<Favorite />}>
            <Route index element={<FavoriteIndexPage />}></Route>
          </Route>
          <Route path="checkLists" element={<CheckLists />}></Route>
          <Route path="checkLists/:checklistId" element={<CheckList />}></Route>
          <Route path="/detail/product/:productId/business/:businessType" element={<DetailPage />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
        <Route
          path="/favorite/selection"
          element={<FavoriteListSelection />}
        ></Route>
        <Route
          path="/checklist/selection"
          element={<CheckListSelection />}
        ></Route>
        <Route path="/SignUp" element={<SignUp />}></Route>
        <Route path="/LogIn" element={<LogInPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
