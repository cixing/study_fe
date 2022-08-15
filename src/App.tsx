import React from 'react';
import 'antd/dist/antd.css';
import LayoutC from 'common/layout';
import { Route, Routes } from 'react-router-dom';
import Home from 'pages/home';
import Download from 'pages/download';


const App: React.FC = () => (
  <LayoutC>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="download" element={<Download />} />
    </Routes>
  </LayoutC>
);

export default App;
