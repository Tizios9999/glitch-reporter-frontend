"use client"
import { useEffect, useContext } from 'react';
import Navbar from './Navbar'
import { AuthContext } from "../contexts/AuthContext";

export const metadata = {
  title: 'Glitch Reporter',
  description: 'Application used for Bug Tracking',
}

export default function AppWrapper({ children }) {

  const [state, dispatch] = useContext(AuthContext);


  useEffect(() => {

    if (state.loading) {
      const user = JSON.parse(localStorage.getItem("user"));

      const savedInfo = user ? { isLoggedIn: true, user }
      : { isLoggedIn: false, user: null };
    
      dispatch({
        type: "LOAD_LOCALSTORAGE",
        payload: savedInfo,
      });
    }

    
  
  }, [] ) 


  return (
         <body>
            {state.loading ? <div>loading</div> :  <>
                                                    <Navbar />
                                                    {children}
                                                    {console.log(state)}
                                                   </>}
         </body>
  )
}
