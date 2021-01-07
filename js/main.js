// MILESTONE 5
// Creare una lista di generi richiedendo quelli disponibili all'API e creare dei filtri con i generi tv e movie per mostrare/nascondere le schede ottenute con la ricerca.

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
    arrayStarsNumber: [],
    genres: [],
    // array di immagini per lo sfondo
    // arrayImages: ["avatar","interstellar","firstman","dunkirk"],
    arrayImages: [
      {name: "avatar"},
      {name: "interstellar"},
      {name: "starwars"},
      {name: "firstman"},
      {name: "theboys"},
      {name: "dunkirk"},
      {name: "django"},
    ],
    imageIndex: 0,
    imageName: "avatar",
  },

  // cambio sfondo automatico senza ricerca
  mounted: function() {
    setInterval(() => {
      this.imageIndex++;
      // console.log(this.imageIndex + " " + this.imageName);
      if (this.imageIndex == this.arrayImages.length) {
        this.imageIndex = 0;
      }
      this.imageName = this.arrayImages[this.imageIndex].name;
    }, 4000);
  },

  // la primissima chiamata crea l'array di generi
  created: function() {
    axios
    .get("https://api.themoviedb.org/3/genre/movie/list", {
      params: {
        api_key: "7cbf503fd8e48f699cd890609facde55",
        language: "it-IT"
      }
    })
    .then((result) => {
      this.genres = result.data.genres;
      console.log(this.genres);
    })
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

        this.tvShows = result.data.results;
        console.log("SERIE TV");
        console.log(result.data.results);
        // unione dei due array, va fatto all'interno di questa chiamata perchè sono asincrone.
        this.allAPIs = [...this.tvShows, ...this.movies];
        console.log("ALL");
        console.log(this.allAPIs);
        // Riordino l'array in base alla popolarità, sort vuole all'interno una funzione anonima che accetta due parametri (a, b). Riconoscerà da sola se si tratta di numeri, stringhe, oggetti, ecc. Infatti, richiamare una funzione definita esternamente non funziona.
        this.allAPIs.sort(function(a, b) {return b.popularity - a.popularity});
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

    filterGenres: function() {}

  }
});
