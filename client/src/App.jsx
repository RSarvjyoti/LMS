import React from "react";
import Signup from "./pages/Signup";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddBook from "./pages/AddBook";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BookDetails from "./pages/BookDetails";
import Dadhboard from "./pages/Dadhboard";
function App() {
  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/dashboard" element={<Dadhboard />} />
        <Route path="/add-book" element={<AddBook />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
