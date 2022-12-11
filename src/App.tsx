import { AppRouter } from "./Router/appRouter"
import { NavBar } from "./components/NavBar/NavBar"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { buyerAuth } from "./config/firebase"
import { setUserLoginDetails } from "./Redux/Reducer"

function App() {
  console.log('user')
  const Dispatch = useDispatch()
  
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(buyerAuth, (user) => {
      if (user) {
        Dispatch(setUserLoginDetails(user))
      } else {
        Dispatch(setUserLoginDetails(null))
      }
    })
    return () => unSubscribe();
  }, [])



  return (
    <>
      <NavBar />
      <AppRouter />
    </>
  )
}

export default App
