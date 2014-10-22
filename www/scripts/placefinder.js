var placefinder = {

    endpoint: "https://query.yahooapis.com/v1/public/yql",

    requestIsoCountryCode: function(latitude, longitude, yqlCallbackName) {
        var query = "select countrycode from geo.placefinder where text='"
                + latitude + "," + longitude
                + "' and gflags='R'",
            url = this.endpoint
                + "?q=" + query
                + "&format=json"
                + "&callback=" + yqlCallbackName;

        this.importScript(url);
    },

    importScript: function(scriptSource) {
        var script = document.createElement("script");
        script.onerror = function(event) {
            throw new URIError("The script " + event.target.src + " is not accessible.");
        };
        document.head.appendChild(script);
        script.src = scriptSource;
    }

};