// MILESTONE 2
// STELLINE - Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5, così da permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5, lasciando le restanti vuote.
// BANDIERINE - Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera della nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della nazione ritornata dall’API.
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
    arrayVotes: [],
  },
  methods: {

    getAPI: function() {
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
        console.log(this.movies);
        // this.getStars(result);
        this.getVotes(result);
      })
    },

    // getStars: function(result) {
    //   console.log("getStars");
    //   for (var i = 0; i < this.movies.length; i++) {
    //     this.arrayVotes += this.movies[i].vote_average;
    //   }
    //   console.log(this.arrayVotes);
    //   console.log(this.arrayVotes[0]);
    // },

    // backup
    // getVotes: function(result) {
    //   for (var i = 0; i < this.movies.length; i++) {
    //     console.log(this.movies[i].vote_average);
    //     this.singleVote = this.movies[i].vote_average;
    //     this.arrayVotes.push(this.singleVote);
    //   }
    //   console.log(this.arrayVotes);
    //   console.log(this.arrayVotes.length);
    // }

    getVotes: function(result) {
      // ad ogni ricerca l'array di voti deve essere reinizializzato a 0
      this.arrayVotes = [];
      var singleVote = "";
      var starsNumber = "";
      for (var i = 0; i < this.movies.length; i++) {
        console.log(this.movies[i].vote_average);
        this.singleVote = this.movies[i].vote_average;
        // converto il voto in numero di stelle
        this.starsNumber = Math.ceil((this.singleVote) / 2);
        // this.arrayVotes.push(this.singleVote);
        // pusho il numero di stelle nell'array
        this.arrayVotes.push(this.starsNumber);
        console.log(this.starsNumber);
      }
      console.log(this.arrayVotes);
      console.log(this.arrayVotes.length);
    },

  }
});
