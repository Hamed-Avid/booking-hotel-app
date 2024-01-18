import "./App.css";
import Header from "./components/Header/Header";
import { Toaster } from "react-hot-toast";
import LocationList from "./components/LocationList/LocationList";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <main>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<LocationList />} />
      </Routes>
    </main>
  );
}
