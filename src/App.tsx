import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { PublicLayout } from "./components/PublicLayout";
import { Toaster } from "./components/ui/sonner";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ScrollToTop } from "./components/ScrollToTop";
import { HomePage } from "./pages/HomePage";
import { ServicesPage } from "./pages/ServicesPage";
import { AboutPage } from "./pages/AboutPage";
import { ResourcesPage } from "./pages/ResourcesPage";
import { ContactPage } from "./pages/ContactPage";
import { BlogPostPage } from "./pages/BlogPostPage";
import { VaccineCostsBlogPage } from "./pages/VaccineCostsBlogPage";
import { FamilyMedicineBlogPage } from "./pages/FamilyMedicineBlogPage";
import { DpcSpecialtiesBlogPage } from "./pages/DpcSpecialtiesBlogPage";
import { PsychiatryBlogPage } from "./pages/PsychiatryBlogPage";
import { PsychiatryProductPage } from "./pages/PsychiatryProductPage";
import { BookPage } from "./pages/BookPage";
import { ThankYouPage } from "./pages/ThankYouPage";
import { SubscriptionsPage } from "./pages/SubscriptionsPage";
import { FindAProviderPage } from "./pages/FindAProviderPage";
import { CalendarWidget } from "./components/CalendarWidget";
import OnboardPage from "./pages/OnboardPage";

function ExternalRedirect({ to }: { to: string }) {
  useEffect(() => {
    window.location.href = to;
  }, [to]);
  return null;
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable={false}>
        <Toaster />
        <ScrollToTop />
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/resources" element={<Navigate to="/blog" replace />} />
            <Route path="/guide" element={<ExternalRedirect to="https://funnels.practicerxconsulting.com/freeguide-page" />} />
            <Route path="/widget/bookings/kick-off-callpracticrx" element={<CalendarWidget />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/subscriptions" element={<SubscriptionsPage />} />
            <Route path="/blog/vaccine-costs-pediatric-dpc" element={<VaccineCostsBlogPage />} />
            <Route path="/blog/family-medicine-dpc-transition" element={<FamilyMedicineBlogPage />} />
            <Route path="/blog/which-medical-specialties-are-best-for-dpc-cash-based-practices" element={<DpcSpecialtiesBlogPage />} />
            <Route path="/blog/psychiatry-cash-based-dpc-practice-guide" element={<PsychiatryBlogPage />} />
            <Route path="/products/psychiatry-cash-practice-blueprint" element={<PsychiatryProductPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/blog" element={<ResourcesPage />} />
            <Route path="/find-a-provider" element={<FindAProviderPage />} />
            <Route path="/book" element={<BookPage />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
            {/* Client Onboarding - Hidden Link */}
            <Route path="/onboard" element={<OnboardPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
