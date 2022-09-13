import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Main from './routers/pages/Main';
import NotFound from './routers/pages/NotFound';
import NavBtn from './routers/NavBtn'

interface AppProps {}

const App: React.FunctionComponent<AppProps> = () => {
  return (
    <BrowserRouter>
        <NavBtn />
      <Routes>  
      
          <Route path="/" element={<Main />}></Route>
          <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
