// MILESTONE 2
// SERIE TV - Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricerca dovremo prendere sia i film che corrispondono alla query, sia le serie tv, stando attenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel JSON di risposta diversi, simili ma non sempre identici)

var app = new Vue ({
  el: "#root",
  data: {
    // prendo il valore inserito dall'utente e lo utilizzerò come query per la chiamata server
    userQuery: "",
    // salvo in un array a parte la ricerca appena effettuata
    movies: [],
    // prefisso percorso immagini
    imgPrefix: "https://image.tmdb.org/t/p/w220_and_h330_face/",
    // salvo in un array le valutazioni dei film ricercati
    arrayStarsNumber: [],
  },
  methods: {

    getTvShows: function() {
      // API delle serie tv
      axios
      .get("https://api.themoviedb.org/3/search/tv?", {
        params: {
          api_key: "7cbf503fd8e48f699cd890609facde55",
          query: this.userQuery,
          language: "it-IT"
        }
      })
      .then((result) => {
        console.log("SERIE TV");
        console.log(result.data.results);
        // console.log(result.data.results.name);
        this.movies = result.data.results;
        this.getStars(result);
      })
    },

    getAPI: function() {
      // API dei film
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
        this.movies = this.movies + result.data.results;
        console.log("movies & tv series");
        console.log(this.movies);
        // this.getStars(result);
        this.getStars(result);
      })
    },

    getStars: function(result) {
      // ad ogni ricerca l'array di voti deve essere reinizializzato a 0
      this.arrayStarsNumber = [];
      var singleVote = "";
      var starsNumber = "";
      for (var i = 0; i < this.movies.length; i++) {
        singleVote = this.movies[i].vote_average;
        // converto il voto in numero di stelle
        starsNumber = Math.ceil((singleVote) / 2);
        // pusho il numero di stelle nell'array
        this.arrayStarsNumber.push(starsNumber);
      }
      console.log("arrayStarsNumber");
      console.log(this.arrayStarsNumber);
    },

  }
});
