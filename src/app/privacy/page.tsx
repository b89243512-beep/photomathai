import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Free PhotoMath AI",
  description:
    "Privacy Policy for Free PhotoMath AI. Learn how we handle your data when you use our free AI math problem solver.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-foreground mb-8">Privacy Policy</h1>
        <div className="prose prose-sm max-w-none text-muted leading-relaxed space-y-6">
          <p>
            <strong>Effective Date:</strong> April 2026
          </p>

          <p>
            At Free PhotoMath AI, your privacy matters to us. This Privacy Policy explains what information we collect, how we use it, and how we protect your data when you use our service at photomathai.com.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">1. Information We Collect</h2>
          <p>
            Free PhotoMath AI is designed with privacy in mind. We do not require account registration or login. When you use our service, we may collect the following:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Uploaded Content:</strong> Images or text you submit for solving. These are processed temporarily and are not stored after your session ends.</li>
            <li><strong>Usage Data:</strong> Anonymous, aggregated data such as page views, device type, browser type, and general geographic region to improve our service.</li>
            <li><strong>Cookies:</strong> We may use essential cookies for basic functionality and analytics cookies to understand how visitors use the site.</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground mt-8">2. How We Use Your Information</h2>
          <p>
            We use the information we collect to process and solve the math problems you submit, improve the accuracy and performance of Free PhotoMath AI, analyze usage trends to enhance the user experience, and maintain the security and stability of our platform.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">3. Data Sharing</h2>
          <p>
            We do not sell, rent, or share your personal information with third parties for marketing purposes. We may share anonymized, aggregated analytics data with service providers who help us operate the platform. If required by law, we may disclose information in response to valid legal requests.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">4. Data Retention</h2>
          <p>
            Uploaded images and math problems are processed in real time and are not stored permanently on our servers. Session data is automatically cleared after your browsing session ends. Analytics data is retained in anonymized, aggregated form only.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">5. Data Security</h2>
          <p>
            We take reasonable measures to protect data transmitted to and from Free PhotoMath AI, including the use of HTTPS encryption and secure server infrastructure. However, no method of internet transmission is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">6. Children&apos;s Privacy</h2>
          <p>
            Free PhotoMath AI is intended for general audiences, including students. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us so we can take appropriate action.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">7. Your Rights</h2>
          <p>
            Since we do not collect personal data that identifies you, there is typically no personal data to access, modify, or delete. If you have concerns about any data we may hold, you are welcome to contact us and we will respond promptly.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this page periodically.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">9. Contact Us</h2>
          <p>
            If you have questions or concerns about this Privacy Policy, please contact us at{" "}
            <a href="mailto:privacy@photomathai.com" className="text-primary hover:underline">
              privacy@photomathai.com
            </a>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
