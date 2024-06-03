import UserAgent from 'user-agents';
import puppeteer from 'puppeteer';
// import puppeteer from 'puppeteer-core';
import checkInternetConnected from 'check-internet-connected';
export async function FetchProducts(keywords, pages, sort, quantity) {
    const maxProducts = quantity;
    const Products = [];
    if (maxProducts > 0) {
        const browser = await puppeteer.launch({
            headless: 'new',
            args: [`--window-size=1280,720`],
            ignoreDefaultArgs: ['--enable-automation'],
            executablePath: 'C:\\Program Files\\Google\\Chromium\\chrome.exe',
        });
        const proxy = [];
        if (Array.isArray(keywords) === false) { keywords = [keywords]; }
        for (var keyword of keywords) {
            var internet = false;
            var index = 0;
            while (index < 100 && internet !== true) {
                const Config = {
                    timeout: 5000,
                    retries: 1,
                    domain: 'google.com'
                }
                checkInternetConnected(Config)
                    .then(() => {
                        internet = true;
                    }).catch((error) => {
                        internet = false;
                        console.log("waiting for internet connection...");
                    });
                await new Promise(r => setTimeout(r, 3000 * index));
                index++;
            }
            if (internet === false) { console.log("Moving to the next keyword due to internet connection timeout"); continue; }
            else {
                keyword = keyword.replace(/ /g, '+');
                console.log('\n***************************** Crawling for ' + keyword.replace(/\+/g, " ") + ' *****************************\n')
                const page = await browser.newPage();
                const userAgent = new UserAgent({
                    deviceCategory: 'desktop'
                });
                console.log(userAgent.toString());
                // var proxyindex = Math.floor(Math.random() * proxy.length);
                try {
                    await page.setViewport({ width: userAgent.data.viewportWidth, height: userAgent.data.viewportHeight });
                    await page.setCacheEnabled(false);
                    await page.setJavaScriptEnabled(true);
                    await page.setDefaultNavigationTimeout(60000)
                    await page.setDefaultTimeout(60000)
                    await page.setUserAgent(userAgent.toString());
                    await page.goto(`https://www.amazon.com/s?k=${keyword}&s=${sort}&_encoding=UTF8&ref=pd_gw_unk`, { waitUntil: 'networkidle2' });
                    var delay = Math.floor(Math.random() * 3000) + 2000;
                    var pagetitle = await page.$eval('title', el => el.textContent);
                    await new Promise(r => setTimeout(r, delay));
                    if (pagetitle.includes('Sorry! Something went wrong!')) {
                        await page.click('input[placeholder="Search"]');
                        await new Promise(r => setTimeout(r, 2000));
                        await page.type('input[placeholder="Search"]', keyword.replace(/\+/g, ' '), { delay: 200 });
                        await new Promise(r => setTimeout(r, 2000));
                        await page.click('input[type="submit"][value="Go"]');
                        await page.waitForNavigation({ waitUntil: 'networkidle2' });
                        await new Promise(r => setTimeout(r, 2000));
                    }
                    const Asins = [];
                    for (var k = 0; k < pages; k++) {
                        const asins = await page.$$eval('div.s-matching-dir div[data-asin][data-component-type="s-search-result"]', as => as.map(a => a.getAttribute('data-asin')));
                        // const products = await page.$$('div.s-matching-dir div[data-asin][data-component-type="s-search-result"] span[data-component-type="s-product-image"] a.a-link-normal');
                        var itempages = [];
                        var n = 0;
                        var tochange = true;
                        var initialAsins = asins.length;
                        for (const asin of asins) {
                            if (n === initialAsins - 1 && tochange === true) { initialAsins = asins.length; tochange = false; }
                            if (itempages.length > 4) {
                                await new Promise(r => setTimeout(r, 15000));
                            }
                            if (!Asins.includes(asin) && Products.length < maxProducts + 200) {
                                (async (itempages, asin, asins, Products, browser, page, n, initialAsins) => {
                                    const itempage = await browser.newPage()
                                    try {
                                        itempages.push(itempage);
                                        console.log(`\item: ${n + 1}   Total items: ${asins.length}   Added items: ${Products.length}   Opened tabs: ${itempages.length}   Page: ${k + 1}   Asin: ${asin}   Keyword: ${keyword.replace(/\+/g, " ")}\n`);
                                        await itempage.goto(`https://www.amazon.com/dp/${asin}`, { waitUntil: 'domcontentloaded' });
                                        await new Promise(r => setTimeout(r, 1000));
                                        var image = await itempage.$$eval('ul .imgTagWrapper img', as => as.map(a => a.getAttribute('src')));
                                        const data = await itempage.evaluate((asin, image) => {
                                            try {
                                                if (document.querySelector('#outOfStock .a-text-bold')) {
                                                    var availability = document.querySelector('#outOfStock .a-text-bold').textContent.trim();
                                                }
                                                else if (document.querySelector('#deliveryBlockMessage .a-color-error')) {
                                                    var availability = document.querySelector('#deliveryBlockMessage .a-color-error').textContent.trim();
                                                }
                                                else if (document.querySelector('#availability>span')) {
                                                    var availability = document.querySelector('#availability>span').textContent.trim();
                                                }
                                                else if (document.querySelector('#aod-offer-price .aod-delivery-promise-column')) {
                                                    var availability = document.querySelector('#aod-offer-price .aod-delivery-promise-column').textContent.trim();
                                                }
                                                else {
                                                    var availability = undefined;
                                                }

                                                if (document.querySelector('#corePriceDisplay_desktop_feature_div .a-price .a-offscreen')) {
                                                    var price = document.querySelector('#corePriceDisplay_desktop_feature_div .a-price .a-offscreen').textContent.trim();
                                                }
                                                else if (document.querySelector('#price_inside_buybox')) {
                                                    var price = document.querySelector('#price_inside_buybox').textContent.trim();
                                                }
                                                else if (document.querySelector('#aod-offer-price .a-offscreen')) {
                                                    var price = document.querySelector('#aod-offer-price .a-offscreen').textContent.trim();
                                                }
                                                else {
                                                    var price = undefined;
                                                }

                                                if (document.querySelector('div.zg-badge-wrapper i')) {
                                                    var tag = document.querySelector('div.zg-badge-wrapper i').textContent.trim();
                                                }
                                                else if (document.querySelector('span.ac-badge-rectangle')) {
                                                    var tag = document.querySelector('span.ac-badge-rectangle').textContent.trim();
                                                }
                                                else {
                                                    var tag = '';
                                                }

                                                if (document.querySelector('#productDescription')) {
                                                    var description = document.querySelector('#productDescription').textContent.trim();
                                                }
                                                else if (document.querySelector('#feature-bullets')) {
                                                    var description = document.querySelector('#feature-bullets').textContent.trim();
                                                }
                                                else if (document.querySelector('.bundle-comp-bullets')) {
                                                    var description = document.querySelector('.bundle-comp-bullets').textContent.trim();
                                                }
                                                else {
                                                    var description = undefined;
                                                }

                                                if (document.querySelector('#corePriceDisplay_desktop_feature_div .savingPriceOverride')) {
                                                    var saving = document.querySelector('#corePriceDisplay_desktop_feature_div .savingPriceOverride').textContent.trim();
                                                }
                                                else if (document.querySelector('#aod-offer-price .centralizedApexPriceSavingsOverrides')) {
                                                    var saving = document.querySelector('#aod-offer-price .centralizedApexPriceSavingsOverrides').textContent.trim();
                                                }
                                                else {
                                                    var saving = '';
                                                }

                                                if (image.length === 0) {
                                                    image = document.querySelector('#aod-image-0');
                                                    if (image !== null) {
                                                        image = image.getAttribute('src');
                                                    }
                                                    else {
                                                        image = undefined;
                                                    }
                                                }
                                                
                                                if(document.querySelector('#productTitle')){
                                                    var title = document.querySelector('#productTitle').textContent.trim();
                                                }

                                                if (document.querySelector('#acrPopover>span>a>span')) {
                                                    var rating = document.querySelector('#acrPopover>span>a>span').textContent.trim();
                                                }

                                                if (document.querySelector('#acrCustomerReviewText')) {
                                                    var reviews = document.querySelector('#acrCustomerReviewText').textContent.trim();
                                                }
                                                return {
                                                    asin: asin,
                                                    title: title,
                                                    price: price,
                                                    saving: saving,
                                                    rating: rating,
                                                    reviews: reviews,
                                                    image: image,
                                                    availability: availability,
                                                    tag: tag,
                                                    description: description,
                                                };
                                            } catch (error) {
                                                console.log(`\n---- An error occured while attempting to fetch item ${asin} --> ${error} ----\n`);
                                                itempage.close();
                                                itempages.splice(0, 1);
                                                return undefined;
                                            }
                                        }, asin, image
                                        );
                                        if (data) {
                                            if (data.title && data.price && data.availability && data.image && data.rating && data.price !== "$" && !data.availability.toLowerCase().includes("unavailable") && !data.availability.toLowerCase().includes("out of stock") && parseFloat(data.rating.split(" ")[0]) >= 4.0 && parseInt(data.reviews.split(" ")[0].replace(/,/g, "")) > 400) {
                                                if (!data.price.includes("$")) { data.price = '$' + data.price; }
                                                if (data.availability.includes('This data cannot be shipped to your selected delivery location')) { data.availability = "In Stock"; }
                                                data.title = data.title.replace(/"/g, "&quot;");
                                                if (data.tag === undefined) { data.tag = "Recommended"; }
                                                Products.push(data);
                                            }
                                            if (n < initialAsins && asins.length < 121) {
                                                var relatedCount = await itempage.$$eval('div#sp_detail .a-carousel-page-max', as => as.map(a => a.textContent.trim()));
                                                relatedCount = parseInt(relatedCount[0]);
                                                for (var i = 0; i < relatedCount; i++) {
                                                    const relatedAsins = await itempage.$$eval('div#sp_detail .a-carousel-card div[id^="sp_detail"][data-asin]', as => as.map(a => a.getAttribute('data-asin')));
                                                    for (const relatedAsin of relatedAsins) {
                                                        if (!asins.includes(relatedAsin)) {
                                                            asins.push(relatedAsin);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        await new Promise(r => setTimeout(r, 1000));
                                        await itempage.close();
                                        itempages.splice(0, 1);
                                    } catch (error) {
                                        console.log(`\n---- An error occured while attempting to add item ${asin} --> ${error} ----\n`);
                                        await itempage.close();
                                        itempages.splice(0, 1);
                                    }
                                })(itempages, asin, asins, Products, browser, page, n, initialAsins);
                                Asins.push(asin);
                            }
                            n++;
                            var delay = Math.floor(Math.random() * 2000) + 1500;
                            await new Promise(r => setTimeout(r, delay));
                        }
                        while (itempages.length !== 0) {
                            await new Promise(r => setTimeout(r, 5000));
                        }
                        try {
                            await new Promise(r => setTimeout(r, 1000));
                            await page.click('a.s-pagination-item.s-pagination-next.s-pagination-button');
                            await page.waitForSelector('div.s-matching-dir div[data-asin][data-component-type="s-search-result"]');
                        } catch (error) {
                            console.log(`\n---- An error occured while attempting to click next page ${error} ----\n`);
                            break;
                        }
                    }

                    await new Promise(r => setTimeout(r, 1000));
                    await page.close();
                } catch (error) {
                    console.log(`\n---- An error occured while attempting to add products   ${error} ----\n`);
                    await page.close();
                }
                var delay = Math.floor(Math.random() * 2000) + 5000;
                await new Promise(r => setTimeout(r, delay));
            }
        }
        await browser.close();
    }
    return Products;
}


// import UserAgent from 'user-agents';
// import checkInternetConnected from 'check-internet-connected';
// import * as cheerio from 'cheerio';
// import axios from 'axios';
// const BASE_URL = 'https://www.amazon.com';
// export async function FetchProducts(keywords, page, sort, quantity) {
//     var internet = false;
//     var index = 0;
//     while (index < 100 && internet !== true) {
//         const Config = {
//             timeout: 5000,
//             retries: 1,
//             domain: 'google.com'
//         }
//         checkInternetConnected(Config)
//             .then(() => {
//                 internet = true;
//             }).catch((error) => {
//                 internet = false;
//                 console.log("waiting for internet connection...");
//             });
//         await new Promise(r => setTimeout(r, 3000 * index));
//     }
//     if (internet === true) {
//         const Products = [];
//         for (var keyword of keywords) {
//             keyword = keyword.replace(/ /g, "+");
//             const userAgent = new UserAgent({
//                 deviceCategory: 'desktop'
//             });
//             console.log(userAgent.toString());
//             for (var i = 1; i <= page; i++) {
//                 // console.log(await(await axios.get(`${BASE_URL}/s?k=${keyword}&s=${sort}&page=${i}`, {
//                 //     headers: {
//                 //         "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
//                 //         'User-Agent': userAgent.toString(),
//                 //     },
//                 // })).data);
//                 try {
//                     var $ = cheerio.load(await (await axios.get(`${BASE_URL}/s?k=${keyword}&s=${sort}&page=${i}`, {
//                         headers: {
//                             "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
//                             'User-Agent': userAgent.toString(),
//                         },
//                     })).data);
//                     const products = $('div.s-matching-dir div[data-asin][data-component-type="s-search-result"]');
//                     for (const product of products) {
//                         const element = $(product);
//                         const asin = element.attr('data-asin');
//                         $ = cheerio.load(await (await axios.get(`${BASE_URL}/dp/${asin}`, {
//                             headers: {
//                                 "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
//                                 'User-Agent': userAgent.toString(),
//                             },
//                         })).data);
//                         var availability = $('#outOfStock .a-text-bold').text().trim();
//                         if (availability === "" || !availability) { availability = $('#deliveryBlockMessage .a-color-error').text().trim(); }
//                         if (availability === "" || !availability) { availability = $('#availability>span').text().trim(); }
//                         if (availability === "" || !availability) { availability = $('#aod-offer-price .aod-delivery-promise-column').first().text().trim(); }
//                         if (availability === "") { availability = undefined; }
//                         var price = $('#corePriceDisplay_desktop_feature_div .a-offscreen').first().text().trim();
//                         if (price === "" || !price) { price = $('#price_inside_buybox').first().text().trim(); }
//                         if (price === "" || !price) { price = $('#aod-offer-price .a-offscreen').first().text().trim(); }
//                         if (price === "") { price = undefined; }
//                         var tag = $('div.zg-badge-wrapper i').text().trim();
//                         if (tag === "" || !tag) { tag = $('span.ac-badge-rectangle').text().trim(); }
//                         var description = $('#productDescription').text().trim();
//                         if (description === "" || !description) { description = $('#feature-bullets').text().trim(); }
//                         if (description === "" || !description) { description = $('.bundle-comp-bullets').text().trim(); }
//                         var saving = $('#corePriceDisplay_desktop_feature_div .savingPriceOverride').first().text().trim();
//                         if (saving === "" || !saving) { saving = $('#aod-offer-price .centralizedApexPriceSavingsOverrides').first().text().trim(); }
//                         var image = $("#imgTagWrapperId>img").attr('src')
//                         if (image === "" || !image) { image = $('#aod-image-0').attr('src'); }
//                         if (image === "" || !image) { image = undefined; }
//                         Products.push({
//                             title: $('#productTitle').text().trim(),
//                             price: price,
//                             saving: saving,
//                             rating: $('#acrPopover>span>a>span').first().text().trim(),
//                             reviews: $('#acrCustomerReviewText').first().text().trim(),
//                             image: image,
//                             availability: availability,
//                             tag: tag,
//                             description: description,
//                             asin: asin,
//                         });
//                         await new Promise(r => setTimeout(r, 2000));
//                     }
//                 } catch (error) {
//                     console.log(`\n---- An error occured while attempting to add products   ${error} ----\n`);
//                 }
//             }
//         }
//         console.log(Products);
//         return Products;
//     }
// }