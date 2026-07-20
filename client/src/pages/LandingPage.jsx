import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import InquiryModal from '../components/InquiryModal';

function LandingPage() {
  const [hero, setHero] = useState(null);
  const [about, setAbout] = useState(null);
  const [services, setServices] = useState([]);
  const [properties, setProperties] = useState([]);
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [contact, setContact] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [faqActive, setFaqActive] = useState({});

  // Inquiry form states
  const [inquiryData, setInquiryData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [inquiryStatus, setInquiryStatus] = useState({ loading: false, success: false, error: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          heroRes,
          aboutRes,
          servicesRes,
          propertiesRes,
          projectsRes,
          testimonialsRes,
          faqsRes,
          contactRes
        ] = await Promise.all([
          axios.get('http://localhost:5000/api/hero'),
          axios.get('http://localhost:5000/api/about'),
          axios.get('http://localhost:5000/api/services'),
          axios.get('http://localhost:5000/api/properties'),
          axios.get('http://localhost:5000/api/projects'),
          axios.get('http://localhost:5000/api/testimonials'),
          axios.get('http://localhost:5000/api/faq'),
          axios.get('http://localhost:5000/api/contact')
        ]);

        setHero(heroRes.data[0] || null);
        setAbout(aboutRes.data[0] || null);
        setServices(servicesRes.data);
        setProperties(propertiesRes.data);
        setProjects(projectsRes.data);
        setTestimonials(testimonialsRes.data);
        setFaqs(faqsRes.data);
        setContact(contactRes.data[0] || null);
      } catch (error) {
        console.error('Error fetching CMS data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleInquiryChange = (e) => {
    setInquiryData({ ...inquiryData, [e.target.name]: e.target.value });
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setInquiryStatus({ loading: true, success: false, error: '' });
    try {
      await axios.post('http://localhost:5000/api/inquiries', inquiryData);
      setInquiryStatus({ loading: false, success: true, error: '' });
      setInquiryData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => {
        setInquiryStatus(prev => ({ ...prev, success: false }));
      }, 3000);
    } catch (err) {
      setInquiryStatus({
        loading: false,
        success: false,
        error: err.response?.data?.message || 'Failed to submit inquiry. Please try again.'
      });
    }
  };

  const toggleFaq = (id) => {
    setFaqActive(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-beige flex items-center justify-center flex-col space-y-4">
        <svg className="animate-spin h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <span className="text-xs uppercase font-bold tracking-widest text-primary/80">Loading Experience...</span>
      </div>
    );
  }

  // Fallback defaults if DB is empty
  const activeHero = hero || {
    title: "one",
    subtitle: "CODENAME",
    description: "Subhash Nagar, Chembur, Mumbai. Where home extends to life.",
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
    buttonText: "EXPLORE THE PROJECT"
  };

  const activeAbout = about || {
    title: "A Legacy Built for the Future",
    description: "Located in Subhash Nagar, Chembur, this residential redevelopment offers a practical yet elevated living experience. Comprising 1 & 2 BHK residences + 16-Story Habitational Floors, the project is planned with a strong focus on functionality and lifestyle.",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
  };

  return (
    <div className="relative">
      <Navbar onEnquireClick={() => setIsModalOpen(true)} />

      {/* 1. HERO SECTION */}
      <section
        id="home"
        className="relative h-screen bg-cover bg-center flex items-center justify-start text-white pt-20"
        style={{ backgroundImage: `linear-gradient(to right, rgba(29, 22, 19, 0.85) 40%, rgba(29, 22, 19, 0.4) 100%), url(${activeHero.imageUrl})` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-xl flex flex-col space-y-6">
            <span className="text-accent text-xs font-bold tracking-widest uppercase">
              Subhash Nagar, Chembur, Mumbai
            </span>
            <div className="flex flex-col">
              <span className="text-beige-dark text-lg font-bold tracking-widest uppercase mb-1">
                {activeHero.subtitle}
              </span>
              <h1 className="text-white text-7xl sm:text-8xl font-extrabold tracking-tighter uppercase leading-none">
                {activeHero.title}
              </h1>
              <span className="text-accent text-xs font-bold tracking-widest uppercase mt-2">
                CHEMBUR
              </span>
            </div>
            <p className="text-beige-dark text-sm sm:text-base font-light italic leading-relaxed">
              "{activeHero.description}"
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => {
                  const el = document.getElementById('about');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="border border-white hover:bg-white hover:text-primary transition-all duration-300 text-xs font-bold tracking-widest px-8 py-3.5 uppercase"
              >
                {activeHero.buttonText}
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-accent hover:bg-accent-dark text-white border border-accent/20 transition-all duration-300 text-xs font-bold tracking-widest px-8 py-3.5 uppercase"
              >
                ENQUIRE NOW
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT PROJECT SECTION */}
      <section id="about" className="py-24 bg-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column (Text) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-accent text-xs font-bold tracking-widest uppercase">
                ABOUT THE PROJECT
              </span>
              <h2 className="text-primary text-3xl sm:text-4xl font-extrabold tracking-tight">
                {activeAbout.title}
              </h2>
              <p className="text-primary/80 text-sm leading-relaxed font-light">
                {activeAbout.description}
              </p>
              
              <ul className="space-y-3 pt-2 text-xs text-primary/90 font-medium">
                <li className="flex items-center space-x-3">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                  <span>1 & 2 BHK Residences</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                  <span>Ground-Level Commercial Spaces</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                  <span>16-Story Habitational Floors</span>
                </li>
              </ul>

              <div className="pt-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-primary hover:bg-primary-dark text-beige text-xs font-bold tracking-widest px-8 py-3.5 uppercase transition-all shadow-md"
                >
                  DOWNLOAD BROCHURE
                </button>
              </div>
            </div>

            {/* Right Column (Stats + Image) */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-white p-6 border-l-4 border-accent shadow-sm flex flex-col justify-center">
                  <span className="text-primary text-3xl font-extrabold">3.25</span>
                  <span className="text-primary/60 text-[9px] uppercase tracking-wider font-bold mt-1">
                    MILLION SQ FT ONGOING
                  </span>
                </div>
                <div className="bg-white p-6 border-l-4 border-accent shadow-sm flex flex-col justify-center">
                  <span className="text-primary text-3xl font-extrabold">3.55</span>
                  <span className="text-primary/60 text-[9px] uppercase tracking-wider font-bold mt-1">
                    MILLION SQ FT COMPLETED
                  </span>
                </div>
                <div className="bg-white p-6 border-l-4 border-accent shadow-sm flex flex-col justify-center">
                  <span className="text-primary text-3xl font-extrabold">2600+</span>
                  <span className="text-primary/60 text-[9px] uppercase tracking-wider font-bold mt-1">
                    HAPPY FAMILIES
                  </span>
                </div>
              </div>

              <div className="h-full min-h-[300px] border border-accent/20 bg-white/50 flex flex-col items-center justify-center p-6 text-center shadow-sm relative overflow-hidden">
                <img
                  src={activeAbout.imageUrl}
                  alt="Building"
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
                <div className="relative z-10 bg-primary/80 backdrop-blur-sm p-4 border border-accent/40">
                  <span className="text-beige text-sm font-bold uppercase tracking-wider block">Building Photo</span>
                  <span className="text-beige-dark text-[10px] uppercase tracking-widest mt-1 block">Subhash Nagar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CONNECTIVITY SECTION */}
      <section id="connectivity" className="py-24 bg-white border-y border-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* Map on Left */}
            <div className="bg-beige border border-accent/20 min-h-[400px] relative overflow-hidden flex flex-col items-center justify-center p-4">
              {/* Fallback graphic representing Map */}
              <div className="absolute inset-0 bg-opacity-10 bg-cover bg-center filter grayscale contrast-125" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=85')` }}></div>
              <div className="relative z-10 bg-white/95 backdrop-blur-md p-6 border border-accent/30 text-center max-w-sm rounded-sm shadow-xl">
                <span className="text-accent text-[10px] uppercase font-bold tracking-widest block mb-1">Interactive Map</span>
                <h4 className="text-primary font-extrabold text-sm mb-2 uppercase">Subhash Nagar Location Advantage</h4>
                <p className="text-primary/70 text-xs font-light mb-4">
                  Strategically situated at the heart of Chembur with fast access to Eastern Express Highway, BKC, and railway lines.
                </p>
                <div className="text-[10px] text-accent font-bold uppercase tracking-wider">Swastik Bliss / Chembur</div>
              </div>
            </div>

            {/* Travel Times on Right */}
            <div className="bg-primary text-beige p-8 sm:p-12 flex flex-col justify-between border border-accent/30">
              <div className="space-y-6">
                <span className="text-accent text-xs font-bold tracking-widest uppercase block">
                  LOCATION & CONNECTIVITY
                </span>
                <h2 className="text-white text-3xl font-extrabold tracking-tight">
                  What if your home is as well connected as your ambitions?
                </h2>
                <p className="text-beige-dark/70 text-xs italic font-light">"This is the one."</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-accent/25">
                  <div>
                    <h5 className="text-accent text-xs uppercase font-extrabold tracking-wider mb-3">Connectivity</h5>
                    <ul className="space-y-2 text-[11px] font-light text-beige-dark/95">
                      <li>• Chembur Railway — 5 min</li>
                      <li>• Monorail Station — 5 min</li>
                      <li>• Eastern Freeway — 7 min</li>
                      <li>• Upcoming Metro — 8 min</li>
                      <li>• BKC — 15 min</li>
                      <li>• Airport — 25 min</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-accent text-xs uppercase font-extrabold tracking-wider mb-3">Education</h5>
                    <ul className="space-y-2 text-[11px] font-light text-beige-dark/95">
                      <li>• AFAC High School — 1 min</li>
                      <li>• St. Antony's Girls — 1 min</li>
                      <li>• St. Gregorius High — 5 min</li>
                      <li>• Swami Vivekanand — 8 min</li>
                      <li>• Ryan International — 12 min</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-accent text-xs uppercase font-extrabold tracking-wider mb-3">Recreation</h5>
                    <ul className="space-y-2 text-[11px] font-light text-beige-dark/95">
                      <li>• K-Star Mall — 5 min</li>
                      <li>• Westside — 5 min</li>
                      <li>• Phoenix Marketcity — 17 min</li>
                      <li>• R City Mall — 15 min</li>
                      <li>• Fun Cinemas — 7 min</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROJECTS GALLERY SECTION */}
      <section id="gallery" className="py-24 bg-beige-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-accent text-xs font-bold tracking-widest uppercase">
              GALLERY
            </span>
            <h2 className="text-primary text-3xl sm:text-4xl font-extrabold tracking-tight">
              Every Angle Tells a Story
            </h2>
            <p className="text-primary/70 text-xs font-light">
              Explore actual renders and site construction updates of the building structure, lobby, and spaces.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.length > 0 ? (
              projects.map((proj) => (
                <div
                  key={proj._id}
                  className="group relative h-72 rounded-sm overflow-hidden border border-accent/20 shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <img
                    src={proj.imageUrl}
                    alt={proj.projectName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent flex flex-col justify-end p-6">
                    <h4 className="text-white text-base font-extrabold uppercase tracking-wide">
                      {proj.projectName}
                    </h4>
                    <p className="text-beige-dark text-xs font-light mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-normal line-clamp-2">
                      {proj.description}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-xs text-primary/60">
                No gallery projects available.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. SERVICES / AMENITIES SECTION */}
      <section id="amenities" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-accent text-xs font-bold tracking-widest uppercase">
              LIFESTYLE AMENITIES
            </span>
            <h2 className="text-primary text-3xl sm:text-4xl font-extrabold tracking-tight">
              A Lifestyle That Completes the Experience
            </h2>
            <p className="text-primary/70 text-xs font-light">
              What if your finest moments happened before you even left home? This is the one.
            </p>
          </div>

          {/* Grid of Amenities (showing 9 premium cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Gymnasium / Fitness Center", icon: "🏋️" },
              { title: "Indoor Games Area", icon: "🎲" },
              { title: "Yoga & Meditation Area", icon: "🧘" },
              { title: "Senior Citizen Seating Area", icon: "👵" },
              { title: "Walkway Track", icon: "🏃" },
              { title: "High-Speed Elevators", icon: "🛗" },
              { title: "Ample Parking", icon: "🅿️" },
              { title: "CCTV Security", icon: "🛡️" },
              { title: "Intercom System", icon: "📞" }
            ].map((amenity, index) => (
              <div
                key={index}
                className="bg-beige-light p-8 border border-accent/25 text-center flex flex-col items-center justify-center space-y-4 hover:bg-beige transition-colors duration-300 rounded-sm shadow-sm"
              >
                <span className="text-3xl">{amenity.icon}</span>
                <h4 className="text-primary text-xs uppercase font-extrabold tracking-widest">
                  {amenity.title}
                </h4>
              </div>
            ))}
          </div>

          {/* Services from CMS */}
          {services.length > 0 && (
            <div className="mt-20 pt-16 border-t border-accent/20">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <h3 className="text-primary text-2xl font-bold tracking-tight">CMS Managed Services</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map((service) => (
                  <div key={service._id} className="bg-beige-light p-6 border-t-4 border-primary rounded-sm shadow-sm">
                    <h4 className="text-primary font-bold text-sm uppercase tracking-wider mb-2">{service.title}</h4>
                    <p className="text-primary/70 text-xs font-light leading-relaxed">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 6. VIDEO PROMO SECTION */}
      <section className="py-24 bg-beige border-y border-accent/15">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-8">
          <div className="space-y-3">
            <h2 className="text-primary text-3xl font-extrabold tracking-tight">Experience One Chembur</h2>
            <p className="text-primary/70 text-xs italic font-light">Step inside and see what elevated living truly feels like.</p>
          </div>
          {/* Video Placeholder */}
          <div className="relative aspect-video bg-[#332219] border border-accent/40 flex items-center justify-center shadow-2xl group overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center opacity-65 group-hover:scale-102 transition-transform duration-500" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80')` }}></div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="relative z-10 w-16 h-16 rounded-full bg-primary hover:bg-accent text-white flex items-center justify-center transition-all duration-300 shadow-xl border border-accent/40"
            >
              <svg className="w-6 h-6 fill-current text-white translate-x-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* 7. FEATURED PROPERTIES (FLOOR PLANS) SECTION */}
      <section id="floorplans" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-accent text-xs font-bold tracking-widest uppercase">
              FLOOR PLANS
            </span>
            <h2 className="text-primary text-3xl sm:text-4xl font-extrabold tracking-tight">
              Find the Home That Fits Your Life
            </h2>
            <p className="text-primary/70 text-xs font-light">
              Interactive pricing matrix. Select configurations to request specific layouts and PDF brochures.
            </p>
          </div>

          {/* Properties Table */}
          <div className="overflow-x-auto border border-primary/20 shadow-sm rounded-sm mb-12">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-primary text-white uppercase tracking-wider font-semibold">
                  <th className="p-4 border-r border-primary-light/20">Unit Type</th>
                  <th className="p-4 border-r border-primary-light/20">Carpet Area</th>
                  <th className="p-4 border-r border-primary-light/20">Balcony</th>
                  <th className="p-4 border-r border-primary-light/20">Total Area</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-accent/15">
                {properties.map((prop) => (
                  <tr key={prop._id} className="hover:bg-beige-light transition-colors text-primary font-medium">
                    <td className="p-4 border-r border-accent/10">{prop.propertyName}</td>
                    <td className="p-4 border-r border-accent/10">
                      {prop.bedrooms > 0 ? `${prop.bedrooms * 285} sq.ft` : '285 sq.ft'}
                    </td>
                    <td className="p-4 border-r border-accent/10">
                      {prop.bedrooms > 0 ? `${prop.bedrooms * 45} sq.ft` : '45 sq.ft'}
                    </td>
                    <td className="p-4 border-r border-accent/10">{prop.area}</td>
                    <td className="p-4">
                      <button
                        onClick={() => setSelectedProperty(prop)}
                        className="text-accent hover:text-primary font-bold uppercase tracking-wider"
                      >
                        View Layout
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Layout Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {properties.map((prop) => (
              <div key={prop._id} className="bg-beige-light p-6 border border-accent/25 flex flex-col justify-between space-y-6 rounded-sm shadow-sm">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-primary text-base font-extrabold uppercase">{prop.propertyName}</h4>
                    <span className="text-[10px] text-accent font-bold uppercase tracking-widest bg-accent-light/10 px-2 py-0.5 border border-accent/15">
                      {prop.location.split(',')[1] || 'Chembur'}
                    </span>
                  </div>
                  <p className="text-[10px] text-primary/60 font-bold uppercase tracking-wide mb-4">
                    {prop.bedrooms} BHK · {prop.bathrooms} Bath · {prop.area}
                  </p>
                  
                  {/* Floor Plan Illustration Box */}
                  <div className="h-64 border border-accent/20 bg-white relative flex flex-col items-center justify-center p-4 overflow-hidden mb-4">
                    <img src={prop.imageUrl} alt="Floor Plan" className="w-full h-full object-cover opacity-90 hover:scale-102 transition-transform duration-300" />
                    <div className="absolute bottom-3 right-3 bg-primary/95 text-white text-[9px] uppercase tracking-widest px-2 py-1 border border-accent/30 font-semibold shadow-md">
                      Price: {prop.price}
                    </div>
                  </div>

                  <p className="text-primary/80 text-[11px] font-light leading-relaxed">
                    {prop.description}
                  </p>
                </div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-primary hover:bg-primary-dark text-white py-3 text-xs uppercase font-bold tracking-widest transition-colors border border-accent/25"
                >
                  DOWNLOAD PDF BROCHURE
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. MAHARERA DETAILS BANNER */}
      <section className="bg-primary text-beige py-12 border-y border-accent/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center md:space-x-8 space-y-4 md:space-y-0">
          <div className="w-20 h-20 bg-white p-1 flex-shrink-0 border border-accent/40 rounded-sm">
            {/* QR code placeholder */}
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://maharera.mahaonline.gov.in" alt="MahaRERA QR" className="w-full h-full" />
          </div>
          <div className="flex-grow space-y-2 text-center md:text-left">
            <h4 className="text-white text-xs uppercase tracking-widest font-extrabold">MAHARERA DETAILS (NOT UPDATED)</h4>
            <div className="text-accent text-[11px] font-bold">MahaRERA No.: PR1180002502829</div>
            <p className="text-[9px] font-light text-beige-dark/50 leading-relaxed max-w-4xl">
              This communication is purely conceptual and not a legal offering. The information contained herein is only indicative in nature. The building design, project amenities and facilities are subject to final approval by the concerned authority. All the artworks, features, views, surroundings, landscapes, amenities, images, models, aesthetics, building elevation, furniture, fixtures, interior work, design and/or any other details are artistic conceptualization for illustration purpose only and do not purport to replicate the offering.
            </p>
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-24 bg-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-accent text-xs font-bold tracking-widest uppercase">
              TESTIMONIALS
            </span>
            <h2 className="text-primary text-3xl sm:text-4xl font-extrabold tracking-tight">
              What Our Buyers Say
            </h2>
            <p className="text-primary/70 text-xs font-light">
              Real reviews from real home buyers at Chembur who trusted Swastik Group for their future legacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.length > 0 ? (
              testimonials.map((test) => (
                <div
                  key={test._id}
                  className="bg-white p-8 border border-accent/20 rounded-sm shadow-sm flex flex-col justify-between space-y-4"
                >
                  <p className="text-primary/80 text-xs font-light italic leading-relaxed">
                    "{test.review}"
                  </p>
                  <div>
                    <h5 className="text-primary text-xs uppercase tracking-widest font-bold border-t border-accent/20 pt-4 mt-2">
                      {test.name}
                    </h5>
                    <span className="text-accent text-[9px] uppercase tracking-wider font-bold">Verified Buyer</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-xs text-primary/60">
                No testimonials available.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 10. FAQ SECTION */}
      <section id="faq" className="py-24 bg-beige-light border-y border-accent/15">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-16 space-y-3">
            <span className="text-accent text-xs font-bold tracking-widest uppercase">
              FAQ
            </span>
            <h2 className="text-primary text-3xl font-extrabold tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq._id} className="bg-white border border-accent/25 rounded-sm overflow-hidden shadow-sm">
                <button
                  onClick={() => toggleFaq(faq._id)}
                  className="w-full text-left px-6 py-4 flex justify-between items-center text-primary font-bold uppercase tracking-wider text-xs focus:outline-none"
                >
                  <span>{faq.question}</span>
                  <span className="text-accent font-extrabold text-base">
                    {faqActive[faq._id] ? '−' : '+'}
                  </span>
                </button>
                {faqActive[faq._id] && (
                  <div className="px-6 pb-4 text-xs font-light leading-relaxed text-primary/80 border-t border-accent/10 pt-3 bg-beige-light/30">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. DEVELOPER SECTION */}
      <section id="developer" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column (Logo placeholder) */}
            <div className="lg:col-span-4 bg-beige border border-accent/20 aspect-square flex flex-col items-center justify-center p-6 shadow-sm rounded-sm">
              <div className="border-2 border-primary/40 p-4 rounded-sm mb-4 text-center max-w-[200px]">
                <span className="text-primary font-black text-3xl tracking-tighter uppercase block">SWASTIK</span>
                <span className="text-accent text-[9px] uppercase tracking-widest font-extrabold mt-1 block">A LEGACY OF TRUST</span>
              </div>
              <span className="text-[10px] text-primary/60 font-bold uppercase tracking-widest">Est. 1998 · Mumbai</span>
            </div>

            {/* Right Column (Text) */}
            <div className="lg:col-span-8 space-y-6">
              <span className="text-accent text-xs font-bold tracking-widest uppercase">
                ABOUT THE DEVELOPER
              </span>
              <h2 className="text-primary text-3xl font-extrabold tracking-tight">
                Swastik Group
              </h2>
              <span className="text-primary/70 text-xs italic block font-light">"A legacy of trust"</span>
              <p className="text-primary/80 text-xs font-light leading-relaxed">
                Swastik Group has been shaping Mumbai's residential and commercial landscape with decades of trusted development. Each project reflects a commitment to quality construction, functional design, and community-centered living — delivered with the reliability that has made Swastik a preferred name for homebuyers across the city.
              </p>

              {/* Consultants Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-accent/20">
                <div>
                  <h5 className="text-accent text-[9px] uppercase font-bold tracking-widest mb-1">Architect</h5>
                  <p className="text-primary text-xs font-semibold">Rohit Purnar, Snd Sanpada DBS</p>
                </div>
                <div>
                  <h5 className="text-accent text-[9px] uppercase font-bold tracking-widest mb-1">RCC Consultant</h5>
                  <p className="text-primary text-xs font-semibold">System Structural Consultants</p>
                </div>
                <div>
                  <h5 className="text-accent text-[9px] uppercase font-bold tracking-widest mb-1">Vaastu Consultant</h5>
                  <p className="text-primary text-xs font-semibold">Kamlesh Mehta, Vaastu Consultant</p>
                </div>
                <div>
                  <h5 className="text-accent text-[9px] uppercase font-bold tracking-widest mb-1">Legal Consultant</h5>
                  <p className="text-primary text-xs font-semibold">Liaison Law Partners</p>
                </div>
                <div>
                  <h5 className="text-accent text-[9px] uppercase font-bold tracking-widest mb-1">MEP Consultant</h5>
                  <p className="text-primary text-xs font-semibold">Rupesh Gujarati</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. BOTTOM CALL TO ACTION ( skyline ) */}
      <section className="relative py-32 bg-cover bg-center text-white text-center border-t border-accent/20" style={{ backgroundImage: `linear-gradient(to bottom, rgba(29, 22, 19, 0.9), rgba(29, 22, 19, 0.7)), url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1600&q=80')` }}>
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <span className="text-accent text-xs font-bold tracking-widest uppercase block">READY TO CALL IT HOME?</span>
          <h2 className="text-white text-4xl sm:text-5xl font-extrabold tracking-tight">Your Next Chapter Begins in Chembur</h2>
          <div className="flex flex-wrap justify-center gap-4 pt-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white hover:bg-beige-dark text-primary border border-white transition-all duration-300 text-xs font-bold tracking-widest px-8 py-3.5 uppercase"
            >
              SCHEDULE A SITE VISIT
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="border border-white hover:bg-white hover:text-primary transition-all duration-300 text-xs font-bold tracking-widest px-8 py-3.5 uppercase"
            >
              DOWNLOAD BROCHURE
            </button>
          </div>
        </div>
      </section>

      {/* 13. CONTACT FORM / INQUIRY FORM */}
      <section id="contact" className="py-24 bg-beige border-t border-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            {/* Contact Details on Left */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8 bg-primary text-beige p-8 sm:p-12 border border-accent/30 rounded-sm">
              <div className="space-y-6">
                <span className="text-accent text-xs font-bold tracking-widest uppercase block">CONTACT INFORMATION</span>
                <h3 className="text-white text-2xl font-extrabold tracking-tight">Visit Us or Connect Directly</h3>
                
                <div className="space-y-6 pt-4 text-xs font-light">
                  <div className="flex items-start space-x-3">
                    <span className="text-accent text-base mt-0.5">📍</span>
                    <div>
                      <h5 className="font-bold uppercase tracking-wider text-white mb-1">Corporate Address</h5>
                      <p className="text-beige-dark/95 leading-relaxed">
                        {contact?.address || '312, Swastik Group, Swastik House, Corporate Park, L.B.S. Marg, Ghatkopar (West), Mumbai - 400086'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <span className="text-accent text-base mt-0.5">📞</span>
                    <div>
                      <h5 className="font-bold uppercase tracking-wider text-white mb-1">Phone Numbers</h5>
                      <p className="text-beige-dark/95">{contact?.phone || '+91 022-6689 0000 / +91 98201 08988'}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <span className="text-accent text-base mt-0.5">✉️</span>
                    <div>
                      <h5 className="font-bold uppercase tracking-wider text-white mb-1">Email Address</h5>
                      <p className="text-beige-dark/95">{contact?.email || 'swastikgroup123@gmail.com'}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-[10px] text-accent font-bold uppercase tracking-widest border-t border-accent/20 pt-4">
                Swastik Group Legacy
              </div>
            </div>

            {/* Contact / Lead Form on Right */}
            <form onSubmit={handleInquirySubmit} className="lg:col-span-7 bg-white p-8 sm:p-12 border border-accent/25 rounded-sm shadow-sm space-y-6">
              <h3 className="text-primary text-xl font-bold uppercase tracking-wider border-b border-accent/20 pb-3">Send an Inquiry</h3>
              
              {inquiryStatus.error && (
                <div className="p-3 bg-red-50 border-l-2 border-red-500 text-red-700 text-xs rounded-sm">
                  {inquiryStatus.error}
                </div>
              )}
              {inquiryStatus.success && (
                <div className="p-3 bg-green-50 border-l-2 border-green-500 text-green-700 text-xs rounded-sm">
                  Thank you! Your inquiry has been submitted successfully.
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[9px] uppercase font-bold tracking-widest text-primary/70 mb-1">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={inquiryData.name}
                    onChange={handleInquiryChange}
                    placeholder="Anish Sharma"
                    className="w-full bg-beige-light border border-accent/25 px-4 py-2.5 text-xs focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-[9px] uppercase font-bold tracking-widest text-primary/70 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={inquiryData.email}
                    onChange={handleInquiryChange}
                    placeholder="anish@example.com"
                    className="w-full bg-beige-light border border-accent/25 px-4 py-2.5 text-xs focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] uppercase font-bold tracking-widest text-primary/70 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={inquiryData.phone}
                  onChange={handleInquiryChange}
                  placeholder="+91 98765 43210"
                  className="w-full bg-beige-light border border-accent/25 px-4 py-2.5 text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase font-bold tracking-widest text-primary/70 mb-1">Your Message *</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={inquiryData.message}
                  onChange={handleInquiryChange}
                  placeholder="I am interested in scheduling a site visit for 2 BHK Alto..."
                  className="w-full bg-beige-light border border-accent/25 px-4 py-2.5 text-xs focus:outline-none focus:border-primary resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={inquiryStatus.loading}
                className="w-full bg-primary hover:bg-primary-dark text-white py-3.5 text-xs uppercase font-bold tracking-widest transition-colors flex items-center justify-center space-x-2"
              >
                {inquiryStatus.loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>SENDING INQUIRY...</span>
                  </>
                ) : (
                  <span>SEND SECURE MESSAGE</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Property Layout Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="fixed inset-0 bg-primary-dark/80 backdrop-blur-sm" onClick={() => setSelectedProperty(null)}></div>
          <div className="bg-beige z-10 p-6 border border-accent/30 max-w-lg w-full rounded-sm shadow-2xl relative">
            <button
              onClick={() => setSelectedProperty(null)}
              className="absolute top-4 right-4 text-primary hover:text-accent font-extrabold text-lg"
            >
              ✕
            </button>
            <h3 className="text-primary text-base font-extrabold uppercase mb-2">{selectedProperty.propertyName} Layout Plan</h3>
            <p className="text-[10px] text-accent font-bold uppercase tracking-wider mb-4">{selectedProperty.area} · {selectedProperty.location}</p>
            <div className="h-80 border border-accent/20 bg-white p-2 mb-4">
              <img src={selectedProperty.imageUrl} alt="Layout Detail" className="w-full h-full object-contain" />
            </div>
            <button
              onClick={() => {
                setSelectedProperty(null);
                setIsModalOpen(true);
              }}
              className="w-full bg-primary hover:bg-primary-dark text-white py-3 text-xs uppercase font-bold tracking-widest transition-colors"
            >
              BOOK SITE VISIT NOW
            </button>
          </div>
        </div>
      )}

      {/* Enquire Now Modal Form */}
      <InquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <Footer contactInfo={contact} />
    </div>
  );
}

export default LandingPage;
