import fs from 'fs'
import { ContentFilePath } from '../layout';

const title = 'News | Electrical Era'
const description = 'Stay informed with the latest news, trends, and advancements from the dynamic world of technology, where innovation and disruption unfold at a breathtaking pace.'
const keywords = ['news', 'trends', 'advancements', 'dynamic', 'world', 'technology', 'innovation', 'disruption', 'breathtaking', 'pace', 'Electrical Era', 'Electric Era', 'Electric Era Tech', 'Electric Era Technology']
const url = '/news/'
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

export default function News() {
  var html = '';
  const res = JSON.parse(fs.readFileSync(ContentFilePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    return data
  }));
  for (const cat of res.News.content) {
    var cathtml = '';
    for (const post of cat.content) {
      cathtml += '<div class="px-0 mx-auto col-12 col-sm-6 col-md-4 col-lg-6"><div class="tiles"><div class="tilesDesign"><div class="inside-tiles"><img width="100%" src="/images/news/' + post.url + '/1.jpg" alt="' + post.name + '"><div class="blogText"><strong>' + post.name + '</strong><p>' + post.description + '</p></div><a href="/news/' + post.url + '/" class="tileBtn btn btn-outline-dark">Read More</a></div></div><small>Posted on ' + post.date + '</small></div></div>';
    }
    html += '<section class="row pt-5"><h2 id="' + cat.url + '" class="text-center">' + cat.name + '</h2><p>' + cat.description + '</p>' + cathtml + '</section>';
  }
  const mainContent = { __html: html };
  return (
    <div dangerouslySetInnerHTML={mainContent} />
  )
}