import fs from 'fs'
import path from 'path'
import { DataDirPath, ImageDirPath } from '../../layout';
export async function generateStaticParams() {
    const posts = fs.readdirSync(path.join(DataDirPath, 'blogs'), function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        return files
    })
    return posts.map((post) => ({
        slug: post.replace(/\.json$/, ''),
    }))
}
export async function generateMetadata({ params }) {
    // read route params
    const slug = params.slug
    // fetch data
    const post = JSON.parse(fs.readFileSync(path.join(DataDirPath + '/blogs', slug + '.json'), 'utf8', function (err, data) {
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
    const url = `/blogs/${slug}/`
    var image = `/images/blogs/${slug}/1.jpg`; 
    var type = 'image/jpg';
    if(fs.existsSync(path.join(ImageDirPath + '/blogs', slug + '/1.gif')) === true){ image = `/images/blogs/${slug}/1.gif`; type = 'image/gif'; }
    // return metadata
    return {
        title,
        description,
        alternates: {
            canonical: url,
        },
        keywords,
        openGraph: {
            type: 'article',
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

export default function BlogPost({ params }) {
    const { slug } = params
    const data = JSON.parse(fs.readFileSync(path.join(DataDirPath + '/blogs', slug + '.json'), 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        return data
    }));
    const html = { __html: data.text };
    return (
        <div className="BlogNewsContent">
            <small>Posted on {data.date}</small>
            <div dangerouslySetInnerHTML={html}></div>
        </div>
    )
    // ...
}