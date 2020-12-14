import { useEffect, useState } from 'react';
import MovieList from './components/MovieList';
import MovieHeader from './components/MovieHeader';
import SearchBox from './components/SearchBox';
import AddFavorites from './components/AddFavorites';
import RemoveFavorites from './components/RemoveMovies';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favorites, setFavorites] = useState([]);
  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=30df3fe9`;
    const response = await fetch(url);
    const responseJson = await response.json();
    setFavorites(JSON.parse(localStorage.getItem('movies-favorites')));
    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);
  const saveToLocalStorage = (items)=>{
    localStorage.setItem('movies-favorites',JSON.stringify(items));
  };
  const addFavoritesMovie = (movie) => {
    const newFavoriteList = [...favorites, movie];
    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  };
  const removeFavoritesMovie = (movie) => {
    const newFavoriteList = favorites.filter((favorite) => favorite.imdbID !== movie.imdbID);
    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  };
  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieHeader header='Movies' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <MovieList movies={movies} handleFavoritesClick={addFavoritesMovie} favoriteComponent={AddFavorites} />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieHeader header='Favorites' />
      </div>
      <div className="row">
        <MovieList movies={favorites} handleFavoritesClick={removeFavoritesMovie} favoriteComponent={RemoveFavorites} />
      </div>
    </div>
  );
}

export default App;
