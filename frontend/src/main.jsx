import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { DataProvider } from "./context/DataContext.jsx";
import { ToastContainer } from "react-toastify";
import "remixicon/fonts/remixicon.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <DataProvider>
      <App />
      <ToastContainer />
    </DataProvider>
  </BrowserRouter>
);
