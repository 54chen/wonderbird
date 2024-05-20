import Link from 'next/link';

const Subscribe = () => {
  return (
    <section className="subscribe">
      <div className="container">
      <Link href="/product/needle">
        <div style={{backgroundImage: 'url(/images/QUELLELARGE2.jpg)'}} className="subscribe__content" />   
      </Link>
      </div>
    </section>
  )
};


export default Subscribe