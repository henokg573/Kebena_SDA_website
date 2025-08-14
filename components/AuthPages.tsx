import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Loader2 } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import newLogo from "../constants/logo.png";
import churchBackground3 from "../constants/kebena_church.jpg";
import churchBackground1 from "../constants/jesus_walking.jpg";
import churchBackground2 from "../constants/open_bible.jpg";

interface AuthPagesProps {
  currentView: string;
  loading: boolean;
  loginForm: { email: string; password: string };
  signupForm: {
    email: string;
    password: string;
    name: string;
    phone: string;
    role: string;
  };
  setLoginForm: (form: { email: string; password: string }) => void;
  setSignupForm: (form: {
    email: string;
    password: string;
    name: string;
    phone: string;
    role: string;
  }) => void;
  setCurrentView: (view: string) => void;
  handleLogin: (e: React.FormEvent) => void;
  handleSignup: (e: React.FormEvent) => void;
}

export function AuthPages({
  currentView,
  loading,
  loginForm,
  signupForm,
  setLoginForm,
  setSignupForm,
  setCurrentView,
  handleLogin,
  handleSignup,
}: AuthPagesProps) {
  const { language, setLanguage } = useLanguage();

  // Array of background images - ensure all are imported
  const backgrounds = [churchBackground1, churchBackground2, churchBackground3];
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Change background every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) =>
        prevIndex === backgrounds.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [backgrounds.length]);
  // Dynamic background style using current index
  const backgroundStyle = {
    backgroundImage: `url(${backgrounds[currentBgIndex]})`, // ✅ Uses current background
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    transition: "background-image 1s ease-in-out", // Optional: adds smooth transition
  };

  if (currentView === "login") {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4 relative"
        style={backgroundStyle}
      >
        {/* Dark overlay */}
        <div className="absolute"></div>

        <Card className="w-full max-w-md shadow-xl relative z-10 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            {/* Centered Logo */}
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full overflow-hidden shadow-sm bg-slate-950 border border-gray-200">
                <img
                  src={newLogo}
                  alt="Kebena SDA Church Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <CardTitle className="text-2xl">
              {language === "am" ? "እንኳን ደህና መጡ" : "Welcome Back"}
            </CardTitle>
            <p className="text-gray-600">
              {language === "am"
                ? "የመንፈሳዊ ጉዞዎን ለመቀጠል ይግቡ"
                : "Sign in to continue your spiritual journey"}
            </p>

            {/* Language Toggle */}
            <div className="flex items-center justify-center space-x-2 mt-4">
              <button
                onClick={() => setLanguage("am")}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  language === "am"
                    ? "bg-blue-600 text-white"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                አማ
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  language === "en"
                    ? "bg-blue-600 text-white"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                EN
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">
                  {language === "am" ? "ኢሜይል" : "Email"}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={
                    language === "am" ? "your@email.com" : "your@email.com"
                  }
                  value={loginForm.email}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, email: e.target.value })
                  }
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="password">
                  {language === "am" ? "የይለፍ ቃል" : "Password"}
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={
                    language === "am" ? "የይለፍ ቃልዎን ያስገቡ" : "Enter your password"
                  }
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                  required
                  className="mt-1"
                />
              </div>

              {/* Admin Login Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-md p-3 text-sm">
                <p className="text-blue-800 font-medium mb-1">
                  {language === "am" ? "የአስተዳደር መለያዎች:" : "Admin Accounts:"}
                </p>
                <div className="text-blue-600 space-y-1">
                  <p>• pastor@kebenasda.org (Super Admin)</p>
                  <p>• elder@kebenasda.org (Admin)</p>
                  <p>• deacon@kebenasda.org (Admin)</p>
                </div>
                <p className="text-blue-600 text-xs mt-2">
                  {language === "am"
                    ? "ማንኛውም የይለፍ ቃል ይሰራል"
                    : "Any password will work for testing"}
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {language === "am" ? "ግባ" : "Sign In"}
              </Button>
              <div className="text-center space-y-2">
                <Button variant="link" onClick={() => setCurrentView("signup")}>
                  {language === "am"
                    ? "መለያ የለዎትም? ይመዝገቡ"
                    : "Don't have an account? Join us"}
                </Button>
                <Button
                  variant="link"
                  onClick={() => setCurrentView("landing")}
                >
                  {language === "am" ? "ወደ Home ይመለሱ" : "Back to Home"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentView === "signup") {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4 relative"
        style={backgroundStyle}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        <Card className="w-full max-w-md shadow-xl relative z-10 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            {/* Logo with colored background */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl mx-auto mb-4 w-fit">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center p-2">
                <img
                  src={newLogo}
                  alt="Kebena SDA Church Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <CardTitle className="text-2xl">
              {language === "am"
                ? "ቀበና ሰ.ዓ.አ ቤተክርስቲያን ይቀላቀሉ"
                : "Join Kebena SDA Church"}
            </CardTitle>
            <p className="text-gray-600">
              {language === "am"
                ? "የእኛ ፍቅረኛ የቤተክርስቲያን ቤተሰብ አካል ይሁኑ"
                : "Become part of our loving church family"}
            </p>

            {/* Language Toggle */}
            <div className="flex items-center justify-center space-x-2 mt-4">
              <button
                onClick={() => setLanguage("am")}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  language === "am"
                    ? "bg-blue-600 text-white"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                አማ
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  language === "en"
                    ? "bg-blue-600 text-white"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                EN
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <Label htmlFor="name">
                  {language === "am" ? "ሙሉ ስም" : "Full Name"}
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder={language === "am" ? "ሙሉ ስምዎ" : "Your full name"}
                  value={signupForm.name}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, name: e.target.value })
                  }
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">
                  {language === "am" ? "ኢሜይል" : "Email"}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={
                    language === "am" ? "your@email.com" : "your@email.com"
                  }
                  value={signupForm.email}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, email: e.target.value })
                  }
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone">
                  {language === "am" ? "ስልክ ቁጥር" : "Phone Number"}
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder={
                    language === "am" ? "+251911000000" : "+251911000000"
                  }
                  value={signupForm.phone}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, phone: e.target.value })
                  }
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="password">
                  {language === "am" ? "የይለፍ ቃል" : "Password"}
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={
                    language === "am"
                      ? "ደህንነቱ የተጠበቀ የይለፍ ቃል ይፍጠሩ"
                      : "Create a secure password"
                  }
                  value={signupForm.password}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, password: e.target.value })
                  }
                  required
                  className="mt-1"
                />
              </div>

              {/* Info about admin accounts */}
              <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-sm">
                <p className="text-amber-800">
                  {language === "am"
                    ? "ማስታወሻ: አስተዳዳሪዎች የተወሰኑ የይመጀመሪያ መለያዎች አሏቸው። እኛ ውስጥ ለመቀላቀል ይህን ቅጽ ይጠቀሙ።"
                    : "Note: Administrators have predefined accounts. Use this form to join our community as a member."}
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {language === "am" ? "ቤተሰባችንን ይቀላቀሉ" : "Join Our Family"}
              </Button>
              <div className="text-center space-y-2">
                <Button variant="link" onClick={() => setCurrentView("login")}>
                  {language === "am"
                    ? "መለያ አለዎት? ይግቡ"
                    : "Already have an account? Sign in"}
                </Button>
                <Button
                  variant="link"
                  onClick={() => setCurrentView("landing")}
                >
                  {language === "am" ? "ወደ Home ይመለሱ" : "Back to Home"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}