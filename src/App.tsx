import { Outlet } from "react-router-dom";
import Header from "./components/shared/Header";
import { ToastContainer } from "react-toastify";
import { useSocket } from "./hooks/useSocket";
import { useAutoRefreshToken } from "./hooks/autoRefreshToken";

const App = () => {
  // Initialize WebSocket connection
  useSocket();        

  // Auto refresh token hook
  useAutoRefreshToken(); 

  return (
    <div>
      <Header />
      <main className="container mx-auto max-w-screen-xl px-4 md:px-6 lg:px-8 xl:px-0">
        <Outlet />
        <ToastContainer
          position="bottom-right"
          autoClose={1500}
          theme="colored"
        />
      </main>
    </div>
  );
};

export default App;
