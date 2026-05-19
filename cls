[33mcommit 249bec1864a72824153dc9e7999bd089f521b596[m[33m ([m[1;36mHEAD[m[33m -> [m[1;32mmaster[m[33m, [m[1;31morigin/master[m[33m)[m
Author: abdullahalmsaodi <abdullah.almsaodi@fastn.ai>
Date:   Tue May 19 17:57:25 2026 +0300

    feat(ui): implement MovieCard display component

[1mdiff --git a/src/components/MovieCard.jsx b/src/components/MovieCard.jsx[m
[1mindex f57ae76..f7a6c12 100644[m
[1m--- a/src/components/MovieCard.jsx[m
[1m+++ b/src/components/MovieCard.jsx[m
[36m@@ -1,8 +1,35 @@[m
 import React from "react";[m
 [m
 const MovieCard = ({[m
[31m-  movie: { title, vote_average, release_date, original_language },[m
[32m+[m[32m  movie: { title, poster_path, vote_average, release_date, original_language },[m
 }) => {[m
[31m-  return <p className="text-white">{title}</p>;[m
[32m+[m[32m  return ([m
[32m+[m[32m    <div className="movie-card">[m
[32m+[m[32m      <img[m
[32m+[m[32m        src={[m
[32m+[m[32m          poster_path[m
[32m+[m[32m            ? `https://image.tmdb.org/t/p/w500/${poster_path}`[m
[32m+[m[32m            : "/no-movie.png"[m
[32m+[m[32m        }[m
[32m+[m[32m        alt={title}[m
[32m+[m[32m      />[m
[32m+[m[32m      <div className="mt-4">[m
[32m+[m[32m        <h3>{title}</h3>[m
[32m+[m[32m      </div>[m
[32m+[m
[32m+[m[32m      <div className="content">[m
[32m+[m[32m        <div className="rating">[m
[32m+[m[32m          <img src="/star.svg" alt="Star Icon" />[m
[32m+[m[32m          <p>{vote_average ? vote_average.toFixed(1) : "N/A"} </p>[m
[32m+[m[32m          <span>•</span>[m
[32m+[m[32m          <p className="lang">{original_language}</p>[m
[32m+[m[32m          <span>•</span>[m
[32m+[m[32m          <p className="year">[m
[32m+[m[32m            {release_date ? release_date.split("-")[0] : "N/A"}[m
[32m+[m[32m          </p>[m
[32m+[m[32m        </div>[m
[32m+[m[32m      </div>[m
[32m+[m[32m    </div>[m
[32m+[m[32m  );[m
 };[m
 export default MovieCard;[m
