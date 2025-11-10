import { useState, useEffect } from "react";
import { useMovieContext } from "../contexts/MovieContext";
import { BiSearch } from "react-icons/bi";
import { searchMovies } from "../services/api"
import Aos from "aos";

const SearchBar = () => {
    const { searchInput, setSearchInput, setSearchedMovies, loading, setLoading, setSearching, setSearchKeyword, setError, searchBarClass } = useMovieContext()

    const [isDisabled, setIsDisabled] = useState(window.innerWidth <= 950);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchInput.trim()) return
        if (loading) return
        setLoading(true);
        setSearching(true);

        try {
            const searchResults = await searchMovies(searchInput);
            setSearchedMovies(searchResults)
            setError(null)
            searchResults.length != 0 && await setSearchKeyword(searchInput)
        } catch(err) {
            console.log(err);
            setError('Encountered an error while searching for movies...')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        Aos.init({ duration: 1000, once: true });
        const handleResize = () => {
            const disable = window.innerWidth <= 950;
            setIsDisabled(disable);
            Aos.refreshHard();
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <form onSubmit={handleSearch} className={`search-form${searchBarClass}`}{...(!isDisabled && { "data-aos": "fade-up" })}>
            <BiSearch className="search-ic" />
            <input type="text" name="search-query"  className="search-bar" placeholder="Search for movies..." value={searchInput} onChange={(e) => setSearchInput(e.target.value)} required />
            <button type="submit" className="submit-btn">Search</button>
        </form>
    )
}

    export default SearchBar