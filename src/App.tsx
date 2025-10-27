import { Outlet } from "react-router-dom";
import Header from "./components/shared/Header";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useGetCurrentUserQuery } from "./redux/features/auth/authApi";
import { setLoading, setUser } from "./redux/features/auth/authSlice";
import { useEffect } from "react";
import Loading from "./components/shared/Loading";
import type { RootState } from "./redux/store";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { data: userData, isLoading, isError, error } = useGetCurrentUserQuery(undefined, {
    skip: !isAuthenticated, 
  });
    useEffect(() => {
    if (userData?.success && userData.data) {
      // Page refresh-এ user data automatically set হবে
      dispatch(setUser(userData.data));
      console.log("User data restored after page refresh");
    }
  }, [userData, dispatch]);

  useEffect(() => {
    if (isError) {
      console.log("Token invalid or expired, redirecting to login...");
    }
  }, [isError, error]);

  // Loading state management
  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  // Better loading component
  if (isLoading && !isAuthenticated) {
    return (
      <div>
        <Loading/>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main className="container mx-auto max-w-screen-xl px-4 md:px-0">
        <Outlet />
        <ToastContainer
          position="bottom-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </main>
    </div>
  );
};

export default App;




// import { Outlet } from "react-router-dom";
// import Header from "./components/shared/Header";
// import { ToastContainer } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";
// import { useGetCurrentUserQuery } from "./redux/features/auth/authApi";
// import { setLoading, setUser, logout } from "@/redux/features/auth/authSlice";
// import { useEffect } from "react";
// import Loading from "./components/shared/Loading";
// import type { RootState } from "@/redux/store";

// const App = () => {
//   const dispatch = useDispatch();
//   const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
//   // Conditional API call - শুধু authenticated থাকলে call করবে
//   const { data: userData, isLoading, isError, error } = useGetCurrentUserQuery(undefined, {
//     skip: !isAuthenticated, // শুধু authenticated থাকলে call করবে
//   });

//   useEffect(() => {
//     if (userData?.success && userData.data) {
//       dispatch(setUser(userData.data));
//       console.log("User session restored");
//     }
//   }, [userData, dispatch]);

//   useEffect(() => {
//     if (isError) {
//       console.log("Token invalid, auto logout");
//       dispatch(logout()); // Automatic logout on token error
//     }
//   }, [isError, error, dispatch]);

//   useEffect(() => {
//     dispatch(setLoading(isLoading));
//   }, [isLoading, dispatch]);

//   if (isLoading && isAuthenticated) {
//     return (
//       <div>
//         <Loading/>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <Header />
//       <main className="container mx-auto max-w-screen-xl px-4 md:px-0">
//         <Outlet />
//         <ToastContainer
//           position="bottom-right"
//           autoClose={1500}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           theme="colored"
//         />
//       </main>
//     </div>
//   );
// };

// export default App;
