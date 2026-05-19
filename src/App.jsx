import Search from "./components/Search.jsx";
import { useEffect, useState } from "react";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./appwrite.js";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: new Headers({
    accept: "application/json",
    authorization: `Bearer ${API_KEY}`,
  }),
};
const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState();

  const [debounceSearchTerm, setDebounceSearchTerm] = useState("");

  // Debounce the search term to prevent making too many API requests
  // by waiting for the user to stop typing for 500ms
  useDebounce(() => setDebounceSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${decodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error("failed to fetch movies");
      }
      const data = await response.json();
      if (data.response === "false") {
        setErrorMessage(data.Error || "failed to fetch movies");
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);
      if (query && data.results.length > 0) {
        updateSearchCount(query, data.results[0]);
      }
    } catch (e) {
      console.error(`Error fetching movies: ${e}`);
      setErrorMessage("Error fetching movies, Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    const movies = await getTrendingMovies();
    setTrendingMovies(movies);
  };

  useEffect(() => {
    fetchMovies(debounceSearchTerm);
  }, [debounceSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);
  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You’ll Love
            Without the Hassle
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </h1>

          {trendingMovies ? (
            <section className="trending">
              <h2>Trending Movies</h2>
              <ul>
                {trendingMovies.map((movie, index) => (
                  <li key={movie.id}>
                    <p>{index + 1}</p>
                    <img src={movie.poster_url} alt={movie.title} />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          <section className="all-movies">
            <h2>All movies</h2>
            {isLoading ? (
              <Spinner />
            ) : errorMessage ? (
              <p className="text-red-500"> {errorMessage}</p>
            ) : (
              <ul>
                {movieList.map((movie) => (
                  <MovieCard movie={movie} key={movie.id} />
                ))}
              </ul>
            )}
          </section>
        </header>
      </div>
    </main>
  );
};
export default App;
