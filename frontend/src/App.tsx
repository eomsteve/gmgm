import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Main from './routers/pages/Main';
import Favorite from './routers/pages/Favorite';
import CheckLists from './routers/pages/CheckLists';
import NotFound from './routers/pages/NotFound';
import NavBtn from './routers/NavBtn';
import SignUp from './routers/pages/SignUpPage';
import LogInPage from './routers/pages/LogIn';

interface AppProps {}

const App: React.FunctionComponent<AppProps> = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBtn />}>
          <Route index element={<Main />}></Route>
          <Route path="/favorite" element={<Favorite />}></Route>
        <Route path="/checkLists" element={<CheckLists />}></Route>
        <Route path="*" element={<NotFound />}></Route>
        </Route>
        <Route path="/SignUp" element={<SignUp />}></Route>
        <Route path="/LogIn" element={<LogInPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
