import { SITE_EMAIL, HEADQUARTERS, SOCIAL_LINKS } from '@/lib/constants';
import { Icon } from '@/components/ui/Icon';

export default function ContactInfo() {
  return (
    <div className="text-white space-y-8">
      <div>
        <h3 className="text-3xl font-bold mb-6 tracking-tight">Contact Information</h3>
        <p className="text-gray-300 max-w-md leading-relaxed">
          Reach out to us to discuss your sport development needs, infrastructure projects, or institutional goals.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-start space-x-4 group">
          <Icon name="Mail" className="w-6 h-6 text-brand-gold mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-white">Email</h4>
            <a href={`mailto:${SITE_EMAIL}`} className="text-gray-300 hover:text-brand-gold transition-colors">
              {SITE_EMAIL}
            </a>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <Icon name="MapPin" className="w-6 h-6 text-brand-gold mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-white">Headquarters</h4>
            <p className="text-gray-300">{HEADQUARTERS}</p>
          </div>
        </div>

        <div className="flex items-start space-x-4 group">
          <Icon name="Globe" className="w-6 h-6 text-brand-gold mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-white">Website</h4>
            <a href="https://sportleadafrica.com" className="text-gray-300 hover:text-brand-gold transition-colors">
              sportleadafrica.com
            </a>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-white mb-4">Follow Us</h4>
        <div className="flex space-x-4">
          {SOCIAL_LINKS.map((link, index) => (
            <a 
              key={index} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:bg-brand-gold hover:text-brand-navy transition-colors border border-white/5"
              aria-label={link.name}
            >
              <Icon name={link.icon as any} className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
