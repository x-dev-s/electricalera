import fs from 'fs'
import { ContentFilePath } from './layout';

export const metadata = {
  title: "Home | Electrical Era",
}

export default function Home() {
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
    for (const category in ctype.content) {
      const cat = ctype.content[category]
      cathtml += '<div class="px-0 mx-auto col-12 col-sm-6 col-md-4 col-lg-6"><div class="tiles"><div class="tilesDesign"><div class="inside-tiles"><img width="100%" src="/images/categories/' + cat.url + '/1.jpg" alt="' + cat.name + '"><div class="blogText"><strong>' + cat.name + '</strong><p>' + cat.description + '</p></div><a href="/' + cat.type + '#' + cat.url + '" class="tileBtn btn btn-outline-dark">Show More</a></div></div><small>Updated on ' + cat.date + '</small></div></div>';
    }
    html += '<section class="row pt-5"><h2 id="' + ctype.id + '" class="text-center">' + ctype.name + '</h2><p>' + ctype.headline + '</p>' + cathtml + '</section>';
  }
  const mainContent = { __html: html };
  return (
    <div dangerouslySetInnerHTML={mainContent} />
  )
}