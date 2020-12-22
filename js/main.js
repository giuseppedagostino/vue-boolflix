var app = new Vue ({
  el: "#root",
  data: {
    // prendo il valore inserito dall'utente e lo utilizzerò come query per la chiamata server
    userQuery: "",
    // salvo in un array la ricerca dei film
    movies: [],
    // salvo in un array la ricerca delle serie tv
    tvShows: [],
    // array contentente tutti i risultati già mescolati
    // allAPI: [],
    // prefisso percorso immagini
    imgPrefix: "https://image.tmdb.org/t/p/w220_and_h330_face/",
    // salvo in un array le valutazioni dei film ricercati
    arrayStarsNumber: [],
  },
  methods: {

    // chiama le serie tv all'interno di getAPI
    getTvShows: function() {
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
        this.tvShows = result.data.results;
        this.getStars(result);
      })
    },

    getAPI: function() {
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
        this.getTvShows();
        console.log("FILM");
        console.log(this.movies);
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
      // console.log("arrayStarsNumber");
      // console.log(this.arrayStarsNumber);
    },

  }
});
