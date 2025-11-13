import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { 
  Shield,
  GraduationCap,
  Users,
  CheckCircle,
  ArrowRight,
  Calendar,
  Award,
  BookOpen
} from "lucide-react";
import { useEffect } from "react";
import { useScrollAnimation, useParallax } from "@/hooks/useScrollAnimation";

const Home8 = () => {
  const scrollY = useParallax();
  const s1 = useScrollAnimation();
  const s2 = useScrollAnimation();
  const s3 = useScrollAnimation();
  
  useEffect(() => {
    document.title = "Firearm Safety & Certified Training | Arms Complex";
    
    const updateMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    updateMeta("description", "Learn responsible gun handling and safety practices from certified instructors.");
    updateMeta("keywords", "firearm safety, gun training, certified instructors, firearms education");
  }, []);

  const programs = [
    {
      title: "Basic Firearms Safety",
      duration: "4 hours",
      level: "Beginner",
      price: "$99",
      topics: ["Safe handling", "Storage practices", "Legal responsibilities", "Basic marksmanship"]
    },
    {
      title: "Concealed Carry Certification",
      duration: "8 hours",
      level: "Intermediate",
      price: "$199",
      topics: ["Legal requirements", "Tactical training", "Situational awareness", "Live fire exercises"]
    },
    {
      title: "Advanced Tactical Training",
      duration: "16 hours",
      level: "Advanced",
      price: "$499",
      topics: ["Dynamic scenarios", "Low-light operations", "Stress inoculation", "Advanced techniques"]
    },
    {
      title: "Instructor Certification",
      duration: "40 hours",
      level: "Professional",
      price: "$1,299",
      topics: ["Teaching methodology", "Range safety officer", "Certification process", "Business development"]
    }
  ];

  const upcomingClasses = [
    { course: "Basic Safety", date: "March 15, 2025", seats: "8 seats left", location: "Virginia Range" },
    { course: "CCW Certification", date: "March 22, 2025", seats: "12 seats left", location: "Texas Facility" },
    { course: "Advanced Tactical", date: "April 5, 2025", seats: "6 seats left", location: "Arizona Training Center" },
    { course: "Instructor Course", date: "April 20, 2025", seats: "4 seats left", location: "Virginia HQ" }
  ];

  const faqs = [
    {
      question: "What do I need to bring to my first class?",
      answer: "For beginner classes, we provide all firearms and ammunition. Just bring a valid ID, comfortable clothing, closed-toe shoes, and eye/ear protection (we also have these available for purchase)."
    },
    {
      question: "Are your instructors certified?",
      answer: "Yes, all our instructors hold NRA and state-level certifications. Many are former law enforcement or military with decades of real-world experience."
    },
    {
      question: "Can I use my own firearm during training?",
      answer: "Absolutely! We encourage students to train with their personal firearms once they've completed basic safety training. Our instructors will inspect your firearm for safety before use."
    },
    {
      question: "Do you offer private lessons?",
      answer: "Yes, we offer one-on-one instruction tailored to your specific goals. Contact us to schedule a private session with one of our certified instructors."
    },
    {
      question: "What's your cancellation policy?",
      answer: "You may cancel up to 48 hours before your scheduled class for a full refund. Cancellations within 48 hours receive a 50% refund or can reschedule for free."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#2E2E2E] via-[#556B2F] to-[#000000]">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto animate-fade-in">
          <GraduationCap className="h-16 w-16 mx-auto mb-4 text-[#CBB994]" />
          <Badge className="mb-4 bg-[#CBB994] text-black">SAFETY & TRAINING</Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 uppercase tracking-tight">
            Safety First, Always.
          </h1>
          <p className="text-xl mb-8 text-gray-200">
            Professional firearms training from certified expert instructors
          </p>
          <a href="#calendar">
            <Button size="lg" className="bg-[#556B2F] hover:bg-[#556B2F]/90 text-white text-lg px-8 py-6">
              Enroll in Training
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </div>
      </section>

      {/* Certified Programs Overview */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 uppercase">Training Programs</h2>
          <p className="text-muted-foreground text-lg">From beginner to professional certification</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programs.map((program, idx) => (
            <Card key={idx} className="hover:shadow-2xl transition-all border-t-4 border-t-[#556B2F]">
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{program.title}</h3>
                    <Badge variant="outline" className="mb-2">{program.level}</Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-[#556B2F]">{program.price}</p>
                    <p className="text-sm text-muted-foreground">{program.duration}</p>
                  </div>
                </div>
                <ul className="space-y-2 mb-6">
                  {program.topics.map((topic, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-[#556B2F]" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-[#556B2F] hover:bg-[#556B2F]/90">
                  Enroll Now
                  <ArrowRight className="ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Training Calendar */}
      <section id="calendar" className="bg-gradient-to-br from-[#2E2E2E] to-[#000000] py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-[#CBB994]" />
            <h2 className="text-4xl font-bold mb-4 uppercase text-white">Upcoming Classes</h2>
            <p className="text-gray-300 text-lg">Reserve your spot today</p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {upcomingClasses.map((class_, idx) => (
              <Card key={idx} className="bg-[#1a1a1a] border-[#556B2F]/20 hover:border-[#556B2F] transition-colors">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1">{class_.course}</h3>
                      <p className="text-gray-400">{class_.location}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-[#CBB994] font-semibold">{class_.date}</p>
                        <Badge variant="outline" className="text-[#556B2F] border-[#556B2F]">{class_.seats}</Badge>
                      </div>
                      <Button className="bg-[#556B2F] hover:bg-[#556B2F]/90">
                        Register
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Tips Videos */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <BookOpen className="h-12 w-12 mx-auto mb-4 text-[#556B2F]" />
          <h2 className="text-4xl font-bold mb-4 uppercase">Safety Resources</h2>
          <p className="text-muted-foreground text-lg">Free educational content for all skill levels</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "The Four Universal Safety Rules", duration: "5 min", level: "Essential" },
            { title: "Proper Firearm Storage", duration: "8 min", level: "Essential" },
            { title: "Range Etiquette Guide", duration: "6 min", level: "Beginner" },
            { title: "Cleaning & Maintenance", duration: "12 min", level: "Intermediate" },
            { title: "Malfunction Drills", duration: "10 min", level: "Advanced" },
            { title: "Situational Awareness", duration: "15 min", level: "All Levels" }
          ].map((video, idx) => (
            <Card key={idx} className="hover:shadow-xl transition-shadow group cursor-pointer">
              <div className="aspect-video bg-gradient-to-br from-[#2E2E2E] to-[#556B2F] flex items-center justify-center relative overflow-hidden">
                <Shield className="h-24 w-24 text-[#CBB994] group-hover:scale-110 transition-transform" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <Badge className="mb-3 bg-[#556B2F]">{video.level}</Badge>
                <h3 className="text-lg font-bold mb-2">{video.title}</h3>
                <p className="text-sm text-muted-foreground">{video.duration}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gradient-to-br from-[#556B2F]/10 to-[#2E2E2E]/10 py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 uppercase">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-lg">Everything you need to know about our training</p>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-left font-semibold hover:text-[#556B2F]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#2E2E2E] py-20">
        <div className="container mx-auto px-4 text-center">
          <Users className="h-16 w-16 mx-auto mb-6 text-[#CBB994]" />
          <h2 className="text-4xl font-bold mb-6 uppercase text-white">Book a Training Slot</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of responsible gun owners who have trained with Arms Complex
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-[#556B2F] hover:bg-[#556B2F]/90 text-white text-lg px-8 py-6">
              Schedule Training
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home8;
