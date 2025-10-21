import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import {
  Analytics,
  Calendar,
  Security,
  ChevronRight,
  Play,
  Bullhorn,
} from "@carbon/icons-react";

const Landing: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: Analytics,
      title: "Real-Time Progress Analytics",
      description:
        "Track your study progress with detailed insights and performance metrics that help you stay on course.",
    },
    {
      icon: Bullhorn,
      title: "Exam Readiness & Mock Tests",
      description:
        "Assess your preparation level with comprehensive mock exams and readiness scoring.",
    },
    {
      icon: Calendar,
      title: "Planned Study Sessions",
      description:
        "Schedule and organize your study time with intelligent planning tools and reminders.",
    },
    {
      icon: Security,
      title: "Secure & Personalized Roadmaps",
      description:
        "Get customized learning paths tailored to your goals with enterprise-grade security.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Sign up & add certifications",
      description:
        "Create your account and add the certifications you want to pursue.",
    },
    {
      number: "02",
      title: "Track progress with Lumii analytics",
      description:
        "Monitor your study sessions and see detailed progress insights.",
    },
    {
      number: "03",
      title: "Ace your exams with readiness insights",
      description:
        "Use our readiness scoring to know exactly when you're ready to take your exam.",
    },
  ];

  const footerSections = [
    {
      title: "About",
      links: ["Our Story", "Team", "Careers", "Press"],
    },
    {
      title: "Resources",
      links: ["Blog", "Help Center", "Guides", "API Docs"],
    },
    {
      title: "Contact",
      links: ["Support", "Sales", "Partnerships", "Feedback"],
    },
  ];

  return (
    <div className="min-h-screen bg-offWhite">
      <Navbar
        isMobileMenuOpen={isMobileMenuOpen}
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-violet via-purpleAccent to-violet text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Illuminate your
                <span className="block text-lavender">
                  certification journey
                </span>
                <span className="block">with clarity.</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
                Track progress, plan study sessions, and test exam readiness —
                all in one place.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                  size="lg"
                  className="bg-purpleAccent hover:bg-white hover:text-violet focus:ring-white/20 transition-all duration-300"
                >
                  Get Started
                  <ChevronRight size={20} className="ml-2" />
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 focus:ring-white/20"
                >
                  <Play size={20} className="mr-2" />
                  Watch Demo
                </Button>
              </div>
            </div>

            {/* Dashboard Mockup */}
            <div className="lg:pl-8">
              <div className="relative">
                {/* Enhanced Hero Illustration SVG */}
                <div className="relative">
                  <svg
                    viewBox="0 0 700 500"
                    className="w-full h-auto max-w-2xl mx-auto"
                  >
                    <defs>
                      <linearGradient
                        id="heroGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#C8A2FF"
                          stopOpacity="0.15"
                        />
                        <stop
                          offset="50%"
                          stopColor="#8E44EC"
                          stopOpacity="0.1"
                        />
                        <stop
                          offset="100%"
                          stopColor="#5B2C98"
                          stopOpacity="0.2"
                        />
                      </linearGradient>
                      <linearGradient
                        id="cardGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="100%" stopColor="#F9F9FB" />
                      </linearGradient>
                      <linearGradient
                        id="chartGradient"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#8E44EC"
                          stopOpacity="0.8"
                        />
                        <stop
                          offset="100%"
                          stopColor="#5B2C98"
                          stopOpacity="0.4"
                        />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Background Elements */}
                    <circle
                      cx="350"
                      cy="250"
                      r="220"
                      fill="url(#heroGradient)"
                    />
                    <circle
                      cx="150"
                      cy="100"
                      r="40"
                      fill="#C8A2FF"
                      opacity="0.1"
                    />
                    <circle
                      cx="550"
                      cy="80"
                      r="25"
                      fill="#8E44EC"
                      opacity="0.15"
                    />
                    <circle
                      cx="600"
                      cy="350"
                      r="35"
                      fill="#6C8AE4"
                      opacity="0.1"
                    />

                    {/* Main Dashboard Card */}
                    <rect
                      x="150"
                      y="120"
                      width="400"
                      height="260"
                      rx="20"
                      fill="url(#cardGradient)"
                      stroke="#E5E7EB"
                      strokeWidth="2"
                      filter="url(#glow)"
                    />

                    {/* Dashboard Header */}
                    <rect
                      x="170"
                      y="140"
                      width="360"
                      height="40"
                      rx="8"
                      fill="#5B2C98"
                      opacity="0.05"
                    />
                    <text
                      x="185"
                      y="160"
                      fontSize="16"
                      fontWeight="700"
                      fill="#2D2D2D"
                    >
                      📊 Certification Dashboard
                    </text>
                    <text
                      x="520"
                      y="160"
                      fontSize="12"
                      fill="#6B7280"
                      textAnchor="end"
                    >
                      Live Progress
                    </text>

                    {/* Progress Cards */}
                    <rect
                      x="170"
                      y="190"
                      width="170"
                      height="80"
                      rx="12"
                      fill="#ffffff"
                      stroke="#E5E7EB"
                    />
                    <text x="185" y="210" fontSize="11" fill="#6B7280">
                      AWS Solutions Architect
                    </text>
                    <text
                      x="185"
                      y="230"
                      fontSize="24"
                      fontWeight="700"
                      fill="#27AE60"
                    >
                      87%
                    </text>
                    <text x="185" y="250" fontSize="10" fill="#6B7280">
                      Ready for exam
                    </text>
                    <rect
                      x="185"
                      y="255"
                      width="140"
                      height="4"
                      rx="2"
                      fill="#E5E7EB"
                    />
                    <rect
                      x="185"
                      y="255"
                      width="122"
                      height="4"
                      rx="2"
                      fill="#27AE60"
                    />

                    <rect
                      x="360"
                      y="190"
                      width="170"
                      height="80"
                      rx="12"
                      fill="#ffffff"
                      stroke="#E5E7EB"
                    />
                    <text x="375" y="210" fontSize="11" fill="#6B7280">
                      CompTIA Security+
                    </text>
                    <text
                      x="375"
                      y="230"
                      fontSize="24"
                      fontWeight="700"
                      fill="#6C8AE4"
                    >
                      64%
                    </text>
                    <text x="375" y="250" fontSize="10" fill="#6B7280">
                      In progress
                    </text>
                    <rect
                      x="375"
                      y="255"
                      width="140"
                      height="4"
                      rx="2"
                      fill="#E5E7EB"
                    />
                    <rect
                      x="375"
                      y="255"
                      width="90"
                      height="4"
                      rx="2"
                      fill="#6C8AE4"
                    />

                    {/* Study Analytics Chart */}
                    <rect
                      x="170"
                      y="290"
                      width="360"
                      height="70"
                      rx="12"
                      fill="#ffffff"
                      stroke="#E5E7EB"
                    />
                    <text
                      x="185"
                      y="310"
                      fontSize="12"
                      fontWeight="600"
                      fill="#2D2D2D"
                    >
                      Study Hours This Week
                    </text>

                    {/* Mini Bar Chart */}
                    <rect
                      x="200"
                      y="320"
                      width="8"
                      height="25"
                      rx="4"
                      fill="url(#chartGradient)"
                    />
                    <rect
                      x="220"
                      y="315"
                      width="8"
                      height="30"
                      rx="4"
                      fill="url(#chartGradient)"
                    />
                    <rect
                      x="240"
                      y="310"
                      width="8"
                      height="35"
                      rx="4"
                      fill="url(#chartGradient)"
                    />
                    <rect
                      x="260"
                      y="305"
                      width="8"
                      height="40"
                      rx="4"
                      fill="url(#chartGradient)"
                    />
                    <rect
                      x="280"
                      y="318"
                      width="8"
                      height="27"
                      rx="4"
                      fill="url(#chartGradient)"
                    />
                    <rect
                      x="300"
                      y="312"
                      width="8"
                      height="33"
                      rx="4"
                      fill="url(#chartGradient)"
                    />
                    <rect
                      x="320"
                      y="308"
                      width="8"
                      height="37"
                      rx="4"
                      fill="url(#chartGradient)"
                    />

                    <text
                      x="480"
                      y="330"
                      fontSize="20"
                      fontWeight="700"
                      fill="#8E44EC"
                      textAnchor="end"
                    >
                      24.5 hrs
                    </text>
                    <text
                      x="480"
                      y="345"
                      fontSize="10"
                      fill="#6B7280"
                      textAnchor="end"
                    >
                      +12% from last week
                    </text>

                    {/* Floating Achievement Badges */}
                    <g transform="translate(580, 140)">
                      <circle
                        cx="0"
                        cy="0"
                        r="20"
                        fill="#F1C40F"
                        opacity="0.9"
                      />
                      <path
                        d="M-8 -4L0 -12L8 -4L4 -4L4 8L-4 8L-4 -4Z"
                        fill="white"
                      />
                    </g>

                    <g transform="translate(120, 200)">
                      <circle
                        cx="0"
                        cy="0"
                        r="15"
                        fill="#27AE60"
                        opacity="0.9"
                      />
                      <path
                        d="M-6 0L-2 4L6 -4"
                        stroke="white"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </g>

                    <g transform="translate(580, 300)">
                      <circle
                        cx="0"
                        cy="0"
                        r="18"
                        fill="#8E44EC"
                        opacity="0.8"
                      />
                      <rect
                        x="-6"
                        y="-6"
                        width="12"
                        height="12"
                        rx="2"
                        fill="white"
                      />
                    </g>

                    {/* Animated Particles */}
                    <circle
                      cx="100"
                      cy="150"
                      r="3"
                      fill="#C8A2FF"
                      opacity="0.6"
                    >
                      <animate
                        attributeName="cy"
                        values="150;140;150"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle
                      cx="600"
                      cy="200"
                      r="4"
                      fill="#8E44EC"
                      opacity="0.5"
                    >
                      <animate
                        attributeName="cx"
                        values="600;590;600"
                        dur="4s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle cx="80" cy="350" r="2" fill="#6C8AE4" opacity="0.7">
                      <animate
                        attributeName="r"
                        values="2;4;2"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </svg>

                  {/* Floating UI Elements */}
                  <div
                    className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 animate-bounce"
                    style={{ animationDelay: "2s" }}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-xs font-medium text-charcoal">
                        Exam Ready!
                      </span>
                    </div>
                  </div>

                  <div className="absolute bottom-8 left-4 bg-white rounded-lg shadow-lg p-3 animate-pulse">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purpleAccent rounded-full"></div>
                      <span className="text-xs font-medium text-charcoal">
                        Study Streak: 7 days
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Animation Elements */}
              <div className="absolute top-10 right-10 w-16 h-16 bg-lavender/20 rounded-full animate-pulse"></div>
              <div
                className="absolute bottom-20 left-10 w-12 h-12 bg-purpleAccent/20 rounded-full animate-bounce"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-lavender/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-40 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-charcoal mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools designed to help you prepare, practice, and
              pass your certifications with confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden"
                >
                  {/* Enhanced Background SVG Pattern */}
                  <svg
                    className="absolute -top-4 -right-4 w-24 h-24 opacity-5"
                    viewBox="0 0 100 100"
                  >
                    <defs>
                      <pattern
                        id={`pattern-${index}`}
                        x="0"
                        y="0"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                      >
                        <circle cx="10" cy="10" r="2" fill="currentColor" />
                        <circle
                          cx="10"
                          cy="10"
                          r="8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="0.5"
                        />
                      </pattern>
                    </defs>
                    <rect
                      width="100"
                      height="100"
                      fill={`url(#pattern-${index})`}
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="30"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      opacity="0.3"
                    />
                  </svg>

                  {/* Feature Illustration */}
                  <div className="absolute top-4 left-4 opacity-10">
                    <svg width="60" height="60" viewBox="0 0 60 60">
                      {index === 0 && (
                        // Analytics Chart
                        <g>
                          <rect
                            x="10"
                            y="40"
                            width="4"
                            height="15"
                            fill="currentColor"
                          />
                          <rect
                            x="18"
                            y="35"
                            width="4"
                            height="20"
                            fill="currentColor"
                          />
                          <rect
                            x="26"
                            y="30"
                            width="4"
                            height="25"
                            fill="currentColor"
                          />
                          <rect
                            x="34"
                            y="25"
                            width="4"
                            height="30"
                            fill="currentColor"
                          />
                          <rect
                            x="42"
                            y="32"
                            width="4"
                            height="23"
                            fill="currentColor"
                          />
                        </g>
                      )}
                      {index === 1 && (
                        // Target/Bullseye
                        <g>
                          <circle
                            cx="30"
                            cy="30"
                            r="25"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <circle
                            cx="30"
                            cy="30"
                            r="18"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <circle
                            cx="30"
                            cy="30"
                            r="11"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <circle cx="30" cy="30" r="4" fill="currentColor" />
                        </g>
                      )}
                      {index === 2 && (
                        // Calendar Grid
                        <g>
                          <rect
                            x="10"
                            y="15"
                            width="40"
                            height="35"
                            rx="3"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <line
                            x1="10"
                            y1="25"
                            x2="50"
                            y2="25"
                            stroke="currentColor"
                            strokeWidth="1"
                          />
                          <line
                            x1="20"
                            y1="25"
                            x2="20"
                            y2="50"
                            stroke="currentColor"
                            strokeWidth="1"
                          />
                          <line
                            x1="30"
                            y1="25"
                            x2="30"
                            y2="50"
                            stroke="currentColor"
                            strokeWidth="1"
                          />
                          <line
                            x1="40"
                            y1="25"
                            x2="40"
                            y2="50"
                            stroke="currentColor"
                            strokeWidth="1"
                          />
                          <circle cx="25" cy="35" r="2" fill="currentColor" />
                          <circle cx="35" cy="40" r="2" fill="currentColor" />
                        </g>
                      )}
                      {index === 3 && (
                        // Shield with Lock
                        <g>
                          <path
                            d="M30 10L45 18V35C45 42 30 50 30 50S15 42 15 35V18L30 10Z"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <rect
                            x="26"
                            y="28"
                            width="8"
                            height="10"
                            rx="1"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                          <circle
                            cx="30"
                            cy="25"
                            r="3"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                        </g>
                      )}
                    </svg>
                  </div>

                  <div className="relative z-10">
                    <div className="bg-gradient-to-br from-violet to-purpleAccent p-4 rounded-xl inline-block mb-6">
                      <Icon size={32} className="text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-charcoal mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-offWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-charcoal mb-4">
              How it works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started with Lumii in three simple steps and transform your
              certification journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                {/* Step Background Illustration */}
                <div className="absolute inset-0 flex items-center justify-center opacity-5">
                  <svg width="200" height="200" viewBox="0 0 200 200">
                    {index === 0 && (
                      // User Registration Flow
                      <g>
                        <circle
                          cx="100"
                          cy="60"
                          r="25"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="M85 85Q100 75 115 85"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <rect
                          x="70"
                          y="120"
                          width="60"
                          height="40"
                          rx="8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <line
                          x1="80"
                          y1="135"
                          x2="120"
                          y2="135"
                          stroke="currentColor"
                          strokeWidth="1"
                        />
                        <line
                          x1="80"
                          y1="145"
                          x2="110"
                          y2="145"
                          stroke="currentColor"
                          strokeWidth="1"
                        />
                      </g>
                    )}
                    {index === 1 && (
                      // Analytics Dashboard
                      <g>
                        <rect
                          x="50"
                          y="60"
                          width="100"
                          height="80"
                          rx="8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <rect
                          x="60"
                          y="100"
                          width="6"
                          height="20"
                          fill="currentColor"
                        />
                        <rect
                          x="70"
                          y="90"
                          width="6"
                          height="30"
                          fill="currentColor"
                        />
                        <rect
                          x="80"
                          y="95"
                          width="6"
                          height="25"
                          fill="currentColor"
                        />
                        <rect
                          x="90"
                          y="85"
                          width="6"
                          height="35"
                          fill="currentColor"
                        />
                        <circle
                          cx="130"
                          cy="90"
                          r="15"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="M125 90A5 5 0 0 1 135 90"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        />
                      </g>
                    )}
                    {index === 2 && (
                      // Success/Achievement
                      <g>
                        <circle
                          cx="100"
                          cy="100"
                          r="40"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="M80 100L95 115L120 85"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        <path
                          d="M70 70L85 55M130 70L115 55M70 130L85 145M130 130L115 145"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </g>
                    )}
                  </svg>
                </div>

                <div className="bg-gradient-to-br from-violet to-purpleAccent text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6 relative">
                  {step.number}

                  {/* Step Icon SVG */}
                  <svg
                    className="absolute -top-2 -right-2 w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    {index === 0 && (
                      <path
                        d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"
                        fill="#F1C40F"
                      />
                    )}
                    {index === 1 && (
                      <circle cx="12" cy="12" r="8" fill="#27AE60" />
                    )}
                    {index === 2 && (
                      <path
                        d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke="#8E44EC"
                        strokeWidth="2"
                        fill="none"
                      />
                    )}
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-charcoal mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 transform translate-x-8 z-10">
                    <svg
                      width="60"
                      height="40"
                      viewBox="0 0 60 40"
                      className="text-lavender"
                    >
                      <defs>
                        <marker
                          id={`arrowhead-${index}`}
                          markerWidth="10"
                          markerHeight="7"
                          refX="9"
                          refY="3.5"
                          orient="auto"
                        >
                          <polygon
                            points="0 0, 10 3.5, 0 7"
                            fill="currentColor"
                          />
                        </marker>
                        <pattern
                          id={`dots-${index}`}
                          x="0"
                          y="0"
                          width="8"
                          height="8"
                          patternUnits="userSpaceOnUse"
                        >
                          <circle
                            cx="4"
                            cy="4"
                            r="1"
                            fill="currentColor"
                            opacity="0.4"
                          />
                        </pattern>
                      </defs>

                      {/* Curved connecting line */}
                      <path
                        d="M5 20 Q30 10 50 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        markerEnd={`url(#arrowhead-${index})`}
                        strokeDasharray="4,4"
                      />

                      {/* Decorative dots */}
                      <circle
                        cx="15"
                        cy="15"
                        r="2"
                        fill="currentColor"
                        opacity="0.3"
                      />
                      <circle
                        cx="35"
                        cy="15"
                        r="1.5"
                        fill="currentColor"
                        opacity="0.4"
                      />
                      <circle
                        cx="25"
                        cy="25"
                        r="1"
                        fill="currentColor"
                        opacity="0.2"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-violet to-purpleAccent text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
          {/* Enhanced Background SVG Pattern */}
          <svg
            className="absolute inset-0 w-full h-full opacity-10"
            viewBox="0 0 800 400"
          >
            <defs>
              <pattern
                id="ctaPattern"
                x="0"
                y="0"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="20" cy="20" r="2" fill="currentColor" />
                <circle
                  cx="40"
                  cy="40"
                  r="1.5"
                  fill="currentColor"
                  opacity="0.7"
                />
                <path
                  d="M10 30L20 20L30 30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
              <radialGradient id="ctaRadial" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="white" stopOpacity="0.1" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#ctaPattern)" />
            <ellipse
              cx="400"
              cy="200"
              rx="300"
              ry="150"
              fill="url(#ctaRadial)"
            />

            {/* Floating geometric shapes */}
            <polygon points="100,50 120,80 80,80" fill="white" opacity="0.05" />
            <rect
              x="650"
              y="60"
              width="30"
              height="30"
              rx="5"
              fill="white"
              opacity="0.05"
            />
            <circle cx="150" cy="300" r="20" fill="white" opacity="0.03" />
            <polygon
              points="700,300 720,330 680,330"
              fill="white"
              opacity="0.04"
            />
          </svg>

          <div className="relative z-10">
            {/* Enhanced Rocket SVG */}
            <svg
              className="w-20 h-20 mx-auto mb-6"
              viewBox="0 0 80 80"
              fill="none"
            >
              <defs>
                <linearGradient
                  id="rocketGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="white" stopOpacity="1" />
                  <stop offset="100%" stopColor="white" stopOpacity="0.8" />
                </linearGradient>
                <filter id="rocketGlow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Rocket Body */}
              <path
                d="M40 5L50 25H30L40 5Z"
                fill="url(#rocketGradient)"
                filter="url(#rocketGlow)"
              />
              <rect
                x="35"
                y="25"
                width="10"
                height="25"
                fill="url(#rocketGradient)"
                opacity="0.9"
              />

              {/* Rocket Window */}
              <circle cx="40" cy="35" r="4" fill="white" opacity="0.3" />
              <circle cx="40" cy="35" r="2" fill="white" opacity="0.8" />

              {/* Rocket Fins */}
              <path
                d="M25 35L35 30V40L25 35Z"
                fill="url(#rocketGradient)"
                opacity="0.7"
              />
              <path
                d="M55 35L45 30V40L55 35Z"
                fill="url(#rocketGradient)"
                opacity="0.7"
              />

              {/* Rocket Exhaust */}
              <ellipse
                cx="40"
                cy="55"
                rx="6"
                ry="8"
                fill="#F1C40F"
                opacity="0.8"
              />
              <ellipse
                cx="40"
                cy="58"
                rx="4"
                ry="6"
                fill="#E67E22"
                opacity="0.6"
              />
              <ellipse
                cx="40"
                cy="60"
                rx="2"
                ry="4"
                fill="#E74C3C"
                opacity="0.4"
              />

              {/* Stars around rocket */}
              <g opacity="0.6">
                <path
                  d="M15 20L16 22L18 21L16 23L17 25L15 24L13 25L14 23L12 21L14 22Z"
                  fill="white"
                />
                <path
                  d="M65 15L66 17L68 16L66 18L67 20L65 19L63 20L64 18L62 16L64 17Z"
                  fill="white"
                />
                <path
                  d="M20 60L21 62L23 61L21 63L22 65L20 64L18 65L19 63L17 61L19 62Z"
                  fill="white"
                />
                <circle cx="60" cy="55" r="1" fill="white" />
                <circle cx="25" cy="45" r="0.5" fill="white" />
              </g>

              {/* Motion lines */}
              <g opacity="0.3">
                <line
                  x1="10"
                  y1="40"
                  x2="20"
                  y2="40"
                  stroke="white"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
                <line
                  x1="60"
                  y1="45"
                  x2="70"
                  y2="45"
                  stroke="white"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
                <line
                  x1="15"
                  y1="50"
                  x2="25"
                  y2="50"
                  stroke="white"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                />
              </g>
            </svg>
          </div>

          <h2 className="text-4xl font-bold mb-6">
            Ready to level up your skills?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Start your journey with Lumii today.
          </p>
          <Button
            size="lg"
            className="bg-white text-violet hover:bg-gray-50 focus:ring-white/20 transform hover:scale-105 transition-all duration-300"
          >
            Sign Up Free
            <ChevronRight size={20} className="ml-2" />
          </Button>
          <p className="text-sm text-white/70 mt-4">
            No credit card required • 14-day free trial
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Footer Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%" viewBox="0 0 1200 400">
              <defs>
                <pattern
                  id="footerPattern"
                  x="0"
                  y="0"
                  width="100"
                  height="100"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="50" cy="50" r="1" fill="currentColor" />
                  <circle cx="25" cy="25" r="0.5" fill="currentColor" />
                  <circle cx="75" cy="75" r="0.5" fill="currentColor" />
                  <path
                    d="M20 50L30 40L40 50"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.3"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#footerPattern)" />
            </svg>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {/* Logo & Description */}
            <div className="md:col-span-2 relative">
              {/* Logo Background Glow */}
              <div className="absolute -top-2 -left-2 w-32 h-16 bg-gradient-to-r from-lavender to-purpleAccent opacity-10 rounded-lg blur-xl"></div>

              <div className="bg-gradient-to-r from-lavender to-purpleAccent bg-clip-text text-transparent mb-4">
                <h3 className="text-2xl font-bold relative z-10">Lumii</h3>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Illuminate your certification journey with clarity. Track
                progress, plan study sessions, and achieve your professional
                goals.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-purpleAccent transition-all duration-300 cursor-pointer group">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-purpleAccent transition-all duration-300 cursor-pointer group">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </div>
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-purpleAccent transition-all duration-300 cursor-pointer group">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-lavender transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 md:mb-0">
                © 2024 Lumii. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <a href="#" className="hover:text-lavender transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-lavender transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-lavender transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
