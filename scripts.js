var app = new Vue({
    el: "#app",
    data:{
        search: '',
        searchValue: '',
        loading: false,
        current: {},
        formattedResponse: '',
        


    },


    mounted() {
        this.submit();
    },


    methods:{
        async submit() {
            let searchVal = this.search;
            while(searchVal.search(' ') !== -1 ){
                searchVal = searchVal.replace(' ', "+");
                this.searchValue = searchVal;
            }
            formattedResponse = '';

            try {
                this.loading = true;
                const response = await axios.get( 'http://openlibrary.org/search.json?q=' + this.search);
                this.current = response.data.docs;
                this.loading = false;
                console.log("response:  ", response);
            }
            catch(error) {
                console.log(error);
            }

            for(i = 0; i < 100; i++){
                let resposne = '';
                response += "<div>";
                response += "<h3> " + current[i].author_key[0] + "</h3>";
                //response += "<p> " +
                response += "</div>";

                formattedResponse += response;
            }

        },    
        
        
    
    }


});
