var app = new Vue({
    el: "#app",
    data:{
        search: '',
        searchValue: '',
        loading: false,
        books: {},
        author: [],


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
                for(var i = 0 ; i < 100; i++)
                {
                    this.author[i] = json.docs.author_name[0];
                }
            }
            catch(error) {
                console.log(error);
            }

        },    
        
        
    
    }


});
