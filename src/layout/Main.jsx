import React from "react";
import {Movies} from "../components/Movies";
import {Preloader} from "../components/Preloader";
import {Search} from "../components/Search";

const API_KEY = process.env.REACT_APP_API_KEY;

class Main extends React.Component {
    state = {
        movies: [],
        error: null, // Add an error state
    };

    componentDidMount() {
        this.fetchMovies("matrix"); // Fetch initial movies
    }

    fetchMovies = (searchTerm, type = "all") => {
        fetch(
            `http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}${type !== "all" ? `&type=${type}` : ""}`
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.Response === "True") {
                    this.setState({movies: data.Search, error: null});
                } else {
                    this.setState({movies: [], error: data.Error});
                }
            })
            .catch((error) => {
                this.setState({movies: [], error: error.message});
            });
    };

    searchMovies = (str, type) => {
        this.fetchMovies(str, type);
    };

    render() {
        const {movies, error} = this.state;

        return (
            <main className="container content">
                <Search searchMovies={this.searchMovies}/>
                {error ? (
                    <p>An error occurred: {error}</p>
                ) : movies.length ? (
                    <Movies movies={movies}/>
                ) : (
                    <Preloader/>
                )}
            </main>
        );
    }
}

export {Main};
