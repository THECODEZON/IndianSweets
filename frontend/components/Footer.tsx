const Footer = () => {
  return (
    <footer className="bg-text-charcoal text-bg-cream pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-serif text-xl font-bold text-accent-yellow mb-4">Mithai Wala</h3>
            <p className="text-sm text-gray-300">
              Authentic Indian sweets made with love and tradition. Celebrating every festival with sweetness.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/about-us" className="hover:text-accent-yellow">About Us</a></li>
              <li><a href="/contact-us" className="hover:text-accent-yellow">Contact Us</a></li>
              <li><a href="/policies" className="hover:text-accent-yellow">Policies</a></li>
              <li><a href="/sweets" className="hover:text-accent-yellow">Sweets</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>old phagwara deepnager</li>
              <li>+91 6267093990</li>
              <li>ddas12181@gmail.com</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {/* Icons would go here */}
              <a href="#" className="hover:text-accent-yellow">Instagram</a>
              <a href="#" className="hover:text-accent-yellow">Facebook</a>
              <a href="#" className="hover:text-accent-yellow">Twitter</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Mithai Wala. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
