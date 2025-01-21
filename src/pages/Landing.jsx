import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChartBarIcon, GlobeAltIcon, DocumentTextIcon, LightBulbIcon } from '@heroicons/react/24/outline';

export default function Landing() {
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-section').forEach((section) => {
      observerRef.current.observe(section);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const features = [
    {
      icon: ChartBarIcon,
      title: 'Real-time Monitoring',
      description: 'Track disease outbreaks and health trends with advanced analytics and real-time data visualization.'
    },
    {
      icon: GlobeAltIcon,
      title: 'Geographic Insights',
      description: 'Visualize health data across different regions with interactive maps and location-based analytics.'
    },
    {
      icon: DocumentTextIcon,
      title: 'Automated Reporting',
      description: 'Generate comprehensive reports with customizable templates and export options in multiple formats.'
    },
    {
      icon: LightBulbIcon,
      title: 'AI-Powered Predictions',
      description: 'Leverage advanced machine learning models to predict potential disease outbreaks and trends.'
    }
  ];

  return (
    <div className="w-screen min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full h-full overflow-hidden bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="w-full">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
            <div className="mt-10 w-full px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block">Advanced Disease Surveillance</span>
                <span className="block text-primary-200">Powered by AI</span>
              </h1>
              <p className="mt-3 text-base text-primary-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
                Monitor, analyze, and predict disease outbreaks with cutting-edge technology and real-time data analytics.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
                <div className="rounded-md shadow">
                  <Link
                    to="/dashboard"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-white hover:bg-primary-50 md:py-4 md:text-lg md:px-10"
                  >
                    Get Started
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="#features"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 md:py-4 md:text-lg md:px-10"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-12 bg-white w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Comprehensive Disease Surveillance
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Everything you need to monitor and analyze health trends effectively
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="fade-in-section opacity-0 transition-all duration-1000 ease-out transform translate-y-8"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-600">
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="mt-6 text-xl font-medium text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-base text-gray-600 text-center">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-primary-800 py-12 w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="fade-in-section opacity-0">
            <h3 className="text-5xl font-extrabold text-white">100+</h3>
            <p className="mt-2 text-primary-100">Countries Covered</p>
          </div>
          <div className="fade-in-section opacity-0">
            <h3 className="text-5xl font-extrabold text-white">1M+</h3>
            <p className="mt-2 text-primary-100">Data Points Analyzed</p>
          </div>
          <div className="fade-in-section opacity-0">
            <h3 className="text-5xl font-extrabold text-white">99%</h3>
            <p className="mt-2 text-primary-100">Prediction Accuracy</p>
          </div>
          <div className="fade-in-section opacity-0">
            <h3 className="text-5xl font-extrabold text-white">24/7</h3>
            <p className="mt-2 text-primary-100">Real-time Monitoring</p>
          </div>
        </div>
      </div>
    </div>
  );
}
