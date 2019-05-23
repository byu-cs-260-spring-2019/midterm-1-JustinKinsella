var app = new Vue({
    el: "#app",
    data:{
        search: '',
        searchValue: '',
        loading: true,
        current: {},

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

            try {
                this.loading = true;
                const response = await axios.get( 'http://openlibrary.org/search.json?q=' + this.search);
                this.current = response.data;
                this.loading = false;
                console.log("response:  ", response.data);
                return true;

            }
            catch(error) {
                console.log(error);
            }
        },           
    
    }


});
