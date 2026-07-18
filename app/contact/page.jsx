import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export const metadata = { title: 'Contact Us | Fashion Point' };

export default function ContactPage() {
  return (
    <section className="py-16 sm:py-20 max-w-7xl mx-auto px-5 sm:px-6">
      <div className="text-center mb-14">
        <span className="text-gold text-xs tracking-[0.35em]">GET IN TOUCH</span>
        <h1 className="font-display text-4xl sm:text-5xl mt-2 text-bone">Visit or Contact Us</h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="glass rounded-2xl p-8 space-y-6">
          <div className="flex items-start gap-4">
            <Phone className="text-gold mt-1" size={20} />
            <div>
              <p className="text-bone/50 text-xs tracking-widest">PHONE</p>
              <p className="font-display text-xl text-bone">+91 98765 43210</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Mail className="text-gold mt-1" size={20} />
            <div>
              <p className="text-bone/50 text-xs tracking-widest">EMAIL</p>
              <p className="font-display text-xl text-bone">hello@fashionpoint.com</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <MapPin className="text-gold mt-1" size={20} />
            <div>
              <p className="text-bone/50 text-xs tracking-widest">ADDRESS</p>
              <p className="font-display text-xl text-bone">204 Linking Road, Bandra West, Mumbai 400050</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Clock className="text-gold mt-1" size={20} />
            <div>
              <p className="text-bone/50 text-xs tracking-widest">BUSINESS HOURS</p>
              <p className="font-display text-xl text-bone">Mon – Sun · 10:00 AM – 9:00 PM</p>
            </div>
          </div>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#25D366] text-ink font-semibold rounded-full py-3.5 mt-4 hover:brightness-95 transition"
          >
            Chat on WhatsApp
          </a>
        </div>

        <div className="rounded-2xl overflow-hidden border border-gold/20 min-h-[380px]">
          <iframe
            title="Fashion Point Store Location"
            src="https://www.google.com/maps?q=Bandra%20West%2C%20Mumbai&output=embed"
            className="w-full h-full min-h-[380px] grayscale contrast-125"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
