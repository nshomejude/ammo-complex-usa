import { Button } from "@/components/ui/button";
import { Shield, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface HeroSlide {
  id: number;
  title: string;
  description: string;
}

const defaultSlides: HeroSlide[] = [
  {
    id: 1,
    title: "Premium Ammunition for Licensed Buyers",
    description: "Shop quality ammo with FFL verification and compliance"
  },
  {
    id: 2,
    title: "Trusted by Law-Abiding Gun Owners",
    description: "Secure purchases with verified firearms licenses"
  },
  {
    id: 3,
    title: "Top Brands - Federal, Hornady & More",
    description: "Authorized dealer offering competitive pricing"
  },
  {
    id: 4,
    title: "Fast & Legal Ammunition Shipping",
    description: "Compliant delivery to all eligible states"
  }
];

export const Hero = () => {
  const [slides, setSlides] = useState<HeroSlide[]>(defaultSlides);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const savedSlides = localStorage.getItem('heroSlides');
    if (savedSlides) {
      setSlides(JSON.parse(savedSlides));
    }
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="container relative mx-auto px-4 py-14 md:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-tactical/30 bg-tactical/10 px-4 py-2">
              <Shield className="h-4 w-4 text-tactical" />
              <span className="text-sm font-medium text-tactical">Licensed FFL Dealer</span>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {slides.map((slide, index) => (
                  <div key={slide.id} className="min-w-0 flex-[0_0_100%]">
                    <div className={`text-center transition-all duration-700 ${
                      index === selectedIndex 
                        ? 'animate-fade-in opacity-100 scale-100' 
                        : 'opacity-0 scale-95'
                    }`}>
                      <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl transform transition-transform duration-700">
                        {slide.title}
                      </h1>
                      <p className="mb-8 text-lg text-muted-foreground md:text-xl transform transition-all duration-700 delay-100">
                        {slide.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={scrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full border-2 border-border bg-background p-2 transition-all duration-300 hover:bg-accent hover:scale-110 hover:border-tactical active:scale-95"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6 transition-transform duration-300" />
            </button>

            <button
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full border-2 border-border bg-background p-2 transition-all duration-300 hover:bg-accent hover:scale-110 hover:border-tactical active:scale-95"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6 transition-transform duration-300" />
            </button>
          </div>

          <div className="mb-8 flex justify-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-500 hover:scale-125 ${
                  index === selectedIndex 
                    ? 'w-8 bg-tactical shadow-lg shadow-tactical/50 scale-110' 
                    : 'w-2 bg-border hover:bg-tactical/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link to="/products">
              <Button size="lg" className="w-full sm:w-auto bg-tactical hover:bg-tactical/90 px-8 py-6">
                Browse Products
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 px-8 py-6">
                Legal Requirements
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
