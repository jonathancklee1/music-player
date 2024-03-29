# Musicify

### Disclaimer (Read before viewing)!

This project is under development mode in Spotify's developer console. Most API calls such as retrieving track/artist data will not be available unless the user is registered on the Spotify dashboard. As this is a personal project, Spotify does not allow for a quota extension therefore screenshots of the working app can be viewed below.

## About The Project

Musicify is a Spotify "extension" website that is built around it's API and utilises it's useful features and data extraction to add to your music listening experience. By loggin in to an exisiting Spotify account, users can be recommmended new songs based on what they enter in the filters, discover new tracks from a particular genre or just to view through their playlists. Songs previews\* can be played when selected through an audio controller at the bottom. If you enjoy the song you are listening to, you can favourite the song into the "liked songs" playlist on the official Spotify app.

This project enabled me to learn more about single page applications with the use of React Router, the data layer with the useContext API, component-based programming and the usefulness of public npm packages.

## Screenshots of Working Site

<p align="center">
<img src="./src/assets/img/website-sc/home-sc.png" width="900px" alt="home page sc">
<img src="./src/assets/img/website-sc/recommend-page-sc.png" width="900px" alt="recommend page sc">
<img src="./src/assets/img/website-sc/rec-filters-sc.png" width="900px" alt="rec filters sc">
<img src="./src/assets/img/website-sc/rec-results-sc.png" width="900px" alt="rec results sc">
<img src="./src/assets/img/website-sc/discover-page-sc.png" width="900px" alt="discover page sc">
<img src="./src/assets/img/website-sc/library-page-sc.png" width="900px" alt="library page sc">
</p

### Features

- [x] View Spotify playlists
- [x] Play song previews
- [x] Randomise song from categories
- [x] Recommend songs
- [x] Search for songs
- [x] Favourite songs

### Built With

- React JS
- Sass
- Spotify API

### Live Site

https://jonathancklee1.github.io/music-player

## Additional Notes

- Some tracks cannot be played as the song does not always have a valid preview url from the data object given by Spotify. There is a [Web playback SDK](https://developer.spotify.com/documentation/web-playback-sdk/) that enables full song playback but it is only available for premium users only and is outside the scope of this project

## Acknowledgments

- [React](https://reactjs.org/)
- [SASS](https://sass-lang.com/)
- [Font Awesome](https://fontawesome.com)
- [Google Fonts](https://fonts.google.com/)
- [Spotify API](https://developer.spotify.com/documentation/web-api/)
