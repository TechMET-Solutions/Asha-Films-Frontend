
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { Title } from '../../components/ui';

export default function Contact() {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-20 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto text-center">
        <Title title={"Get In Touch"} />
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          We'd love to hear from you! Whether you're a production house looking for the perfect talent,
          a casting director seeking support, or a talented artist with questions — our team is here to help.
        </p>
        <hr className="border-primary mb-12" />

        <div className="grid gap-6 md:grid-cols-3">
          <ContactCard
            icon={FaMapMarkerAlt}
            title="Office Address"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry doing that"
          />
          <ContactCard
            icon={FaEnvelope}
            title="Email Us"
            subtitle="Support & General Inquiries"
            description="1on1screens@gmail.com"
          />
          <ContactCard
            icon={FaPhoneAlt}
            title="Call Us"
            subtitle="Customer Support"
            description="+91-9876543210"
          />
        </div>

        {/* Embedded Google Map */}
        <div className="mt-12 w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
          <iframe
            title="Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.513473293416!2d72.87765541490191!3d19.081209187087847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b7253e73e0d9%3A0x77f47d06f83a7edc!2sNavi%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1615219280823!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}


const ContactCard = ({ icon: Icon, title, subtitle, description }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 h- text-center flex flex-col justify-center items-center">
      <div className="flex items-center mb-4 text-primary font-semibold text-center">
        <Icon className="mr-2" />
        <h3 className="text-lg">{title}</h3>
      </div>
      {subtitle && <p className="text-sm text-gray-800 font-semibold">{subtitle}</p>}
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};
