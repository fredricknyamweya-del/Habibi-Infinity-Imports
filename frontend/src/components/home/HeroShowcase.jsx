import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Autoplay, A11y, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/effect-fade';
import Button from '../ui/Button.jsx';

const slides = [
  { title: 'A new season, beautifully considered.', subtitle: 'Discover pieces chosen for the way you live.', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=90' },
  { title: 'The art of arriving well.', subtitle: 'Find your next favourite, sourced from around the world.', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=90' },
  { title: 'Everyday, elevated.', subtitle: 'A little luxury, delivered to your doorstep.', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=90' },
];

export default function HeroShowcase() {
  const [swiper, setSwiper] = useState(null);
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-label="Featured collections"
      className="relative isolate overflow-hidden rounded-card border border-gold/20 bg-charcoal"
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
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.title}>
            <div className="absolute inset-0 -z-20">
              <img alt="" className="h-full w-full object-cover opacity-45" src={slide.image} />
            </div>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-obsidian via-obsidian/80 to-obsidian/20" />
            <div className="page-shell flex min-h-[540px] items-center py-16 md:min-h-[570px]">
              <div className="max-w-2xl">
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-gold">A world of beautiful finds</p>
                <motion.h1
                  animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  className="font-heading text-5xl leading-[1.1] text-ivory sm:text-6xl lg:text-7xl"
                  initial={reducedMotion ? undefined : { opacity: 0, y: 22 }}
                  transition={{ duration: 0.75, delay: 0.12 }}
                >
                  Imported Luxury. <span className="text-gold">Delivered</span> Across East Africa.
                </motion.h1>
                <p className="mt-6 max-w-lg text-base leading-7 text-white/75 md:text-lg">{slide.subtitle}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button to="/shop">Explore the collection</Button>
                  <Button to="/shop?sort=newest" variant="ghost">New arrivals</Button>
                </div>
                <div className="mt-9 flex gap-2" role="group" aria-label="Choose featured slide">
                  {slides.map((item, dotIndex) => (
                    <button
                      aria-label={`Show slide ${dotIndex + 1}: ${item.title}`}
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
                className="absolute bottom-10 right-10 hidden w-52 rounded-card border border-gold/30 bg-charcoal/80 p-3 shadow-glow backdrop-blur sm:block lg:right-20"
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <img alt="A curated fashion look" className="h-48 w-full rounded-lg object-cover" src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=500&q=85" />
                <p className="mt-3 text-xs uppercase tracking-widest text-gold">Curated for you</p>
                <p className="mt-1 font-heading text-lg">The edit</p>
              </motion.div>
              <Link aria-label="Browse all products" className="absolute inset-0 -z-0" to="/shop" tabIndex={-1} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}