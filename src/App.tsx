import { AppRouter } from "./Router/appRouter"
import { NavBar } from "./components/NavBar/NavBar"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { buyerAuth } from "./config/firebase"
import { getUserDetails, setUserLoginDetails } from "./Redux/Reducer"
import { AppDispatch } from "./Redux/Store"

function App() {
  const Dispatch = useDispatch<AppDispatch>()
  const currentUser = useSelector((state: any) => state.user.currentUser)
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(buyerAuth, (user) => {
      if (user) {
        Dispatch(setUserLoginDetails(user))
        Dispatch(getUserDetails(user.uid))
      } else {
        Dispatch(setUserLoginDetails(null))
      }
    })
    return () => unSubscribe();
  }, [])



  return (
    <>
      <AppRouter />
    </>
  )
}

export default App
