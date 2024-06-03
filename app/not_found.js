const title = '404 - Page Not Found | Electrical Era'
const description = 'The page you are looking for does not exist. Please check the URL or head back home.'
const url = '/404/'
const image = '/images/robot.png'
export const metadata = {
  metadataBase: new URL('https://electricalera.com'),
  title,
  description,
  robots: {
    index: false,
    follow: true,
    nocache: false,
    googleBot: {
      index: false,
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
export default function notFound() {
    return (
      <div className="text-center" style={{height: 100 + 'vh', padding: '37vh 0', color: "var(--color-primary-dark)"}}>
        <h1 className="display-1">404</h1>
        <p className="lead">Page not found.</p>
      </div>
    )
  }