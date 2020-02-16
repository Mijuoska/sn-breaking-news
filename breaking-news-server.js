(function () {

    // if user input is not provided, select source as configured in options
    if (!input) {
        data.news_source = options.news_sources;
    } else {
        data.news_source = input.news_source;
    }
    // Getting a list of all sources
    data.sources = getSources();

    // Get news for a selected source	
    var source = data.news_source;
    var news = getNews(source, 10);
    data.articles = news;

    function getSources() {
        try {
            var r = new sn_ws.RESTMessageV2();
            r.setEndpoint('https://newsapi.org/v2/sources');
            r.setHttpMethod('get');
            r.setQueryParameter('apiKey', gs.getProperty('newsapi.api.key')); // sys_property holding the api key
            var response = r.execute();
            var responseBody = response.getBody();
            var httpStatus = response.getStatusCode();

            var json = JSON.parse(responseBody);

            return json.sources;

        } catch (ex) {
            var message = ex.message;
            console.log(message)
        }

    }

    function getNews(source, pagesize) {
        try {
            var r = new sn_ws.RESTMessageV2();
            r.setEndpoint('https://newsapi.org/v2/top-headlines');
            r.setHttpMethod('get');
            r.setQueryParameter('apiKey', gs.getProperty('newsapi.api.key')); // sys_property holding the api key
            r.setQueryParameter('sources', source)
            r.setQueryParameter('pageSize', pagesize);
            var response = r.execute();
            var responseBody = response.getBody();
            var httpStatus = response.getStatusCode();

            var json = JSON.parse(responseBody);

            return json.articles;


        } catch (ex) {
            var message = ex.message;
            console.log(message);
        }

    }
})();