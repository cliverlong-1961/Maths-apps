import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome to Pure</h1>

      <Link to="/exponents">Exponents</Link><br />
      <Link to="/concavity">Concavity</Link>
    </div>
  );
}

function Exponents() {
  return <h2>Exponents Page</h2>;
}

function Concavity() {
  return <h2>Concavity Page</h2>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exponents" element={<Exponents />} />
        <Route path="/concavity" element={<Concavity />} />
      </Routes>
    </BrowserRouter>
  );
}