import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

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

// import { useSelector } from '@modules/Auth'
import { RootState } from '@modules/store'
import { useSelector } from 'react-redux'

import axios from 'axios';
interface AppProps {}

const App: React.FunctionComponent<AppProps> = () => {
  const { isLogin } = useSelector((state: RootState)=>{
    return {
      isLogin : state.persistedReducer.authTokenReducer.isLogin
    }
  })
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBtn />}>
          <Route index element={<Main />}></Route>
          <Route path="favorite" element={<Favorite />}>
            <Route index element={isLogin ? <FavoriteIndexPage /> : <LogInPage/>}></Route>
          </Route>
          <Route path="checkLists" element={isLogin ? <CheckLists />  : <LogInPage/>}></Route>
          <Route path="checkLists/:checklistId" element={isLogin ? <CheckList /> : <LogInPage/>}></Route>
          <Route path="/detail/product/:productId/business/:businessType" element={isLogin ? <DetailPage />: <LogInPage/>}></Route>
          <Route path="/detail/product/:productId/goods/:goodsId/business/:businessType" element={isLogin ? <DetailPage />: <LogInPage/>}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
        <Route
          path="/favorite/selection"
          element={isLogin ? <FavoriteListSelection /> : <LogInPage/>}
        ></Route>
        <Route
          path="/checklist/selection"
          element={isLogin ? <CheckListSelection /> : <LogInPage/>}
        ></Route>
        <Route path="/SignUp" element={<SignUp />}></Route>
        <Route path="/LogIn" element={<LogInPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
