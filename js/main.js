// MILESTONE 1
// Cliccando il  bottone, si devono cercare sull’API tutti i film che contengono ciò che ha scritto l’utente. Sostituiamo quindi le nostre schede con quelle generate dalla chiamata, tralasciando per ora le stelline.

var app = new Vue ({
  el: "#root",
  data: {
    // prendo il valore inserito dall'utente e lo utilizzerò come query per la chiamata server
    userQuery: "",
    // salvo in un array a parte la ricerca appena effettuata
    movies: [],
  },
  methods: {
    getAPI: function() {
      // prova chiamata server
      axios
      .get("https://api.themoviedb.org/3/search/movie?", {
        params: {
          api_key: "7cbf503fd8e48f699cd890609facde55",
          // senza this ritorna undefined
          query: this.userQuery,
          language: "it-IT"
        }
      })
      .then ((result) => {
        console.log(result);
        console.log(result.data.results);
        // riempio l'array utente con i risultati restituiti dal server
        this.movies = result.data.results;
        console.log("movies");
        console.log(this.movies);;
      })
    }
  }
});
