// MILESTONE 1
// Cliccando il  bottone, si devono cercare sull’API tutti i film che contengono ciò che ha scritto l’utente. Sostituiamo quindi le nostre schede con quelle generate dalla chiamata, tralasciando per ora le stelline.

var app = new Vue ({
  el: "#root",
  data: {
    // prendo il valore inserito dall'utente e lo utilizzerò come query per la chiamata server
    userQuery: "",
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
      .then (function(result) {
        // restituisce tutta la risposta server
        console.log(result);
        // restituisce gli array di film
        console.log(result.data.results);
        // se non metto un numero per scegliere un array mi restituisce undefined
        console.log(result.data.results[0].original_title);
        console.log(result.data.results[0].original_language);
        console.log(result.data.results[0].overview);
        console.log(result.data.results[0].release_date);
        console.log(result.data.results[0].popularity);
      })
    }
  }
});
