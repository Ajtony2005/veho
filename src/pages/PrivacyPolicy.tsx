import { useAtom } from "jotai";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Shield,
  Eye,
  Database,
  Lock,
  Users,
  Globe,
  Mail,
} from "lucide-react";
import { languageAtom } from "../store/languageAtom";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";

// Comprehensive privacy policy content
const texts = {
  hu: {
    title: "Adatvédelmi irányelvek",
    subtitle: "Az Ön adatainak védelme a legfőbb prioritásunk",
    lastUpdated: "Utolsó frissítés",
    backToHome: "Vissza a főoldalra",
    sections: [
      {
        id: "overview",
        title: "Áttekintés",
        icon: Shield,
        content: [
          "A Veho elkötelezett az Ön személyes adatainak védelme mellett. Ez az adatvédelmi irányelv részletesen ismerteti, hogyan gyűjtjük, használjuk és védjük az Ön adatait.",
          "Szolgáltatásunk használatával Ön elfogadja a jelen irányelvben foglalt gyakorlatokat.",
        ],
      },
      {
        id: "data-collection",
        title: "Adatgyűjtés",
        icon: Database,
        content: [
          "Személyes információk: név, email cím, telefonszám",
          "Használati adatok: böngészési szokások, preferenciák",
          "Technikai adatok: IP cím, böngésző típusa, eszköz információk",
          "Ötletek és tartalmak: az Ön által megosztott kreatív tartalmak",
        ],
      },
      {
        id: "data-usage",
        title: "Adatfelhasználás",
        icon: Eye,
        content: [
          "Szolgáltatások nyújtása és fejlesztése",
          "Felhasználói élmény personalizálása",
          "Kommunikáció és ügyfélszolgálat",
          "Biztonsági intézkedések és visszaélések megelőzése",
          "Jogi kötelezettségek teljesítése",
        ],
      },
      {
        id: "data-security",
        title: "Adatbiztonság",
        icon: Lock,
        content: [
          "Titkosítás: Az összes érzékeny adat titkosítva van tárolva",
          "Hozzáférés-vezérlés: Szigorú jogosultságkezelés",
          "Rendszeres biztonsági auditok és frissítések",
          "Adatmentés és helyreállítási eljárások",
        ],
      },
      {
        id: "user-rights",
        title: "Az Ön jogai",
        icon: Users,
        content: [
          "Hozzáférési jog: megtekintheti a rólad tárolt adatokat",
          "Helyesbítési jog: kérheti adatai javítását",
          "Törlési jog: kérheti adatai törlését",
          "Adathordozhatóság: exportálhatja adatait",
          "Tiltakozási jog: ellenerezheti bizonyos adatkezeléseknek",
        ],
      },
      {
        id: "contact",
        title: "Kapcsolat",
        icon: Mail,
        content: [
          "Ha kérdése van az adatvédelemmel kapcsolatban, vegye fel velünk a kapcsolatot:",
          "Email: privacy@veho.com",
          "Telefon: +36 30 123 4567",
          "Cím: Budapest, Magyarország",
        ],
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    subtitle: "Your data protection is our top priority",
    lastUpdated: "Last updated",
    backToHome: "Back to home",
    sections: [
      {
        id: "overview",
        title: "Overview",
        icon: Shield,
        content: [
          "Veho is committed to protecting your personal data. This privacy policy details how we collect, use, and protect your information.",
          "By using our service, you agree to the practices described in this policy.",
        ],
      },
      {
        id: "data-collection",
        title: "Data Collection",
        icon: Database,
        content: [
          "Personal information: name, email address, phone number",
          "Usage data: browsing habits, preferences",
          "Technical data: IP address, browser type, device information",
          "Ideas and content: creative content you share",
        ],
      },
      {
        id: "data-usage",
        title: "Data Usage",
        icon: Eye,
        content: [
          "Providing and improving services",
          "Personalizing user experience",
          "Communication and customer support",
          "Security measures and fraud prevention",
          "Legal compliance",
        ],
      },
      {
        id: "data-security",
        title: "Data Security",
        icon: Lock,
        content: [
          "Encryption: All sensitive data is stored encrypted",
          "Access control: Strict permission management",
          "Regular security audits and updates",
          "Data backup and recovery procedures",
        ],
      },
      {
        id: "user-rights",
        title: "Your Rights",
        icon: Users,
        content: [
          "Right of access: view data stored about you",
          "Right of rectification: request correction of your data",
          "Right of erasure: request deletion of your data",
          "Data portability: export your data",
          "Right to object: oppose certain data processing",
        ],
      },
      {
        id: "contact",
        title: "Contact",
        icon: Mail,
        content: [
          "If you have questions about privacy, please contact us:",
          "Email: privacy@veho.com",
          "Phone: +36 30 123 4567",
          "Address: Budapest, Hungary",
        ],
      },
    ],
  },
};

function PrivacyPolicy() {
  const [language] = useAtom(languageAtom);

  return (
    <div className="min-h-screen relative">
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/6 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/6 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/3 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              {/* Back Button */}
              <div className="mb-8">
                <Link
                  to="/"
                  className="group inline-flex items-center gap-2 text-white/70 hover:text-white transition-all duration-300"
                >
                  <Button
                    variant="ghost"
                    className="group bg-white/10 border border-white/30 text-white/90 hover:bg-white/20 hover:border-primary/40 transition-all duration-300 backdrop-blur-sm"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                    {texts[language].backToHome}
                  </Button>
                </Link>
              </div>

              {/* Title Section */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl opacity-50"></div>
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Shield className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-4 leading-tight">
                    {texts[language].title}
                  </h1>

                  {/* Subtitle */}
                  <p className="text-xl md:text-2xl text-white/80 mb-6 leading-relaxed">
                    {texts[language].subtitle}
                  </p>

                  {/* Last Updated */}
                  <div className="flex items-center justify-center gap-2 text-white/60">
                    <Globe className="w-4 h-4" />
                    <span className="text-sm">
                      {texts[language].lastUpdated}: 2025. január 1.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="relative py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              {texts[language].sections.map((section, index) => {
                const IconComponent = section.icon;

                return (
                  <div key={section.id} className="group">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl blur-sm"></div>
                      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 md:p-8 shadow-xl hover:bg-white/15 hover:border-white/30 transition-all duration-500">
                        {/* Section Header */}
                        <div className="flex items-center gap-4 mb-6">
                          <div
                            className={`w-12 h-12 bg-gradient-to-r ${
                              index % 3 === 0
                                ? "from-primary to-primary-600"
                                : index % 3 === 1
                                ? "from-secondary to-secondary-600"
                                : "from-accent to-accent-600"
                            } rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                          >
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>

                          <h2
                            className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${
                              index % 3 === 0
                                ? "from-primary to-primary-600"
                                : index % 3 === 1
                                ? "from-secondary to-secondary-600"
                                : "from-accent to-accent-600"
                            } bg-clip-text text-transparent`}
                          >
                            {section.title}
                          </h2>
                        </div>

                        {/* Section Content */}
                        <div className="space-y-4">
                          {section.content.map((paragraph, pIndex) => (
                            <div
                              key={pIndex}
                              className="flex items-start gap-3"
                            >
                              <div className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full mt-2 flex-shrink-0"></div>
                              <p className="text-white/80 leading-relaxed">
                                {paragraph}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section className="relative py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl"></div>
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {language === "hu"
                      ? "További kérdések?"
                      : "More questions?"}
                  </h3>

                  <p className="text-white/80 mb-6 leading-relaxed">
                    {language === "hu"
                      ? "Ha bármilyen kérdése van az adatvédelemmel kapcsolatban, ne habozzon kapcsolatba lépni velünk."
                      : "If you have any questions about privacy, don't hesitate to contact us."}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="btn-primary group">
                      <Mail className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                      {language === "hu" ? "Email küldése" : "Send Email"}
                    </Button>

                    <Link to="/" className="group">
                      <Button
                        variant="ghost"
                        className="bg-white/10 border border-white/30 text-white/90 hover:bg-white/20 hover:border-white/50 transition-all duration-300 backdrop-blur-sm group"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                        {texts[language].backToHome}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
