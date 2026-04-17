import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Free PhotoMath AI",
  description:
    "Terms of Service for Free PhotoMath AI. Read about the rules and guidelines for using our free AI-powered math problem solver.",
  alternates: { canonical: "https://photomathai.com/terms" },
  robots: { index: true, follow: true },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://photomathai.com" },
    { "@type": "ListItem", position: 2, name: "Terms of Service", item: "https://photomathai.com/terms" },
  ],
};

export default function TermsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-foreground mb-8">Terms of Service</h1>
        <div className="prose prose-sm max-w-none text-muted leading-relaxed space-y-6">
          <p>
            <strong>Effective Date:</strong> April 2026
          </p>

          <p>
            Welcome to Free PhotoMath AI. By accessing or using our website at photomathai.com, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our service.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">1. Description of Service</h2>
          <p>
            Free PhotoMath AI is a web-based platform that uses artificial intelligence to solve mathematical problems from uploaded images or typed input. The service provides step-by-step solutions for educational purposes. The service is provided free of charge and does not require account registration.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">2. Acceptable Use</h2>
          <p>
            You agree to use Free PhotoMath AI only for lawful, educational purposes. You may not use the service to violate academic integrity policies at your institution, submit solutions as your own original work in contexts where that is prohibited, attempt to disrupt, overload, or interfere with the operation of the service, or reverse-engineer or scrape the platform or its underlying technology.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">3. Intellectual Property</h2>
          <p>
            All content, branding, design elements, and software associated with Free PhotoMath AI are the property of PhotoMath AI and are protected by applicable intellectual property laws. You may use the solutions generated for personal educational purposes only.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">4. Accuracy Disclaimer</h2>
          <p>
            While Free PhotoMath AI strives to deliver accurate solutions, the service is powered by AI and may occasionally produce errors. Solutions are provided for educational reference and should not be considered a substitute for professional tutoring or official academic guidance. We recommend verifying important solutions independently.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">5. User-Uploaded Content</h2>
          <p>
            When you upload images or enter text into Free PhotoMath AI, you retain ownership of your content. We process uploaded content solely to generate solutions and do not store images or personal data beyond the duration of your session. Do not upload content that contains personal, sensitive, or confidential information.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">6. Limitation of Liability</h2>
          <p>
            Free PhotoMath AI is provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind, either express or implied. To the fullest extent permitted by law, PhotoMath AI shall not be liable for any indirect, incidental, or consequential damages arising from your use of or inability to use the service.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">7. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms of Service at any time. Changes will be posted on this page with an updated effective date. Continued use of the service after changes constitutes acceptance of the revised terms.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">8. Contact</h2>
          <p>
            If you have questions about these Terms of Service, please contact us at{" "}
            <a href="mailto:legal@photomathai.com" className="text-primary hover:underline">
              legal@photomathai.com
            </a>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
