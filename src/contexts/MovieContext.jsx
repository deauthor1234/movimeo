import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searching, setSearching] = useState(false);
    const [searchDep, setSearchDep] = useState(0);
    const [favorites, setFavorites] = useState([]);
    const [searchedMovies, setSearchedMovies] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [searchKeyword, setSearchKeyword] = useState();
    const [searchBarClass, setSearchBarClass] = useState("");
    const [isHome, setIsHome] = useState(true);
    const [isDarkTheme, setIsDarkTheme] = useState(true);
    
    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites')
        storedFavorites && setFavorites(JSON.parse(storedFavorites))
    }, [])

    useEffect(() => {
        localStorage.setItem(favorites, JSON.stringify(favorites))
    }, [favorites])

    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev, movie])
    }

    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))
    }

    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId)
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        searchedMovies,
        setSearchedMovies,
        searching,
        setSearching,
        searchDep,
        setSearchDep,
        loading,
        setLoading,
        searchInput, 
        setSearchInput,
        error,
        setError,
        searchKeyword,
        setSearchKeyword,
        searchBarClass,
        setSearchBarClass,
        isHome,
        setIsHome,
        isDarkTheme,
        setIsDarkTheme
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}