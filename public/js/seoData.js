import gapi from "gapi-client";

export function FetchSeoData(siteUrl, startDate, endDate, dimensions = ["date"]) {
    authenticate().then(loadClient).then(execute(siteUrl, startDate, endDate, dimensions));
}

function authenticate(){
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/webmasters https://www.googleapis.com/auth/webmasters.readonly"})
        .then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });
}

function loadClient() {
    gapi.client.setApiKey(process.env.GOOGLE_SC_API_KEY);
    return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/searchconsole/v1/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
}

function execute(siteUrl, startDate, endDate, dimensions = ["date"]) {
    return gapi.client.searchanalytics.query({
        "siteUrl": siteUrl,
        "resource": {
            "startDate": startDate,
            "endDate": endDate,
            "dimensions": dimensions
        }
        })
            .then(function(response) {
                    // Handle the results here (response.result has the parsed body).
                    console.log("Response", response);
                },
                function(err) { console.error("Execute error", err); });
}

gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: process.env.GOOGLE_SC_CLIENT_ID});
});