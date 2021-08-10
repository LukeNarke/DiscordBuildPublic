import React, { useEffect } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import Login from "./Login";
import { auth } from "./firebase";
import { login, logout } from "./features/userSlice";

function App() {
  // dispatch is the gun that fires info into redux
  const dispatch = useDispatch();
  // import the selectUser selector so we can go into that piece of state
  // now we have access to the user
  const user = useSelector(selectUser);

  useEffect(() => {
    // listen for a user to login,
    auth.onAuthStateChanged((authUser) => {
      console.log("user is", authUser);
      // if there is a user, log the user in
      if (authUser) {
        // the user is logged in
        dispatch(
          // the below object is the payload for the login action
          login({
            // uid = user id
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        // or log the user out
        dispatch(logout());
      }
    });
    // so every time the dispatch is changed, the useEffect hook will re-render
  }, [dispatch]);
  return (
    <div className="app">
      {/* if there is a user, render the app. If no user, render the Login component */}
      {user ? (
        <>
          <Sidebar />
          <Chat />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
