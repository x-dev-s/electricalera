import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
// import { RouteChangeListener } from '../app/route-change';
import { Inter } from 'next/font/google'
import fs from 'fs'
import path from 'path'
import Script from 'next/script'
import { env } from 'node:process';
env.NEXT_OUTPUT_MODE = "export";
env.GA_PROPERTY_ID = "394476930";
env.GA_CLIENT_EMAIL = "google-analytics@ga4-electricalera.iam.gserviceaccount.com";
env.GA_PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCVB6+rECz7RkM5\nlEZLO5mCwATknKnp7kHzJTrVETMJb8/emjZmRQDV0Wqq0mPOlvOnaQJNPc+m9kyI\n4hjtPp+gCSns3b62ymCYHisjjJ051YHsujiVFSJRLcAUsZ9AlkJ07rr2uaB2iaHY\nHGHaAekwGCnOqxvDTgt7blF+km0x1HCJ33DKug/hhBR7SftgTt+mfH9RmhPBuV4Q\nXuaoGmqcKF9KBOoPkYufrNeuo3HXHOOyPeybK10VGau2UBf5xL0OtTOC+bhW0YIk\njf3H/rgcbpPAodr1zqiWpJ1lfMKc8oCTgMU9HyI3t95/sezbglbJfO9Kafg1vR3O\n+J2Wkm7RAgMBAAECggEAD8dSTVOHW6xPAknlXmJHSM1hRz4iDEtGTsLGlZf+VhWx\nRcGAmHfeVIUZXNAtMoqPbg5jaL+uXGBP7p83oejDOEu4FWTN5CcNrpVlHlytKdol\n6SU3R+uGqF8matp6gLlX/G7pOyWgrGQ6jznED3Or14R7aq75n8ZD13Pw62x/5KpO\nvCfo7Eq+eCvDT3JF6DJZ/ZjVJzYNZyBKX5EOgMsJHwhr+lrHZ0dj/n1LJ65x5afq\no8okXsjoya0XAA8L03RN3rBV5St/kjcWklPRoVWPmo0LJ89PTioE6PYuc5svxTsl\nRkGKIy3D9ppvQyNuhyqN3yZ71ZgSnGDagfCgaEIR9QKBgQDN0HVwINF+OLHpbq2W\nhEwzY+2tWYQxshKAVJnwP2feh3W1N2qQHhDAO5CZhlHyzeaA+AwJOpj9fWcFpUEf\noBep+Oc0GA+bp1ota4JvuYNcMSpu7cJe3ua7NAR5Jct8Mk19SA3ZkYeUXjaT3+uZ\now/+7rE/OBqNjB0LJCZk6uoGHQKBgQC5XpWUvZXcYfdZWmGEIzwG/nw8FaYNZ8Hk\nJizMgK1imZbkTNAF4K/aLkx1ULkcYIU1YsqM+5mvXTAlsAZeaLSnUTvWieHGN0I/\ne+y0IpBROYqHzEeIEAgbBi8CMarlm+3encHztuKek6ik6S/mrIpllxmb5+wSQa1S\neWoxxoudRQKBgQCtV54hkzJ+SYfmoDYJqGF5gvdiYhuJs34LobWJeA2miZZky0iw\nGvJmxYQzGcMZabty8fdJKpZCIYVMZvOjjDWCDcXExWMX6Op1iK/yI1/0nOAtT4i+\nWKQiFVyTIHbyondLRg2MKhrzpin3f8exvXmycBzOrxUGFHU9tfO0WXpDLQKBgQCd\nbVCHs8LUGXchsXpj6DCQmAwWUyRk+htWkX02aInX1Syq0vlQJJP0LaHNeDLdgLNg\ntXfj58GLhw7e0vF1uGLEPl8dQpg16LQgijRqf3glI0MdNUYCrerUWJoPuPK0cYrA\npyYSvt0TY7+z3j5KH3qh8INVPs/kaVazVl3zy/TCKQKBgE9v2MKt6oMIKKDOXajk\ngNI5F1odLEC3WWlDfIdo1Ch0v8rO6/HwUmaETCxuWNWJotV2gIKkccyMdvpCgENk\nNjKLh0q/eRq9d2XTgYqWrbCn6JqppciYJGbXHLy+da/mZAHOnOkqENggR29DdHhV\nROh+RFA+Ihiz7SC7U/Ngsiuc\n-----END PRIVATE KEY-----\n";
env.GOOGLE_SC_API_KEY = "AIzaSyBjS-YHJlss3lIvOxEqF_UM5t8R0x6jx08";
env.GOOGLE_SC_CLIENT_ID = "168218014779-jmfd3ntmqnsmrjeig716n9h2et23p5ib.apps.googleusercontent.com";
env.PROJECT_API_KEY = "AIzaSyBjS-YHJlss3lIvOxEqF_UM5t8R0x6jx08";
// export const dynamic = 'auto'
// export const dynamicParams = true
// export const revalidate = false
// export const fetchCache = 'auto'
// export const runtime = 'nodejs'
// export const preferredRegion = 'auto'
// export const maxDuration = 5
export const ImageDirPath = path.join(process.cwd(), 'public/images');
export const DataDirPath = path.join(process.cwd(), 'public/data');
export const ContentFilePath = path.join(process.cwd(), 'public/data/content.json');
export const Loading1 = <img src='/images/loading.gif' style={{ width: '30px', height: '30px' }} alt='Loading...' />
export const Loading2 = <img src='/images/loading2.gif' style={{ width: '30px', height: '30px', mixBlendMode: 'color-burn' }} alt='Loading...' />
const inter = Inter({ subsets: ['latin'] })

const title = 'Electrical Era'
const description = 'Your Source for the Latest Trends and Innovations in the Electrical Industry.'
const keywords = ['Electrical Era', 'Electric Era', 'Electric Era Technologies', 'Electronics', 'Apparel', 'Fashion', 'Technology', 'Electrical', 'Era', 'Electrical Era Blog', 'Electrical Era News', 'Electrical Era Shop']
const url = '/'
const image = '/images/robot.png'
export const metadata = {
  metadataBase: new URL('https://electricalera.com'),
  title,
  description,
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
  twitter: {
    card: 'summary_large_image',
    site: '@_electricalera_',
    siteId: '1669381454474903553',
    creator: '@_electricalera_',
    creatorId: '1669381454474903553',
  },
}


export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f2f2f9' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
}

export default function RootLayout({ children }) {
  var bloglinkhtml = "";
  var newslinkhtml = "";
  var dropdownbloghtml = "";
  var dropdownnewshtml = "";
  var dropdownshophtml = "";
  var dropdownbloglinkhtml = "";
  var dropdownnewslinkhtml = "";
  const data = JSON.parse(fs.readFileSync(ContentFilePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    return data
  }));
  const res = JSON.parse(fs.readFileSync(path.join(DataDirPath, 'links.json'), 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    return data
  }));
  res.AllLinks.sort(function (a, b) {
    let x = a.name.toLowerCase();
    let y = b.name.toLowerCase();
    if (x < y) { return -1; }
    if (x > y) { return 1; }
    return 0;
  });
  var insertDropdownCat = function (type, gen) {
    var html = "";
    for (var i = 0; i < res.AllLinks.length; i++) {
      if (res.AllLinks[i].type === type) {
        html += "<div><a href='/" + gen + res.AllLinks[i].url + "'>" + res.AllLinks[i].name + "</a></div><hr>";
      }
    }
    if (type === "shopsubcat") { dropdownshophtml = html; }
    else if (type === "blogcat") { dropdownbloghtml = html; }
    else if (type === "newscat") { dropdownnewshtml = html; }
  }

  var insertDropdownBlogNews = function (type) {
    var html = "";
    for (var i = res.LatestLinks.length - 1; i >= 0; i--) {
      if (res.LatestLinks[i].type === type) {
        html += "<div><a href='/" + type + "/" + res.LatestLinks[i].url + "/'>" + res.LatestLinks[i].name + "</a></div><hr>";
      }
    }
    if (type === "blogs") { dropdownbloglinkhtml = html; }
    else if (type === "news") { dropdownnewslinkhtml = html; }
  }

  //BLOGS
  var insertBlogNews = function (type) {
    var count = 0;
    var html = "";
    for (var i = 0; i < res.AllLinks.length; i++) {
      if (res.AllLinks[i].type === type && count < 6) {
        html += "<div style='padding-bottom:5px;'><a href='/" + type + "/" + res.AllLinks[i].url + "/'>" + res.AllLinks[i].name + "</a></div>";
        count++;
      }
    }
    if (type === "blogs") { bloglinkhtml = html; }
    else if (type === "news") { newslinkhtml = html; }
  }

  //LATEST
  var latestlinkhtml = "";
  for (var i = res.LatestLinks.length - 1; i >= 0; i--) {
    latestlinkhtml += "<div style='padding-bottom:5px;'><a href='/" + res.LatestLinks[i].type + "/" + res.LatestLinks[i].url + "/'>" + res.LatestLinks[i].name + "</a></div>";
  }

  //TOP RATED
  var topratedhtml = "";
  for (var i = 0; i < res.topRated.length; i++) {
    topratedhtml += "<div style='padding-bottom:5px;'><a href='/" + res.topRated[i].type + "/" + res.topRated[i].url + "/'>" + res.topRated[i].name + "</a></div>";
  }

  // CALLING FUNCTIONS 
  insertBlogNews("blogs"); insertBlogNews("news"); insertDropdownBlogNews("blogs"); insertDropdownBlogNews("news"); insertDropdownCat("blogcat", "blogs#"); insertDropdownCat("newscat", "news#"); insertDropdownCat("shopsubcat", "shop/")

  return (
    <html lang="en">
      {/* <RouteChangeListener /> */}
      <head>
        <Script src='/js/gtm.js'></Script>
        <link rel="manifest" href="https://progressier.app/QYoyyh65Vn7niTnz0ERl/progressier.json" />
        <Script defer src="https://progressier.app/QYoyyh65Vn7niTnz0ERl/script.js"></Script>
        {/* <Script defer type="text/javascript" src="//monu.delivery/site/3/f/df343b-da82-4896-96c5-feb6da2734f4.js" data-cfasync="false"></Script> */}
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta property="fb:app_id" content="1456934081725304" />
        <meta name="facebook-domain-verification" content="v6srg2zfmr8egh7nwkiwd36i9ne8mn" />
        <meta name="p:domain_verify" content="8d791265485dd71542b2b15fb2498e75" />
        <link rel="preload" href="/css/style.min.css" as="style" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="/css/style.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Oxygen:wght@400&family=Play:wght@400&family=Poppins:wght@500&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        <Script defer src="/js/script.min.js"></Script>
        {/* <Script defer src='/js/monetag.popunder.min.js'></Script>
        <Script defer src='/js/monetag.push.min.js'></Script>
        <Script defer src='/js/monetag.vignette.min.js'></Script> */}
      </head>
      <body className={inter.className}>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NQ465FFZ" height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe></noscript>
        <div className="blurBackground"></div>
        <div id="loading">
          <div id="loader"><img src="/images/pageloading.gif" alt="Loading..." width={250} /></div>
        </div>
        <div id="topbar"><div id='exclusiveStripe'>🚀 Visit Our Online Store to Get Exclusive Deals! <a href='//shop.electricalera.com' target='_blank'>Shop Now 🛒</a></div>
        <progress id="scrollProgress" value="0" max="100"></progress></div>
        <div id='main-body' className='bg-light'>
          <header>
            <nav id="header-nav" className="navbar">
              <div className="container-fluid navbar-expand-md">
                {/* <a className="d-none d-lg-block" href="/"><img id="logo1" src="/images/MyWebLogo.png"
                  alt="logo" /></a> */}
                <a className="d-block" href="/"><img id="logo2" src="/images/MyWebLogo2.png"
                  alt="logo" /></a>

                <button id="navbarToggle" className="navbar-toggler shadow-0 p-0" type="button"
                  data-bs-toggle="collapse" data-bs-target="#collapsable-nav" aria-expanded="false"
                  aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="collapsable-nav">
                  <ul id="nav-list" className="my-auto ms-auto me-lg-auto navbar-nav">
                    <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
                    <li className="nav-item dropdown">
                      <a className="nav-link droplink" style={{ cursor: "pointer" }}>
                        Latest <img width="12" src="/images/dropdown-bold.png" alt="dropdown" /></a>
                      <div className="dropdown-content">
                        <a target="_blank" href='//ptugnins.net/4/6680080' style={{ cursor: "pointer" }}><h5 className="my-1">Blog</h5></a>
                        <hr />
                        <div className="mx-auto DropdownBlogLink" dangerouslySetInnerHTML={{ __html: dropdownbloglinkhtml }}></div>
                        <a target="_blank" href='//ptugnins.net/4/6680080' style={{ cursor: "pointer" }}><h5 className="mt-3 mb-1">News</h5></a>
                        <hr />
                        <div className="mx-auto DropdownNewsLink" dangerouslySetInnerHTML={{ __html: dropdownnewslinkhtml }}></div>
                      </div>
                    </li>
                    <li className="nav-item dropdown">
                      <a className="nav-link droplink" href="/shop/">
                        Shop <img className="d-none d-lg-inline" width="12" src="/images/dropdown-bold.png"
                          alt="dropdown" /></a>
                      <div className="dropdown-content d-none d-lg-inline">
                        <a target="_blank" href='//ptugnins.net/4/6680080' style={{ cursor: "pointer" }}><h5 className="my-1">Product Categories</h5></a>
                        <hr />
                        <div className="dropdownShop" dangerouslySetInnerHTML={{ __html: dropdownshophtml }}></div>
                      </div>
                    </li>
                    <li className="nav-item dropdown">
                      <a className="nav-link droplink" href="/blogs/">
                        Blog <img className="d-none d-lg-inline" width="12" src="/images/dropdown-bold.png"
                          alt="dropdown" /></a>
                      <div className="dropdown-content d-none d-lg-inline">
                        <a target="_blank" href='//ptugnins.net/4/6680080' style={{ cursor: "pointer" }}><h5 className="my-1">Blog Categories</h5></a>
                        <hr />
                        <div className="dropdownBlogs" dangerouslySetInnerHTML={{ __html: dropdownbloghtml }}></div>
                      </div>
                    </li>
                    <li className="nav-item dropdown">
                      <a className="nav-link droplink" href="/news/">
                        News <img className="d-none d-lg-inline" width="12" src="/images/dropdown-bold.png"
                          alt="dropdown" /></a>
                      <div className="dropdown-content d-none d-lg-inline">
                        <a target="_blank" href='//ptugnins.net/4/6680080' style={{ cursor: "pointer" }}><h5 className="my-1">News Categories</h5></a>
                        <hr />
                        <div className="dropdownNews" dangerouslySetInnerHTML={{ __html: dropdownnewshtml }}></div>
                      </div>
                    </li>
                    <li className="nav-item"><a className="nav-link" href="/about/">About</a></li>
                  </ul>
                </div>
                <div className='d-none d-lg-block' style={{borderRadius: "50px", backgroundColor: "var(--color-background)", padding: "6px 12px"}}>
                  <a target="_blank" href="https://www.facebook.com/profile.php?id=100093630700193"><img width="30"
                    src="/images/facebook.png" alt="Facebook" /></a>
                  <a target="_blank" href="https://www.linkedin.com/company/electrical-era/"><img width="30"
                    src="/images/linkedin.png" alt="LinkedIn" /></a>
                  <a target="_blank" href="https://twitter.com/_electricalera_"><img width="30" src="/images/twitter.png" alt="Twitter" /></a>
                  <a target="_blank" href="https://www.pinterest.com/electricalera/"><img width="30" src="/images/pinterest.png" alt="Pinterest" /></a><br />
                </div>
              </div>
              <div id='navHighlightWrapper'>
                <section id='highlight-section' className='col-12 col-md-6'>
                  <h1 style={{ fontSize: "36px", color: "var(--color-secondary)", textAlign: "left",minHeight: "80px" }}>Stay Updated with the Latest Trends, Innovations and Breakthroughs</h1>
                  <div className="position-relative">
                    <div><input id="searchbar" className="form-control"
                      type="search" placeholder="Search" aria-label="Search" /></div>
                    <div id="SearchContent" className="rounded container-fluid position-absolute">
                    </div>
                  </div>
                </section>
                <div id='navHighlightTerms' className='mt-3 mt-md-0 col-12 col-md-6'>
                  <Card title='Blog' image='https://img.icons8.com/arcade/64/blog.png' url='/blogs/' extraClass='ms-0' />
                  <Card title='News' image='https://img.icons8.com/3d-fluency/94/news.png' url='/news/' />
                  <Card title='Shop' image='https://img.icons8.com/3d-fluency/94/shop.png' url='//shop.electricalera.com' target="_blank"/>
                  <Card title='Science & Tech' image='https://img.icons8.com/3d-fluency/94/processor.png' url='/blogs#science-amp-technology' />
                  <Card title='AI' image='https://img.icons8.com/3d-fluency/94/robot-1.png' url='/blogs#artificial-intelligence' />
                  <Card title='Guides & Tutorials' image='https://img.icons8.com/3d-fluency/94/classroom.png' url='/blogs#guides-amp-tutorials' />
                  <Card title='Tech Giants' image='https://img.icons8.com/3d-fluency/94/google-logo.png' url='/news#tech-titans-updates' />
                  <Card title='Automobiles' image='https://img.icons8.com/3d-fluency/94/car.png' url='/news#innovative-automobile-updates' />
                  {/* <Card title='Echo & Alexa' image='https://img.icons8.com/color/96/amazon-alexa-logo.png' url='/shop/echo-amp-alexa-devices/' />
                  <Card title='Smart Home' image='https://img.icons8.com/3d-fluency/94/home-automation.png' url='/shop/smart-home/' />
                  <Card title='Apple Devices' image='https://img.icons8.com/3d-fluency/188/mac-os.png' url='/shop/apple-devices-amp-accessories/' />
                  <Card title='Home Gadgets' image='https://img.icons8.com/3d-fluency/94/home.png' url='/shop#home-gadgets-amp-appliances' /> */}
                </div>
              </div>
            </nav>
          </header>
          <div id="wrapper" className="container-fluid position-relative">
            <div className="row">
              <div className="sidenavWrap d-none d-lg-block">
                <div id="sidenav1" className="my-5">
                  <h5 id="contentsHeading1" className="pb-2 text-center"></h5>
                  <div id="contents1" className="pb-2 d-none d-lg-block "></div>
                  <h5 id="relatedPostsHeading1" className="pb-2 pt-3 text-center"></h5>
                  <div id="relatedPosts1" className="pb-2"></div>
                  <div id="mmt-ab937fd0-94f1-4661-9107-ae27acec0c1e" className="text-center sidenav1Ad"></div>
                  <div id="atContainer-b3b32dce14bd362ce3528cb239f47c00" className="text-center sidenav1Ad"></div>
                </div>
              </div>
              <div id="main-view" className="pt-5 pb-5">
                <div id="carouselExampleDark" className="carousel carousel-dark slide mb-3" style={{ display: 'none' }} data-bs-ride="carousel">
                  <div className="carousel-indicators"></div>
                  <div className="carousel-inner"></div>
                  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark"
                    data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark"
                    data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
                <div id="container-cff8091afab973edcef8b6aa52d3341c" style={{ padding: '0 2' + 'px' }}></div>

                <div id="main-content">
                  <div id="mmt-6285079a-8bbd-4f19-87aa-1d7bdda9df4c"></div>
                  <div id='childrenDiv' className="container-fluid">{children}</div>
                </div>

                <div id="mmt-33b71346-9adb-4fb9-8ea5-08947ca2077c"></div>
                <div id="container-78de00a204ff5b5f2bf0305f39164a39" style={{ padding: '0 2' + 'px' }}></div>
              </div>
              <div id="mySidepanel" className="sidepanel d-lg-none">
                <a id="closesidepanel" className="closebtn"><img src="/images/close.png"
                  alt="close" /></a>
                <h3 id="contentsHeading2" className="pb-2 text-center"></h3>
                <div id="contents2" className="pb-2"></div>
                <div id="container-2716f97e02335bc1495f4d0e028aba01"></div>
              </div>
              <button id="opensidepanel" className="openbtn btn d-lg-none"><img className='openbtnimg' src="/images/open.png" width="24"
                alt="open" /></button>
              <div className="sidenavWrap">
                <div id="sidenav1" className="d-lg-none">
                  <div id="atContainer-32bbb8ca6b9943be024f193334c6e351" className="text-center sidenav1MobileAd" style={{ padding: '0 2' + 'px' + ' 12px' }}></div>
                  <h2 id="relatedPostsHeading2" className="pb-2 text-center"></h2>
                  <div id="relatedPosts2" className="pb-2"></div>
                </div>
                <div id="sidenav2" className="mb-5">
                  <h5 id="sidenavAdHeading" className="pb-2 text-center d-none d-lg-block"></h5>
                  <div id="mmt-e2a1399e-86ba-4829-af5d-e1db35c4a4d1"></div>
                  <div id="atContainer-81f7456d565efea0b0def5b0deec147e" className="text-center" style={{ padding: '0 2' + 'px' + ' 12px' }}></div>
                  <h2 id="most-recommended-products" className="text-center d-lg-none"></h2>
                  <div id="sidenavAd" className="row"></div>
                  <div id="mmt-1e07775e-1f5d-45a3-8665-34750ca56e85"></div>
                  <div id="atContainer-3f9d50e1824ad02220999ffb71ee6f90" className="text-center" style={{ padding: '12px 2' + 'px' + ' 0' }}></div>
                </div>
              </div>
            </div>
          </div>
          <footer className="panel-footer">
            <div className="container-fluid">
              <div className="row">
                <section className="col-sm-6 col-lg-3 mt-5 mb-md-3">
                  <a target="_blank" href='//ptugnins.net/4/6680080' style={{ cursor: "pointer" }}><h3 className="pb-1">
                    LATEST POSTS
                  </h3></a>
                  <div className="latestLink" dangerouslySetInnerHTML={{ __html: latestlinkhtml }}></div>
                </section>

                <section className="col-sm-6 col-lg-3 mt-5 mb-md-3">
                  <a target="_blank" href='//ptugnins.net/4/6680080' style={{ cursor: "pointer" }}><h3 className="pb-1">
                    TOP RATED
                  </h3></a>
                  <div className="topRatedLink" dangerouslySetInnerHTML={{ __html: topratedhtml }}></div>
                </section>

                <section className="col-sm-6 col-lg-3 mt-5 mb-md-3">
                  <a target="_blank" href='//ptugnins.net/4/6680080' style={{ cursor: "pointer" }}><h3 className="pb-1">
                    BLOGS
                  </h3></a>
                  <div className="blogLink" dangerouslySetInnerHTML={{ __html: bloglinkhtml }}></div>
                </section>

                <section className="col-sm-6 col-lg-3 mt-5 mb-md-3">
                  <a target="_blank" href='//ptugnins.net/4/6680080' style={{ cursor: "pointer" }}><h3 className="pb-1">
                    NEWS
                  </h3></a>
                  <div className="newsLink" dangerouslySetInnerHTML={{ __html: newslinkhtml }}></div>
                </section>
              </div>
            </div>
            {/* <Script async src="https://cse.google.com/cse.js?cx=94f22064ac37b4d1a"></Script>
            <div className="gcse-search" style={{width: '50%'}}></div> */}
            <div id="mmt-94581372-549e-43df-8646-90708dac5202" className="customizedAd m-auto" style={{ padding: '0 2px' }}></div>
            <div id="container-d53b7f211088d0b2644aae4bef8496ee" className="customizedAd m-auto" style={{ padding: '0 2' + 'px' }}></div>
            <div id="social" className="text-center mt-5 container-fluid">
              {/* <p id="emails">Email Us</p>
              <div><a href="mailto:info@electricalera.com"><img src="/images/emailUs.png" alt="Email"
                width="30" />info@electricalera.com</a></div> */}
              <a target="_blank" href='//ptugnins.net/4/6680080' style={{ cursor: "pointer" }}><small style={{ marginTop: 150 + 'px', color: 'var(--color-light)' }}><em><b>Disclaimer: </b>This website contains affiliate links. As an Amazon Associate I earn from qualifying purchases.</em></small></a>
              <hr />
              <p><a target="_blank" style={{ cursor: "pointer", color: "var(--color-light)" }}>Follow Us</a></p>
              <a target="_blank" href="https://www.facebook.com/profile.php?id=100093630700193"><img width="30"
                src="/images/facebook.png" alt="Facebook" /></a>
              <a target="_blank" href="https://www.linkedin.com/company/electrical-era/"><img width="30"
                src="/images/linkedin.png" alt="LinkedIn" /></a>
              <a target="_blank" href="https://twitter.com/_electricalera_"><img width="30" src="/images/twitter.png" alt="Twitter" /></a>
              <a target="_blank" href="https://www.pinterest.com/electricalera/"><img width="30" src="/images/pinterest.png" alt="Pinterest" /></a><br />
              <small>&copy; 2024 - Electrical Era. All Rights Reserved. | <a target="_parent" href="/admin">Admin</a> | <a
                href="/privacy/">Privacy Policy</a></small>
            </div>
          </footer>
        </div>
        <div>
          <a id="emailUs" href="mailto:info@electricalera.com" target="_blank"><img src="/images/email.png"
            alt="Email" /></a>
          <button id="ToTop"><span>&#8593;</span></button>
          <button id="ToBottom"><span>&#8595;</span></button>
          <div id="share">
            <button id="shareBtn"><img src="/images/shared.png" alt="Share" /></button>
            <div className="a2a_kit a2a_kit_size_32 a2a_default_style">
              <a className="a2a_button_facebook"></a>
              <a className="a2a_button_facebook_messenger"></a>
              <a className="a2a_button_whatsapp"></a>
              <a className="a2a_button_x"></a>
              <a className="a2a_button_linkedin"></a>
              <a className="a2a_button_pinterest"></a>
              <a className="a2a_button_telegram"></a>
              <a className="a2a_dd" href="https://www.addtoany.com/share"></a>
            </div>
          </div>
          <Script async src="/js/share.js"></Script>
        </div>
        {/* <Script defer type="text/javascript" data-cfasync="false" src="/js/monumentric.ads.js"></Script> */}
        <Script defer src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></Script>
        <Script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></Script>
      </body>
    </html>
  )
}

function Card({ title, image, url, extraClass = '' }) {
  return (
    <div className={'navHighlightTerm ms-12 mb-12 px-12 ' + extraClass} style={{ color: 'var(--color-secondary)', backgroundColor: "var(--color-light)", height: '40px', borderRadius: "10px", width: 'auto' }}>
      <a className='d-flex' style={{ alignItems: "center" }} href={url} alt={title}>
        <div style={{ height: '40px' }}><img style={{ height: "100%" }} src={image} alt={title} /></div>
        <b style={{ textWrap: "nowrap" }}>{title}</b>
      </a>
    </div>
  )
}