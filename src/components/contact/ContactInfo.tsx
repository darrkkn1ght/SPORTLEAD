import { HEADQUARTERS, SITE_EMAIL } from '@/lib/constants';
import { Icon } from '@/components/ui/Icon';

export default function ContactInfo() {
  return (
    <div className="text-charcoal space-y-8">
      <div>
        <h3 className="text-3xl font-bold mb-6 tracking-tight">Contact Information</h3>
        <p className="text-gray-500 max-w-md leading-relaxed">
          Whether you have a general inquiry or are looking to explore partnership opportunities, submit the form and our team will respond promptly.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <Icon name="MapPin" className="w-6 h-6 text-brand-green mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-charcoal">Headquarters</h4>
            <p className="text-gray-500">{HEADQUARTERS}</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <Icon name="Mail" className="w-6 h-6 text-brand-green mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-charcoal">Email</h4>
            <a
              href={`mailto:${SITE_EMAIL}`}
              className="text-gray-600 hover:text-brand-green transition-colors font-medium"
            >
              {SITE_EMAIL}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
