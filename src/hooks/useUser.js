import { useEffect, useState } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useUser = () => {
   const[user,setUser] = useState(null) // whether or not user is registerd
   const [isLoading,setIsLoading] = useState(true); //intial value of isloading is true when system will check the user is ligged in

   useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(),user => {
        setUser(user)
        setIsLoading(false) 
    });

    return unsubscribe;
   },[])


  return {user,isLoading}

}
export default useUser