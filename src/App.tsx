import { 
  Wrench, 
  Truck, 
  Clock, 
  CheckCircle2, 
  Phone, 
  Calendar, 
  MapPin, 
  Star, 
  ChevronRight,
  Menu,
  X,
  ShieldCheck,
  Zap,
  Droplets,
  Wind,
  Power,
  Scissors
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect } from 'react';

// --- Components ---

const Button = ({ children, variant = 'primary', className = '', ...props }: any) => {
  const variants: any = {
    primary: 'bg-brand-orange hover:bg-[#e65c00] text-white shadow-lg shadow-brand-orange/20',
    secondary: 'bg-brand-blue hover:bg-slate-900 text-white',
    outline: 'border-2 border-brand-charcoal hover:bg-brand-charcoal hover:text-white text-brand-charcoal',
    ghost: 'text-brand-charcoal hover:bg-gray-100'
  };

  return (
    <button 
      className={`px-6 py-3 rounded-lg font-bold transition-all active:scale-95 flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const SectionHeading = ({ title, subtitle, light = false }: { title: string, subtitle?: string, light?: boolean }) => (
  <div className="mb-12 text-center">
    <h2 className={`text-3xl md:text-4xl lg:text-5xl mb-4 ${light ? 'text-white' : 'text-brand-charcoal'}`}>
      {title}
    </h2>
    {subtitle && (
      <p className={`text-lg max-w-2xl mx-auto ${light ? 'text-gray-300' : 'text-gray-600'}`}>
        {subtitle}
      </p>
    )}
  </div>
);

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-brand-orange rounded-lg flex items-center justify-center text-white">
            <Wrench size={24} />
          </div>
          <span className={`text-xl font-display font-bold tracking-tighter ${!isScrolled ? 'text-white' : 'text-brand-charcoal'}`}>
            ENGINE<span className="text-brand-orange">PRO</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {['Services', 'How It Works', 'Why Us', 'Reviews'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className={`font-medium transition-colors ${!isScrolled ? 'text-white hover:text-brand-orange' : 'text-brand-charcoal hover:text-brand-orange'}`}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a href="tel:3138508660" className={`flex items-center gap-2 font-bold ${!isScrolled ? 'text-white' : 'text-brand-charcoal'}`}>
            <Phone size={18} className="text-brand-orange" />
            (313) 850-8660
          </a>
          <Button 
            className="py-2 px-5 text-sm"
            onClick={() => window.location.href = 'sms:+13138508660?body=I would like to book a service for my equipment.'}
          >
            Book Now
          </Button>
        </div>

        <button 
          className="md:hidden text-brand-charcoal p-2"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu size={28} className={!isScrolled ? 'text-white' : 'text-brand-charcoal'} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed inset-0 bg-white z-[60] p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-2xl font-display font-bold">ENGINE<span className="text-brand-orange">PRO</span></span>
              <button onClick={() => setIsMenuOpen(false)}><X size={32} /></button>
            </div>
            <div className="flex flex-col gap-6 text-2xl font-bold">
              {['Services', 'How It Works', 'Why Us', 'Reviews'].map((item) => (
                <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} onClick={() => setIsMenuOpen(false)}>
                  {item}
                </a>
              ))}
            </div>
            <div className="mt-auto flex flex-col gap-4">
              <Button 
                className="w-full text-xl py-5"
                onClick={() => window.location.href = 'tel:3138508660'}
              >
                Call Now
              </Button>
              <Button 
                variant="secondary" 
                className="w-full text-xl py-5"
                onClick={() => window.location.href = 'sms:+13138508660?body=I would like to get a quote for my equipment.'}
              >
                Get a Quote
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-brand-blue">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=2070" 
          alt="Mechanic working" 
          className="w-full h-full object-cover opacity-30"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue via-brand-blue/80 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-brand-orange/20 text-brand-orange px-4 py-1 rounded-full font-bold text-sm mb-6 uppercase tracking-widest border border-brand-orange/30">
              On-Site Repair Specialists
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-[0.9]">
              WE COME TO YOU.<br />
              <span className="text-brand-orange">WE FIX IT FAST.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-xl leading-relaxed">
              Professional on-site small engine repair for lawn mowers, snow blowers, generators & more. No hauling, no hassle.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="text-lg px-10 py-5"
                onClick={() => window.location.href = 'tel:3138508660'}
              >
                <Phone size={20} />
                Call Now
              </Button>
              <Button 
                variant="secondary" 
                className="text-lg px-10 py-5"
                onClick={() => window.location.href = 'sms:+13138508660?body=I would like to book a service for my equipment.'}
              >
                <Calendar size={20} />
                Book Service
              </Button>
            </div>

            <div className="mt-12 flex items-center gap-6 text-white/60">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={20} className="text-brand-green" />
                <span className="font-medium">Same-Day Service</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Trust Card */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="hidden lg:block absolute right-12 bottom-24 glass-card p-8 rounded-2xl max-w-sm"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="flex -space-x-2">
            {[1,2,3].map(i => (
              <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-10 h-10 rounded-full border-2 border-white" alt="User" />
            ))}
          </div>
          <div>
            <div className="flex text-brand-orange">
              {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
            </div>
            <p className="text-xs font-bold text-gray-500 uppercase">500+ Local Repairs</p>
          </div>
        </div>
        <p className="text-brand-charcoal font-medium italic">
          "Showed up within 2 hours and had my generator running before the storm hit. Absolute lifesaver!"
        </p>
        <p className="text-sm font-bold mt-2">— Mike R., Homeowner</p>
      </motion.div>
    </section>
  );
};

const TrustBar = () => (
  <div className="bg-white border-b border-gray-100 py-8">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { icon: <Clock className="text-brand-orange" />, text: "Same-Day Service" },
          { icon: <Truck className="text-brand-orange" />, text: "Mobile On-Site Repairs" },
          { icon: <Zap className="text-brand-orange" />, text: "Transparent Pricing" },
          { icon: <ShieldCheck className="text-brand-orange" />, text: "Experienced Techs" }
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-center gap-3">
            {item.icon}
            <span className="font-bold text-sm md:text-base uppercase tracking-tight">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Services = () => {
  const services = [
    { icon: <Scissors />, title: "Lawn Mowers", desc: "Push mowers, zero-turns, and riding tractors. Full Tune-Up Service." },
    { icon: <Wind />, title: "Snow Blowers", desc: "Belt replacement and carburetor cleaning for winter readiness. Full Tune-Up Service." },
    { icon: <Power />, title: "Generators", desc: "Critical maintenance and repair to ensure you're never left in the dark. Full Tune-Up Service." },
    { icon: <Droplets />, title: "Power Washers", desc: "Engine tuning for maximum pressure. Full Tune-Up Service." }
  ];

  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="What We Repair" 
          subtitle="We specialize in all major brands and types of small engine equipment. If it has a small engine, we can fix it at your doorstep."
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-orange group-hover:text-white transition-colors">
                {service.icon}
              </div>
              <h3 className="text-2xl mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.desc}</p>
              <div className="flex items-center text-brand-orange font-bold text-sm uppercase tracking-wider">
                We come to you <ChevronRight size={16} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProblemSolution = () => (
  <section className="py-24 bg-brand-blue text-white overflow-hidden relative">
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/2">
          <h2 className="text-4xl md:text-6xl mb-8 leading-tight">
            Stop Hauling.<br />
            <span className="text-brand-orange">Start Fixing.</span>
          </h2>
          <div className="space-y-6">
            {[
              "Equipment won't start when you need it most",
              "No way to transport heavy machinery to a shop",
              "Local shops have 3-week wait times",
              "Inconvenient drop-off and pick-up windows"
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="mt-1 text-red-500"><X size={20} /></div>
                <p className="text-xl text-gray-300">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 p-8 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-2xl font-medium italic text-brand-orange mb-4">The Solution:</p>
            <p className="text-xl text-gray-200">
              Mobile Engine Pro comes directly to your home and fixes your equipment on-site. Professional service, honest pricing, and zero hassle.
            </p>
          </div>
        </div>
        <div className="lg:w-1/2 relative">
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white/5">
            <img 
              src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=2070" 
              alt="Repairing engine" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-orange/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-green/20 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  </section>
);

const HowItWorks = () => (
  <section id="how-it-works" className="py-24 bg-white">
    <div className="container mx-auto px-4">
      <SectionHeading 
        title="Simple. Fast. Done." 
        subtitle="Getting your equipment fixed has never been easier. We've streamlined the entire process for your convenience."
      />
      
      <div className="grid md:grid-cols-3 gap-12 relative">
        {/* Connector Line (Desktop) */}
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-100 -translate-y-1/2 z-0"></div>
        
        {[
          { step: "01", title: "Request a Quote", desc: "Call us or fill out our quick online form with your equipment details.", icon: <Phone /> },
          { step: "02", title: "We Come to You", desc: "Our technician arrives at your home with a fully equipped mobile shop.", icon: <Truck /> },
          { step: "03", title: "Fixed On-Site", desc: "Most repairs are completed in under an hour. You're back to work immediately.", icon: <Wrench /> }
        ].map((item, i) => (
          <div key={i} className="relative z-10 text-center group">
            <div className="w-20 h-20 bg-white border-4 border-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:border-brand-orange transition-colors">
              <div className="text-brand-orange">{item.icon}</div>
            </div>
            <span className="text-brand-orange font-black text-5xl opacity-10 absolute top-0 left-1/2 -translate-x-1/2 -z-10">{item.step}</span>
            <h3 className="text-2xl mb-4">{item.title}</h3>
            <p className="text-gray-600 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <Button 
          className="mx-auto px-12 py-5 text-xl"
          onClick={() => window.location.href = 'sms:+13138508660?body=I would like to get started with a service booking.'}
        >
          Get Started Now
        </Button>
      </div>
    </div>
  </section>
);

const WhyChooseUs = () => (
  <section id="why-us" className="py-24 bg-gray-50">
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-16">
        <div className="lg:w-1/2">
          <SectionHeading 
            title="Built for Convenience. Backed by Skill." 
            subtitle="We aren't just handymen. We are professional small engine technicians dedicated to quality and customer service."
          />
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { title: "Mobile Service", desc: "We save you the time and effort of transporting heavy equipment." },
              { title: "Fast Turnaround", desc: "Most repairs done same-day or next-day. No weeks of waiting." },
              { title: "Honest Pricing", desc: "Upfront quotes with no hidden fees or surprise charges." },
              { title: "Expert Diagnostics", desc: "We find the root cause, not just a quick fix for the symptoms." }
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="mt-1 text-brand-green"><CheckCircle2 size={24} /></div>
                <div>
                  <h4 className="text-lg mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:w-1/2 grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <img src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=1000" className="rounded-2xl h-64 w-full object-cover" alt="Tool" referrerPolicy="no-referrer" />
            <div className="bg-brand-orange p-8 rounded-2xl text-white">
              <p className="text-4xl font-black mb-2">7+</p>
              <p className="font-bold uppercase text-sm tracking-widest">Years Experience</p>
            </div>
          </div>
          <div className="space-y-4 pt-8">
            <div className="bg-brand-blue p-8 rounded-2xl text-white">
              <p className="text-4xl font-black mb-2">100%</p>
              <p className="font-bold uppercase text-sm tracking-widest">Satisfaction</p>
            </div>
            <img src="https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&q=80&w=1000" className="rounded-2xl h-64 w-full object-cover" alt="Engine Repair" referrerPolicy="no-referrer" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section id="reviews" className="py-24 bg-white">
    <div className="container mx-auto px-4">
      <SectionHeading 
        title="What Our Customers Say" 
        subtitle="Don't just take our word for it. We've helped hundreds of homeowners get their equipment back in action."
      />
      
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { name: "Sarah Jenkins", text: "Saved me from replacing my mower. They showed up on time and had it running in 30 minutes. Highly recommend!", rating: 5 },
          { name: "David Miller", text: "Showed up fast and fixed my snow blower same day before a big storm. Way easier than taking it to a shop.", rating: 5 },
          { name: "Robert Chen", text: "Professional, clean, and honest. The price was exactly what was quoted. Best repair service I've used.", rating: 5 }
        ].map((item, i) => (
          <div key={i} className="p-8 rounded-2xl bg-gray-50 border border-gray-100">
            <div className="flex text-brand-orange mb-4">
              {[...Array(item.rating)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
            </div>
            <p className="text-gray-700 italic mb-6 text-lg leading-relaxed">"{item.text}"</p>
            <p className="font-bold text-brand-charcoal">— {item.name}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ServiceArea = () => (
  <section className="py-24 bg-brand-blue text-white">
    <div className="container mx-auto px-4 text-center">
      <div className="inline-flex items-center gap-2 text-brand-orange font-bold uppercase tracking-widest mb-6">
        <MapPin size={20} />
        Local & Reliable
      </div>
      <h2 className="text-4xl md:text-6xl mb-8">Serving Your Local Area</h2>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
        We provide mobile small engine repair services to homeowners and businesses throughout the greater metropolitan area and surrounding suburbs. 
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        {["Detroit", "Dearborn", "Dearborn Heights", "Garden City", "Livonia", "Canton", "Plymouth"].map(area => (
          <span key={area} className="px-6 py-2 bg-white/10 rounded-full font-medium border border-white/10">{area}</span>
        ))}
      </div>
    </div>
  </section>
);

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    equipment: 'Lawn Mower',
    modelNumber: '',
    issue: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [submitType, setSubmitType] = useState<'sms' | 'email'>('sms');

  const handleSmsSubmit = (e: React.MouseEvent | React.FormEvent) => {
    if (e) e.preventDefault();
    console.log('SMS button clicked');
    const message = `New Quote Request:\nName: ${formData.name}\nPhone: ${formData.phone}\nEquipment: ${formData.equipment}\nModel: ${formData.modelNumber}\nIssue: ${formData.issue}`;
    setSubmitType('sms');
    window.location.href = `sms:+13138508660?body=${encodeURIComponent(message)}`;
    setIsSubmitted(true);
  };

  const handleEmailSubmit = async (e: React.MouseEvent | React.FormEvent) => {
    if (e) e.preventDefault();
    
    console.log('Email button clicked');
    setStatusMessage('Checking fields...');
    
    if (!formData.name || !formData.phone || !formData.issue) {
      setStatusMessage('Error: Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);
    setStatusMessage('Sending request to server...');
    setSubmitType('email');
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // 20 second timeout
    
    try {
      // Use a relative path to ensure it works on both preview and live sites
      const apiUrl = 'api/send-email';
      console.log(`Fetching ${apiUrl}...`);
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      console.log('Response received, status:', response.status);
      
      const data = await response.json().catch(() => ({ error: 'Invalid response from server' }));

      if (response.ok) {
        setStatusMessage('Success! Redirecting...');
        setIsSubmitted(true);
      } else {
        const errorMsg = typeof data.error === 'object' ? JSON.stringify(data.error) : (data.error || 'Unknown error');
        setStatusMessage(`Error: ${errorMsg}`);
      }
    } catch (error: any) {
      clearTimeout(timeoutId);
      console.error('Fetch error:', error);
      if (error.name === 'AbortError') {
        setStatusMessage('Error: Request timed out. The server is taking too long to respond.');
      } else {
        const errorMsg = error instanceof Error ? error.message : String(error);
        setStatusMessage(`Network Error: ${errorMsg}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto glass-card rounded-3xl overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-2/5 bg-brand-blue p-12 text-white">
            <h3 className="text-3xl mb-6">Get a Free Quote</h3>
            <p className="text-gray-400 mb-12">Tell us what's wrong and we'll give you an estimate and schedule a visit.</p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-brand-orange">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase font-bold tracking-widest">Call Us</p>
                  <p className="text-xl font-bold">(313) 850-8660</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-brand-orange">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase font-bold tracking-widest">Hours</p>
                  <p className="text-xl font-bold">Mon-Sat: 8am - 6pm</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-3/5 p-12 bg-white">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6" 
                >
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange outline-none transition-all" 
                      placeholder="John Doe" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Phone</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange outline-none transition-all" 
                      placeholder="(313) 000-0000" 
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Equipment Type</label>
                    <select 
                      value={formData.equipment}
                      onChange={e => setFormData({...formData, equipment: e.target.value})}
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange outline-none transition-all appearance-none"
                    >
                      <option>Lawn Mower</option>
                      <option>Snow Blower</option>
                      <option>Generator</option>
                      <option>Power Washer</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Model Number (Optional)</label>
                    <input 
                      type="text" 
                      value={formData.modelNumber}
                      onChange={e => setFormData({...formData, modelNumber: e.target.value})}
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange outline-none transition-all" 
                      placeholder="e.g. John Deere S100 or Honda HRX217" 
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Describe the Issue</label>
                    <textarea 
                      required
                      value={formData.issue}
                      onChange={e => setFormData({...formData, issue: e.target.value})}
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange outline-none transition-all h-32" 
                      placeholder="My mower won't start after sitting all winter..."
                    ></textarea>
                  </div>
                  <div className="sm:col-span-2 space-y-4">
                    {statusMessage && (
                      <div className={`p-4 rounded-xl text-sm font-bold ${statusMessage.startsWith('Error') ? 'bg-red-100 text-red-600' : 'bg-brand-blue/10 text-brand-blue'}`}>
                        {statusMessage}
                      </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button 
                        type="button" 
                        onClick={handleSmsSubmit} 
                        className="w-full py-5 text-lg bg-brand-orange hover:bg-[#e65c00] text-white shadow-lg shadow-brand-orange/20 rounded-lg font-bold transition-all active:scale-95 flex items-center justify-center gap-2"
                        disabled={isSubmitting}
                      >
                        Request via Text
                      </button>
                      <button 
                        type="button" 
                        onClick={handleEmailSubmit} 
                        className="w-full py-5 text-lg bg-brand-blue hover:bg-slate-900 text-white rounded-lg font-bold transition-all active:scale-95 flex items-center justify-center gap-2"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending...' : 'Request via Email'}
                      </button>
                    </div>
                  </div>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center p-8"
                >
                  <div className="w-20 h-20 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-3xl mb-4">{submitType === 'sms' ? 'Message Prepared!' : 'Request Sent!'}</h3>
                  <p className="text-gray-600 text-lg mb-8">
                    {submitType === 'sms' 
                      ? 'Your SMS app should have opened with the quote details. Please hit "Send" to complete the request.' 
                      : 'Your request has been sent automatically to our team. We will contact you shortly.'}
                  </p>
                  <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                    Send Another Request
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-brand-blue text-white pt-24 pb-12">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-brand-orange rounded-lg flex items-center justify-center text-white">
              <Wrench size={24} />
            </div>
            <span className="text-2xl font-display font-bold tracking-tighter">
              ENGINE<span className="text-brand-orange">PRO</span>
            </span>
          </div>
          <p className="text-gray-400 text-lg max-w-md mb-8">
            Professional on-site small engine repair service. We eliminate the hassle of transporting equipment by bringing the shop to your driveway.
          </p>
          <div className="flex gap-4">
            {/* Social Placeholders */}
            {[1,2,3].map(i => (
              <div key={i} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand-orange transition-colors cursor-pointer border border-white/10">
                <div className="w-4 h-4 bg-white/20 rounded-sm"></div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-xl font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-gray-400">
            <li><a href="#services" className="hover:text-brand-orange transition-colors">Our Services</a></li>
            <li><a href="#how-it-works" className="hover:text-brand-orange transition-colors">How It Works</a></li>
            <li><a href="#why-us" className="hover:text-brand-orange transition-colors">Why Choose Us</a></li>
            <li><a href="#reviews" className="hover:text-brand-orange transition-colors">Reviews</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-xl font-bold mb-6">Contact</h4>
          <ul className="space-y-4 text-gray-400">
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-brand-orange" />
              (313) 850-8660
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={18} className="text-brand-orange" />
              Serving Metro Area
            </li>
            <li className="flex items-center gap-3">
              <Clock size={18} className="text-brand-orange" />
              Mon-Sat: 8am - 6pm
            </li>
          </ul>
        </div>
      </div>
      
      <div className="pt-12 border-t border-white/5 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Mobile Engine Pro. All rights reserved. Professional Small Engine Repair.</p>
      </div>
    </div>
  </footer>
);

// --- Main App ---

export default function App() {
  const [apiStatus, setApiStatus] = useState<any>(null);

  useEffect(() => {
    // Verify API connectivity on startup
    fetch('api/health')
      .then(res => res.json())
      .then(data => {
        console.log('API Health Check:', data);
        setApiStatus(data);
      })
      .catch(err => {
        console.error('API Health Check Failed:', err);
        setApiStatus({ error: err.message });
      });
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <ProblemSolution />
        <HowItWorks />
        <WhyChooseUs />
        <Testimonials />
        <ServiceArea />
        <ContactForm />
      </main>
      <Footer />
      
      {/* Debug API Status (Hidden in production usually, but helpful now) */}
      <div className="fixed bottom-2 right-2 text-[10px] text-gray-500 bg-white/80 p-1 rounded border border-gray-200 z-50">
        API: {apiStatus ? (apiStatus.error ? `Error: ${apiStatus.error}` : `OK (${apiStatus.serverId})`) : 'Checking...'}
      </div>
      
      {/* Sticky Mobile CTA */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-40">
        <Button 
          className="w-full py-5 text-xl shadow-2xl shadow-brand-orange/40"
          onClick={() => window.location.href = 'tel:3138508660'}
        >
          <Phone size={24} />
          Call Now
        </Button>
      </div>
    </div>
  );
}
