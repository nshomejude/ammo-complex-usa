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
    description: "Shop our extensive selection of premium ammunition from trusted manufacturers including Federal, Hornady, Winchester, and Speer. Every purchase requires FFL verification and full compliance with federal and state regulations. We stock pistol, rifle, and shotgun ammunition for training, competition, and personal defense. Fast shipping, competitive pricing, and expert customer support ensure you get exactly what you need. All products are authentic and backed by manufacturer warranties."
  },
  {
    id: 2,
    title: "Trusted by Law-Abiding Gun Owners Nationwide",
    description: "Join thousands of satisfied customers who rely on ARMS COMPLEX for their ammunition needs. We verify all firearms licenses to ensure legal compliance and secure transactions. Our commitment to responsible gun ownership means we only sell to eligible buyers. Browse our real-time inventory with instant availability updates. Orders ship within 24 hours with full tracking and secure packaging. Experience the difference of working with a licensed FFL dealer who understands your requirements and prioritizes safety."
  },
  {
    id: 3,
    title: "Top Brands - Federal, Hornady, Winchester & More",
    description: "As an authorized dealer for America's leading ammunition manufacturers, we guarantee authentic products at competitive prices. Stock includes Federal Premium HST, Hornady Critical Duty, Winchester Ranger, Speer Gold Dot, and more professional-grade loads. Whether you need defensive carry ammunition, competition rounds, or training supplies, our curated selection meets the highest standards. Bulk discounts available. Regular sales and promotions help you save on premium ammunition. Expert staff available to help you choose the right load for your specific needs."
  },
  {
    id: 4,
    title: "Fast & Legal Ammunition Shipping to Your Door",
    description: "We ship ammunition to all states where legally permitted with full compliance documentation. Orders placed before 2 PM ship the same business day with tracking. Secure packaging ensures your ammunition arrives safely and discreetly. We handle all compliance requirements so you can shop with confidence. Free shipping available on qualifying orders. Our streamlined checkout process makes ordering quick and easy. Licensed, insured, and committed to providing the best service in the industry for law-abiding gun owners."
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
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-[hsl(0,75%,96%)] via-background to-background">
      <div className="container relative mx-auto px-4 py-11 md:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-[hsl(var(--home2-accent))] bg-[hsl(var(--home2-accent-light))] px-4 py-2">
              <Shield className="h-4 w-4" style={{ color: 'hsl(var(--home2-accent))' }} />
              <span className="text-sm font-medium" style={{ color: 'hsl(var(--home2-accent))' }}>Licensed FFL Dealer</span>
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
                      <p className="mb-8 text-base text-muted-foreground md:text-lg max-w-3xl mx-auto leading-relaxed transform transition-all duration-700 delay-100">
                        {slide.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={scrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full border-2 border-border bg-background p-2 transition-all duration-300 hover:scale-110 active:scale-95"
              style={{ 
                borderColor: 'hsl(var(--home2-primary))',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'hsl(var(--home2-accent-light))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'hsl(var(--background))';
              }}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6 transition-transform duration-300" style={{ color: 'hsl(var(--home2-accent))' }} />
            </button>

            <button
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full border-2 border-border bg-background p-2 transition-all duration-300 hover:scale-110 active:scale-95"
              style={{ 
                borderColor: 'hsl(var(--home2-primary))',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'hsl(var(--home2-accent-light))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'hsl(var(--background))';
              }}
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6 transition-transform duration-300" style={{ color: 'hsl(var(--home2-accent))' }} />
            </button>
          </div>

          <div className="mb-8 flex justify-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className="h-2 rounded-full transition-all duration-500 hover:scale-125"
                style={{
                  width: index === selectedIndex ? '32px' : '8px',
                  backgroundColor: index === selectedIndex ? 'hsl(var(--home2-primary))' : 'hsl(var(--border))',
                  boxShadow: index === selectedIndex ? '0 10px 25px -5px hsl(var(--home2-primary) / 0.5)' : 'none',
                  transform: index === selectedIndex ? 'scale(1.1)' : 'scale(1)',
                }}
                onMouseEnter={(e) => {
                  if (index !== selectedIndex) {
                    e.currentTarget.style.backgroundColor = 'hsl(var(--home2-primary) / 0.5)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (index !== selectedIndex) {
                    e.currentTarget.style.backgroundColor = 'hsl(var(--border))';
                  }
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link to="/products">
              <Button 
                size="lg" 
                className="w-full sm:w-auto px-8 py-6 text-white transition-all duration-300"
                style={{ 
                  backgroundColor: 'hsl(var(--home2-primary))',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'hsl(var(--home2-primary-hover))';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px -5px hsl(var(--home2-primary) / 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'hsl(var(--home2-primary))';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Browse Products
              </Button>
            </Link>
            <Link to="/about">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto border-2 px-8 py-6 transition-all duration-300"
                style={{ 
                  borderColor: 'hsl(var(--home2-primary))',
                  color: 'hsl(var(--home2-accent))',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'hsl(var(--home2-accent-light))';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Legal Requirements
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
