import React, { useState } from 'react';
import { Camera, Upload, Sparkles, User, Heart, X, Check, Calendar, MapPin, Star, Crown, Shirt, Search } from 'lucide-react';

// Mock data
const mockClosetItems = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400",
    name: "Summer Dress",
    category: "dress",
    color: "pink",
    style: ["vintage", "cottagecore"],
    fit: "flowy",
    vibe: ["casual", "picnic"],
    condition: "like new",
    owner: "You"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
    name: "Leather Jacket",
    category: "jacket",
    color: "black",
    style: ["grunge", "punk"],
    fit: "fitted",
    vibe: ["casual", "party"],
    condition: "gently used",
    owner: "Emma"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=400",
    name: "Knit Sweater",
    category: "top",
    color: "beige",
    style: ["cozy", "minimalist"],
    fit: "oversized",
    vibe: ["everyday", "academic"],
    condition: "like new",
    owner: "Sarah"
  }
];

const mockTrades = [
  {
    id: 1,
    type: "received",
    item: mockClosetItems[0],
    requester: "Emma",
    status: "pending",
    offeringItem: mockClosetItems[1]
  },
  {
    id: 2,
    type: "sent",
    item: mockClosetItems[1],
    requester: "You",
    status: "accepted",
    offeringItem: mockClosetItems[0]
  }
];

const campusLocations = [
  "Student Union - Main Lobby",
  "Library - Ground Floor",
  "Campus Coffee Shop",
  "Dining Hall - Main Entrance",
  "Student Center - Lounge Area"
];

const tagOptions = {
  category: ["dress", "jacket", "pants", "top", "shoes", "accessories"],
  color: ["black", "white", "beige", "brown", "red", "pink", "blue", "green", "yellow", "purple", "gray", "multicolor"],
  style: ["vintage", "streetwear", "minimalist", "y2k", "cottagecore", "grunge", "academia", "boho", "chic", "sporty", "preppy", "kawaii", "techwear", "classic", "fairycore", "indie", "retro", "girly", "punk", "elegant"],
  fit: ["oversized", "cropped", "fitted", "flowy", "high-waisted", "loose", "bodycon", "layered", "structured"],
  vibe: ["casual", "formal", "date night", "interview", "presentation", "party", "everyday", "picnic", "beach", "festival", "cozy", "academic", "workwear"]
};

// Sparkle Background Component
const Sparkles = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    {[...Array(12)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-pulse"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${i * 0.3}s`,
          animationDuration: `${2 + Math.random() * 2}s`,
          boxShadow: '0 0 10px #F6E27F'
        }}
      />
    ))}
  </div>
);

// Navigation Component
const Navigation = ({ currentPage, onNavigate, user }) => (
  <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/30 border-b border-purple-200/30">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center py-4">
        <button 
          onClick={() => onNavigate('home')}
          className="text-2xl font-bold text-purple-900"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          ✨ WearEver
        </button>
        
        {user ? (
          <div className="flex gap-6 items-center">
            <button onClick={() => onNavigate('upload')} className="text-purple-900 hover:text-pink-500 transition-colors font-medium">
              Upload
            </button>
            <button onClick={() => onNavigate('match')} className="text-purple-900 hover:text-pink-500 transition-colors font-medium">
              Match
            </button>
            <button onClick={() => onNavigate('trade')} className="text-purple-900 hover:text-pink-500 transition-colors font-medium">
              Trades
            </button>
            <button onClick={() => onNavigate('closet')} className="text-purple-900 hover:text-pink-500 transition-colors font-medium">
              Closet
            </button>
            <button onClick={() => onNavigate('closet')} className="p-2 rounded-full bg-gradient-to-r from-pink-300 to-purple-300 hover:shadow-lg transition-all">
              <User size={20} className="text-purple-900" />
            </button>
          </div>
        ) : (
          <button 
            onClick={() => onNavigate('auth')}
            className="px-6 py-2 bg-gradient-to-r from-pink-300 to-yellow-300 rounded-full text-purple-900 font-semibold hover:shadow-lg transition-all"
          >
            Login
          </button>
        )}
      </div>
    </div>
  </nav>
);

// Home Page
const HomePage = ({ onNavigate }) => (
  <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-yellow-50">
    <Sparkles />
    <div className="relative z-10 max-w-4xl mx-auto px-4 py-20 text-center">
      <div className="mb-8 text-8xl animate-bounce">🧚‍♀️</div>
      <h1 className="text-6xl font-bold text-purple-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
        WearEver, WhenEver, Wear Whatever
      </h1>
      <p className="text-xl text-purple-700 mb-12">
        Trade clothes money-free with AI-powered matching. Your dream outfit is just a trade away.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
        <button 
          onClick={() => onNavigate('upload')}
          className="px-8 py-4 bg-gradient-to-r from-pink-300 to-yellow-300 rounded-full text-purple-900 font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
        >
          Upload Clothes ✨
        </button>
        <button 
          onClick={() => onNavigate('match')}
          className="px-8 py-4 bg-gradient-to-r from-purple-300 to-blue-300 rounded-full text-purple-900 font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
        >
          Find Outfits 🔍
        </button>
        <button 
          onClick={() => onNavigate('closet')}
          className="px-8 py-4 bg-white/70 backdrop-blur rounded-full text-purple-900 font-bold text-lg border-2 border-purple-300 hover:shadow-2xl hover:-translate-y-1 transition-all"
        >
          View Closet 👗
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-20">
        <div className="bg-white/60 backdrop-blur rounded-3xl p-8 border-2 border-yellow-200 hover:border-yellow-300 hover:-translate-y-2 transition-all">
          <div className="text-5xl mb-4">🪄</div>
          <h3 className="text-xl font-bold text-purple-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>AI Outfit Matcher</h3>
          <p className="text-purple-700">Upload your dream aesthetic and let our Fairy Godmother AI find perfect matches</p>
        </div>
        <div className="bg-white/60 backdrop-blur rounded-3xl p-8 border-2 border-pink-200 hover:border-pink-300 hover:-translate-y-2 transition-all">
          <div className="text-5xl mb-4">💫</div>
          <h3 className="text-xl font-bold text-purple-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Cashless Trading</h3>
          <p className="text-purple-700">Trade clothes without spending a dime. Sustainable fashion for your wallet and planet</p>
        </div>
        <div className="bg-white/60 backdrop-blur rounded-3xl p-8 border-2 border-purple-200 hover:border-purple-300 hover:-translate-y-2 transition-all">
          <div className="text-5xl mb-4">👑</div>
          <h3 className="text-xl font-bold text-purple-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Earn Rewards</h3>
          <p className="text-purple-700">Build your enchanted wardrobe and earn ClothCoins with every trade</p>
        </div>
      </div>
    </div>
  </div>
);

// Auth Page
const AuthPage = ({ onLogin }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-yellow-50">
      <Sparkles />
      <div className="relative z-10 max-w-md mx-auto px-4 py-20">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🧚‍♀️</div>
          <h1 className="text-4xl font-bold text-purple-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            {isSignup ? 'Join the Magic' : 'Welcome Back'}
          </h1>
          <p className="text-purple-700">Step into your enchanted closet</p>
        </div>

        <div className="bg-white/70 backdrop-blur rounded-3xl p-8 border-2 border-purple-200 shadow-2xl">
          <input
            type="email"
            placeholder="Your .edu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-yellow-300 focus:outline-none mb-4 bg-white/80"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-yellow-300 focus:outline-none mb-6 bg-white/80"
          />
          
          <button 
            onClick={() => onLogin({ email, name: email.split('@')[0] })}
            className="w-full py-4 bg-gradient-to-r from-pink-300 to-yellow-300 rounded-xl text-purple-900 font-bold text-lg hover:shadow-xl transition-all mb-4"
          >
            {isSignup ? 'Create Account ✨' : 'Sign In ✨'}
          </button>
          
          <button 
            onClick={() => setIsSignup(!isSignup)}
            className="w-full text-purple-700 hover:text-purple-900 transition-colors"
          >
            {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Upload Page
const UploadPage = ({ onNavigate }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    category: '',
    color: '',
    style: [],
    fit: '',
    vibe: [],
    condition: 'like new'
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAutoTag = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
    // Simulate AI tagging
    setFormData({
      ...formData,
      style: ['vintage', 'cottagecore'],
      vibe: ['casual', 'picnic']
    });
  };

  const toggleArrayField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-100 to-yellow-50">
      <Sparkles />
      <div className="relative z-10 max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold text-purple-900 text-center mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
          Magical Dressing Room
        </h1>
        <p className="text-center text-purple-700 mb-8">Share your treasures with the enchanted closet</p>

        <div className="bg-white/70 backdrop-blur rounded-3xl p-8 border-2 border-yellow-200 shadow-xl">
          {/* Image Upload */}
          <div className="mb-6">
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <label htmlFor="imageInput" className="block">
              <div className="border-4 border-dashed border-purple-300 rounded-2xl p-8 cursor-pointer hover:border-yellow-300 transition-all min-h-64 flex items-center justify-center bg-white/50">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="max-h-64 rounded-xl object-contain" />
                ) : (
                  <div className="text-center">
                    <Camera size={48} className="mx-auto mb-4 text-purple-400" />
                    <p className="text-purple-700 font-medium">Click to upload your item</p>
                  </div>
                )}
              </div>
            </label>
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-purple-900 font-semibold mb-2">Category *</label>
            <select 
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-yellow-300 focus:outline-none bg-white"
            >
              <option value="">Select category</option>
              {tagOptions.category.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Color */}
          <div className="mb-4">
            <label className="block text-purple-900 font-semibold mb-2">Color *</label>
            <select 
              value={formData.color}
              onChange={(e) => setFormData({...formData, color: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-yellow-300 focus:outline-none bg-white"
            >
              <option value="">Select color</option>
              {tagOptions.color.map(color => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
          </div>

          {/* Style Tags */}
          <div className="mb-4">
            <label className="block text-purple-900 font-semibold mb-2">Style Tags</label>
            <div className="flex flex-wrap gap-2">
              {tagOptions.style.map(style => (
                <button
                  key={style}
                  onClick={() => toggleArrayField('style', style)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    formData.style.includes(style)
                      ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white'
                      : 'bg-white border-2 border-purple-200 text-purple-700 hover:border-purple-300'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Fit */}
          <div className="mb-4">
            <label className="block text-purple-900 font-semibold mb-2">Fit</label>
            <select 
              value={formData.fit}
              onChange={(e) => setFormData({...formData, fit: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-yellow-300 focus:outline-none bg-white"
            >
              <option value="">Select fit</option>
              {tagOptions.fit.map(fit => (
                <option key={fit} value={fit}>{fit}</option>
              ))}
            </select>
          </div>

          {/* Vibe Tags */}
          <div className="mb-4">
            <label className="block text-purple-900 font-semibold mb-2">Vibe</label>
            <div className="flex flex-wrap gap-2">
              {tagOptions.vibe.map(vibe => (
                <button
                  key={vibe}
                  onClick={() => toggleArrayField('vibe', vibe)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    formData.vibe.includes(vibe)
                      ? 'bg-gradient-to-r from-yellow-300 to-pink-300 text-purple-900'
                      : 'bg-white border-2 border-purple-200 text-purple-700 hover:border-purple-300'
                  }`}
                >
                  {vibe}
                </button>
              ))}
            </div>
          </div>

          {/* Condition */}
          <div className="mb-6">
            <label className="block text-purple-900 font-semibold mb-2">Condition</label>
            <select 
              value={formData.condition}
              onChange={(e) => setFormData({...formData, condition: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-yellow-300 focus:outline-none bg-white"
            >
              <option value="like new">Like New</option>
              <option value="gently used">Gently Used</option>
              <option value="well loved">Well Loved</option>
            </select>
          </div>

          {/* Buttons */}
          <button 
            onClick={handleAutoTag}
            className="w-full py-3 mb-3 bg-gradient-to-r from-purple-300 to-blue-300 rounded-xl text-purple-900 font-semibold hover:shadow-lg transition-all"
          >
            Auto-Tag with AI ✨
          </button>
          
          <button 
            onClick={() => onNavigate('closet')}
            className="w-full py-4 bg-gradient-to-r from-pink-300 to-yellow-300 rounded-xl text-purple-900 font-bold text-lg hover:shadow-xl transition-all"
          >
            Add to Closet 👗
          </button>
        </div>

        {/* Success Modal */}
        {showSuccess && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
            <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-yellow-300 animate-pulse">
              <p className="text-3xl text-purple-600" style={{ fontFamily: 'Great Vibes, cursive' }}>
                ✨ Tags added by Fairy Godmother!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Match Page
const MatchPage = ({ onNavigate }) => {
  const [inspirationImage, setInspirationImage] = useState(null);
  const [matches, setMatches] = useState([]);
  const [showMatches, setShowMatches] = useState(false);
  const [detectedTags, setDetectedTags] = useState([]);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInspirationImage(reader.result);
        // Simulate AI detection
        setTimeout(() => {
          setDetectedTags(['vintage', 'cottagecore', 'romantic']);
          setMatches(mockClosetItems);
          setShowMatches(true);
        }, 1500);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-100 to-pink-50">
      <Sparkles />
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <p className="text-4xl mb-4" style={{ fontFamily: 'Great Vibes, cursive', color: '#A2D2FF' }}>
            "I've found some magical matches for you! ✨"
          </p>
        </div>

        <h1 className="text-5xl font-bold text-purple-900 text-center mb-12" style={{ fontFamily: 'Playfair Display, serif' }}>
          Find Your Perfect Match
        </h1>

        {!showMatches ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/70 backdrop-blur rounded-3xl p-8 border-2 border-blue-200 shadow-xl">
              <input
                type="file"
                id="inspirationInput"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label htmlFor="inspirationInput" className="block">
                <div className="border-4 border-dashed border-blue-300 rounded-2xl p-12 cursor-pointer hover:border-yellow-300 transition-all min-h-96 flex items-center justify-center bg-white/50">
                  {inspirationImage ? (
                    <img src={inspirationImage} alt="Inspiration" className="max-h-80 rounded-xl object-contain" />
                  ) : (
                    <div className="text-center">
                      <Search size={64} className="mx-auto mb-6 text-blue-400" />
                      <h3 className="text-2xl font-bold text-purple-900 mb-2">Upload Your Dream Aesthetic</h3>
                      <p className="text-purple-700">Upload a photo and let AI find matching items</p>
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>
        ) : (
          <div>
            {/* Detected Tags */}
            <div className="bg-white/70 backdrop-blur rounded-2xl p-6 mb-8 border-2 border-yellow-200 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-purple-900 mb-3 text-center">AI Detected Style Tags ✨</h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {detectedTags.map(tag => (
                  <span key={tag} className="px-6 py-2 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full font-semibold text-lg">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Matching Items */}
            <div className="grid md:grid-cols-3 gap-6">
              {matches.map(item => (
                <div key={item.id} className="bg-white/80 backdrop-blur rounded-3xl overflow-hidden border-2 border-purple-200 hover:border-yellow-300 hover:-translate-y-2 transition-all shadow-lg">
                  <div className="relative h-80">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-purple-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {item.name}
                    </h3>
                    <p className="text-purple-600 mb-4">Owned by {item.owner}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.style.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button 
                      onClick={() => onNavigate('trade')}
                      className="w-full py-3 bg-gradient-to-r from-pink-300 to-yellow-300 rounded-xl text-purple-900 font-bold hover:shadow-lg transition-all"
                    >
                      Request Trade ✨
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <button 
                onClick={() => { setShowMatches(false); setInspirationImage(null); }}
                className="px-8 py-3 bg-white/70 backdrop-blur border-2 border-purple-300 rounded-full text-purple-900 font-semibold hover:shadow-lg transition-all"
              >
                Upload New Inspiration
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Trade Page
const TradePage = ({ onNavigate }) => {
  const [selectedTrade, setSelectedTrade] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-blue-50">
      <Sparkles />
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold text-purple-900 text-center mb-12" style={{ fontFamily: 'Playfair Display, serif' }}>
          Your Trade Requests
        </h1>

        <div className="space-y-6">
          {mockTrades.map(trade => (
            <div key={trade.id} className="bg-white/70 backdrop-blur rounded-3xl p-6 border-2 border-purple-200 shadow-lg">
              <div className="flex items-center gap-6">
                <img src={trade.item.image} alt={trade.item.name} className="w-32 h-32 object-cover rounded-2xl" />
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-purple-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {trade.item.name}
                    </h3>
                    <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
                      trade.status === 'pending' ? 'bg-yellow-200 text-yellow-800' : 
                      trade.status === 'accepted' ? 'bg-green-200 text-green-800' : 
                      'bg-gray-200 text-gray-800'
                    }`}>
                      {trade.status}
                    </span>
                  </div>
                  <p className="text-purple-600 mb-1">
                    {trade.type === 'received' ? `${trade.requester} wants to trade` : `You requested from ${trade.requester}`}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {trade.item.style.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {trade.type === 'received' && trade.status === 'pending' && (
                    <>
                      <button className="px-6 py-2 bg-gradient-to-r from-green-300 to-blue-300 rounded-xl text-purple-900 font-semibold hover:shadow-lg transition-all">
                        <Check size={20} className="inline mr-2" />
                        Accept
                      </button>
                      <button className="px-6 py-2 bg-white border-2 border-red-300 rounded-xl text-red-700 font-semibold hover:shadow-lg transition-all">
                        <X size={20} className="inline mr-2" />
                        Decline
                      </button>
                    </>
                  )}
                  {trade.status === 'accepted' && (
                    <button 
                      onClick={() => setSelectedTrade(trade)}
                      className="px-6 py-2 bg-gradient-to-r from-pink-300 to-yellow-300 rounded-xl text-purple-900 font-bold hover:shadow-lg transition-all"
                    >
                      Schedule Meetup 📍
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Meetup Modal */}
        {selectedTrade && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border-2 border-yellow-300">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-purple-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Schedule Meetup
                </h2>
                <button onClick={() => setSelectedTrade(null)} className="text-purple-900 hover:text-pink-500">
                  <X size={24} />
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-purple-900 font-semibold mb-2">
                  <MapPin size={20} className="inline mr-2" />
                  Location
                </label>
                <select className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-yellow-300 focus:outline-none bg-white">
                  {campusLocations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-purple-900 font-semibold mb-2">
                  <Calendar size={20} className="inline mr-2" />
                  Date
                </label>
                <input 
                  type="date" 
                  className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-yellow-300 focus:outline-none bg-white"
                />
              </div>

              <div className="mb-6">
                <label className="block text-purple-900 font-semibold mb-2">Time</label>
                <input 
                  type="time" 
                  className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-yellow-300 focus:outline-none bg-white"
                />
              </div>

              <button 
                onClick={() => setSelectedTrade(null)}
                className="w-full py-4 bg-gradient-to-r from-pink-300 to-yellow-300 rounded-xl text-purple-900 font-bold text-lg hover:shadow-xl transition-all"
              >
                Confirm Meetup ✨
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Closet Page
const ClosetPage = ({ onNavigate }) => {
  const [clothCoins, setClothCoins] = useState(450);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-yellow-50">
      <Sparkles />
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-5xl font-bold text-purple-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              Your Enchanted Closet
            </h1>
            <p className="text-purple-700 text-xl">✨ {mockClosetItems.length} magical items</p>
          </div>
          <div className="bg-gradient-to-r from-yellow-300 to-pink-300 rounded-2xl p-6 shadow-xl border-2 border-white">
            <div className="text-4xl text-center mb-2">🪙</div>
            <div className="text-3xl font-bold text-purple-900 text-center">{clothCoins}</div>
            <div className="text-purple-700 text-center font-semibold">ClothCoins</div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {mockClosetItems.map(item => (
            <div key={item.id} className="bg-white/70 backdrop-blur rounded-3xl overflow-hidden border-2 border-purple-200 hover:border-yellow-300 hover:-translate-y-2 transition-all shadow-lg group">
              <div className="relative h-80">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-blue-100 transition-all shadow-lg">
                    ✏️
                  </button>
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-red-100 transition-all shadow-lg">
                    🗑️
                  </button>
                </div>
                <div className="absolute bottom-3 left-3 px-4 py-2 bg-green-200/90 backdrop-blur rounded-full font-semibold text-green-800 text-sm">
                  Available ✓
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-purple-900 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {item.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {item.style.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button 
            onClick={() => onNavigate('upload')}
            className="px-8 py-4 bg-gradient-to-r from-pink-300 to-yellow-300 rounded-full text-purple-900 font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            + Add Item ✨
          </button>
        </div>

        {/* Badges Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-purple-900 text-center mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
            Your Achievements
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "🌱", name: "Eco Hero", earned: true },
              { icon: "👗", name: "Campus Stylist", earned: true },
              { icon: "⭐", name: "Trade Master", earned: false },
              { icon: "🪄", name: "Fairy Godparent", earned: false }
            ].map(badge => (
              <div 
                key={badge.name}
                className={`bg-white/70 backdrop-blur rounded-2xl p-6 text-center border-2 transition-all ${
                  badge.earned 
                    ? 'border-yellow-300 hover:-translate-y-2' 
                    : 'border-gray-300 opacity-50 grayscale'
                }`}
              >
                <div className="text-5xl mb-3">{badge.icon}</div>
                <p className="font-semibold text-purple-900">{badge.name}</p>
                {badge.earned && <div className="text-green-600 mt-2">✓</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function WearEverApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentPage('home');
  };

  const handleNavigate = (page) => {
    if (!user && page !== 'home' && page !== 'auth') {
      setCurrentPage('auth');
    } else {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} user={user} />
      
      {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
      {currentPage === 'auth' && <AuthPage onLogin={handleLogin} />}
      {currentPage === 'upload' && <UploadPage onNavigate={handleNavigate} />}
      {currentPage === 'match' && <MatchPage onNavigate={handleNavigate} />}
      {currentPage === 'trade' && <TradePage onNavigate={handleNavigate} />}
      {currentPage === 'closet' && <ClosetPage onNavigate={handleNavigate} />}
    </div>
  );
}