var app = new Vue({
    el: "#app",
    data:{
        search: '',
        searchValue: '',
        loading: false,
        books: {},
        thumbnail: [],
        isbn: [],

    },


    created() {
        this.submit();
    },


    methods:{
        async submit() {
            let searchVal = this.search;
            while(searchVal.search(' ') !== -1 ){
                searchVal = searchVal.replace(' ', "+");
                this.searchValue = searchVal;
            }

            try {
                this.loading = true;
                const url = 'http://openlibrary.org/search.json?q=' + this.search;
                const response = await fetch(url);
                const json = await response.json();
                
                this.books = json.docs;
                this.loading = false;
                console.log("response:  ", json);
                
                
                for(var i = 0; i < json.docs.length; i++)
                {
                    this.isbn.push({isbn: json.docs[i].isbn});
                    const imageResponse = await fetch ('https://openlibrary.org/api/books?bibkeys=ISBN:' + this.isbn[i].isbn[0] + '&jscmd=details&format=json');
                    const imageJson = await imageResponse.json();
                    console.log("Thumbnail!: ", imageJson)
                    this.thumbnail.push({image: imageJson.thumbnail_url});

                }
                console.log("Thumbnail: ", this.thumbnail);
               
                
            }
            catch(error) {
                console.log(error);
            }

        },    
        
        
    
    }


});
