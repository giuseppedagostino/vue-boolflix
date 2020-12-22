var app = new Vue ({
  el: "#root",
  data: {
    // prendo il valore inserito dall'utente e lo utilizzerò come query per la chiamata server
    userQuery: "",
    movies: [],
    tvShows: [],
    // array contentente tutti i risultati mescolati
    allAPIs: [],
    imgPrefix: "https://image.tmdb.org/t/p/w220_and_h330_face/",
    // salvo in un array le valutazioni dei film ricercati
    // arrayStarsNumber: [],
  },
  methods: {

    // chiama le serie tv all'interno di getAPI
    getTvShows: function() {
      // console.log('query: ' +  this.userQuery);
      axios
      .get("https://api.themoviedb.org/3/search/tv?", {
        params: {
          api_key: "7cbf503fd8e48f699cd890609facde55",
          query: this.userQuery,
          language: "it-IT"
        }
      })
      .then((result) => {

        this.tvShows = result.data.results;
        console.log("SERIE TV");
        console.log(result.data.results);
        this.allAPIs = [...this.tvShows, ...this.movies];
        console.log("ALL");
        console.log(this.allAPIs);
        // get stars non faceva funzionare lo spread perchè ciclava sull'array sbagliato (movies) però ora funziona sia con che senza il parametro result. Perchè?
        this.getStars(result);
      })
    },

    getMovies: function() {
      axios
      .get("https://api.themoviedb.org/3/search/movie?", {
        params: {
          api_key: "7cbf503fd8e48f699cd890609facde55",
          query: this.userQuery,
          language: "it-IT"
        }
      })
      .then ((result) => {
        // riempio l'array utente con i risultati restituiti dal server
        this.movies = result.data.results;
        console.log("FILM");
        console.log(this.movies);
        this.getTvShows();
      })
    },

    getStars: function(result) {
      // ad ogni ricerca l'array di voti deve essere reinizializzato a 0
      this.arrayStarsNumber = [];
      var singleVote = "";
      var starsNumber = "";
      for (var i = 0; i < this.allAPIs.length; i++) {
        singleVote = this.allAPIs[i].vote_average;
        // converto il voto in numero di stelle
        starsNumber = Math.ceil((singleVote) / 2);
        // pusho il numero di stelle nell'array
        this.arrayStarsNumber.push(starsNumber);
      }
    },

  }
});
