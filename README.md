# Assignment 1 - ReactJS app.

Name: Ben Capper

## Overview.

This repository contains the code for the TMDB web app required as part of the Web App Development module in the 4th Year Software Systems Development course at SETU. Application functionality is described below.

### Features.

+ Firebase authentication and login form
+ Pagination on movie and tv lists
+ Similar movies list in movie details
+ Production company chips in movie details link to company homepage if one exists
+ Trending movies page
+ Must watch pages display movies or tv which the user added to the must watch lists
+ Tv seasons table in tv details page
+ Tv episodes table page linked from a selected tv season
+ Display and write reviews for a tv series 
+ Top rated tv page
+ Search for companies or people based on a user query and form toggle option

## API endpoints.

+ Similar list of movies - /movies/:id
+ Company details - /movies/:id
+ Trending list of movies - /movies/trending
+ Discover list of tv - /tv
+ Tv genres - /tv
+ Tv details - /tv/:id
+ Tv images - /tv/:id
+ Top rated list of tv - /tv/top
+ Trending list of tv - /tv/trending
+ Tv reviews - /tv/reviews/:id
+ Tv season - /tv/:id/season/:sid
+ Search company - /search
+ Search people - /search

## Routing.

All pages require the user to be logged in, otherwise it will redirect back to the login page.

+ / - account creation and login Page
+ /movies - displays a list of movies from discover
+ /movies/trending - displays a list of the weeks trending movies
+ /movies/mustwatch - displays movies saved to the mustwatch movies context
+ /tv - displays a list of tv series from discover
+ /tv/:id - displays details of a certain tv series
+ /tv/reviews/:id - display a list of reviews for a certain tv series
+ /tv/reviews/form - display a form which can be used to create a review
+ /tv/favorites - displays tv series which have been added to favorites
+ /tv/top - displays a list of top rated tv series
+ /tv/mustwatch - displays tv series added to the mustwatch tv context
+ /tv/:id/season/:sid - displays the list of episodes for a chosen season from tv details
+ /search - displays a form used to search for companies or people which match a user query


## Independent learning (If relevant).

+ Firebase authentication
    - loginForm/index.js
    - https://www.youtube.com/watch?v=9bXhf_TELP4&t=1480s&ab_channel=PedroTech
    - https://firebase.google.com/docs/auth/web/start
+ Pagination
    - All pages with a list of movies / tv
    - upcomingMoviesPage.js / tvTrendingPage.js / movieTrendingPage.js / homePage.js / tvHomePage.js
    - https://www.youtube.com/watch?v=xoPguAXJmiE&ab_channel=Codevolution
+ Password field with an adornment and toggle functionality
    - loginForm/index.js
    - https://mui.com/material-ui/react-text-field/
+ Search with toggle component and user query
    - searchForm/index.js
    - https://mui.com/material-ui/react-toggle-button/
    - https://developers.themoviedb.org/3/search/search-companies
+ Api call with two parameters (Seasons of certain Tv series)
    - tmdb-api.js/getTvSeason
    - https://developers.themoviedb.org/3/tv-seasons/get-tv-season-details
