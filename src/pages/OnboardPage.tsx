import React, { useState, useRef } from 'react';
import { Upload, CheckCircle, Lock } from 'lucide-react';

// Zapier webhook URL for form submissions
const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/367574387/';

const OnboardPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactEmail: '',
    contactPhone: '',
    practiceName: '',
    specialty: [] as string[],
    yearsInPractice: '',
    locations: '',
    hasCompanyEmail: 'no',
    companyEmail: '',
    companyEmailProvider: '',
    businessPhone: '',
    hasDomain: 'no',
    currentDomain: '',
    currentHost: '',
    websitePlatform: '',
    websiteGoal: '',
    socialMediaPlatforms: [] as string[],
    googleBusinessProfile: 'no',
    runsAds: 'no',
    adPlatforms: [] as string[],
    adBudgetRange: '',
    interestedInAdManagement: 'no',
    hasAdAccountDetails: 'no',
    adAccountURL: '',
    emailProvider: '',
    notificationEmail: '',
    schedulingSystem: '',
    emailMarketingTool: '',
    interestedInAIAutomation: 'no',
    aiAutomationServices: [] as string[],
    crmSoftware: '',
    paymentProcessor: '',
    otherTools: '',
    providesAdminAccess: 'no',
    servicesInterested: [] as string[],
    budgetRange: '',
    timelinePreference: '',
    additionalInfo: '',
    files: [] as File[]
  });

  const [currentSection, setCurrentSection] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCheckboxChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: (prev[name as keyof typeof prev] as string[]).includes(value)
        ? (prev[name as keyof typeof prev] as string[]).filter(item => item !== value)
        : [...(prev[name as keyof typeof prev] as string[]), value]
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
      setFormData(prev => ({
        ...prev,
        files: [...prev.files, ...newFiles]
      }));
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const validateSection = (section: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (section === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.contactEmail.trim()) newErrors.contactEmail = 'Contact email is required';
      if (!formData.contactPhone.trim()) newErrors.contactPhone = 'Contact phone is required';
      if (formData.specialty.length === 0) newErrors.specialty = 'Select at least one specialty';
    }

    if (section === 2) {
      if (formData.hasDomain === 'yes' && !formData.currentDomain.trim()) {
        newErrors.currentDomain = 'Domain name is required';
      }
    }

    if (section === 4) {
      if (formData.runsAds === 'yes' && formData.adPlatforms.length === 0) {
        newErrors.adPlatforms = 'Select at least one ad platform';
      }
    }

    if (section === 5) {
      if (formData.hasCompanyEmail === 'yes' && !formData.companyEmail.trim()) {
        newErrors.companyEmail = 'Email address is required';
      }
      if (formData.interestedInAIAutomation === 'yes' && formData.aiAutomationServices.length === 0) {
        newErrors.aiAutomationServices = 'Select at least one service';
      }
    }

    if (section === 8) {
      if (formData.servicesInterested.length === 0) {
        newErrors.servicesInterested = 'Select at least one service';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextSection = () => {
    if (validateSection(currentSection)) {
      setCurrentSection(prev => Math.min(prev + 1, 8));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevSection = () => {
    setCurrentSection(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateSection(8)) return;

    setIsSubmitting(true);

    try {
      // Prepare form data for Zapier webhook (to bypass CORS)
      const formDataBody = new FormData();
      formDataBody.append('First Name', formData.firstName);
      formDataBody.append('Last Name', formData.lastName);
      formDataBody.append('Contact Email', formData.contactEmail);
      formDataBody.append('Contact Phone', formData.contactPhone);
      formDataBody.append('Practice Name', formData.practiceName);
      formDataBody.append('Specialty', formData.specialty.join(', '));

      // Send to Zapier webhook (primary submission) - using FormData to bypass CORS
      const zapierResponse = await fetch(ZAPIER_WEBHOOK_URL, {
        method: 'POST',
        body: formDataBody,
      });

      if (!zapierResponse.ok) {
        throw new Error('Failed to submit to Zapier');
      }

      // Also try to send to internal API (non-critical)
      const submitData = {
        ...formData,
        submittedAt: new Date().toISOString(),
        filesCount: uploadedFiles.length,
        fileNames: uploadedFiles.map(f => f.name)
      };

      fetch('/api/submit-onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      }).catch(err => console.error('Internal API error (non-critical):', err));

      // Show thank you page if Zapier succeeded
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Failed to submit form. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return <ThankYouPage practiceName={formData.practiceName || formData.firstName + ' ' + formData.lastName} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to PracticeRx</h1>
          <p className="text-xl text-gray-600 mb-6">Let's build your practice's digital presence</p>

          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentSection / 8) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500">Section {currentSection} of 8</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
          {currentSection === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="John" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Smith" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email *</label>
                <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleInputChange} placeholder="john@example.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                {errors.contactEmail && <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone *</label>
                <input type="tel" name="contactPhone" value={formData.contactPhone} onChange={handleInputChange} placeholder="(555) 123-4567" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                {errors.contactPhone && <p className="text-red-500 text-sm mt-1">{errors.contactPhone}</p>}
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Practice Information</h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Practice Name</label>
                <input type="text" name="practiceName" value={formData.practiceName} onChange={handleInputChange} placeholder="e.g., Advanced Cardiology Associates (optional if not yet chosen)" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Specialty/Specialties * (Select all that apply)</label>
                <div className="space-y-2">
                  {['Family Medicine', 'Internal Medicine', 'Pediatrics', 'Orthopedics', 'Dermatology', 'Psychiatry', 'Other'].map(spec => (
                    <label key={spec} className="flex items-center">
                      <input type="checkbox" checked={formData.specialty.includes(spec)} onChange={() => handleCheckboxChange('specialty', spec)} className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
                      <span className="ml-2 text-gray-700">{spec}</span>
                    </label>
                  ))}
                </div>
                {errors.specialty && <p className="text-red-500 text-sm mt-2">{errors.specialty}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Years in Practice (if existing practice)</label>
                <input type="text" name="yearsInPractice" value={formData.yearsInPractice} onChange={handleInputChange} placeholder="e.g., 10 years" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location(s) / Service Areas</label>
                <textarea name="locations" value={formData.locations} onChange={handleInputChange} placeholder="e.g., Miami, FL; Tampa, FL" rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Phone</label>
                <input type="tel" name="businessPhone" value={formData.businessPhone} onChange={handleInputChange} placeholder="(555) 123-4567" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
            </div>
          )}

          {currentSection === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Website & Domain</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Do you have an existing domain?</label>
                <div className="space-y-2">
                  {['yes', 'no'].map(option => (
                    <label key={option} className="flex items-center">
                      <input type="radio" name="hasDomain" value={option} checked={formData.hasDomain === option} onChange={handleInputChange} className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                      <span className="ml-2 text-gray-700 capitalize">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              {formData.hasDomain === 'yes' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Domain Name *</label>
                    <input type="text" name="currentDomain" value={formData.currentDomain} onChange={handleInputChange} placeholder="example.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    {errors.currentDomain && <p className="text-red-500 text-sm mt-1">{errors.currentDomain}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Host / Registrar</label>
                    <input type="text" name="currentHost" value={formData.currentHost} onChange={handleInputChange} placeholder="e.g., Namecheap, GoDaddy, Bluehost" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                </>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Website Platform (if exists)</label>
                <input type="text" name="websitePlatform" value={formData.websitePlatform} onChange={handleInputChange} placeholder="e.g., WordPress, Wix, custom code" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Website Goal</label>
                <select name="websiteGoal" value={formData.websiteGoal} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select a goal</option>
                  <option value="Patient Acquisition">Patient Acquisition</option>
                  <option value="Credibility/Brand">Credibility & Brand Building</option>
                  <option value="Appointment Booking">Appointment Booking</option>
                  <option value="Patient Education">Patient Education</option>
                  <option value="Multiple Goals">Multiple Goals</option>
                </select>
              </div>
            </div>
          )}

          {currentSection === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Digital Presence & Social Media</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Which social media platforms do you have accounts on?</label>
                <div className="space-y-2">
                  {['Facebook', 'Instagram', 'TikTok', 'LinkedIn', 'YouTube', 'Twitter/X'].map(platform => (
                    <label key={platform} className="flex items-center">
                      <input type="checkbox" checked={formData.socialMediaPlatforms.includes(platform)} onChange={() => handleCheckboxChange('socialMediaPlatforms', platform)} className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
                      <span className="ml-2 text-gray-700">{platform}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Do you have a Google Business Profile?</label>
                <div className="space-y-2">
                  {['yes', 'no'].map(option => (
                    <label key={option} className="flex items-center">
                      <input type="radio" name="googleBusinessProfile" value={option} checked={formData.googleBusinessProfile === option} onChange={handleInputChange} className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                      <span className="ml-2 text-gray-700 capitalize">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentSection === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Advertising & Paid Campaigns</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Do you currently run or want to run paid ads?</label>
                <div className="space-y-2">
                  {['yes', 'no'].map(option => (
                    <label key={option} className="flex items-center">
                      <input type="radio" name="runsAds" value={option} checked={formData.runsAds === option} onChange={handleInputChange} className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                      <span className="ml-2 text-gray-700 capitalize">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              {formData.runsAds === 'yes' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Which ad platforms? *</label>
                    <div className="space-y-2">
                      {['Facebook Ads', 'Instagram Ads', 'Google Ads', 'Other'].map(platform => (
                        <label key={platform} className="flex items-center">
                          <input type="checkbox" checked={formData.adPlatforms.includes(platform)} onChange={() => handleCheckboxChange('adPlatforms', platform)} className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
                          <span className="ml-2 text-gray-700">{platform}</span>
                        </label>
                      ))}
                    </div>
                    {errors.adPlatforms && <p className="text-red-500 text-sm mt-2">{errors.adPlatforms}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current or target ad spend/budget range</label>
                    <input type="text" name="adBudgetRange" value={formData.adBudgetRange} onChange={handleInputChange} placeholder="e.g., $2,000-5,000/month" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Are you interested in PracticeRx managing ads for you?</label>
                    <div className="space-y-2">
                      {['yes', 'no', 'maybe'].map(option => (
                        <label key={option} className="flex items-center">
                          <input type="radio" name="interestedInAdManagement" value={option} checked={formData.interestedInAdManagement === option} onChange={handleInputChange} className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                          <span className="ml-2 text-gray-700 capitalize">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {currentSection === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Email & Communication Systems</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Do you have a company email address?</label>
                <div className="space-y-2">
                  {['yes', 'no'].map(option => (
                    <label key={option} className="flex items-center">
                      <input type="radio" name="hasCompanyEmail" value={option} checked={formData.hasCompanyEmail === option} onChange={handleInputChange} className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                      <span className="ml-2 text-gray-700 capitalize">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              {formData.hasCompanyEmail === 'yes' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Email Address *</label>
                    <input type="email" name="companyEmail" value={formData.companyEmail} onChange={handleInputChange} placeholder="practice@example.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    {errors.companyEmail && <p className="text-red-500 text-sm mt-1">{errors.companyEmail}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Provider</label>
                    <select name="companyEmailProvider" value={formData.companyEmailProvider} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Select email provider</option>
                      <option value="Gmail">Gmail</option>
                      <option value="Outlook">Outlook</option>
                      <option value="Custom Domain">Custom Domain</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email for Important Notifications</label>
                <input type="email" name="notificationEmail" value={formData.notificationEmail} onChange={handleInputChange} placeholder="Where should we send updates?" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Scheduling/Appointment System</label>
                <input type="text" name="schedulingSystem" value={formData.schedulingSystem} onChange={handleInputChange} placeholder="e.g., Calendly, Acuity, Practice management software" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Marketing Tool (if any)</label>
                <input type="text" name="emailMarketingTool" value={formData.emailMarketingTool} onChange={handleInputChange} placeholder="e.g., Mailchimp, ConvertKit, Constant Contact" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div className="border-t border-gray-200 pt-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Are you interested in custom AI automation systems being integrated into your practice?</label>
                <div className="space-y-2">
                  {['yes', 'no', 'unsure'].map(option => (
                    <label key={option} className="flex items-center">
                      <input type="radio" name="interestedInAIAutomation" value={option} checked={formData.interestedInAIAutomation === option} onChange={handleInputChange} className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                      <span className="ml-2 text-gray-700 capitalize">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              {formData.interestedInAIAutomation === 'yes' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Which services would you like automated? * (Select all that apply)</label>
                  <div className="space-y-2">
                    {['Email management', 'Finance management', 'Paperwork management (authorization forms)', 'Unsure - need consultation'].map(service => (
                      <label key={service} className="flex items-center">
                        <input type="checkbox" checked={formData.aiAutomationServices.includes(service)} onChange={() => handleCheckboxChange('aiAutomationServices', service)} className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
                        <span className="ml-2 text-gray-700">{service}</span>
                      </label>
                    ))}
                  </div>
                  {errors.aiAutomationServices && <p className="text-red-500 text-sm mt-2">{errors.aiAutomationServices}</p>}
                </div>
              )}
            </div>
          )}

          {currentSection === 6 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Integrations & Business Tools</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CRM / Practice Management Software (if any)</label>
                <input type="text" name="crmSoftware" value={formData.crmSoftware} onChange={handleInputChange} placeholder="e.g., Zoho CRM, HubSpot, Practice management system" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Processing System</label>
                <input type="text" name="paymentProcessor" value={formData.paymentProcessor} onChange={handleInputChange} placeholder="e.g., Stripe, Square, PayPal" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Other Critical Business Tools</label>
                <textarea name="otherTools" value={formData.otherTools} onChange={handleInputChange} placeholder="List any other important tools we should know about" rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
            </div>
          )}

          {currentSection === 7 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Secure Credentials & Access</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex gap-3">
                  <Lock className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">Encrypted Portal Access</h3>
                    <p className="text-sm text-blue-800">You'll receive an invite to a secure, encrypted portal where you can upload and manage all sensitive credentials, logins, passwords, and business files safely.</p>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Will you provide admin access to your accounts?</label>
                <div className="space-y-2">
                  {['yes', 'no'].map(option => (
                    <label key={option} className="flex items-center">
                      <input type="radio" name="providesAdminAccess" value={option} checked={formData.providesAdminAccess === option} onChange={handleInputChange} className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                      <span className="ml-2 text-gray-700 capitalize">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentSection === 8 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Scope & Services</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Which services are you interested in? * (Select all that apply)</label>
                <div className="space-y-2">
                  {['Custom website design', 'Social media content & management', 'Email marketing setup', 'Ads management & optimization', 'CRM/scheduling integration', 'SEO optimization', 'Other'].map(service => (
                    <label key={service} className="flex items-center">
                      <input type="checkbox" checked={formData.servicesInterested.includes(service)} onChange={() => handleCheckboxChange('servicesInterested', service)} className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
                      <span className="ml-2 text-gray-700">{service}</span>
                    </label>
                  ))}
                </div>
                {errors.servicesInterested && <p className="text-red-500 text-sm mt-2">{errors.servicesInterested}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                <select name="budgetRange" value={formData.budgetRange} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select a range</option>
                  <option value="Under $5,000">Under $5,000</option>
                  <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                  <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                  <option value="$25,000+">$25,000+</option>
                  <option value="Not sure">Not sure yet</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Timeline/Launch Date Preference</label>
                <input type="text" name="timelinePreference" value={formData.timelinePreference} onChange={handleInputChange} placeholder="e.g., ASAP, Q3 2024, flexible" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Assets (logos, headshots, brand guidelines, etc.)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition">
                  <input type="file" ref={fileInputRef} onChange={handleFileUpload} multiple className="hidden" accept="image/*,.pdf,.doc,.docx" />
                  <button type="button" onClick={() => fileInputRef.current?.click()} className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700">
                    <Upload className="w-5 h-5" />
                    Click to upload files
                  </button>
                  <p className="text-sm text-gray-500 mt-2">or drag and drop (images, PDF, docs)</p>
                </div>
                {uploadedFiles.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Uploaded files:</p>
                    <div className="space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                          <span className="text-sm text-gray-700">{file.name}</span>
                          <button type="button" onClick={() => removeFile(index)} className="text-red-600 hover:text-red-700 text-sm font-medium">Remove</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Any other important information?</label>
                <textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleInputChange} placeholder="Tell us anything else we should know about your practice or goals" rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
            </div>
          )}

          {errors.submit && <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg"><p className="text-red-700 text-sm">{errors.submit}</p></div>}

          <div className="flex justify-between mt-8 pt-8 border-t border-gray-200">
            {currentSection > 1 && <button type="button" onClick={handlePrevSection} className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition">Previous</button>}
            {currentSection < 8 ? (
              <button type="button" onClick={handleNextSection} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition ml-auto">Next Section</button>
            ) : (
              <button type="submit" disabled={isSubmitting} className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition ml-auto disabled:opacity-50">{isSubmitting ? 'Submitting...' : 'Submit Application'}</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

const ThankYouPage = ({ practiceName }: { practiceName: string }) => {
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 14);
  const formattedDate = launchDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="flex justify-center mb-6"><CheckCircle className="w-16 h-16 text-green-600" /></div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Thank you, {practiceName}!</h1>
          <p className="text-xl text-gray-600 mb-8">We received your onboarding information. Here's what happens next.</p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
            <h2 className="text-xl font-bold text-gray-900 mb-4">📅 YOUR 2-WEEK TIMELINE TO LAUNCH</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="text-blue-600 font-bold">Week 1</div>
                <div><p className="font-semibold text-gray-900">Initial Kickoff Call & Strategy</p><p className="text-sm text-gray-600">Review your goals, brand, and requirements</p></div>
              </div>
              <div className="flex gap-4">
                <div className="text-blue-600 font-bold">Week 2</div>
                <div><p className="font-semibold text-gray-900">Design & Development</p><p className="text-sm text-gray-600">Website design, social media setup, integrations</p></div>
              </div>
              <div className="flex gap-4">
                <div className="text-blue-600 font-bold">Week 3</div>
                <div><p className="font-semibold text-gray-900">Testing & Refinements</p><p className="text-sm text-gray-600">Review, feedback, final adjustments</p></div>
              </div>
              <div className="flex gap-4">
                <div className="text-blue-600 font-bold">Week 4+</div>
                <div><p className="font-semibold text-gray-900">Launch! 🚀</p><p className="text-sm text-gray-600">Go live and monitor performance</p></div>
              </div>
            </div>
            <p className="mt-6 text-sm text-blue-900 font-semibold">Expected Launch Date: <span className="text-lg">{formattedDate}</span></p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8 text-left">
            <h2 className="text-lg font-bold text-gray-900 mb-4">⚡ YOUR IMMEDIATE ACTION ITEMS</h2>
            <ol className="space-y-3 text-sm text-gray-700">
              <li className="flex gap-3"><span className="font-bold text-yellow-600">1.</span><span><strong>Receive your encrypted portal invite</strong> — Check your email for secure access credentials</span></li>
              <li className="flex gap-3"><span className="font-bold text-yellow-600">2.</span><span><strong>Upload sensitive credentials</strong> to the portal (domain, hosting, email, social, ads logins, passwords, etc.) — All data is encrypted and secure</span></li>
              <li className="flex gap-3"><span className="font-bold text-yellow-600">3.</span><span><strong>Schedule your kickoff call</strong> using the calendar link below</span></li>
            </ol>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
            <p className="text-gray-700 mb-4">📧 <strong>Check your email shortly!</strong></p>
            <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
              <li>Complete 2-week timeline & next steps</li>
              <li>Encrypted portal setup & access link (IMPORTANT)</li>
              <li>Your customized onboarding checklist (PDF)</li>
              <li>Calendar link to schedule your call</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4 justify-center mb-8">
            <a href="https://calendly.com/ekene-ajufo/kickoff-call" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition text-center">Schedule Kickoff Call</a>
          </div>

          <div className="border-t border-gray-200 pt-6 text-sm text-gray-600">
            <p className="mb-2">Questions before your call?</p>
            <p className="font-semibold text-gray-900">Dr. Ekene Ajufo</p>
            <p>📧 <a href="mailto:info@practicerxconsulting.com" className="text-blue-600 hover:text-blue-700">info@practicerxconsulting.com</a></p>
            <p>📞 <a href="tel:352-620-5211" className="text-blue-600 hover:text-blue-700">352-620-5211</a></p>
          </div>

          <p className="mt-8 text-lg font-semibold text-green-600">We're excited to build your practice's digital presence! 💪</p>
        </div>
      </div>
    </div>
  );
};

export default OnboardPage;