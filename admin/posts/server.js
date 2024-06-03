'use server'
import fs from 'fs'
import { ContentFilePath, DataDirPath, ImageDirPath } from '../../layout';
import { FetchProducts } from '../../admin/api/fetch-products';

export async function AddPost(prevState, formData) {
    const name = formData.get('title');
    const url = formData.get('slug');
    const type = formData.get('type');
    const category = formData.get('category');
    const description = formData.get('description');
    const keywords = formData.get('keywords') || '';
    const productsearch = formData.get('adkeywords').split(",") || [];
    const necessary = formData.get('necessary').split(",") || [];
    const quantity = parseInt(formData.get('quantity'));
    const text = formData.get('html');

    if (name !== "" && url !== "" && type !== "" && category !== "" && description !== "" && text !== "") {
        if(productsearch[0] !== "") {
        var products = await FetchProducts(productsearch, 10, "", 100);
        }
        else {
            var products = [];
        }
        var ads = [];
        var Text = text;
        var raw = [];
        for (var n = 0; n < raw.length; n++) {
            var item = raw[n];
            var includes = false;
            var reviewCount = 0;
            if (item.reviews) {
                reviewCount = item.reviews.split(" ")[0];
                reviewCount = reviewCount.replace(/,/g, "");
                reviewCount = parseInt(reviewCount);
            }
            for (var p = 0; p < necessary.length; p++) {
                if (item.title.toLowerCase().includes(necessary[p])) { includes = true; break; }
                // else if (item.title.toLowerCase().includes(necessary)) { includes = true; break; }
            }
            if (includes === true && !products.find((product) => product.asin == item.asin && !item.availability.includes("left in stock - order soon."))) {
                products.push(item);
            }
        }
        products = products.sort((a, b) => parseFloat(b.reviews.split(' ')[0].replace(/,/g, "")) - parseFloat(a.reviews.split(' ')[0].replace(/,/g, "")));
        products = products.slice(0, quantity);
        console.log(products);
        if (products.length < 3) { ads = products; products = []; }
        const date = new Date();
        let day = date.getDate();
        let year = date.getFullYear();
        let month = date.getMonth();
        if (month === 0) { month = 'January' } else if (month === 1) { month = 'February' } else if (month === 2) { month = 'March' } else if (month === 3) { month = 'April' } else if (month === 4) { month = 'May' } else if (month === 5) { month = 'June' } else if (month === 6) { month = 'July' } else if (month === 7) { month = 'August' } else if (month === 8) { month = 'September' } else if (month === 9) { month = 'October' } else if (month === 10) { month = 'November' } else if (month === 11) { month = 'December' }
        const content = fs.readFileSync(ContentFilePath, "utf-8");
        const res = JSON.parse(content);
        for (const key in res) {
            if (key.toLowerCase() === type) {
                for (var i = 0; i < res[key].content.length; i++) {
                    const cat = res[key].content[i].name;
                    if (cat.includes(category)) {
                        res[key].content[i].date = `${month} ${day}, ${year}`;
                        var data = res[key].content[i].content;
                        const obj = {
                            name: name,
                            url: url,
                            date: `${month} ${day}, ${year}`,
                            description: description
                        };
                        data.splice(0, 0, obj);
                        fs.writeFileSync(ContentFilePath, JSON.stringify(res, null));
                    }
                }
            }
        }
        const links = fs.readFileSync(DataDirPath + `/links.json`, "utf-8");
        const linksRes = JSON.parse(links);
        if (type !== "shop") {
            const obj = {
                type: type,
                url: url,
                name: name,
                date: `${month} ${day}, ${year}`,
                description: description
            };
            linksRes.LatestLinks.push(obj);
            if (linksRes.LatestLinks.length > 8) { linksRes.LatestLinks.shift(); }
        }
        const Obj = {
            type: type,
            url: url,
            name: name
        };
        linksRes.AllLinks.push(Obj);
        fs.writeFileSync(DataDirPath + `/links.json`, JSON.stringify(linksRes, null));
        var index = Text.indexOf('</p>', Text.indexOf('<h2 '));
        for (var i = 0; i < ads.length; i++) {
            const item = ads[i];
            if (i === 1) {
                for (var j = 0; j < 2; j++) { index = Text.indexOf('<h2 ', index); index = Text.indexOf('</p>', index); }
            }
            Text = Text.slice(0, index) + `</p><div class=\"container-fluid\"><div style=\"border:1px solid var(--color-dark);position:relative\" class=\"row mb-2\"><div class=\"col-3\"><a href=\"${item.image}\" target=\"_blank\"><img style=\"object-fit:contain\" src=\"${item.image}\" width=\"100%\" height=\"100%\" alt=\"${item.title}\"></a></div><div class=\"col-9\"><b>${item.title}</b><p class=\"pt-5\" style=\"color:var(--color-primary)\">${item.price} <span style=\"color:var(--color-primary-dark)\"></span><br>Rated ${item.rating} out of 5 stars<br>${item.reviews}<br>${item.tag}</p><div style=\"position:absolute;bottom:1rem;right:1rem;background-color:var(--color-light)\"><a href=\"https://www.amazon.com/dp/${item.asin}?&tag=electricalera-20&language=en_US&ref_=as_li_ss_tl\" target=\"_blank\" class=\"btn btn-outline-dark\">Buy Now</a></div></div></div></div>` + Text.slice(index + 4);
        }
        const postObj = {
            name: name,
            date: `${month} ${day}, ${year}`,
            description: description,
            keywords: keywords,
            productsearch: productsearch,
            necessary: necessary,
            quantity: quantity,
            text: Text,
            Ads: products
        };
        fs.writeFileSync(DataDirPath + `/${type}/${url}.json`, JSON.stringify(postObj, null));
        const path = ImageDirPath + `/${type}/${url}`;
        fs.access(path, (error) => {
            if (error) {
                fs.mkdir(path, (error) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("New Directory created successfully !!");
                    }
                });
            } else {
                console.log("Given Directory already exists !!");
            }
        });
    }

    return {
        message: 'Post Added Successfully',
    }
}

export async function getHTML() {
    var html = '<section id="blogSection" class="pt-3"><h1 class="text-center mb-0" style="color:var(--color-primary-dark); font-size: 36px">BLOG POSTS</h1>';
    const res = JSON.parse(fs.readFileSync(ContentFilePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        return data
    }));
    for (const cat of res.Blogs.content) {
        var cathtml = '';
        for (const post of cat.content) {
            if (post.description.length > 130) {
                post.description = post.description.substring(0, 130) + '...';
            }
            
            cathtml += '<div class="px-0 mx-auto"><div class="tiles"><a class="row" href="/blogs/' + post.url + '/"><div class="d-none d-sm-block col-sm-3 col-md-2 px-0 px-sm-3" style="border-radius: 10px 0 0 10px"><img width="100%" height="100%" style="object-fit:cover" src="/images/blogs/' + post.url + '/1.jpg" alt="' + post.name + '" /></div><div class="col-12 col-sm-9 col-md-10 px-0 px-sm-auto"><strong>' + post.name + '</strong><p>' + post.description + '</p><small style="position:absolute;bottom:12px;padding:0">Posted on ' + post.date + '</small></div></a></div></div>';
        }
        html += '<section class="pt-5"><h2 id="' + cat.url + '" class="text-center">' + cat.name + '</h2>' + cathtml + '<div class="mt-3 text-center"><a class="btn btn-outline-dark w-50" onclick="$store.ShowAddPostForm(\'' + cat.name + '\',\'blogs\')">Add Post</a></div></section>';
    }
    html += '</section><section id="newsSection" class="pt-3"><h1 class="text-center mb-0" style="color:var(--color-primary-dark); font-size: 36px">NEWS ARTICLES</h1>';
    for (const cat of res.News.content) {
        var cathtml = '';
        for (const post of cat.content) {
            if (post.description.length > 130) {
                post.description = post.description.substring(0, 130) + '...';
            }
            cathtml += '<div class="px-0 mx-auto"><div class="tiles"><a class="row" href="/news/' + post.url + '/"><div class="d-none d-sm-block col-sm-3 col-md-2 px-0 px-sm-3" style="border-radius: 10px 0 0 10px"><img width="100%" height="100%" style="object-fit:cover" src="/images/news/' + post.url + '/1.jpg" alt="' + post.name + '" /></div><div class="col-12 col-sm-9 col-md-10 px-0 px-sm-auto"><strong>' + post.name + '</strong><p>' + post.description + '</p><small style="position:absolute;bottom:12px;padding:0">Posted on ' + post.date + '</small></div></a></div></div>';
        }
        html += '<section class="pt-5"><h2 id="' + cat.url + '" class="text-center">' + cat.name + '</h2>' + cathtml + '<div class="mt-3 text-center"><a class="btn btn-outline-dark w-50" onclick="$store.ShowAddPostForm(\'' + cat.name + '\',\'news\')">Add Post</a></div></section>';
    }
    html += '</section>';
    return { __html: html };
}