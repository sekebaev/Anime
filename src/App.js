import React from 'react'

import Main from './screens/main/Main';
import List from './screens/list/List';

import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path='' element={<Main />}/>
      <Route path='/main' element={<List />}/>
    </Routes>
  )
}
