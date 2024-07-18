import { FC } from "react";

import { Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import GetRoles from "./components/get-roles/GetRoles";
import SlideShow from "./components/slide-show/SlideShow";

import Error from "./components/error/Error";

import Alert from "./components/alert/Alert";

import "./App.scss";

const App: FC = () => {
  return (
    <>
      <Navbar />
      <Alert />

      <Routes>
        <Route path="/" element={<SlideShow />} />
        <Route path="/getroles" element={<GetRoles />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default App;
