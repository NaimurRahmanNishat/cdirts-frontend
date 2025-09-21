import { Outlet } from "react-router-dom";
import Header from "./components/shared/Header";

const App = () => {
  return (
    <div>
      <Header />
      <main className="container mx-auto max-w-screen-xl px-4 md:px-0">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
