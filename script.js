// Getting the date
const getCurrentMonth = () => {
  const month = new Date().getMonth() + 1;
  if (month < 10) {
    return `0${month}`;
  } else {
    return month;
  }
};
const getCurrentDay = () => {
  const day = new Date().getDate();
  if (day < 10) {
    return `0${day}`;
  } else {
    return day;
  }
};
const currentYear = new Date().getFullYear();
const currentMonth = getCurrentMonth();
const currentDay = getCurrentDay();
const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
const lastYear = `${currentYear - 1}-${currentMonth}-${currentDay}`;
const nextYear = `${currentYear + 1}-${currentMonth}-${currentDay}`;
$(document).ready(function () {
  $(".model").hide();
  // when the card click function.
  // Video Model
  $(document).on("click", ".card", function () {
    var id = $(this).find("p").text();
    $.get(
      `https://api.rawg.io/api/games/${id}`,
      function (res) {
        console.log(res);
        $(".model").show(500);
        $(".model-container").append(`<div class="model">
        <span>&#x2715</span>
        <video width="800px" height="450px" controls>
        <source src=${res.clip.clip} type='video/mp4'></source>
        <source src=${res.clip.clip} type='video/ogg'></source>
        </video>
    </div>
        `);
      },
      "json"
    );
  });

  // this code for close model page.
  $(document).on("click", "span", function () {
    $(".model").remove();
  });
  // Get all games code with 30 limit.
  $.get(
    "https://api.rawg.io/api/games?page_size=30",
    function (res) {
      for (var i = 0; i < res.results.length; i++) {
        $(".cards").append(` <div class="card">
        <img src="${res.results[i].background_image}"/>
        <div class="info">
                    <h2>${res.results[i].name}</h2>
                    <h3>Rating: ${res.results[i].rating} </h3>
                    <p>${res.results[i].id}</p>
                </div>
                </div>`);
      }
    },
    "json"
  );
  // ----------------------------------------------
  // Search function
  $("#searchBtn").click(function (e) {
    // prevent the default. means prevent refresh page when you click enter.
    e.preventDefault();
    // get input value.
    var searchInput = $("#searchInput").val();
    // removed all previous cards.
    $(".card").remove();
    // search query function.
    $.get(
      `https://api.rawg.io/api/games?search=${searchInput}&page_size=10`,
      function (res) {
        for (var i = 0; i < res.results.length; i++) {
          $(".cards").append(`<div class="card"> 
            <img src="${res.results[i].background_image}"/>
            <div class="info">
                        <h2>${res.results[i].name}</h2>
                        <h3>Rating: ${res.results[i].rating}</h3>
                        <p>${res.results[i].id}</p>
                    </div>
            </div>`);
        }
      },
      "json"
    );
  });
  // Up coming
  $("#upcoming").click(function (e) {
    // prevent the default. means prevent refresh page when you click enter.
    e.preventDefault();
    // removed all previous cards.
    $(".card").remove();
    $("h1").remove();
    // upcoming.

    $.get(
      `https://api.rawg.io/api/games?dates=${currentDate},${nextYear}&ordring=-added&page_size=16`,
      function (res) {
        $(".cards").before("<h1>Up coming games</h1>");
        for (var i = 0; i < res.results.length; i++) {
          $(".cards").append(`<div class="card"> 
            <img src="${res.results[i].background_image}"/>
            <div class="info">
                        <h2>${res.results[i].name}</h2>
                        <h3>Rating: ${res.results[i].rating}</h3>
                        <p>${res.results[i].id}</p>
                        <h4>Date: ${res.results[i].released}</h4>
                    </div>
            </div>`);
        }
      },
      "json"
    );
  });
  // new games
  $("#newgames").click(function (e) {
    // prevent the default. means prevent refresh page when you click enter.
    e.preventDefault();
    // removed all previous cards.
    $(".card").remove();
    $("h1").remove();
    // upcoming.

    $.get(
      `https://api.rawg.io/api/games?dates=${lastYear},${currentDate}&ordring=-released&page_size=16`,
      function (res) {
        $(".cards").before("<h1>New Games</h1>");
        for (var i = 0; i < res.results.length; i++) {
          $(".cards").append(`<div class="card"> 
            <img src="${res.results[i].background_image}"/>
            <div class="info">
                        <h2>${res.results[i].name}</h2>
                        <h3>Rating: ${res.results[i].rating}</h3>
                        <p>${res.results[i].id}</p>
                    </div>
            </div>`);
        }
      },
      "json"
    );
  });
  // popular
  $("#popular-games").click(function (e) {
    // prevent the default. means prevent refresh page when you click enter.
    e.preventDefault();
    // removed all previous cards.
    $(".card").remove();
    $("h1").remove();
    // popular games query
    $.get(
      `https://api.rawg.io/api/games?dates=${lastYear},${currentDate}&ordring=-rating&page_size=16`,
      function (res) {
        $(".cards").before("<h1>popular games</h1>");
        for (var i = 0; i < res.results.length; i++) {
          $(".cards").append(`<div class="card"> 
                <img src="${res.results[i].background_image}"/>
                <div class="info">
                            <h2>${res.results[i].name}</h2>
                            <h3>Rating: ${res.results[i].rating}</h3>
                            <p>${res.results[i].id}</p>
                        </div>
                </div>`);
        }
      },
      "json"
    );
  });
});
