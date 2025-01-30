import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { DisplayElementProvider } from "./contextAPI/displayEle";

function App() {
  const islogged =  localStorage.getItem("authToken");
  const ProtectedRoute = ({ children }) => {
    if (islogged==null) {
      return <Navigate to="/" />;
    }
    return children;
  };
  return (
    <DisplayElementProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </DisplayElementProvider>
  );
}

export default App;
