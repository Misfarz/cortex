import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { 
  Sparkles, 
  Zap, 
  Shield, 
  Code, 
  Filter,
  Tag,
  Layers,
  ChevronRight,
  CheckCircle2,
  Play,
  Terminal,
  Image as ImageIcon,
  Settings,
  Eye,
  AlertTriangle
} from 'lucide-react';

const VITE_API_URL = import.meta.env.VITE_API_URL;

function Landing() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('custom');
  const navigate = useNavigate()

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const codeSnippets = {
    custom: `// Validate image with custom tags
const validation = await imgModerate.validate({
  image: imageUrl,
  requiredTags: ['clothing', 'fashion'],
  blockedTags: ['nudity', 'violence'],
  allowedCategories: ['apparel', 'accessories'],
  confidenceThreshold: 0.85
});

console.log(validation.isApproved); // true
console.log(validation.detectedTags); // ['clothing', 'casual', 'shirt']`,
    
    safety: `// Advanced safety configuration
const safetyConfig = {
  moderation: {
    nudityThreshold: 0.2,
    violenceThreshold: 0.3,
    hateSymbols: true,
    foulSigns: true
  },
  content: {
    checkAdultContent: true,
    checkViolence: true,
    checkHateSpeech: false
  }
};

// Batch processing
const results = await imgModerate.batchAnalyze(images, {
  config: safetyConfig,
  customTags: ['football', 'sports'],
  strictMode: true
});`,
    
    tags: `// Complex tag-based filtering
const tagRules = {
  ecommerce: {
    allowed: ['clothing', 'shoes', 'accessories'],
    required: ['product', 'clear-background'],
    blocked: ['person', 'text', 'watermark']
  },
  social: {
    allowed: ['human', 'faces', 'activities'],
    blocked: ['weapons', 'explicit', 'illegal'],
    ageRestricted: ['alcohol', 'smoking']
  }
};

const result = await imgModerate.withTags(image, {
  rules: tagRules.ecommerce,
  validateGuidelines: true
});`
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-sans overflow-hidden">
      {/* Animated background gradient */}
      <div
        className="fixed inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(800px circle at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(37, 99, 235, 0.15), transparent 40%)`,
        }}
      />

      {/* Grid background */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px),
                              linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* ================= NAVBAR ================= */}
      <nav className="relative z-50 w-full border-b border-white/5 backdrop-blur-xl bg-[#0a0a0f]/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 opacity-20 blur-sm group-hover:opacity-30 transition-opacity" />
            </div>

            <span className="text-xl font-semibold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Cortex
            </span>
            <span className="text-xs text-gray-500 pt-1">AI IMAGE MODERATION</span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors group"
            >
              <span className="relative">
                API
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-800 group-hover:w-full transition-all duration-300" />
              </span>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors group"
            >
              <span className="relative">
                Documentation
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-800 group-hover:w-full transition-all duration-300" />
              </span>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors group"
            >
              <span className="relative">
                Pricing
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-800 group-hover:w-full transition-all duration-300" />
              </span>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors group"
            >
              <span className="relative">
                Use Cases
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-800 group-hover:w-full transition-all duration-300" />
              </span>
            </a>
          </div>

          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              const res = await axios.post(
                 "http://localhost:3000/cortex/api/google",
                {
                  token: credentialResponse.credential,
                }
              );

              localStorage.setItem("token", res.data.token);
              localStorage.setItem("user", JSON.stringify(res.data.user));
              navigate('/cortex/dashboard')
            }}
          />
        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-gray-300">
                Smart Image Validation API
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-8">
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Tag-Based Image
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Moderation API
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl lg:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              Validate images with custom tags while enforcing safety guidelines. 
              Perfect for e-commerce, social platforms, and content-heavy applications.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
              <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center gap-3 group">
                <Zap className="w-5 h-5" />
                Start Free Trial
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 font-medium flex items-center justify-center gap-3">
                <Terminal className="w-5 h-5" />
                API Documentation
              </button>
            </div>

            {/* Preview Card */}
            <div className="relative max-w-3xl mx-auto">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/10 to-blue-800/10 blur-2xl rounded-3xl" />
              <div className="relative rounded-2xl bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                    <span className="font-medium">How things works here...</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex gap-1">
                      {["bg-blue-600", "bg-blue-500", "bg-blue-400"].map(
                        (color, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${color}`}
                          />
                        ),
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-blue-600/10 to-blue-800/10 border border-blue-600/20">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-blue-600/20">
                        <CheckCircle2 className="w-5 h-5 text-blue-400" />
                      </div>
                      <span className="font-semibold">E-commerce Approved</span>
                    </div>
                    <p className="text-sm text-gray-400">
                      Tags: clothing, product, clean-background ✓
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/20">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-red-500/20">
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                      </div>
                      <span className="font-semibold">Social Media Blocked</span>
                    </div>
                    <p className="text-sm text-gray-400">
                      Violation: nudity detected, missing required tags
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-blue-600/10 to-blue-800/10 border border-blue-600/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <ImageIcon className="w-5 h-5 text-blue-400" />
                      <span className="font-medium">Experience the latest tech</span>
                    </div>
                  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SINGLE FEATURE SECTION ================= */}
      <section className="relative max-w-7xl mx-auto px-6 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/20 to-blue-800/20 border border-white/10 mb-6">
              <Tag className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-gray-300">
                Tag-Based Validation
              </span>
            </div>

            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Flexible Content Rules
              </span>
            </h2>

            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Define exactly what you need. Allow clothing images but block 
              weapons. Require product photos without people. Create complex 
              validation rules that match your business needs.
            </p>

            {/* Feature List */}
            <div className="space-y-6 mb-8">
              {[
                {
                  icon: <Filter className="w-5 h-5 text-blue-400" />,
                  text: "Custom tag whitelist/blacklist system",
                },
                {
                  icon: <Shield className="w-5 h-5 text-blue-400" />,
                  text: "Safety guidelines (nudity, violence, hate symbols)",
                },
                {
                  icon: <Layers className="w-5 h-5 text-blue-400" />,
                  text: "Category-based filtering (e-commerce, social, etc.)",
                },
                {
                  icon: <Settings className="w-5 h-5 text-blue-400" />,
                  text: "Configurable confidence thresholds per tag",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    {item.icon}
                  </div>
                  <span className="text-gray-300">{item.text}</span>
                </div>
              ))}
            </div>

            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center gap-3 group">
              <Terminal className="w-5 h-5" />
              Explore API Features
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Side - Code Editor Feature Card */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/10 to-blue-800/10 blur-2xl rounded-3xl" />
            <div className="relative rounded-2xl bg-[#1a1b26] border border-white/10 overflow-hidden shadow-2xl">
              {/* Editor Header */}
              <div className="bg-[#16161e] border-b border-white/10 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="text-sm font-medium text-gray-400">
                    validation.js
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 rounded-lg bg-blue-600/20 text-blue-400 text-sm font-medium">
                    Live Example
                  </div>
                </div>
              </div>

              {/* Code Tabs */}
              <div className="flex border-b border-white/10">
                {["custom", "safety", "tags"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 text-sm font-medium capitalize transition-all ${
                      activeTab === tab
                        ? "text-white border-b-2 border-blue-600 bg-gradient-to-t from-blue-600/10 to-transparent"
                        : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                    }`}
                  >
                    {tab === "custom" ? "Custom Tags" : 
                     tab === "safety" ? "Safety Rules" : "Tag Filtering"}
                  </button>
                ))}
              </div>

              {/* Code Content */}
              <div className="p-6 bg-gradient-to-b from-[#1a1b26] to-[#16161e]">
                <div className="font-mono text-sm leading-relaxed">
                  <pre className="text-gray-300">
                    <code>{codeSnippets[activeTab]}</code>
                  </pre>
                </div>

                {/* Code Comments */}
                <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-blue-600/10 to-transparent border border-blue-600/20">
                  <div className="flex items-start gap-3">
                    <ImageIcon className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-white mb-1">
                        Real-world Use Case
                      </div>
                      <div className="text-sm text-gray-400">
                        E-commerce platform validating product images contain 
                        only clothing items with clean backgrounds.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Editor Footer */}
              <div className="bg-[#16161e] border-t border-white/10 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-gray-500">ImgModerate API v2</span>
                </div>
                <div className="text-xs text-gray-500">
                  Detects <span className="text-blue-400">1000+ tags</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS SECTION (Minimal) ================= */}
      <section className="relative max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              number: "1000+",
              title: "Tags",
              description: "Pre-trained categories",
              icon: <Tag className="w-8 h-8 text-blue-400" />,
            },
            {
              number: "99.7%",
              title: "Accuracy",
              description: "Tag detection rate",
              icon: <Shield className="w-8 h-8 text-blue-400" />,
            },
            {
              number: "50ms",
              title: "Response",
              description: "Average processing time",
              icon: <Zap className="w-8 h-8 text-blue-400" />,
            },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-xl bg-blue-600/10 border border-blue-600/20">
                  {stat.icon}
                </div>
              </div>
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-lg font-semibold text-white mb-1">
                {stat.title}
              </div>
              <p className="text-gray-400">{stat.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="relative max-w-5xl mx-auto px-6 py-20 mb-32">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-blue-800/10 to-blue-600/10" />
          <div className="relative backdrop-blur-xl bg-white/5 border border-white/20 rounded-3xl p-12 text-center">
            <h2 className="text-4xl font-bold mb-6">Start Validating Images Today</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Implement sophisticated image validation with custom tags and 
              safety guidelines in minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center gap-3 group">
                <Zap className="w-5 h-5" />
                Start Free Trial
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 font-medium">
                Schedule Demo
              </button>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  "Free 10K requests",
                  "No credit card needed",
                  "Real-time processing",
                  "Enterprise security",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 justify-center"
                  >
                    <CheckCircle2 className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-6 md:mb-0">
              <div>
                <span className="text-xl font-semibold">Cortex</span>
                <span className="text-xs text-gray-500 ml-2">
                  AI IMAGE MODERATION
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-8 text-sm text-gray-400 justify-center mb-6 md:mb-0">
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Security
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Contact Sales
              </a>
            </div>

            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} ImgModerate AI.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;