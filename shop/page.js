import fs from 'fs'
import path from 'path'
import { DataDirPath } from '../layout';
import { ContentFilePath } from '../layout';

const title = 'Shop | Electrical Era'
const description = 'Discover a curated selection of the latest cutting-edge electronics, household appliances, and accessories designed to elevate your everyday living, making your life smarter, more efficient, and enjoyable.'
const keywords = ['shop', 'electronics', 'appliances', 'accessories', 'smart', 'efficient', 'enjoyable', 'curated', 'selection', 'cutting-edge', 'latest', 'everyday', 'living', 'life', 'smarter', 'more', 'efficient', 'enjoyable', 'Electrical Era', 'Electric Era', 'Electric Era Tech', 'Electric Era Technology']
const url = '/shop/'
const image = '/images/robot.png'
export const metadata = {
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
        type: 'image/png',
      },
    ],
  },
}

export default function Shop() {
  var html = '';
  const res = JSON.parse(fs.readFileSync(ContentFilePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    return data
  }));
  for (const cat of res.Shop.content) {
    var cathtml = '';
    for (const subcat of cat.content) {
      const data = JSON.parse(fs.readFileSync(path.join(DataDirPath + '/shop', subcat.url + '.json'), 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        return data
    }));
      cathtml += '<div class="px-0 mx-auto col-12 col-sm-6 col-md-4 col-lg-6"><div class="tiles"><div class="tilesDesign"><div class="inside-tiles"><img width="100%" src="/images/shop/' + subcat.url + '/1.jpg" alt="' + subcat.name + '"><div class="blogText"><strong>' + subcat.name + '</strong><p>' + subcat.description + '</p></div><a href="/shop/' + subcat.url + '/" class="tileBtn btn btn-outline-dark">Show More</a></div></div><small id="' + subcat.url + '-date" class="float-start">' + data.count + ' Products</small><small id="' + subcat.url + '-count" class="float-end">Updated on ' + data.date + '</small></div></div>';
    }
    html += '<section class="row pt-5"><h2 id="' + cat.url + '" class="text-center">' + cat.name + '</h2><p>' + cat.description + '</p>' + cathtml + '</section>';
  }
  const mainContent = { __html: html };
  return (
    <div dangerouslySetInnerHTML={mainContent} />
  )
}