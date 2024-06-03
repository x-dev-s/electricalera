import fs from 'fs'
import { ContentFilePath } from '../layout';

const title = 'Blog | Electrical Era'
const description = 'Your ultimate guide to the latest innovations, gadgets, and trends shaping our digital world.'
const keywords = ['blog', 'innovations', 'gadgets', 'trends', 'digital', 'world', 'Electrical Era', 'Electric Era', 'Electric Era Tech', 'Electric Era Technology']
const url = '/blogs/'
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

export default function Blogs() {
  var html = '';
  const res = JSON.parse(fs.readFileSync(ContentFilePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    return data
  }));
  for (const cat of res.Blogs.content) {
    var cathtml = '';
    for (const post of cat.content) {
      cathtml += '<div class="px-0 mx-auto col-12 col-sm-6 col-md-4 col-lg-6"><div class="tiles"><div class="tilesDesign"><div class="inside-tiles"><img width="100%" src="/images/blogs/' + post.url + '/1.jpg" alt="' + post.name + '"><div class="blogText"><strong>' + post.name + '</strong><p>' + post.description + '</p></div><a href="/blogs/' + post.url + '/" class="tileBtn btn btn-outline-dark">Read More</a></div></div><small>Posted on ' + post.date + '</small></div></div>';
    }
    html += '<section class="row pt-5"><h2 id="' + cat.url + '" class="text-center">' + cat.name + '</h2><p>' + cat.description + '</p>' + cathtml + '</section>';
  }
  const mainContent = { __html: html };
  return (
    <div dangerouslySetInnerHTML={mainContent} />
  )
}