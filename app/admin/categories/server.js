'use server'
import fs from 'fs'
import {DataDirPath, ContentFilePath} from '../../../layout'

export async function AddCategory(prevState, formData) {
    const cat = formData.get('name');
    const url = formData.get('slug');
    const type = formData.get('type');
    const description = formData.get('description');
    const keywords = formData.get('keywords') || '';
    var Subcat = [];
    if (type === 'shop') {
        for (let i = 1; i < parseInt(formData.get('subcategory-num')) + 1; i++) {
            Subcat.push({
                name: formData.get(`subcategory${i}-name`),
                url: formData.get(`subcategory${i}-slug`),
                description: formData.get(`subcategory${i}-description`),
                necessary: formData.get(`subcategory${i}-necessary`).split(',') || [""],
                subsubcat: []
            })
            for (let j = 1; j < parseInt(formData.get(`subsubcategory${i}-num`)) + 1; j++) {
                Subcat[i - 1].subsubcat.push({
                    name: formData.get(`subsubcategory${j}ofsubcat${i}-name`),
                    url: formData.get(`subsubcategory${j}ofsubcat${i}-slug`),
                    description: formData.get(`subsubcategory${j}ofsubcat${i}-description`),
                    fetchkeywords: formData.get(`subsubcategory${j}ofsubcat${i}-fetchkeywords`).split(',') || [""],
                    filterkeyword: formData.get(`subsubcategory${j}ofsubcat${i}-filterkeywords`).split(',') || [""],
                    dontInclude: formData.get(`subsubcategory${j}ofsubcat${i}-dontInclude`).split(',') || [""],
                })
            }
        }
    }
    if (cat !== "" && url !== "" && description !== "" && type !== "") {
        const links = fs.readFileSync(DataDirPath + '/links.json', "utf-8");
        const Links = JSON.parse(links);
        let index = 0;
        var toPlace = "";
        var Type = ""
        if (type === "blogs") { toPlace = "newscat"; Type = "blogcat" }
        else if (type === "news") { toPlace = "news"; Type = "newscat" }
        else if (type === "shop") { toPlace = "blogcat"; Type = "shopcat" }

        for (let i = 0; i < Links.AllLinks.length; i++) {
            if (Links.AllLinks[i].type === toPlace) {
                Links.AllLinks.splice(i, 0, {
                    type: Type,
                    url: url,
                    name: cat,
                });
                index = i + 1;
                break
            }
        }
        let Content = {
            name: cat,
            url: url,
            type: type,
            description: description,
            content: []
        }
        const fetchproducts = {};
        if (type === "shop") {
            for (let i = 0; i < Subcat.length; i++) {
                let subcat = Subcat[i];
                var arr = cat.split(" ");
                for (var k = 0; k < arr.length; k++) {
                    arr[k] = arr[k].charAt(0).toUpperCase() + arr[k].slice(1);
                }
                arr = arr.join(" ");
                Links.AllLinks.splice(index, 0, {
                    type: "shopsubcat",
                    cat: arr,
                    url: `${url}/${subcat.url}`,
                    name: subcat.name,
                })
                index++;
                Content.content.push({
                    name: subcat.name,
                    url: subcat.url,
                    category: url,
                    description: subcat.description
                });
                let data = {
                    name: subcat.name,
                    url: subcat.url,
                    category: url,
                    necessary: subcat.necessary,
                    description: subcat.description,
                    keywords: keywords,
                    content: []
                };
                fetchproducts[subcat.url] = [];
                for (let j = 0; j < Subcat[i].subsubcat.length; j++) {
                    let subsubcat = Subcat[i].subsubcat[j];
                    Links.AllLinks.splice(index, 0, {
                        type: "shopsubsubcat",
                        cat: arr,
                        subcat: subcat.name,
                        url: `${url}/${subcat.url}#${subsubcat.url}`,
                        name: subsubcat.name,
                    })
                    index++;
                    data.content.push({
                        name: subsubcat.name,
                        url: subsubcat.url,
                        category: subcat.url,
                        dontInclude: subsubcat.dontInclude,
                        keyword: subsubcat.filterkeyword,
                        description: subsubcat.description,
                        content: []
                    });
                    for (let k = 0; k < subsubcat.fetchkeywords.length; k++) {
                        fetchproducts[subcat.url].push({
                            cat: subsubcat.url,
                            keyword: subsubcat.fetchkeywords[k]
                        })
                    }
                }
                fs.writeFileSync(DataDirPath + `/shop/${subcat.url}.json`, JSON.stringify(data, null));
            }
        }
        fs.writeFileSync(DataDirPath + `/links.json`, JSON.stringify(Links, null));
        var fetchproductsfilecontent = JSON.parse(fs.readFileSync(DataDirPath + `/fetchproducts.json`, "utf-8"));
        fetchproductsfilecontent[url] = fetchproducts;
        fs.writeFileSync(DataDirPath + `/fetchproducts.json`, JSON.stringify(fetchproductsfilecontent, null));
        const content = fs.readFileSync(ContentFilePath, "utf-8");
        const res = JSON.parse(content);
        if (type === "blogs") { res.Blogs.content.push(Content) }
        else if (type === "news") { res.News.content.push(Content) }
        else if (type === "shop") { res.Shop.content.push(Content) }
        res.Shop.content.push(Content);
        fs.writeFileSync(ContentFilePath, JSON.stringify(res, null));
        console.log("Done");
    }
    return {
        message: 'Category Added Successfully',
    }
}

export async function getHTML() {
    var html = '';
    const res = JSON.parse(fs.readFileSync(ContentFilePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        return data
    }));
    for (const contenttype in res) {
        var cathtml = '';
        const ctype = res[contenttype]
        if (ctype.name === 'BLOGS') { ctype.name = 'BLOG' }
        for (const category in ctype.content) {
            const cat = ctype.content[category]
            if (cat.description.length > 130) {
                cat.description = cat.description.substring(0, 130) + '...';
            }
            
            cathtml += '<div class="px-0 mx-auto"><div class="tiles"><a class="row" href="/' + cat.type + '#' + cat.url + '"><div class="d-none d-sm-block col-sm-3 col-md-2 px-0 px-sm-3" style="border-radius: 10px 0 0 10px"><img width="100%" height="100%" style="object-fit:cover" src="/images/categories/' + cat.url + '/1.jpg" alt="' + cat.name + '" /></div><div class="col-12 col-sm-9 col-md-10 px-0 px-sm-auto"><strong>' + cat.name + '</strong><p>' + cat.description + '</p><small style="position:absolute;bottom:12px;padding:0">Updated on ' + cat.date + '</small></div></a></div></div>';
        }
        if(ctype.id === 'blogs') { ctype.id = 'blog' }
        html += '<section class="pt-5"><h2 id="' + ctype.id + '-categories" class="text-center">' + ctype.name + ' CATEGORIES</h2>' + cathtml + '<div class="mt-3 text-center"><a class="btn btn-outline-dark w-50" onclick="$store.ShowAddCategoryForm(\'' + ctype.id + '\')">Add Category</a></div></section>';
    }
    return { __html: html };
}