import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Autoplay, A11y, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import Button from '../ui/Button.jsx';
import { useCountry } from '../../context/CountryContext.jsx';
import { localizedCopy } from '../../utils/localization.js';
import WelcomeBanner from './WelcomeBanner.jsx';

const slides = [
  { title: 'A new season, beautifully considered.', subtitle: 'Discover pieces chosen for the way you live.', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=90' },
  { title: 'The art of arriving well.', subtitle: 'Find your next favourite, sourced from around the world.', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=90' },
  { title: 'Everyday, elevated.', subtitle: 'A little luxury, delivered to your doorstep.', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=90' },
];
const slideTitlesSwahili = [
  'Msimu mpya, uliochaguliwa kwa umakini.',
  'Sanaa ya kuwasili kwa mtindo.',
  'Mtindo wa kila siku, ulioboreshwa.',
];

export default function HeroShowcase() {
  const [swiper, setSwiper] = useState(null);
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();
  const { country } = useCountry();
  const isSwahili = country === 'TZ';

  return (
    <section
      aria-label={localizedCopy(country, 'Featured collections', 'Mikusanyiko iliyochaguliwa')}
      className="hero-showcase relative isolate overflow-hidden rounded-card border border-gold/20 bg-charcoal"
      onMouseEnter={() => swiper?.autoplay?.stop()}
      onMouseLeave={() => !reducedMotion && swiper?.autoplay?.start()}
    >
      <Swiper
        a11y={{ enabled: true }}
        autoplay={reducedMotion ? false : { delay: 5200, disableOnInteraction: false }}
        className="min-h-[540px] md:min-h-[570px]"
        effect="fade"
        loop
        modules={[Autoplay, A11y, EffectFade]}
        onSlideChange={(instance) => setActive(instance.realIndex)}
        onSwiper={setSwiper}
        slidesPerView={1}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.title}>
            <div className="absolute inset-0 -z-20">
              <img alt="" className="h-full w-full object-cover opacity-45" src={slide.image} />
            </div>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/70 to-black/25" />
            <div className="page-shell flex min-h-[540px] flex-col py-10 md:min-h-[570px] md:py-12">
              <WelcomeBanner />
              <div className="mt-8 max-w-2xl">
                <motion.h1
                  animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  className="font-heading text-5xl leading-[1.1] text-white sm:text-6xl lg:text-7xl"
                  initial={reducedMotion ? undefined : { opacity: 0, y: 22 }}
                  transition={{ duration: 0.75, delay: 0.12 }}
                >
                  {isSwahili ? <>Bidhaa Bora. <span className="text-gold">Zinaletwa</span> Afrika Mashariki.</> : <>Imported Quality. <span className="text-gold">Delivered</span> Across East Africa.</>}
                </motion.h1>
                <p className="mt-6 max-w-lg text-base leading-7 text-white md:text-lg">{isSwahili ? ['Gundua bidhaa zilizochaguliwa kwa maisha yako.', 'Pata kipenzi chako kipya, kilicholetwa kutoka duniani kote.', 'Anasa kidogo, ikiletwa hadi mlangoni kwako.'][active] : slide.subtitle}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button to="/shop">{localizedCopy(country, 'Explore the collection', 'Gundua mkusanyiko')}</Button>
                  <Button className="hero-ghost" to="/shop?sort=newest" variant="ghost">{localizedCopy(country, 'New arrivals', 'Zilizowasili karibuni')}</Button>
                </div>
                <div className="mt-9 flex gap-2" role="group" aria-label={localizedCopy(country, 'Choose featured slide', 'Chagua ukurasa wa picha')}>
                  {slides.map((item, dotIndex) => (
                    <button
                      aria-label={`${localizedCopy(country, 'Show slide', 'Onyesha picha')} ${dotIndex + 1}: ${localizedCopy(country, item.title, slideTitlesSwahili[dotIndex])}`}
                      aria-pressed={active === dotIndex}
                      className={`h-1.5 rounded-full transition-all ${active === dotIndex ? 'w-10 bg-gold' : 'w-5 bg-white/35'}`}
                      key={item.title}
                      onClick={() => swiper?.slideToLoop(dotIndex)}
                      type="button"
                    />
                  ))}
                </div>
              </div>
              <motion.div
                animate={reducedMotion ? undefined : { y: [0, -12, 0], rotate: [0, 1, 0] }}
                className="absolute bottom-10 right-10 hidden w-52 rounded-card border border-gold/30 bg-charcoal/80 p-3 shadow-glow backdrop-blur xl:block xl:right-20"
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <svg aria-hidden="true" className="pointer-events-none absolute -top-28 left-1/2 h-28 w-7 -translate-x-1/2 overflow-visible drop-shadow-[0_2px_3px_rgba(0,0,0,0.6)]" fill="none" viewBox="0 0 28 112">
                  <path d="M14 0v14c0 5 10 5 10 11v5H4v-5c0-6 10-6 10-11" stroke="#d4b978" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                  <path d="M5 30h18l-2 7H7z" fill="#d4b978" />
                  <path d="M14 37v75" stroke="#d4b978" strokeLinecap="round" strokeOpacity=".8" strokeWidth="2" />
                </svg>
                <Link aria-label={localizedCopy(country, 'Explore the Habibi edit', 'Gundua chaguo la Habibi')} className="block rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold" to="/shop?sort=newest">
                  <img alt={localizedCopy(country, 'A curated fashion look', 'Mwonekano wa mitindo uliochaguliwa kwa umakini')} className="h-48 w-full rounded-lg object-cover" src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=500&q=85" />
                  <p className="mt-3 text-xs uppercase tracking-widest text-gold">{localizedCopy(country, 'Curated for you', 'Tumechagua kwa ajili yako')}</p>
                  <p className="mt-1 font-heading text-lg">{localizedCopy(country, 'The edit', 'Chaguo letu')} <span aria-hidden="true">↗</span></p>
                </Link>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}