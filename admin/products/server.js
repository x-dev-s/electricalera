'use server'
import fs from 'fs'
import { ContentFilePath, DataDirPath, ImageDirPath } from '../../layout';
import { FetchProducts } from '../../admin/api/fetch-products';

export async function UpdateProducts(prevState, formData) {
    const category = formData.get('category');
    const pages = formData.get('pages');
    const sort = formData.get('sort');
    const quantity = formData.get('quantity');
    const subcategories = formData.getAll('subcategory');
    console.log(category, quantity, subcategories);
    const res = JSON.parse(fs.readFileSync(DataDirPath + '/fetchproducts.json', 'utf8'))
    for (const cat in res) {
        for (const subcat in res[cat]) {
            const subsubcats = res[cat][subcat];
            if (subcat === category) {
                var ads = [];
                var catdate = '';
                for (let subcategory of subcategories) {
                    var count = 0;
                    var keywords = [];
                    for (const subsubcat of subsubcats) {
                        if (subsubcat.cat === subcategory) {
                            keywords = keywords.concat(subsubcat.keyword.replace(/-/g, '+'));
                        }
                    }
                    console.log(keywords);
                    const Products = await FetchProducts(keywords, pages, sort, quantity);
                    const date = new Date();
                    let Dated = date.getDate();
                    let Year = date.getFullYear();
                    let Month = date.getMonth();
                    const data = fs.readFileSync(DataDirPath + `/shop/${subcat}.json`, "utf-8")
                    const Json = JSON.parse(data);
                    if (Month === 0) { Month = 'January' } else if (Month === 1) { Month = 'February' } else if (Month === 2) { Month = 'March' } else if (Month === 3) { Month = 'April' } else if (Month === 4) { Month = 'May' } else if (Month === 5) { Month = 'June' } else if (Month === 6) { Month = 'July' } else if (Month === 7) { Month = 'August' } else if (Month === 8) { Month = 'September' } else if (Month === 9) { Month = 'October' } else if (Month === 10) { Month = 'November' } else if (Month === 11) { Month = 'December' }
                    Json.date = `${Month} ${Dated}, ${Year}`;
                    catdate = Json.date;
                    var necessary = Json.necessary;
                    var content = Json.content;
                    var dontInclude = Json.content;
                    for (var l = 0; l < content.length; l++) {
                        if (subcategory === content[l].url) {
                            var products = [];
                            var raw = Products;
                            for (var n = 0; n < raw.length; n++) {
                                var item = raw[n];
                                var includes = false;
                                var reviewCount = 0;
                                if (item.reviews) {
                                    reviewCount = item.reviews.split(" ")[0];
                                    reviewCount = reviewCount.replace(/,/g, "");
                                    reviewCount = parseInt(reviewCount);
                                }
                                for (var o = 0; o < content[l].keyword.length; o++) {
                                    for (var p = 0; p < necessary.length; p++) {
                                        if (item.title && item.title.toLowerCase().includes(content[l].keyword[o]) && item.title.toLowerCase().includes(necessary[p])) { includes = true; break; }
                                        // else if (item.description && item.description.toLowerCase().includes(content[l].keyword[k]) && item.title.toLowerCase().includes(necessary)) { includes = true; break; }
                                        for (var m = 0; m < dontInclude.length; m++) {
                                            if (item.title.includes(dontInclude)) { includes = false; break; }
                                        }
                                    }
                                }
                                if (!products.find((product) => product.asin == item.asin) && includes === true) {
                                    products.push(item);
                                }
                            }
                            products.sort((a, b) => parseFloat(b.reviews.split(' ')[0].replace(/,/g, "")) - parseFloat(a.reviews.split(' ')[0].replace(/,/g, "")));
                            if (products.length > quantity) {
                                products = products.slice(0, quantity);
                            }
                            products.sort(function (a, b) {
                                let x = a.title.toLowerCase();
                                let y = b.title.toLowerCase();
                                if (x < y) { return -1; }
                                if (x > y) { return 1; }
                                return 0;
                            });
                            content[l].content = products;
                            console.log(raw.length + " Products Found")
                            console.log(products.length + " Products Added")
                        }
                        count += content[l].content.length;
                        ads = ads.concat(content[l].content);
                    }
                    Json.count = count;
                    ads = ads.sort((a, b) => parseFloat(b.reviews.split(' ')[0].replace(/,/g, "")) - parseFloat(a.reviews.split(' ')[0].replace(/,/g, "")));
                    ads = ads.slice(0, 10);
                    Json.Ads = ads;
                    fs.writeFileSync(DataDirPath + `/shop/${subcat}.json`, JSON.stringify(Json, null));
                }
                const Data = fs.readFileSync(ContentFilePath, "utf-8");
                const res = JSON.parse(Data);
                for (var i = 0; i < res.Shop.content.length; i++) {
                    if (res.Shop.content[i].url.includes(cat)) {
                        res.Shop.content[i].date = catdate;
                        fs.writeFileSync(ContentFilePath, JSON.stringify(res, null));
                    }
                }
            }
        }
    }
    return {
        message: 'Products Updated Successfully',
    }
}

export async function getHTML() {
    var html = '';
    fs.readdirSync(DataDirPath + '/shop').forEach(file => {
        var cat = JSON.parse(fs.readFileSync(DataDirPath + `/shop/${file}`, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            return data
        }));
        var cathtml = '';
        for (const subcat of cat.content) {
            var subcathtml = '';
            if(subcat.content.length === 0){ subcathtml = '<div class="text-center" style="color:var(--color-primary-dark)"><b>No Products in this category</b></div>'}
            for (const item of subcat.content) {
                subcathtml += '<div class="px-0 mx-auto col-12 col-sm-6 col-lg-4"><div class="tiles"><a class="row" href="https://www.amazon.com/dp/' + item.asin + '/?tag=electricalera-20"><div class="d-none d-sm-block col-sm-3 col-md-3 px-0 px-sm-3" style="border-radius: 10px 0 0 10px"><div style="height:100%;display:flex;align-items:center"><img width="100%" style="object-fit:contain;max-height:130px" src="' + item.image + '" alt="' + item.title + '" /></div></div><div class="col-12 col-sm-9 col-md-9 px-0 px-sm-auto"><strong>' + item.title + '</strong><p style="color:var(--color-primary); font-size:12px"><b>' + item.price + ' <span style="color:var(--color-primary-dark)"></span><br>Rated ' + item.rating + ' out of 5 stars<br>' + item.reviews + '<br>' + item.tag + '</b></p></div></a></div></div>';
            }
            cathtml += '<div class="text-center pt-5"><h2 subsubcat="' + subcat.url + '">' + subcat.name + '</h2><p>' + subcat.description + '</p></div><div class="row">' + subcathtml + '</div>';
        }
        html += '<section class="pt-5" category=' + cat.category + '><h1 id="' + cat.url + '" class="text-center mb-0" style="color:var(--color-primary-dark); font-size: 36px">' + cat.name + '</h1>' + cathtml + '<div class="mt-3 text-center"><small style="padding:24px 0">Updated on ' + cat.date + '</small><br/><a class="btn btn-outline-dark w-50" onclick="$store.ShowUpdateProductsForm(\'' + cat.url + '\',event)">Update Products</a></div></section>';
    });
    return { __html: html };
}