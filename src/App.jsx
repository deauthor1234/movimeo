import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import Favorites from "./pages/Favorites"
import MainLayout from "./layouts/MainLayout"
import "./css/main.css"
import { MovieProvider } from "./contexts/MovieContext"

function App() {
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