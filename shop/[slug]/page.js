import fs from 'fs'
import path from 'path'
import { DataDirPath, ImageDirPath } from '../../layout';
export async function generateStaticParams() {
    const subcats = fs.readdirSync(path.join(DataDirPath, 'shop'), function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        return files
    })
    return subcats.map((subcat) => ({
        slug: subcat.replace(/\.json$/, ''),
    }))
}

export async function generateMetadata({ params }) {
    // read route params
    const slug = params.slug
    // fetch data
    const post = JSON.parse(fs.readFileSync(path.join(DataDirPath + '/shop', slug + '.json'), 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        return data
    }));
    const title = post.name + ' | Electrical Era'
    const description = post.description
    var keys = post.keywords.split(',')
    if(!keys.includes('Electrical Era')){keys.push('Electrical Era')}
    if(!keys.includes('Electric Era')){keys.push('Electric Era')}
    if(!keys.includes('Electric Era Tech')){keys.push('Electric Era Tech');keys.push('Electric Era Technology')}
    const keywords = keys
    const url = `/shop/${slug}/`
    var image = `/images/shop/${slug}/1.jpg`; 
    var type = 'image/jpg';
    if(fs.existsSync(path.join(ImageDirPath + '/shop', slug + '/1.gif')) === true){ image = `/images/shop/${slug}/1.gif`; type = 'image/gif'; }
    // return metadata
    return {
        title,
        description,
        alternates: {
            canonical: url,
        },
        keywords,
        openGraph: {
            type: 'website',
            locale: 'en_US',
            url,
            title,
            description,
            images: [
                {
                    url: image,
                    alt: title,
                    width: 800,
                    height: 600,
                    type,
                },
            ],
        },
    }
}

export default function ShopCat({ params }) {
    const { slug } = params
    const Shop = { products: [] }
    const res = JSON.parse(fs.readFileSync(path.join(DataDirPath + '/shop', slug + '.json'), 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        return data
    }));
    var html = '';
    for (const cat of res.content) {
        var Asin = []
        var cathtml = '';
        if (cat.content.length === 0) { continue; }
        for (const item of cat.content) {
            if (!Asin.includes(item.asin)) {
                var Saving = '';
                var Tag = '';
                let Rating = item.rating.split(' ')[0];
                if (item.title.length > 60) { var title = item.title.substring(0, 60) + "..."; }
                else { var title = item.title; }
                if (item.saving) { Saving = ' <span style="color: var(--color-primary-dark)">(' + item.saving + ')</span>'; }
                if (item.tag) { Tag = ' <span class="ProductTag position-relative">' + item.tag + '</span>'; }

                cathtml += '<div id="' + item.asin + '" class="mx-auto col-6 col-sm-4 col-md-3 col-lg-4 product"><div title="' + item.title + '" class="ProductLink"><small class="ProductTag">' + item.tag + '</small><small class="ProductSaving">' + item.saving + '</small><img src="' + item.image + '" alt="' + title + '"><div class="ProductName">' + title + '</div><div class="ProductPrice pt-2">' + item.price + '</div><div class="ProductRating">' + Rating + ' out of 5 stars</div><div class="ProductReviews">' + item.reviews + '</div><a target="_blank" class="tileBtn btn btn-outline-dark" onclick="$store.ShowDescription(\'' + item.asin + '\')">Learn More</a></div></div><div id="' + item.asin + '-description" class="DescriptionWrapper row"><div class="col-6"><div class="ProductDescriptionDiv"><div><img class="ProductImage" src="' + item.image + '" alt="' + item.title + '"></div><a class="btn btn-outline-dark mt-3" href="https://www.amazon.com/dp/' + item.asin + '?&tag=electricalera-20&language=en_US&ref_=as_li_ss_tl" target="_blank">Shop Now</a></div></div><div class="col-6"><a id="icon" class="btn" onclick="$store.HideDescription(\'' + item.asin + '\')"><img src="/images/close.png" alt="close"></a><h1 class="ProductTitle pt-3 pt-sm-0" style="font-size:22px;text-align:left">' + item.title + '</h1><div class="ProductPrice">' + item.price + Saving + Tag + '</div><div class="ProductRating">' + item.rating + ' out of 5 stars <b style="font-size:24px">.</b> <span>' + item.reviews + '</span></div><div class="ProductAvailability">' + item.availability + '</div><h6 class="mt-3">Product Description</h6><p class="ProductDescription">' + item.description + '</p></div></div>';
                Asin.push(item.asin);
                Shop.products.push({ asin: item.asin, title: item.title, price: item.price, rating: item.rating, image: item.image, saving: item.saving });
            }
        }
        html += '<div id="' + cat.url + '" class="ProductSubCatDiv"><h2 id="' + cat.url + '-heading" class="text-center">' + cat.name + '</h2><p>' + cat.description + '</p><div id="' + cat.url + '-products" class="row">' + cathtml + '</div></div>';
    }
    fs.writeFileSync(path.join(DataDirPath, 'shop.json'), JSON.stringify(Shop), 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
    }
    );
    const mainContent = { __html: html };
    return (
        <div>
            <div id="productSearch" className="pt-3">
                <input id="searchProducts" className="form-control" type="search" placeholder="Search Products" aria-label="Search Products" />
                <div id="productSearchContent" className="rounded"></div>
            </div>
            <div dangerouslySetInnerHTML={mainContent}></div>
        </div>
    )
}