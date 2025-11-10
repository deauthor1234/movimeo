import { useEffect, useState } from "react";
import { getPopularMovies, getTopRatedMovies, getUpcomingMovies, getAiringMovies } from "../services/api"
import { useMovieContext } from "../contexts/MovieContext";

export function useMovies() {
    const { setLoading, searchDep, setError } = useMovieContext()

    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [airingMovies, setAiringMovies] = useState([]);

    //Fetching popular movies
    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const apiPopularMovies = await getPopularMovies();
                setPopularMovies(apiPopularMovies) 
            } catch (err) {
                console.log(err);
                setError('Failed to load movies...')
            } finally {
                setLoading(false)
            }
        }
        
        loadPopularMovies()
    }, [searchDep])
    
    //Fetching top rated movies
    useEffect(() => {
        const loadTopRatedMovies = async () => {
            setLoading(true)

            try {
                const apiTopRatedMovies = await getTopRatedMovies();
                setTopRatedMovies(apiTopRatedMovies)
                setError(null)
            } catch (err) {
                console.log(err);
                setError('Failed to load movies...')
            } finally {
                setLoading(false)
            }
        }

        loadTopRatedMovies()
    }, [searchDep])

    //Fetching upcoming movies
    useEffect(() => {
        const loadUpcomingMovies = async () => {
            setLoading(true)

            try {
                const apiUpcomingMovies = await getUpcomingMovies();
                setUpcomingMovies(apiUpcomingMovies)
                setError(null)
            } catch (err) {
                console.log(err);
                setError('Failed to load movies...')
            } finally {
                setLoading(false)
            }
        }

        loadUpcomingMovies()
    }, [searchDep])
 
    //Fetching airing movies
    useEffect(() => {
        const loadAiringMovies = async () => {
            setLoading(true)

            try {
                const apiAiringMovies = await getAiringMovies();
                setAiringMovies(apiAiringMovies.slice(0,9))
                setError(null)
            } catch (err) {
                console.log(err);
                setError('Failed to load movies...')
            } finally {
                setLoading(false)
            }
        }

        loadAiringMovies()
    }, [searchDep])

    const headerMovies = popularMovies.slice(0,5);
    const recentMovies = [...popularMovies, ...topRatedMovies, ...upcomingMovies]
    const updatedRecentMovies = recentMovies.reverse().filter((movie) => movie.release_date?.split("-")[0] === "2025")

    return {
        popularMovies,
        airingMovies,
        topRatedMovies,
        upcomingMovies,
        recentMovies,
        headerMovies,
        updatedRecentMovies
    }
}