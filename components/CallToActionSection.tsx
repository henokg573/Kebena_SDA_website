import React, { useState } from "react";
import { Button } from "./ui/button";
import { useLanguage } from "../contexts/LanguageContext";
import { UserPlus, MessageCircle } from "lucide-react";
import churchPic from "../constants/kebena_church.jpg";

interface CallToActionSectionProps {
  setCurrentView: (view: string) => void;
}

export function CallToActionSection({
  setCurrentView,
}: CallToActionSectionProps) {
  const { language } = useLanguage();
  const [showContact, setShowContact] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert(
      language === "am"
        ? "መልእክትዎ ተልኳል። እናመሰግናለን!"
        : "Your message has been sent. Thank you!"
    );
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <>
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            {language === "am" ? "Join Our Community" : "Join Our Community"}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {language === "am"
              ? "በመጽሐፍ ቅዱስ ጥናት፣ ጸሎት እና የወንድማማች አጋርነት የእምነት ጉዞዎን ይቀጥሉ"
              : "Continue your faith journey with Bible study, prayer, and fellowship"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setCurrentView("signup")}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg btn-hover-effect"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              {language === "am" ? "Join Us Today" : "Sign Up Today"}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-black hover:bg-white hover:text-blue-600 px-8 py-4 text-lg btn-hover-effect"
              onClick={() => setShowContact(!showContact)}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              {language === "am" ? "Contact" : "Contact Us"}
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      {showContact && (
        <section
          id="contact"
          className="py-16 text-gray-900"
          style={{
            backgroundImage: `url(${churchPic})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="max-w-6xl mx-auto px-6 bg-white bg-opacity-90 rounded-lg p-8 flex flex-col md:flex-row gap-8">
            {/* Map on the Left */}
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-4">
                {language === "am" ? "የቦታ ካርታ" : "Location Map"}
              </h2>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50566.306400266236!2d38.70270382167968!3d9.042620199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8fb9b2dc6941%3A0xbe67f38a387fdf6a!2sKebana%20SDA%20church!5e1!3m2!1sen!2sus!4v1755502256990!5m2!1sen!2sus"
                width="100%"
                height="350"
                style={{ border: 0, borderRadius: "12px" }}
                allowFullScreen
                loading="lazy"
              ></iframe>
              <div className="mt-4 text-lg text-center md:text-left space-y-2">
                <p className="font-semibold">
                  Email:{" "}
                  <a
                    href="mailto:info@kebenasda.org"
                    className="text-blue-600 hover:underline"
                  >
                    info@kebenasda.org
                  </a>
                </p>
                <p className="font-semibold">
                  Phone:{" "}
                  <a
                    href="tel:+251900000000"
                    className="text-blue-600 hover:underline"
                  >
                    +251-900-000-000
                  </a>
                </p>
                <p className="font-semibold">
                  Location: Kebena, Addis Ababa, Ethiopia
                </p>
              </div>
            </div>

            {/* Form on the Right */}
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold text-center mb-6">
                {language === "am" ? "አግኙን" : "Contact Us"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={language === "am" ? "ስምዎ" : "Your Name"}
                  className="w-full p-3 rounded-lg border border-gray-300"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={language === "am" ? "ኢሜይልዎ" : "Your Email"}
                  className="w-full p-3 rounded-lg border border-gray-300"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={
                    language === "am" ? "ስልክ ቁጥርዎ" : "Your Phone Number"
                  }
                  className="w-full p-3 rounded-lg border border-gray-300"
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={
                    language === "am"
                      ? "ለምን እየተገናኙን ነው?"
                      : "Why are you contacting us?"
                  }
                  className="w-full p-3 rounded-lg border border-gray-300 h-40"
                  required
                />
                <Button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                >
                  {language === "am" ? "መልእክት ላክ" : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
