const title = 'About | Electrical Era'
const description = 'Welcome to the Electrical Era, where fashion and technology collide, providing you with the latest insights and trends in electronics and apparel.'
const keywords = ['Electrical Era', 'Electric Era', 'Electric Era Technologies', 'Electronics', 'Apparel', 'Fashion', 'Technology', 'Electrical', 'Era', 'Electrical Era Blog', 'Electrical Era News', 'Electrical Era Shop']
const url = '/about/'
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

export default function About() {
  return (
    <div>
      <div id="about" className="container-fluid">
        <h1 id="aboutUs" className="text-center">About Electrical Era</h1>

        <p><em id="aboutHeadline">Welcome to Electrical Era, your go-to objective for everything tech and affiliate marketing related. We are energetic about innovation and assisting you with transforming that energy into benefit through Amazon offshoot promoting.</em></p>

        <h2 id="our-mission">Our Mission</h2>
        <p><b>At Electrical Era, our main goal is basic:</b> to engage tech lovers and computerized advertisers to adapt their insight and energy for innovation. We accept that anybody can procure a consistent pay while sharing their affection for the most recent devices, programming, and tech patterns. We're here to direct you constantly.</p>

        <h2 id="what-we-offer">What We Offer</h2>
        <p><b>Top to bottom Tech Surveys:</b> Our group of specialists gives complete audits and examination of the most recent tech items, assisting you with settling on informed buying choices and supporting your member promoting endeavors.</p>
        <p><b>Tech rends and Insights:</b> Remain on top of things with our normal reports on arising tech patterns and industry experiences. We'll assist you with recognizing worthwhile specialties and potential chances to successfully advance Amazon items.</p>
        <p><b>Guides:</b> Our bit by bit guides cover all that from setting up your subsidiary record to improving your site for most extreme transformations. We believe that you should succeed, and we're here to make the cycle as direct as could really be expected.</p>
        <p><b>Community Support:</b> Join our lively local area of tech devotees and member advertisers. Share your encounters, get clarification on some things, and gain from others on a comparative excursion. We have confidence in the force of coordinated effort and gaining from one another.</p>

        <h2 id="why-pick-electrical-era">Why Pick Electrical Era?</h2>
        <p><b>Reliable Information:</b> We invest heavily in giving precise and state-of-the-art data. You can trust us to convey dependable substance that assists you with prevailing in the serious universe of partner promoting.</p>
        <p><b>Energy for Innovation:</b> Our group is truly energetic about innovation, and this excitement radiates through in our substance. We comprehend the tech scene, and we're eager to assist you with benefitting from it.</p>
        <p><b>Commitment to Your Prosperity:</b> Your prosperity is our prosperity. We are committed to supporting you on your subsidiary promoting excursion and will make every effort to assist you with accomplishing your objectives.</p>

        <h2 id="join-us-today">Join Us Today</h2>
        <p>Is it true or not that you are prepared to transform your adoration for innovation into a worthwhile member promoting adventure? Join Electrical Era today and set out on a remunerating excursion of tech investigation and monetary achievement. Together, we can tackle the force of member showcasing and the universe of innovation to make a more promising time to come.</p>
        <p>How about we make innovation work for you. Reach out to us now!</p>
        <a target="_blank" href="https://www.facebook.com/profile.php?id=100093630700193"><img width="30"
          src="/images/facebook.png" alt="Facebook" /></a>
        <a target="_blank" href="https://www.linkedin.com/company/electrical-era/"><img width="30" src="/images/linkedin.png"
          alt="LinkedIn" /></a>
        <a target="_blank" href="https://twitter.com/_electricalera_"><img width="30" src="/images/twitter.png"
          alt="Twitter" /></a>
        <a target="_blank" href="https://www.pinterest.com/electricalera/"><img width="30" src="/images/pinterest.png" alt="Pinterest" /></a><br />
      </div>
    </div>
  )
}