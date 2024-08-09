'use client'
import Script from 'next/script';
import { GetSeoData, GetSitemapsList, GetSitemap, GetPagesURL, SaveData, GetSavedData, GetPagePerformance, GetAnalytics, GetSiteInspectionResponse } from './server';
import { useEffect, useState } from 'react';
const dimensions = ["date", "country", "deviceCategory", "pageLocation", "pagePath", "pageTitle"]
const metrics = ["sessions", "screenPageViews", "newUsers", "activeUsers", "engagementRate", "averageSessionDuration", "bounceRate", "conversions", "totalRevenue"]
const dateRanges = {
    startDate: `7daysAgo`, //👈  e.g. "7daysAgo" or "30daysAgo"
    endDate: "today",
};
export default function Admin() {
    const Loading2 = <img src='/images/loading2.gif' style={{ width: '30px', height: '30px', mixBlendMode: 'color-burn' }} alt='Loading...' />;
    const [totalSessions, setTotalSessions] = useState(Loading2);

    const [totalPageViews, setTotalPageViews] = useState(Loading2);

    const [totalUsers, setTotalUsers] = useState(Loading2);

    // const [devices, setDevices] = useState(Loading2);

    // const [sources, setSources] = useState(Loading2);

    const [avgSessionDuration, setAvgSessionDuration] = useState(Loading2);

    const [avgEngagementRate, setAvgEngagementRate] = useState(Loading2);

    const [totalRevenue, setTotalRevenue] = useState(Loading2);

    const [totalClicks, setTotalClicks] = useState(Loading2);

    const [totalImpressions, setTotalImpressions] = useState(Loading2);

    const [avgCTR, setAvgCTR] = useState(Loading2);

    const [avgPosition, setAvgPosition] = useState(Loading2);

    const [totalPages, setTotalPages] = useState(Loading2);

    const [totalPosts, setTotalPosts] = useState(Loading2);

    // const [totalCategories, setTotalCategories] = useState(Loading2);

    useEffect(() => {
        console.log(process.cwd());
        // document.head.appendChild(document.createElement('script')).src = 'https://cdn.plot.ly/plotly-2.29.1.min.js';
        const Plotly = require('plotly.js-dist');
        // (async () => {
        const layout = {
            legend: {
                orientation: 'h',
                y: -0.3
            },
            margin: {
                l: 48,
                r: 48,
                b: 0,
                t: 48,
                pad: 4
            },
            paper_bgcolor: '#f2f2f6',
        };
        const config = { responsive: true, displaylogo: false, modeBarButtonsToRemove: ['sendDataToCloud', 'resetScale2d', 'toggleSpikelines', 'zoom2d', 'select2d', 'lasso2d'] };
        let avgSessionDuration = 0, totalRevenue = 0, totalUsers = 0, totalPageViews = 0, totalSessions = 0, avgEngagementRate = 0;
        let dimensions = ["date"];
        let metrics = ["sessions", "screenPageViews", "newUsers", "activeUsers", "engagementRate", "averageSessionDuration", "totalRevenue"];
        let dateRanges = {
            startDate: "7daysAgo",
            endDate: "today",
        };
        const plotParams = {
            date: [],
            sessions: [],
            pageViews: [],
            newUsers: [],
            activeUsers: [],
            engagementRate: []
        };
        GetAnalytics(dimensions, metrics, dateRanges, '/savedData/trafficChartData.json')
            .then((res) => {
                res = res.sort((a, b) => {
                    return new Date(a.dimensionValues[0].value.slice(0, 4) + '-' + a.dimensionValues[0].value.slice(4, 6) + '-' + a.dimensionValues[0].value.slice(6)) - new Date(b.dimensionValues[0].value.slice(0, 4) + '-' + b.dimensionValues[0].value.slice(4, 6) + '-' + b.dimensionValues[0].value.slice(6));
                  });
                TrafficChart(res, layout, config, plotParams);
            });
        function TrafficChart(res, layout, config, params) {
            for (let dmpair of res) {
                params.date.push(dmpair.dimensionValues[0].value.slice(4, 6) + '/' + dmpair.dimensionValues[0].value.slice(6));
                params.sessions.push(dmpair.metricValues[0].value);
                params.pageViews.push(dmpair.metricValues[1].value);
                params.newUsers.push(dmpair.metricValues[2].value);
                params.activeUsers.push(dmpair.metricValues[3].value);
                params.engagementRate.push((parseFloat(dmpair.metricValues[4].value) * 100).toPrecision(3) + '%');
                totalSessions += parseInt(dmpair.metricValues[0].value);
                totalPageViews += parseInt(dmpair.metricValues[1].value);
                totalUsers += parseInt(dmpair.metricValues[2].value);
                avgEngagementRate += parseFloat(dmpair.metricValues[4].value).toFixed(4) * 100;
                avgSessionDuration += parseFloat(dmpair.metricValues[5].value).toFixed(1) / 60;
                totalRevenue += parseFloat(dmpair.metricValues[6].value).toFixed(1);
            }
            var trace1 = {
                x: params.date,
                y: params.sessions,
                name: 'Sessions',
                type: 'scatter'
            };
            var trace2 = {
                x: params.date,
                y: params.pageViews,
                name: 'Page Views',
                type: 'scatter'
            };
            var trace3 = {
                x: params.date,
                y: params.newUsers,
                name: 'New Users',
                type: 'scatter'
            };
            var trace4 = {
                x: params.date,
                y: params.activeUsers,
                name: 'Active Users',
                type: 'scatter'
            };
            var trace5 = {
                x: params.date,
                y: params.engagementRate,
                name: 'Engagement Rate',
                type: 'scatter'
            };
            var layout = layout;

            var config = config;
            var data = [trace1, trace2, trace3, trace4, trace5];
            document.querySelector('#trafficChart').innerHTML = '';
            Plotly.newPlot('trafficChart', data, layout, config);
            avgSessionDuration = (parseFloat(avgSessionDuration) / res.length).toFixed(1) + ' m';
            avgEngagementRate = (parseFloat(avgEngagementRate) / res.length).toPrecision(3) + '%';
            totalRevenue = '$' + parseFloat(totalRevenue).toFixed(1);
            setTotalSessions(totalSessions);
            setTotalPageViews(totalPageViews);
            setTotalUsers(totalUsers);
            setAvgSessionDuration(avgSessionDuration);
            setAvgEngagementRate(avgEngagementRate);
            setTotalRevenue(totalRevenue);
        }

        dimensions = ["deviceCategory"];
        metrics = ["sessions", "screenPageViews", "activeUsers"];
        GetAnalytics(dimensions, metrics, dateRanges, '/savedData/devicesCardData.json')
            .then((res) => {
                DevicesCard(res);
            });
        function DevicesCard(res) {
            let html = '';
            let html2 = '';
            let active = ' active';
            for (let dmpair of res) {
                html += `<div class="carousel-item${active}" style="height:100px; background-color:var(--color-background-dark);"><div class='h-100 d-flex p-2' style="align-items:center"><div class='h-100'><img style="height:100%" src='https://img.icons8.com/3d-fluency/94/${dmpair.dimensionValues[0].value === 'desktop' ? 'workstation' : dmpair.dimensionValues[0].value === 'mobile' ? 'smartphone-tablet' : dmpair.dimensionValues[0].value === 'mobile' ? 'retro-tv' : 'more--v2'}.png' align='left' alt='${dmpair.dimensionValues[0].value}' /></div><div style="width:100%; text-align:end; font-size:14px; font-weight:bold"><div>Sessions: <span style="color: var(--color-primary)">${dmpair.metricValues[0].value}</span></div><div>Page Views: <span style="color: var(--color-primary)">${dmpair.metricValues[1].value}</span></div><div>Active Users: <span style="color: var(--color-primary)">${dmpair.metricValues[2].value}</span></div></div></div></div>`;

                html2 += `<button type="button" data-bs-target="#carouselExampleDarkDevices" data-bs-slide-to="${res.indexOf(dmpair)}" class="${active}" aria-current="true" aria-label="Slide ${res.indexOf(dmpair) + 1}"></button>`;
                active = '';
            }
            document.querySelector('#carouselExampleDarkDevices .carousel-indicators').innerHTML = html2;
            document.querySelector('#devices').innerHTML = html;
        }

        // dimensions = ["sourceMedium"];
        // metrics = ["sessions", "activeUsers"];
        // GetAnalytics(dimensions, metrics, dateRanges)
        //     .then((res) => {
        //         let html = '';
        //         let html2 = '';
        //         let active = ' active';
        //         for (let dmpair of res) {
        //             html += `<div class="carousel-item${active}" style="height:100px; background-color:var(--color-background-dark);"><div class='h-100 d-flex p-2' style="align-items:center"><div class='h-100'><img style="height:100%" src='https://img.icons8.com/3d-fluency/94/${dmpair.dimensionValues[0].value === 'direct' ? 'direct' : dmpair.dimensionValues[0].value === 'organic' ? 'seo' : dmpair.dimensionValues[0].value === 'referral' ? 'referral' : 'more--v2'}.png' align='left' alt='${dmpair.dimensionValues[0].value}' /></div><div style="width:100%; text-align:end; font-size:14px; font-weight:bold"><div>Sessions: <span style="color: var(--color-primary)">${dmpair.metricValues[0].value}</span></div><div>Active Users: <span style="color: var(--color-primary)">${dmpair.metricValues[1].value}</span></div></div></div></div>`;
        //             html2 += `<button type="button" data-bs-target="#carouselExampleDarkSources" data-bs-slide-to="${res.indexOf(dmpair)}" class="${active}" aria-current="true" aria-label="Slide ${res.indexOf(dmpair) + 1}"></button>`;
        //             active = '';
        //         }
        //         document.querySelector('.carousel-indicators').innerHTML = html2;
        //         document.querySelector('#sources').innerHTML = html;
        //     });

        dimensions = ["pageTitle", "pagePath", "pageLocation"];
        metrics = ["screenPageViews", "activeUsers", "averageSessionDuration", "engagementRate"];
        GetAnalytics(dimensions, metrics, dateRanges, '/savedData/pagesTableData.json')
            .then((res) => {
                res = res.sort((a, b) => {
                    return parseInt(b.metricValues[0].value) - parseInt(a.metricValues[0].value);
                });
                PagesTable(res);
            });
        function PagesTable(res) {
            let table = document.querySelector('#pagesTable table tbody');
            table.innerHTML = '';
            for (let i = 0; i < res.length; i++) {
                let row = document.createElement('tr');
                let th = document.createElement('th');
                th.setAttribute('scope', 'row');
                th.innerHTML = i + 1;
                row.appendChild(th);
                for (let j = 0; j < 3; j++) {
                    let td = document.createElement('td');
                    if (j === 2) {
                        let a = document.createElement('a');
                        a.href = res[i].dimensionValues[j].value;
                        a.target = '_blank';
                        // a.style.color = 'var(--color-success)';
                        a.innerHTML = res[i].dimensionValues[j].value;
                        td.appendChild(a);
                    } else {
                        td.innerHTML = res[i].dimensionValues[j].value;
                    }
                    row.appendChild(td);
                }
                for (let j = 0; j < 4; j++) {
                    let td = document.createElement('td');
                    if (j === 3) {
                        td.innerHTML = (parseFloat(res[i].metricValues[j].value).toFixed(4) * 100).toPrecision(3) + '%';
                    } else if (j === 2) {
                        td.innerHTML = (parseFloat(res[i].metricValues[j].value) / 60).toFixed(1) + ' m';
                    } else {
                        td.innerHTML = res[i].metricValues[j].value;
                    }
                    row.appendChild(td);
                }
                table.appendChild(row);
            }
        }

        const plotParams2 = {
            date: [],
            clicks: [],
            impressions: [],
            ctr: [],
            position: []
        };
        let totalClicks = 0, totalImpressions = 0, avgCTR = 0, avgPosition = 0;
        let domain = 'sc-domain:electricalera.com';
        let scDimensions = ['date'];
        let scRowLimit = 30;
        let startDate = new Date(new Date().valueOf() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-CA');
        let endDate = new Date().toLocaleDateString('en-CA');
        GetSeoData(domain, startDate, endDate, scDimensions, scRowLimit, '/savedData/seoChartData.json')
            .then((res) => {
                SeoChart(res, layout, config, plotParams2);
            });
        function SeoChart(res, layout, config, params) {
            for (let row of res) {
                params.date.push(row.keys[0].split('-').slice(1).join('/'));
                params.clicks.push(row.clicks);
                params.impressions.push(row.impressions);
                params.ctr.push((row.ctr * 100).toPrecision(3) + '%');
                params.position.push(row.position);
                totalClicks += row.clicks;
                totalImpressions += row.impressions;
                avgCTR += row.ctr;
                avgPosition += row.position;
            }
            avgCTR = (avgCTR / res.length * 100).toPrecision(3) + '%';
            avgPosition = (avgPosition / res.length).toPrecision(3);
            var trace1 = {
                x: params.date,
                y: params.clicks,
                name: 'Clicks',
                type: 'scatter'
            };
            var trace2 = {
                x: params.date,
                y: params.impressions,
                name: 'Impressions',
                type: 'scatter'
            };
            var trace3 = {
                x: params.date,
                y: params.ctr,
                name: 'CTR',
                type: 'scatter'
            };
            var trace4 = {
                x: params.date,
                y: params.position,
                name: 'Position',
                type: 'scatter'
            };
            var layout = layout
            var config = config
            var data = [trace1, trace2, trace3, trace4];
            document.querySelector('#seoChart').innerHTML = '';
            Plotly.newPlot('seoChart', data, layout, config);
            setTotalClicks(totalClicks);
            setTotalImpressions(totalImpressions);
            setAvgCTR(avgCTR);
            setAvgPosition(avgPosition);
        }

        scDimensions = ['query', 'page', 'country', 'device'];
        scRowLimit = 100;
        GetSeoData(domain, startDate, endDate, scDimensions, scRowLimit, '/savedData/queryTableData.json')
            .then((res) => {
                res = res.sort((a, b) => {
                    return b.clicks - a.clicks;
                });
                QueryTable(res);
            });
        function QueryTable(res) {
            let table = document.querySelector('#queryTable table tbody');
            table.innerHTML = '';
            for (let i = 0; i < res.length; i++) {
                let row = document.createElement('tr');
                let th = document.createElement('th');
                th.setAttribute('scope', 'row');
                th.innerHTML = i + 1;
                row.appendChild(th);
                let td = document.createElement('td');
                td.innerHTML = res[i].keys[0];
                row.appendChild(td);
                td = document.createElement('td');
                let url = res[i].keys[1];
                let title = url.split('/')[4] ? url.split('/')[4].replace(/-/g, ' ') : url.split('/')[3] === '' ? 'home' : url.split('/')[3].replace(/-/g, ' ');
                title = title.replaceAll(" amp ", " & ");
                title = title.charAt(0).toUpperCase() + title.slice(1) + ' | Electrical Era';
                td.innerHTML = title;
                row.appendChild(td);
                td = document.createElement('td');
                let a = document.createElement('a');
                a.href = url;
                a.target = '_blank';
                a.innerHTML = url;
                td.appendChild(a);
                row.appendChild(td);
                td = document.createElement('td');
                td.innerHTML = res[i].keys[2].toUpperCase();
                row.appendChild(td);
                td = document.createElement('td');
                td.innerHTML = res[i].keys[3];
                row.appendChild(td);
                td = document.createElement('td');
                td.innerHTML = res[i].impressions;
                row.appendChild(td);
                td = document.createElement('td');
                td.innerHTML = res[i].clicks;
                row.appendChild(td);
                td = document.createElement('td');
                td.innerHTML = (res[i].ctr * 100).toPrecision(3) + '%';
                row.appendChild(td);
                td = document.createElement('td');
                td.innerHTML = res[i].position;
                row.appendChild(td);
                table.appendChild(row);
            }
        }

        GetSavedData('/content.json')
            .then((res) => {
                let html = '';
                let html2 = '';
                let content = JSON.parse(res);
                for (let type in content) {
                    html += `<div class="carousel-item${type === 'Shop' ? ' active' : ''}" style="height:100px; background-color:var(--color-background-dark);"><div class='h-100 d-flex p-2' style="align-items:center"><div class='h-100'><img style="height:100%" src='https://img.icons8.com/${type === 'Shop' ? '3d-fluency/94/shop' : type === 'Blogs' ? 'arcade/64/blog' : type === 'News' ? '3d-fluency/94/news' : '3d-fluency/94/more--v2'}.png' align='left' alt='${type}' /></div><div style="width:100%; text-align:end; font-size:14px; font-weight:bold"><div style="font-size: 24px; color: var(--color-primary)">${type}</div><div>Total CATs: <span style="color: var(--color-primary)">${content[type].content.length}</span></div>`;
                    let totalItems = 0;
                    for(let cat of content[type].content) {
                        totalItems += cat.content.length;
                    }
                    html += `<div>Total ${type === 'Shop' ? 'SUBCATs' : 'Posts'}: <span style="color: var(--color-primary)">${totalItems}</span></div></div></div></div>`;

                    html2 += `<button type="button" data-bs-target="#carouselExampleDarkCategories" data-bs-slide-to="${Object.keys(content).indexOf(type)}" class="${type === 'Shop' ? 'active' : ''}" aria-current="true" aria-label="Slide ${Object.keys(content).indexOf(type) + 1}"></button>`;
                }
                document.querySelector('#carouselExampleDarkCategories .carousel-indicators').innerHTML = html2;
                document.querySelector('#categories').innerHTML = html;
            });

        GetPagesURL()
            .then((sitemapData) => {
                let parser = new DOMParser();
                let xmlDoc = parser.parseFromString(sitemapData, "text/xml");
                let urls = xmlDoc.getElementsByTagName('loc');
                urls = Array.from(urls).map((url) => {
                    return url.innerHTML;
                });
                let dates = xmlDoc.getElementsByTagName('lastmod');
                dates = Array.from(dates).map((date) => {
                    return date.innerHTML;
                });
                setTotalPages(urls.length);
                let totalBlogs = urls.filter((url) => {
                    return url.includes('/blogs/') && url !== 'https://electricalera.com/blogs/';
                });
                let totalNews = urls.filter((url) => {
                    return url.includes('/news/') && url !== 'https://electricalera.com/news/';
                });
                setTotalPosts(totalBlogs.length + totalNews.length);
                GetSiteInspectionResponse(domain, urls, dates)
                    .then((res) => {
                        let i = 0;
                        let table = document.querySelector('#urlInspectionTable table tbody');
                        table.innerHTML = '';
                        for (let url of res) {
                            urlInspectionTable(table, url.indexStatusResult.googleCanonical, url, url.firstPublished, i);
                            i++;
                        }
                    });
            });
        function urlInspectionTable(table, url, res, date, i) {
            let row = document.createElement('tr');
            let th = document.createElement('th');
            th.setAttribute('scope', 'row');
            th.innerHTML = i + 1;
            row.appendChild(th);
            let td = document.createElement('td');
            let title = url.split('/')[4] ? url.split('/')[4].replace(/-/g, ' ') : url.split('/')[3] === '' ? 'home' : url.split('/')[3].replace(/-/g, ' ');
            title = title.replaceAll(" amp ", " & ");
            title = title.charAt(0).toUpperCase() + title.slice(1) + ' | Electrical Era';
            td.innerHTML = title;
            row.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = url.split('/')[3] === '' ? 'Home' : url.split('/')[3] === 'blogs' ? 'Blog' : url.split('/')[3] === 'news' ? 'News' : url.split('/')[3] === 'shop' ? 'Shop' : 'Other';
            row.appendChild(td);
            td = document.createElement('td');
            let a = document.createElement('a');
            a.href = url;
            a.target = '_blank';
            a.innerHTML = url;
            td.appendChild(a);
            row.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = date;
            row.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = res.indexStatusResult.coverageState;
            row.appendChild(td);
            td = document.createElement('td');
            a = document.createElement('a');
            a.href = res.inspectionResultLink;
            a.target = '_blank';
            a.innerHTML = res.inspectionResultLink;
            td.appendChild(a);
            row.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = res.performanceScore * 100;
            row.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = res.accessibilityScore * 100;
            row.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = res.bestPracticesScore * 100;
            row.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = res.seoScore * 100;
            row.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = res.pwaScore * 100;
            row.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = res.pageLoadTime;
            row.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = (res.psdata['first-contentful-paint'].score * 100).toPrecision(3) + ' / ' + res.psdata['first-contentful-paint'].val.toFixed(1);
            row.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = (res.psdata['largest-contentful-paint'].score * 100).toPrecision(3) + ' / ' + res.psdata['largest-contentful-paint'].val.toFixed(1);
            row.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = (res.psdata['speed-index'].score * 100).toPrecision(3)+ ' / ' + res.psdata['speed-index'].val.toFixed(1);
            row.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = (res.psdata['total-blocking-time'].score * 100).toPrecision(3) + ' / ' + res.psdata['total-blocking-time'].val.toFixed(1);
            row.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = (res.psdata['cumulative-layout-shift'].score * 100).toPrecision(3) + ' / ' + res.psdata['cumulative-layout-shift'].val.toFixed(1);
            row.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = (res.psdata['interactive'].score * 100).toPrecision(3) + ' / ' + res.psdata['interactive'].val.toFixed(1);
            row.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = (res.potentialSizeSavings / 1000).toFixed(1);
            row.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = res.potentialTimeSavings.toFixed(1);
            row.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = (res.pageSize / 1000).toFixed(1);
            row.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = res.requestCount;
            row.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = res.cssCount;
            row.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = res.jsCount;
            row.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = res.fontCount;
            row.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = 'No Errors';
            if (Object.keys(res.errors).length > 0) {
                td.innerHTML = `<a data-url="${res.indexStatusResult.googleCanonical}" onclick="$store.ShowErrors(event)" href="javascript:void(0)">Show all errors</a>`;
                let html = `<div data-url="${res.indexStatusResult.googleCanonical}" class="DescriptionWrapper error" style="font-size: 14px"><a class="btn closebtn" href="javascript:void(0)" onclick="$store.HideErrors(event)"><img src="/images/close.png" alt="close"></a><div class="accordion" id="accordionExample${i+1}">`;
                for (let cat in res.errors) {
                    html += `<h3 class="pt-4 ps-12">${cat.replace(/-/g, " ").toUpperCase()}</h3>`
                    for (let err in res.errors[cat]) {
                        html += `<div class='accordion-item'><div class='accordion-header' id='heading${cat}${err}'><button class='accordion-button' style='font-size: inherit' type='button' data-bs-toggle='collapse' data-bs-target='#collapse${cat}${err}' aria-expanded='true' aria-controls='collapse${cat}${err}'><b>${err.replace(/-/g, ' ').toUpperCase()}</b> - ${res.errors[cat][err].title}</button></div><div id='collapse${cat}${err}' class='accordion-collapse collapse' aria-labelledby='heading${cat}${err}' data-bs-parent='#accordionExample${i+1}'><div class='accordion-body'>`;
                        for (let item of res.errors[cat][err].items) {
                            for (let key in item) {
                                if (typeof item[key] === 'number') {
                                    item[key] = item[key].toFixed(1);
                                }
                                html += `<div><b>${key}</b>: ${key == 'url' ? '<a href="' + item[key] + '" target="_blank">': ''}${item[key]}${key == 'url' ? '</a>' : ''}</div>`;
                            }
                            html += '<hr/>'
                        }
                        html += `</div></div></div>`;
                    }
                }
                html += '</div></div>';
                document.getElementById('urlInspectionErrors').innerHTML += html;
            }

            row.appendChild(td);
            table.appendChild(row);
        }

        // GetSitemap(domain)
        //     .then((res) => {
        //     });

        // })()
    }, []);
    return (
        <div>
            <h1 className='my-4 active'>Admin Dashboard</h1>
            <section className='row'>
                <h2 id='website-traffic' className='text-center mb-5'>Website Traffic</h2>

                <div className="px-0 col-12 col-lg-8">
                    <Chart id="trafficChart" />

                    <div className="tiles pb-0"><div className="tilesDesign"><div className="inside-tiles" style={{ backgroundColor: "var(--color-background-dark)" }}><div className='customScroll' id="pagesTable" style={{ height: "322px", overflow: "auto" }}>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Page Title</th>
                                    <th scope="col">Page Path</th>
                                    <th scope="col">Page URL</th>
                                    <th scope="col">Page Views</th>
                                    <th scope="col">Users</th>
                                    <th scope='col'>Avg. Duration</th>
                                    <th scope='col'>Engagement Rate</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div></div></div></div>
                </div>
                <div className="pb-0 col-12 col-lg-4 d-flex flex-wrap px-0 tiles">
                    {Card('Total Sessions', 'sessions', 'https://img.icons8.com/3d-fluency/94/monitor.png', totalSessions, 'mt-lg-0')}

                    {Card('Total Page Visits', 'pageViews', 'https://img.icons8.com/3d-fluency/94/visit.png', totalPageViews)}

                    {Card('Total Users', 'totalUsers', 'https://img.icons8.com/3d-fluency/94/guest-male--v1.png', totalUsers)}

                    {SlidingCard('Devices', 'devices', 'https://img.icons8.com/3d-fluency/94/multiple-devices.png', Loading2)}

                    {/* {SlidingCard('Sources', 'sources', Loading2)} */}

                    {Card('Avg. Session Duration', 'avgSessionDuration', 'https://img.icons8.com/3d-fluency/94/time.png', avgSessionDuration, '')}

                    {Card('Engagement Rate', 'engagementRate', 'https://img.icons8.com/3d-fluency/94/combo-chart.png', avgEngagementRate, '')}

                    {Card('Total Revenue', 'revenue', 'https://img.icons8.com/3d-fluency/94/sales-performance.png', totalRevenue, 'mb-0')}
                </div>
            </section>
            <section className='row'>
                <h2 id='content-metrics' className='text-center my-5'>Content Metrics</h2>
                <div className="px-0 col-12 col-lg-8">
                    <Chart id="seoChart" />

                    <div className="tiles pb-0"><div className="tilesDesign"><div className="inside-tiles" style={{ backgroundColor: "var(--color-background-dark)" }}><div className='customScroll' id='queryTable' style={{ height: "322px", overflow: "auto" }}>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope='col'>Query</th>
                                    <th scope="col">Page Title</th>
                                    <th scope="col">Page URL</th>
                                    <th scope='col'>Country</th>
                                    <th scope='col'>Device</th>
                                    <th scope="col">Impressions</th>
                                    <th scope="col">Clicks</th>
                                    <th scope="col">CTR</th>
                                    <th scope="col">Position</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                    </div></div></div>
                </div>

                <div className="px-0 pb-0 col-12 col-lg-4 d-flex flex-wrap tiles">
                    {Card('Total Clicks', 'clicks', 'https://img.icons8.com/3d-fluency/94/mouse-left-click.png', totalClicks, 'mt-lg-0')}

                    {Card('Total Impressions', 'impressions', 'https://img.icons8.com/3d-fluency/94/visible.png', totalImpressions)}

                    {Card('Avg. CTR', 'ctr', 'https://img.icons8.com/3d-fluency/94/nui2--v4.png', avgCTR)}

                    {Card('Avg. Position', 'position', 'https://img.icons8.com/3d-fluency/94/map-pin.png', avgPosition)}

                    {Card('Total Pages', 'totalPages', 'https://img.icons8.com/3d-fluency/94/documents.png', totalPages)}

                    {Card('Total Posts', 'totalPosts', 'https://img.icons8.com/3d-fluency/94/filled-message.png', totalPosts)}

                    {SlidingCard('Categories', 'categories', 'https://img.icons8.com/fluency/96/diversity--v1.png', Loading2, 'mb-0')}
                </div>

                <div className='col-12 tiles'>
                    <div className='customScroll tilesDesign inside-tiles' id="urlInspectionTable" style={{ height: "400px", overflow: "auto" }}>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Page Title</th>
                                    <th scope="col">Page Type</th>
                                    <th scope="col">Page URL</th>
                                    <th scope="col">First Published</th>
                                    <th scope="col">Status</th>
                                    <th scope='col'>Inspection URL</th>
                                    {/* <th scope='col'>Word Count</th>
                                    <th scope='col'>Read Time</th> */}
                                    <th scope='col'>Performance Score</th>
                                    <th scope='col'>Accessibility Score</th>
                                    <th scope='col'>Best Practices Score</th>
                                    <th scope='col'>SEO Score</th>
                                    <th scope='col'>PWA Score</th>
                                    <th scope='col'>Page Load Time (ms)</th>
                                    <th scope='col'>First Contentful Paint Time (Score / Time in ms)</th>
                                    <th scope='col'>Largest Contentful Paint Time (Score / Time in ms)</th>
                                    <th scope='col'>Speed Index Time (Score / Time in ms)</th>
                                    <th scope='col'>Total Blocking Time (Score / Time in ms)</th>
                                    <th scope='col'>Cumulative Layout Shift (Score / Value)</th>
                                    <th scope='col'>Time to Interactive (Score / Time in ms)</th>
                                    <th scope='col'>Potential Size Savings (KiB)</th>
                                    <th scope='col'>Potential Time Savings (ms)</th>
                                    <th scope='col'>Page Size (KiB)</th>
                                    <th scope='col'>Total Requests</th>
                                    <th scope='col'>CSS Count</th>
                                    <th scope='col'>JS Count</th>
                                    <th scope='col'>Font Count</th>
                                    <th scope='col'>Errors</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            <div id='urlInspectionErrors'></div>
            <Script type="text/javascript" src="/js/main.js"></Script>
        </div>
    )
}

function Chart({ id }) {
    return (
        <div className="tiles"><div className="tilesDesign"><div className="inside-tiles" style={{ backgroundColor: "var(--color-background-dark)" }}><div id={id} style={{ height: "500px" }}><div className='text-center h-100 d-grid' style={{ alignItems: 'center', color: 'var(--color-primary-dark)' }}><div><p>Loading, please wait!</p><img src='/images/loading2.gif' style={{ width: '50px', height: '50px', mixBlendMode: 'color-burn' }} alt='Loading...' /></div></div></div></div></div></div>
    )
}

function Card(name, id, icon, val, extraClass = '') {
    return (
        <div className={'col-12 col-sm-6 col-md-4 col-lg-12 px-12 my-12 mx-auto ' + extraClass}>
            <div className='inside-tiles tilesDesign p-12' style={{ height: "100px", backgroundColor: "var(--color-background-dark)", display: "flex", alignItems: "center" }} id={id}>
                <div>
                    <img style={{ height: "100%" }} src={icon} align="left" alt={name} />
                </div>
                <div style={{ width: "100%", textAlign: "end" }}>
                    <div className='metrics'>{val}</div>
                    <b style={{ fontSize: "14px" }}>{name}</b>
                </div>
            </div>
        </div>
    )
}

function SlidingCard(name, id, icon, val, extraClass = '') {
    return (
        <div id={"carouselExampleDark" + name} className={"carousel carousel-dark slide carousel-fade col-12 col-sm-6 col-md-4 col-lg-12 px-12 my-0 mx-auto " + extraClass} style={{ backgroundColor: "transparent", border: "none", minHeight: "100px" }} data-bs-ride="carousel">
            <div className="carousel-indicators d-none"></div>
            <div className="carousel-inner tilesDesign inside-tiles my-12" id={id}>
                <div className='d-flex px-12' style={{ alignItems: "center" }}>
                    <div>
                        <img style={{ height: "100%" }} src={icon} align="left" alt={name} />
                    </div>
                    <div style={{ width: "100%", textAlign: "end" }}>
                        {val}
                        <br/>
                        <b style={{ fontSize: "14px" }}>{name}</b>
                    </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target={"#carouselExampleDark" + name} data-bs-slide="prev">
                <span className="carousel-control-prev-icon" style={{ width: "20px" }} aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target={"#carouselExampleDark" + name} data-bs-slide="next">
                <span className="carousel-control-next-icon" style={{ width: "20px" }} aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}