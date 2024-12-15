import { apiToken, baseUrl, imageUrl } from "./config.js";
import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";

window.scrollTo(0, 0);

const animate = () => {
  anime({
    targets: ".loader-header",
    opacity: [0, 1],
    duration: 1000,
    easing: "easeInSine",
    delay: 500,
  });

  anime({
    targets: ".loader-text:nth-child(1)",
    translateX: [-200, 0],
    opacity: [0, 1],
    duration: 1000,
    easing: "easeInSine",
    delay: 500,
  });

  anime({
    targets: ".loader-text:nth-child(2)",
    translateY: [200, 0],
    opacity: [0, 1],
    duration: 1000,
    easing: "easeInSine",
    delay: 500,
  });

  anime({
    targets: ".loader-text:nth-child(3)",
    translateX: [200, 0],
    opacity: [0, 1],
    duration: 1000,
    easing: "easeInSine",
    delay: 500,
  });

  anime({
    targets: ".loader-spinner .spinner-border",
    opacity: [0, 1],
    duration: 1000,
    easing: "easeInSine",
    delay: 1500,
  });
};
animate();

$(document).ready(() => {
  setTimeout(() => {
    $("#loader").fadeOut(1000, () => {
      $("#loader").remove();
      $("body").css("overflow-y", "auto");
    });
  }, 5000);

  const popularSwiper = new Swiper(".popular-swiper", {
    direction: "horizontal",
    loop: true,
    effect: "fade",
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: 1,
  });

  const topRatedSwiper = new Swiper(".topRated-swiper", {
    slidesPerView: 6,
    spaceBetween: 30,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 4,
      },
      1200: {
        slidesPerView: 5,
      },
    },
  });

  const upcomingSwiper = new Swiper(".upcoming-swiper", {
    slidesPerView: 6,
    spaceBetween: 30,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 4,
      },
      1200: {
        slidesPerView: 5,
      },
    },
  });

  const nowPlayingSwiper = new Swiper(".nowplaying-swiper", {
    slidesPerView: 6,
    spaceBetween: 30,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 4,
      },
      1200: {
        slidesPerView: 5,
      },
    },
  });

  fetch(baseUrl + "/genre/movie/list?language=en", {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      const data = res.genres;

      data.forEach((genre) => {
        $(".genre-dropdown").append(`
          <li><a class="dropdown-item" href="#">${genre.name}</a></li>
        `);
      });
    })
    .catch((err) => console.error(err));

  fetch(baseUrl + "/movie/popular?language=en-US&page=1", {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
  }).then((res) => {
    res.json().then((res) => {
      const data = res.results.slice(0, 5);

      data.forEach((movie) => {
        $(".swiper-wrapper.popular-wrapper").append(`
          <div class="swiper-slide">
            <img src="${imageUrl + movie.backdrop_path}" />
            <div class="swiper-slide-wrapper">
              <div class="swiper-slide-content">
              <h1 class="orbitron-800">${movie.title}</h1>
              <p class="orbitron-400">Popularity ${movie.popularity}</p>
              </div>
            </div>
          </div>
        `);
      });
    });

    popularSwiper.update();
  });

  $(window).resize(() => {
    popularSwiper.update();
  });

  fetch(baseUrl + "/movie/top_rated?language=en-US&page=1", {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      const data = res.results;

      data.forEach((movie) => {
        $(".swiper-wrapper.topRated-wrapper").append(`
          <div class="swiper-slide">
              <img src="${imageUrl + movie.poster_path}" />
              <div class="topRated-detail">
                <h1 class="orbitron-800">${movie.title}</h1>
              </div>
              <div class="topRated-overlay">
                <button type="button" class="btn border-white orbitron-400 text-white" data-bs-toggle="modal" data-bs-target="#movieDetail" data-movieId="${
                  movie.id
                }" data-title="${movie.title}">
                  View Detail
                </button>
              </div>
            </div>
          `);
      });

      topRatedSwiper.update();
    })
    .catch((err) => console.error(err));

  fetch(baseUrl + "/movie/upcoming?language=en-US&page=1", {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      const data = res.results;

      data.forEach((movie) => {
        $(".swiper-wrapper.upcoming-wrapper").append(`
          <div class="swiper-slide">
              <img src="${imageUrl + movie.poster_path}" />
              <div class="upcoming-detail">
                <h1 class="orbitron-800">${movie.title}</h1>
              </div>
              <div class="upcoming-overlay">
                <button type="button" class="btn border-white orbitron-400 text-white" data-bs-toggle="modal" data-bs-target="#movieDetail" data-movieId="${
                  movie.id
                }" data-title="${movie.title}">
                  View Detail
                </button>
              </div>
            </div>
          `);
      });

      upcomingSwiper.update();
    })
    .catch((err) => console.error(err));

  fetch(baseUrl + "/movie/now_playing?language=en-US&page=1", {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      const data = res.results;

      data.forEach((movie) => {
        $(".swiper-wrapper.nowplaying-wrapper").append(`
          <div class="swiper-slide">
              <img src="${imageUrl + movie.poster_path}" />
              <div class="nowplaying-detail">
                <h1 class="orbitron-800">${movie.title}</h1>
              </div>
              <div class="nowplaying-overlay">
                <button type="button" class="btn border-white orbitron-400 text-white" data-bs-toggle="modal" data-bs-target="#movieDetail" data-movieId="${
                  movie.id
                }" data-title="${movie.title}">
                  View Detail
                </button>
              </div>
            </div>
          `);
      });

      nowPlayingSwiper.update();
    })
    .catch((err) => console.error(err));

  $(document).on(
    "click",
    'button.btn[data-bs-target="#movieDetail"]',
    function () {
      const movieId = $(this).data("movieid");

      $('#movieDetailLabel').html($(this).data("title"));
      $('#modal-content').empty();
      $('#modal-loader').show();
      $('#modal-content').hide();

      fetch(
        baseUrl + `/movie/${movieId}?language=en-US`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${apiToken}`,
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setTimeout(() => {
            $('#modal-loader').hide();
            $('#modal-content').show();
          }, 500);

          $('#modal-content').html(`
              <div class="genres">
                  ${res.genres.map(genre => `<span class="genres_tag orbitron-400">${genre.name}</span>`).join('')}
                </div>
                <div class="poster">
                  <img
                    src="${imageUrl + res.backdrop_path}"
                    alt=""
                  />
                </div>
                <div class="details grid mt-4">
                  <div class="row mb-2">
                    <div class="col">
                      <h1 class="orbitron-800 fs-5">Original Title</h1>
                      <div class="row">
                        <p class="orbitron-400" style="font-size: 14px;">${res.original_title}</p>
                      </div>
                    </div>
                  </div>
                  <div class="row mb-2">
                    <div class="col">
                      <h1 class="orbitron-800 fs-5">Tagline</h1>
                      <div class="row">
                        <p class="orbitron-400" style="font-size: 14px;">${res.tagline}</p>
                      </div>
                    </div>
                  </div>
                  <div class="row mb-2">
                    <div class="col">
                      <h1 class="orbitron-800 fs-5">Overview</h1>
                      <div class="row">
                        <p class="orbitron-400 text-justify" style="font-size: 14px;">${res.overview}</p>
                      </div>
                    </div>
                  </div>
                  <div class="row mb-2">
                    <div class="col">
                      <h1 class="orbitron-800 fs-5">Popularity</h1>
                      <div class="row">
                        <p class="orbitron-400" style="font-size: 14px;">${res.popularity}</p>
                      </div>
                    </div>
                  </div>
                  <div class="row mb-2">
                    <div class="col">
                      <h1 class="orbitron-800 fs-5">Production Companies</h1>
                      <div class="row">
                        <p class="orbitron-400" style="font-size: 14px;">${res.production_companies.map(productionCompany => productionCompany.name).join(', ')}</p>
                      </div>
                    </div>
                  </div>
                  <div class="row mb-2">
                    <div class="col">
                      <h1 class="orbitron-800 fs-5">Status</h1>
                      <div class="row">
                        <p class="orbitron-400" style="font-size: 14px;">${res.status}</p>
                      </div>
                    </div>
                  </div>
                  <div class="row mb-2">
                    <div class="col">
                      <h1 class="orbitron-800 fs-5">Release Date</h1>
                      <div class="row">
                        <p class="orbitron-400" style="font-size: 14px;">${res.release_date}</p>
                      </div>
                    </div>
                  </div>
                  <div class="row mb-2">
                    <div class="col">
                      <h1 class="orbitron-800 fs-5">Revenue</h1>
                      <div class="row">
                        <p class="orbitron-400" style="font-size: 14px;">${res.revenue} USD</p>
                      </div>
                    </div>
                  </div>
                  <div class="row mb-2">
                    <div class="col">
                      <h1 class="orbitron-800 fs-5">Vote Count</h1>
                      <div class="row">
                        <p class="orbitron-400" style="font-size: 14px;">${res.vote_count}</p>
                      </div>
                    </div>
                  </div>
                  <div class="row mb-2">
                    <div class="col">
                      <h1 class="orbitron-800 fs-5">Vote Average</h1>
                      <div class="row">
                        <p class="orbitron-400" style="font-size: 14px;">${res.vote_average}</p>
                      </div>
                    </div>
                  </div>
                </div>
            `);
        });
    }
  );
});
