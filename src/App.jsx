import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import Favorites from "./pages/Favorites"
import MainLayout from "./layouts/MainLayout"
import "./css/main.css"
import { MovieProvider } from "./contexts/MovieContext"
import Aos from "aos"
import "aos/dist/aos.css"
import { useEffect } from "react"

function App() {
  useEffect(() => {
    Aos.init({
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
      once: true
    })
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout/>}>
        <Route index element={<Home/>} />
        <Route path="/favorites" element={<Favorites/>} />
      </Route>
    )
  )

  return (
    <MovieProvider>
      <main className="main-content">
        <RouterProvider router={router} />
      </main>
    </MovieProvider>
  )
}

export default App