import React from 'react';
import newLogo from "../constants/logo.png";
import { Button } from './ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  User, LogIn, UserPlus, Menu, X, Globe,
  ChevronDown, Settings, Bell, LogOut, Shield
} from 'lucide-react';

interface HeaderProps {
  currentUser: any;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  setCurrentView: (view: string) => void;
  handleLogout: () => void;
}

export function Header({
  currentUser,
  isMenuOpen,
  setIsMenuOpen,
  setCurrentView,
  handleLogout
}: HeaderProps) {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'am' ? 'en' : 'am');
  };

  const navigationItems = [
    { href: '#home', label: { am: 'Home', en: 'Home' } },
    { href: '#bible', label: { am: 'Bible', en: 'Bible' } },
    { href: '#sabbath', label: { am: 'Sabbath School', en: 'Sabbath School' } },
    { href: '#devotional', label: { am: 'Devotional', en: 'Devotional' } },
    { href: '#media', label: { am: 'Media', en: 'Media' } },
    { href: '#contact', label: { am: 'Contact', en: 'Contact' } },
  ];

  return (
    <header className="bg-slate-800 text-white relative z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={newLogo}
                alt="Kebena SDA Church Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="font-bold text-lg">Kebena SDA Church</h1>
              <p className="text-xs text-gray-300">
                {language === "am" ? "ቀበና SDA" : "Seventh-day Adventist"}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-blue-300 transition-colors text-sm"
              >
                {item.label[language]}
              </a>
            ))}
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-3">
            {/* Single Language Toggle Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="hidden md:flex items-center space-x-1 text-white hover:bg-slate-700"
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs font-medium">
                {language === "am" ? "EN" : "አማ"}
              </span>
            </Button>

            {/* Authentication Section */}
            {currentUser ? (
              /* Logged in user dropdown */
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 text-white hover:bg-slate-700"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-xs font-medium">
                        {currentUser.name?.charAt(0)}
                      </span>
                    </div>
                    <span className="hidden sm:block text-sm">
                      {currentUser.name}
                    </span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem
                    onClick={() =>
                      setCurrentView(
                        currentUser.role === "admin"
                          ? "admin-dashboard"
                          : "user-dashboard"
                      )
                    }
                  >
                    {currentUser.role === "admin" ? (
                      <Shield className="w-4 h-4 mr-2" />
                    ) : (
                      <User className="w-4 h-4 mr-2" />
                    )}
                    {language === "am" ? "ዳሽቦርድ" : "Dashboard"}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    {language === "am" ? "ቅንብሮች" : "Settings"}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell className="w-4 h-4 mr-2" />
                    {language === "am" ? "ማሳወቂያዎች" : "Notifications"}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    {language === "am" ? "ውጣ" : "Logout"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              /* Not logged in - single dropdown for login/signup */
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="default"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <User className="w-4 h-4 mr-1" />
                    <span className="hidden sm:inline">
                      {language === "am" ? "ግባ / ተመዝገብ" : "Login / Sign Up"}
                    </span>
                    <span className="sm:hidden">
                      {language === "am" ? "መለያ" : "Auth"}
                    </span>
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => setCurrentView("login")}>
                    <LogIn className="w-4 h-4 mr-2" />
                    {language === "am" ? "ግባ" : "Login"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCurrentView("signup")}>
                    <UserPlus className="w-4 h-4 mr-2" />
                    {language === "am" ? "ተመዝገብ" : "Sign Up"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-600 animate-fade-in">
            <nav className="flex flex-col space-y-3">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="hover:text-blue-300 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label[language]}
                </a>
              ))}

              {/* Mobile Language Toggle */}
              <div className="py-3 border-t border-slate-600">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    toggleLanguage();
                    setIsMenuOpen(false);
                  }}
                  className="w-full justify-start text-white hover:bg-slate-700"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  {language === "am" ? "Change to English" : "ወደ አማርኛ ቀይር"}
                </Button>
              </div>

              {/* Mobile Auth Options */}
              <div className="pt-3 border-t border-slate-600 space-y-2">
                {currentUser ? (
                  <>
                    <div className="flex items-center space-x-2 py-2">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                        <span className="text-xs font-medium">
                          {currentUser.name?.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm">{currentUser.name}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCurrentView(
                          currentUser.role === "admin"
                            ? "admin-dashboard"
                            : "user-dashboard"
                        );
                        setIsMenuOpen(false);
                      }}
                      className="w-full justify-start border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
                    >
                      {currentUser.role === "admin" ? (
                        <Shield className="w-4 h-4 mr-2" />
                      ) : (
                        <User className="w-4 h-4 mr-2" />
                      )}
                      {language === "am" ? "ዳሽቦርድ" : "Dashboard"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full justify-start border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      {language === "am" ? "ውጣ" : "Logout"}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCurrentView("login");
                        setIsMenuOpen(false);
                      }}
                      className="w-full justify-start border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      {language === "am" ? "ግባ" : "Login"}
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        setCurrentView("signup");
                        setIsMenuOpen(false);
                      }}
                      className="w-full bg-blue-600 text-white hover:bg-blue-700"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      {language === "am" ? "ተመዝገብ" : "Sign Up"}
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}