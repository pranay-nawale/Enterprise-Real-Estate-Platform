import React from 'react';

function Footer({ contactInfo }) {
  const currentYear = new Date().getFullYear();

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-primary-dark text-beige-dark pt-16 pb-6 border-t border-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Logo & Tagline */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <div className="border border-accent p-2 rounded-sm bg-primary/40">
                  <span className="text-white font-extrabold text-2xl tracking-tighter">SWASTIK</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-xs font-bold tracking-widest leading-none">GROUP</span>
                  <span className="text-accent text-[8px] tracking-widest leading-none uppercase font-semibold">BUILDERS & DEVELOPERS</span>
                </div>
              </div>
              <p className="text-xs text-beige-dark/70 leading-relaxed font-light">
                A legacy of trust. Building homes that endure for generations.
              </p>
            </div>
          </div>

          {/* Corporate Office */}
          <div>
            <h4 className="text-white text-xs uppercase tracking-widest font-bold mb-4 border-b border-accent/20 pb-2">
              Corporate Office
            </h4>
            <p className="text-xs leading-relaxed font-light text-beige-dark/80">
              {contactInfo?.address || '312, Swastik Group, Swastik House, Corporate Park, L.B.S. Marg, Ghatkopar (West), Mumbai - 400086'}
            </p>
            <div className="mt-4 flex flex-col space-y-1 text-xs">
              <span className="text-beige-dark/60">Phone: {contactInfo?.phone?.split('/')[0] || '+91 022-6689 0000'}</span>
              <span className="text-beige-dark/60">Email: {contactInfo?.email || 'swastikgroup123@gmail.com'}</span>
            </div>
          </div>

          {/* Sales Office */}
          <div>
            <h4 className="text-white text-xs uppercase tracking-widest font-bold mb-4 border-b border-accent/20 pb-2">
              Swastik Sales Office
            </h4>
            <p className="text-xs leading-relaxed font-light text-beige-dark/80">
              Swastik Bliss Building, no. 52, Adarsh Sapna CHS, Subhash Nagar, Chembur, Mumbai - 400071
            </p>
            <div className="mt-4 flex flex-col space-y-1 text-xs">
              <span className="text-beige-dark/60">Phone: {contactInfo?.phone?.split('/')[1] || '+91 98201 08988'}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-xs uppercase tracking-widest font-bold mb-4 border-b border-accent/20 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs font-light">
              {[
                { label: 'About the Project', id: 'about' },
                { label: 'Floor Plans', id: 'floorplans' },
                { label: 'Amenities', id: 'amenities' },
                { label: 'Connectivity', id: 'connectivity' },
                { label: 'About Developer', id: 'developer' },
                { label: 'Contact Us', id: 'contact' },
              ].map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleScroll(link.id)}
                    className="hover:text-white transition-colors duration-200 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-accent/10 pt-6 flex flex-col sm:flex-row justify-between items-center text-[10px] text-beige-dark/50">
          <p>© {currentYear} Swastik Group. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
            <span>|</span>
            <span>MahaRERA Registration No. PR1180002502829</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
