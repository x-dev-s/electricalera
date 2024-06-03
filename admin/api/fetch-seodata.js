require('dotenv').config();
const searchConsole = require('@googleapis/searchconsole');

export function FetchSeoData(siteUrl = 'sc-domain:electricalera.com', startDate = '2023-05-01', endDate = '2023-12-31', dimensions = ['date'], rowLimit = 50) {
    const auth = new searchConsole.auth.GoogleAuth({
        credentials: {
            private_key: process.env.GA_PRIVATE_KEY.replace(/\\n/g, '\n'),
            client_email: process.env.GA_CLIENT_EMAIL,
        },
        scopes: [
            'https://www.googleapis.com/auth/webmasters',
        ],
    });
    const client = searchConsole.searchconsole({
        version: 'v1',
        auth,
    });
    const res = client.searchanalytics
        .query({
            siteUrl: siteUrl,
            startDate: startDate,
            endDate: endDate,
            dimensions: dimensions,
            rowLimit: rowLimit,
        })
        return res.then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
        });
}

export function TestUrl(url, siteUrl = 'https://electricalera.com') {
    const auth = new searchConsole.auth.GoogleAuth({
        credentials: {
            private_key: process.env.GA_PRIVATE_KEY.replace(/\\n/g, '\n'),
            client_email: process.env.GA_CLIENT_EMAIL,
        },
        scopes: [
            'https://www.googleapis.com/auth/webmasters',
        ],
    });
    const client = searchConsole.searchconsole({
        version: 'v1',
        auth,
    });
    const res = client.urlTestingTools.mobileFriendlyTest.run({
        requestBody: {
            url: url,
            requestScreenshot: true,
        },
    });
    console.log(res);
    res.then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error);
    });
}

export function InspectUrl(url, siteUrl = 'sc-domain:electricalera.com') {
    const auth = new searchConsole.auth.GoogleAuth({
        credentials: {
            private_key: process.env.GA_PRIVATE_KEY.replace(/\\n/g, '\n'),
            client_email: process.env.GA_CLIENT_EMAIL,
        },
        scopes: [
            'https://www.googleapis.com/auth/webmasters',
        ],
    });
    const client = searchConsole.searchconsole({
        version: 'v1',
        auth,
    });
    const res = client.urlInspection.index.inspect({
        requestBody: {
            inspectionUrl: url,
            siteUrl: siteUrl,
            languageCode: 'en-US',
        }
    });
    return res.then((response) => {
        return response.data.inspectionResult;
    }).catch((error) => {
        console.log(error);
    });
}

export function FetchSitemapsList(siteUrl = 'sc-domain:electricalera.com') {
    const auth = new searchConsole.auth.GoogleAuth({
        credentials: {
            private_key: process.env.GA_PRIVATE_KEY.replace(/\\n/g, '\n'),
            client_email: process.env.GA_CLIENT_EMAIL,
        },
        scopes: [
            'https://www.googleapis.com/auth/webmasters',
        ],
    });
    const client = searchConsole.searchconsole({
        version: 'v1',
        auth,
    });
    const res = client.sitemaps.list({
        siteUrl: siteUrl,
    });
    return res.then((response) => {
        return response.data;
    }).catch((error) => {
        console.log(error);
    });
}

export function FetchSitemap(siteUrl = 'sc-domain:electricalera.com', feedpath = 'https://electricalera.com/sitemap.xml') {
    const auth = new searchConsole.auth.GoogleAuth({
        credentials: {
            private_key: process.env.GA_PRIVATE_KEY.replace(/\\n/g, '\n'),
            client_email: process.env.GA_CLIENT_EMAIL,
        },
        scopes: [
            'https://www.googleapis.com/auth/webmasters',
        ],
    });
    const client = searchConsole.searchconsole({
        version: 'v1',
        auth,
    });
    const res = client.sitemaps.get({
        siteUrl: siteUrl,
        feedpath: feedpath,
    });
    return res.then((response) => {
        return response.data;
    }).catch((error) => {
        console.log(error);
    });
}