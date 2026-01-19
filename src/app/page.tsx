'use client';

import { ChevronDown, Star, Check, MessageCircle, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useEffect, useRef, useState } from 'react';
import { GL } from '@/components/gl';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface ScrollAnimationProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
}

function ScrollFadeIn({ children, delay = 0, direction = 'up' }: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const getTransform = () => {
    if (isVisible) return 'translateX(0) translateY(0)';
    switch (direction) {
      case 'left':
        return 'translateX(-40px)';
      case 'right':
        return 'translateX(40px)';
      case 'down':
        return 'translateY(-40px)';
      case 'up':
      default:
        return 'translateY(40px)';
    }
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity 0.6s ease-out, transform 0.6s ease-out`,
      }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [hovering, setHovering] = useState(false);

  const reviews = [
    {
      text: 'Super comfy and supportive — best sleep I\'ve had in years.',
      author: 'Sarah M.',
      rating: 5,
    },
    {
      text: 'Great quality mattress at an affordable price. Highly recommend!',
      author: 'James T.',
      rating: 5,
    },
    {
      text: 'Perfect balance of softness and support. Sleeping better than ever.',
      author: 'Emily R.',
      rating: 5,
    },
  ];

  const mattressSizes = [
    {
      name: 'Single',
      description: 'Perfect for kids, teens, or compact rooms',
      icon: '🛏️',
    },
    {
      name: 'King Single',
      description: 'Extra space without taking over the room',
      icon: '🛏️',
    },
    {
      name: 'Double',
      description: 'Ideal for solo sleepers who love room to stretch',
      icon: '🛏️',
    },
    {
      name: 'Queen',
      description: 'Our most popular size for couples',
      icon: '👥',
    },
    {
      name: 'King',
      description: 'Maximum comfort and space for ultimate sleep luxury',
      icon: '👑',
    },
  ];

  const faqs = [
    {
      question: 'Is the Comfy Mattress suitable for all sleepers?',
      answer:
        'Yes! Our mattress is designed to support side, back, and stomach sleepers. The balanced medium comfort level works well for all sleep positions.',
    },
    {
      question: 'What sizes do you offer?',
      answer:
        'We offer Single, King Single, Double, Queen, and King sizes to suit any room and sleeping needs.',
    },
    {
      question: 'Is the mattress firm or soft?',
      answer:
        'It offers a medium comfort feel — the perfect balance of softness and support. Soft where you need it, supportive where it matters.',
    },
    {
      question: 'How long does a Koala Sleep mattress last?',
      answer:
        'Our mattresses are built for durability. With proper care, you can expect 7-10 years of comfortable sleep.',
    },
    {
      question: 'Do you offer delivery and setup?',
      answer:
        'Yes, we provide free delivery and setup for all mattress purchases. Our team will ensure your mattress is perfectly placed.',
    },
  ];

  const features = [
    {
      title: 'Balanced Comfort & Support',
      icon: '✨',
    },
    {
      title: 'Breathable Materials',
      icon: '💨',
    },
    {
      title: 'Durable Construction',
      icon: '🏗️',
    },
    {
      title: 'Suitable for All Ages',
      icon: '👨‍👩‍👧‍👦',
    },
  ];

  return (
    <div className="w-full overflow-hidden bg-background">
      {/* Hero Section */}
      <section className="relative flex flex-col h-screen items-center justify-center overflow-hidden bg-background">
        {/* 3D GL Canvas as full-screen background */}
        <div className="absolute inset-0 w-full h-full">
          <GL hovering={hovering} />
        </div>

        {/* Hero Text Content on top */}
        <div className="relative z-10 text-center">
          
          <Badge variant="outline" className='bg-[#99CCFF] text-white'>Koala Sleep Comfort</Badge>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight text-balance">
            Sleep Better, the Koala Way
          </h1>

          <p className="text-lg sm:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto text-balance">
            At Koala Sleep, we believe great days start with great sleep. Our Comfy Mattress range is thoughtfully
            designed to give you cloud-like comfort, reliable support, and long-lasting quality — all at a price that
            makes sense.
          </p>

          <p className="text-lg font-semibold text-primary mb-12">
            Soft where you need it. Supportive where it matters.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/products"><Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 py-6"
            >
              Shop Mattresses
            </Button>
            </Link>
            
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 text-base px-8 py-6 bg-transparent"
            >
              View Size Guide
            </Button>
          </div>

          <div className="flex justify-center">
            <div className="animate-bounce">
              <ChevronDown className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>
      </section>

      {/* Mattress Range Section */}
      <section id="mattresses" className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="mx-auto max-w-6xl">
          <ScrollFadeIn direction="up">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Our Comfy Mattress Range</h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                The Koala Sleep Comfy Mattress is crafted to suit all sleep styles — side, back, or stomach sleepers.
              </p>
            </div>
          </ScrollFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {features.map((feature, idx) => (
              <ScrollFadeIn key={idx} delay={idx * 100} direction="up">
                <Card
                  className="p-8 text-center hover:shadow-lg transition-shadow border-border/50 bg-card"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                </Card>
              </ScrollFadeIn>
            ))}
          </div>

          <div className="flex justify-center">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 py-6">
              Shop Mattresses →
            </Button>
          </div>
        </div>
      </section>

      {/* Sizes Section */}
      <section id="sizes" className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="mx-auto max-w-6xl">
          <ScrollFadeIn direction="up">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Find the Right Size for You</h2>
              <p className="text-lg text-foreground/70">
                Not sure which size you need? Our team is happy to help.
              </p>
            </div>
          </ScrollFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
            {mattressSizes.map((size, idx) => (
              <ScrollFadeIn key={idx} delay={idx * 80} direction="up">
                <Card
                  className="p-6 hover:shadow-lg transition-all hover:scale-105 cursor-pointer border-border/50 bg-background"
                >
                  <div className="text-3xl mb-3">{size.icon}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{size.name}</h3>
                  <p className="text-sm text-foreground/70">{size.description}</p>
                </Card>
              </ScrollFadeIn>
            ))}
          </div>

          <div className="flex justify-center">
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10 text-base px-8 py-6 bg-transparent">
              View Size Guide →
            </Button>
          </div>
        </div>
      </section>

      {/* Why Koala Section */}
      <section id="why" className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollFadeIn direction="left">
              <div>
                <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">Comfort You Can Count On</h2>
                <p className="text-lg text-foreground/70 mb-8">
                  At Koala Sleep, comfort isn't a luxury — it's a standard. We're dedicated to helping every Australian
                  find their perfect sleep sanctuary.
                </p>

                <div className="space-y-4">
                  {[
                    'Designed for Australian lifestyles',
                    'Quality materials at affordable prices',
                    'Simple, no-fuss mattress solutions',
                    'Comfort-tested for everyday sleepers',
                  ].map((point, idx) => (
                    <ScrollFadeIn key={idx} delay={idx * 100} direction="left">
                      <div className="flex items-start gap-4">
                        <div className="mt-1">
                          <Check className="w-5 h-5 text-primary" />
                        </div>
                        <p className="text-foreground/80">{point}</p>
                      </div>
                    </ScrollFadeIn>
                  ))}
                </div>
              </div>
            </ScrollFadeIn>

            <ScrollFadeIn direction="right">
              <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">😴</div>
                  <p className="text-lg font-semibold text-foreground">Premium Sleep Experience</p>
                </div>
              </div>
            </ScrollFadeIn>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="mx-auto max-w-6xl">
          <ScrollFadeIn direction="up">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Loved by Happy Sleepers</h2>
              <p className="text-lg text-foreground/70">Join thousands who've discovered better sleep with Koala</p>
            </div>
          </ScrollFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, idx) => (
              <ScrollFadeIn key={idx} delay={idx * 100} direction="up">
                <Card className="p-8 border-border/50 bg-background hover:shadow-lg transition-shadow">
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-foreground/80 mb-6 italic">{review.text}</p>
                  <p className="font-semibold text-foreground">— {review.author}</p>
                </Card>
              </ScrollFadeIn>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10 text-base px-8 py-6 bg-transparent">
              Read More Reviews →
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="mx-auto max-w-3xl">
          <ScrollFadeIn direction="up">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-foreground/70">Find answers to common questions about our mattresses</p>
            </div>
          </ScrollFadeIn>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <ScrollFadeIn key={idx} delay={idx * 50} direction="up">
                <div className="border border-border/50 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
                    className="w-full p-6 flex items-center justify-between hover:bg-secondary/50 transition-colors"
                  >
                    <h3 className="font-semibold text-foreground text-left">{faq.question}</h3>
                    <ChevronDown
                      className={`w-5 h-5 text-primary transition-transform ${expandedFAQ === idx ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {expandedFAQ === idx && (
                    <div className="px-6 pb-6 text-foreground/70 border-t border-border/50 bg-secondary/20 animate-in fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollFadeIn direction="up">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Get in Touch</h2>
            <p className="text-lg text-foreground/70 mb-12">
              Have questions or need help choosing the right mattress size? We're here to help.
            </p>
          </ScrollFadeIn>

          <ScrollFadeIn direction="up" delay={100}>
            <Card className="p-12 border-border/50 bg-card shadow-lg">
              <div className="space-y-8">
                <ScrollFadeIn direction="up" delay={150}>
                  <div className="flex items-center justify-center gap-4 group cursor-pointer hover:gap-5 transition-all">
                    <Mail className="w-6 h-6 text-primary group-hover:text-primary/80" />
                    <div>
                      <p className="text-sm text-foreground/60">Email</p>
                      <a href="mailto:info@koalasleep.com.au" className="font-semibold text-foreground hover:text-primary">
                        info@koalasleep.com.au
                      </a>
                    </div>
                  </div>
                </ScrollFadeIn>

                <ScrollFadeIn direction="up" delay={200}>
                  <div className="flex items-center justify-center gap-4 group cursor-pointer hover:gap-5 transition-all">
                    <Phone className="w-6 h-6 text-primary group-hover:text-primary/80" />
                    <div>
                      <p className="text-sm text-foreground/60">Phone</p>
                      <a href="tel:0712345678" className="font-semibold text-foreground hover:text-primary">
                        07 1234 5678
                      </a>
                    </div>
                  </div>
                </ScrollFadeIn>

                <ScrollFadeIn direction="up" delay={250}>
                  <div className="flex items-center justify-center gap-4 group cursor-pointer hover:gap-5 transition-all">
                    <MessageCircle className="w-6 h-6 text-primary group-hover:text-primary/80" />
                    <div>
                      <p className="text-sm text-foreground/60">Live Chat</p>
                      <button className="font-semibold text-foreground hover:text-primary">Start a conversation</button>
                    </div>
                  </div>
                </ScrollFadeIn>
              </div>

              <Button className="w-full mt-12 bg-primary text-primary-foreground hover:bg-primary/90 text-base py-6">
                Contact Us
              </Button>
            </Card>
          </ScrollFadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-foreground text-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="text-2xl">🐨</div>
                <div className="text-xl font-bold">Koala Sleep</div>
              </div>
              <p className="text-background/70">Comfy Mattresses. Better Sleep. Happier Mornings.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-background/70 text-sm">
                <li>
                  <a href="#" className="hover:text-background transition">
                    All Mattresses
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-background transition">
                    Size Guide
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-background/70 text-sm">
                <li>
                  <a href="#" className="hover:text-background transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-background transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-background/70 text-sm">
                <li>
                  <a href="#" className="hover:text-background transition">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-background transition">
                    Delivery
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-background/20 pt-8 text-center text-background/60 text-sm">
            <p>&copy; 2025 Koala Sleep. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
