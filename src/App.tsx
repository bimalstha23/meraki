import { AppRouter } from "./Router/appRouter"
import { NavBar } from "./components/NavBar/NavBar"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { buyerAuth } from "./config/firebase"
import { setUserLoginDetails } from "./Redux/Reducer"

function App() {
  const Dispatch = useDispatch()

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(buyerAuth, (user) => {
      Dispatch(setUserLoginDetails(user))
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
