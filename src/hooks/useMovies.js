import { useCallback, useEffect, useState } from "react";
import { getPopularMovies, getTopRatedMovies, getUpcomingMovies, getAiringMovies } from "../services/api"
import { useMovieContext } from "../contexts/MovieContext";

export function useMovies() {
    const { setLoading, searchDep, setError } = useMovieContext()

    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [airingMovies, setAiringMovies] = useState([]);
    const errMessage = "Failed to load movies..."

    //Fetching popular movies
    const loadPopularMovies = useCallback(async () => {
        try {
            const res = await getPopularMovies();
            setPopularMovies(res);
        } catch (err) {
            console.error(err);
            setError(errMessage);
        }
    }, []);
    
    //Fetching top rated movies
    const loadTopRatedMovies = useCallback(async () => {
        try {
            const res = await getTopRatedMovies();
            setTopRatedMovies(res);
        } catch (err) {
            console.error(err);
            setError(errMessage);
        }
    }, []);

    //Fetching airing movies
    const loadAiringMovies = useCallback(async () => {
        try {
            const res = await getAiringMovies();
            setAiringMovies(res.slice(0,9));
        } catch (err) {
            console.error(err);
            setError(errMessage);
        }
    }, []);

    //Fetching upcoming movies
    const loadUpcomingMovies = useCallback(async () => {
        try {
            const res = await getUpcomingMovies();
            setUpcomingMovies(res);
        } catch (err) {
            console.error(err);
            setError(errMessage);
        }
    }, []);

    //Fetching upcoming movies
    useEffect(() => {
        const loadAll = async () => {
            setLoading(true);
            try {
                await Promise.all([
                    loadPopularMovies(),
                    loadTopRatedMovies(),
                    loadAiringMovies(),
                    loadUpcomingMovies()
                ]);
            } finally {
                setLoading(false);
            }
        };

        loadAll();
    }, [loadPopularMovies, loadTopRatedMovies, loadAiringMovies, loadUpcomingMovies, searchDep]);

    const headerMovies = popularMovies.slice(0,5);
    const updatedRecentMovies = [...popularMovies, ...topRatedMovies, ...upcomingMovies].reverse().filter((movie) => movie.release_date?.split("-")[0] === "2025")

    return {
        popularMovies,
        airingMovies,
        topRatedMovies,
        upcomingMovies,
        headerMovies,
        updatedRecentMovies
    }
}