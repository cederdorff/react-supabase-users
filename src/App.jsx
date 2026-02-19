import { BrowserRouter, Routes, Route } from "react-router";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import UserDetailPage from "./pages/UserDetailPage";
import UpdatePage from "./pages/UpdatePage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/users/:id" element={<UserDetailPage />} />
        <Route path="/users/:id/update" element={<UpdatePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
