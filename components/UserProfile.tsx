import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Switch } from "./ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import {
  User,
  Camera,
  Edit3,
  Save,
  Lock,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Bell,
  Shield,
  Eye,
  EyeOff,
  Upload,
  Trash2,
  Settings,
  Heart,
  BookOpen,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { toast } from "sonner";

interface UserProfileProps {
  currentUser: any;
  onUpdateProfile: (updatedUser: any) => void;
  onUploadProfilePhoto: (file: File) => Promise<string>;
  onDeleteAccount: () => void;
  onChangePassword: (currentPassword: string, newPassword: string) => void;
}

export function UserProfile({
  currentUser,
  onUpdateProfile,
  onUploadProfilePhoto,
  onDeleteAccount,
  onChangePassword,
}: UserProfileProps) {
  const { language } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
    bio: currentUser?.bio || "",
    birthDate: currentUser?.birthDate || "",
    address: currentUser?.address || "",
    occupation: currentUser?.occupation || "",
    interests: currentUser?.interests || [],
    emergencyContact: currentUser?.emergencyContact || "",
    membershipDate: currentUser?.membershipDate || "",
    preferredLanguage: currentUser?.preferredLanguage || "amharic",
    avatar: currentUser?.avatar || "",
  });

  // Settings state
  const [settings, setSettings] = useState({
    emailNotifications: currentUser?.settings?.emailNotifications ?? true,
    prayerReminders: currentUser?.settings?.prayerReminders ?? true,
    courseUpdates: currentUser?.settings?.courseUpdates ?? true,
    communityNotifications:
      currentUser?.settings?.communityNotifications ?? true,
    profileVisibility: currentUser?.settings?.profileVisibility || "members",
    showEmail: currentUser?.settings?.showEmail ?? false,
    showPhone: currentUser?.settings?.showPhone ?? false,
    twoFactorAuth: currentUser?.settings?.twoFactorAuth ?? false,
  });

  // Password change state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Update form when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setProfileForm({
        name: currentUser.name || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        bio: currentUser.bio || "",
        birthDate: currentUser.birthDate || "",
        address: currentUser.address || "",
        occupation: currentUser.occupation || "",
        interests: currentUser.interests || [],
        emergencyContact: currentUser.emergencyContact || "",
        membershipDate: currentUser.membershipDate || "",
        preferredLanguage: currentUser.preferredLanguage || "amharic",
        avatar: currentUser.avatar || "",
      });

      setSettings({
        emailNotifications: currentUser.settings?.emailNotifications ?? true,
        prayerReminders: currentUser.settings?.prayerReminders ?? true,
        courseUpdates: currentUser.settings?.courseUpdates ?? true,
        communityNotifications:
          currentUser.settings?.communityNotifications ?? true,
        profileVisibility: currentUser.settings?.profileVisibility || "members",
        showEmail: currentUser.settings?.showEmail ?? false,
        showPhone: currentUser.settings?.showPhone ?? false,
        twoFactorAuth: currentUser.settings?.twoFactorAuth ?? false,
      });
    }
  }, [currentUser]);

  // Save settings immediately when changed
  const handleSettingsChange = (newSettings: Partial<typeof settings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);

    // Save settings immediately
    try {
      const updatedUser = {
        ...currentUser,
        settings: updatedSettings,
        updatedAt: new Date().toISOString(),
      };
      onUpdateProfile(updatedUser);
      toast.success(language === "am" ? "ምርጫዎች ተቀምጠዋል" : "Settings saved");
    } catch (error) {
      toast.error(
        language === "am" ? "ምርጫዎች መቆጠብ አልተሳካም" : "Failed to save settings"
      );
    }
  };

  const handlePhotoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.startsWith("image/")) {
      toast.error(
        language === "am" ? "እባክዎ ምስል ፋይል ይምረጡ" : "Please select an image file"
      );
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      toast.error(
        language === "am"
          ? "ፋይል መጠን ከ5MB መብለጥ አይችልም"
          : "File size must be less than 5MB"
      );
      return;
    }

    setUploading(true);
    try {
      const photoUrl = await onUploadProfilePhoto(file);
      const updatedProfileForm = { ...profileForm, avatar: photoUrl };
      setProfileForm(updatedProfileForm);

      // Save the profile immediately with the new photo
      const updatedUser = {
        ...currentUser,
        ...updatedProfileForm,
        settings,
        updatedAt: new Date().toISOString(),
      };
      onUpdateProfile(updatedUser);

      toast.success(
        language === "am" ? "ፎቶ በተሳካ ሁኔታ ተሸጋግሯል" : "Photo uploaded successfully"
      );
    } catch (error) {
      toast.error(language === "am" ? "ፎቶ መስቀል አልተሳካም" : "Photo upload failed");
      console.error("Photo upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSaveProfile = () => {
    try {
      const updatedUser = {
        ...currentUser,
        ...profileForm,
        settings,
        updatedAt: new Date().toISOString(),
      };
      onUpdateProfile(updatedUser);
      setIsEditing(false);
      toast.success(
        language === "am" ? "መገለጫ ተዘምኗል" : "Profile updated successfully"
      );
    } catch (error) {
      toast.error(
        language === "am" ? "መገለጫ መዘመን አልተሳካም" : "Failed to update profile"
      );
      console.error("Profile update error:", error);
    }
  };

  const handlePasswordChange = () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      toast.error(language === "am" ? "ሁሉንም ቦታ ይሙሉ" : "Please fill all fields");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error(
        language === "am"
          ? "አዲስ የመክፈቻ ቃሎች አይዛመዱም"
          : "New passwords do not match"
      );
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast.error(
        language === "am"
          ? "የመክፈቻ ቃል ቢያንስ 6 ቁምፊ ያስፈልጋል"
          : "Password must be at least 6 characters"
      );
      return;
    }

    try {
      onChangePassword(passwordForm.currentPassword, passwordForm.newPassword);
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      toast.success(
        language === "am" ? "የመክፈቻ ቃል ተቀይሯል" : "Password changed successfully"
      );
    } catch (error) {
      toast.error(
        language === "am" ? "የመክፈቻ ቃል መቀየር አልተሳካም" : "Failed to change password"
      );
      console.error("Password change error:", error);
    }
  };

  const addInterest = (interest: string) => {
    if (interest && !profileForm.interests.includes(interest)) {
      setProfileForm((prev) => ({
        ...prev,
        interests: [...prev.interests, interest],
      }));
    }
  };

  const removeInterest = (interest: string) => {
    setProfileForm((prev) => ({
      ...prev,
      interests: prev.interests.filter((i) => i !== interest),
    }));
  };

  const calculateMembershipDuration = () => {
    if (!currentUser?.membershipDate) return "";
    const start = new Date(currentUser.membershipDate);
    const now = new Date();
    const years = now.getFullYear() - start.getFullYear();
    const months = now.getMonth() - start.getMonth();

    if (years > 0) {
      return language === "am" ? `${years} ዓመት` : `${years} years`;
    }
    return language === "am" ? `${months} ወራት` : `${months} months`;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {language === "am" ? "የእኔ መገለጫ" : "My Profile"}
        </h1>
        <p className="text-gray-600">
          {language === "am"
            ? "መገለጫዎን ያስተዳድሩ እና ምርጫዎችን ይቆጣጠሩ"
            : "Manage your profile and control your preferences"}
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4 p-1">
          {/* Profile Tab */}
          <TabsTrigger
            value="profile"
            className="flex items-center space-x-2 
               bg-gray-200 text-black 
               data-[state=active]:!bg-black 
               data-[state=active]:!text-white 
               data-[state=active]:rounded-lg
               hover:bg-gray-700 hover:text-gray-100
               px-3 py-2 transition"
          >
            <User className="w-4 h-4" />
            <span>{language === "am" ? "መገለጫ" : "Profile"}</span>
          </TabsTrigger>

          {/* Settings Tab */}
          <TabsTrigger
            value="settings"
            className="flex items-center space-x-2 
               bg-gray-200 text-black 
               data-[state=active]:!bg-black 
               data-[state=active]:!text-white 
               data-[state=active]:rounded-lg
               hover:bg-gray-700 hover:text-gray-100
               px-3 py-2 transition"
          >
            <Settings className="w-4 h-4" />
            <span>{language === "am" ? "ምርጫዎች" : "Settings"}</span>
          </TabsTrigger>

          {/* Security Tab */}
          <TabsTrigger
            value="security"
            className="flex items-center space-x-2 
               bg-gray-200 text-black 
               data-[state=active]:!bg-black 
               data-[state=active]:!text-white 
               data-[state=active]:rounded-lg
               hover:bg-gray-700 hover:text-gray-100
               px-3 py-2 transition"
          >
            <Shield className="w-4 h-4" />
            <span>{language === "am" ? "ደህንነት" : "Security"}</span>
          </TabsTrigger>

          {/* Activity Tab */}
          <TabsTrigger
            value="activity"
            className="flex items-center space-x-2 
               bg-gray-200 text-black 
               data-[state=active]:!bg-black 
               data-[state=active]:!text-white 
               data-[state=active]:rounded-lg
               hover:bg-gray-700 hover:text-gray-100
               px-3 py-2 transition"
          >
            <Heart className="w-4 h-4" />
            <span>{language === "am" ? "እንቅስቃሴ" : "Activity"}</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>
                {language === "am" ? "የግል መረጃ" : "Personal Information"}
              </CardTitle>
              <Button
                variant={isEditing ? "default" : "outline"}
                onClick={() =>
                  isEditing ? handleSaveProfile() : setIsEditing(true)
                }
                disabled={uploading}
              >
                {isEditing ? (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {language === "am" ? "ስቀመጥ" : "Save"}
                  </>
                ) : (
                  <>
                    <Edit3 className="w-4 h-4 mr-2" />
                    {language === "am" ? "አርም" : "Edit"}
                  </>
                )}
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Photo Section */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage
                      src={profileForm.avatar || currentUser?.avatar}
                    />
                    <AvatarFallback className="text-xl">
                      {(profileForm.name || currentUser?.name || "U").charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="absolute -bottom-2 -right-2 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 disabled:opacity-50"
                    >
                      {uploading ? (
                        <div className="w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      ) : (
                        <Camera className="w-4 h-4" />
                      )}
                    </button>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">
                    {profileForm.name || currentUser?.name}
                  </h3>
                  <p className="text-gray-600">{currentUser?.email}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge variant="secondary">
                      {currentUser?.role === "admin"
                        ? language === "am"
                          ? "አስተዳዳሪ"
                          : "Administrator"
                        : language === "am"
                        ? "አባል"
                        : "Member"}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {language === "am" ? "አባልነት" : "Member"}:{" "}
                      {calculateMembershipDuration()}
                    </span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    {language === "am" ? "ሙሉ ስም" : "Full Name"}
                  </Label>
                  <Input
                    id="name"
                    value={profileForm.name}
                    onChange={(e) =>
                      setProfileForm((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    disabled={!isEditing}
                    icon={<User className="w-4 h-4" />}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    {language === "am" ? "ኢሜይል" : "Email"}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileForm.email}
                    onChange={(e) =>
                      setProfileForm((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    disabled={!isEditing}
                    icon={<Mail className="w-4 h-4" />}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">
                    {language === "am" ? "ስልክ" : "Phone"}
                  </Label>
                  <Input
                    id="phone"
                    value={profileForm.phone}
                    onChange={(e) =>
                      setProfileForm((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    disabled={!isEditing}
                    icon={<Phone className="w-4 h-4" />}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthDate">
                    {language === "am" ? "የትውልድ ቀን" : "Birth Date"}
                  </Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={profileForm.birthDate}
                    onChange={(e) =>
                      setProfileForm((prev) => ({
                        ...prev,
                        birthDate: e.target.value,
                      }))
                    }
                    disabled={!isEditing}
                    icon={<Calendar className="w-4 h-4" />}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="occupation">
                    {language === "am" ? "ሙያ" : "Occupation"}
                  </Label>
                  <Input
                    id="occupation"
                    value={profileForm.occupation}
                    onChange={(e) =>
                      setProfileForm((prev) => ({
                        ...prev,
                        occupation: e.target.value,
                      }))
                    }
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferredLanguage">
                    {language === "am" ? "ተመራጭ ቋንቋ" : "Preferred Language"}
                  </Label>
                  <Select
                    value={profileForm.preferredLanguage}
                    onValueChange={(value) =>
                      setProfileForm((prev) => ({
                        ...prev,
                        preferredLanguage: value,
                      }))
                    }
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="amharic">አማርኛ</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="oromo">Afaan Oromoo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">
                  {language === "am" ? "አድራሻ" : "Address"}
                </Label>
                <Input
                  id="address"
                  value={profileForm.address}
                  onChange={(e) =>
                    setProfileForm((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                  disabled={!isEditing}
                  icon={<MapPin className="w-4 h-4" />}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">
                  {language === "am" ? "ስለ እኔ" : "Bio"}
                </Label>
                <Textarea
                  id="bio"
                  rows={4}
                  value={profileForm.bio}
                  onChange={(e) =>
                    setProfileForm((prev) => ({ ...prev, bio: e.target.value }))
                  }
                  disabled={!isEditing}
                  placeholder={
                    language === "am"
                      ? "ስለ እርስዎ አጭር መግለጫ ይጻፉ..."
                      : "Write a short description about yourself..."
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyContact">
                  {language === "am" ? "የአስቸኳይ ጊዜ ዕውቂያ" : "Emergency Contact"}
                </Label>
                <Input
                  id="emergencyContact"
                  value={profileForm.emergencyContact}
                  onChange={(e) =>
                    setProfileForm((prev) => ({
                      ...prev,
                      emergencyContact: e.target.value,
                    }))
                  }
                  disabled={!isEditing}
                  placeholder={
                    language === "am"
                      ? "ስም እና ስልክ ቁጥር"
                      : "Name and phone number"
                  }
                />
              </div>

              {/* Interests */}
              <div className="space-y-2">
                <Label>{language === "am" ? "ፍላጎቶች" : "Interests"}</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {profileForm.interests.map((interest, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center space-x-1"
                    >
                      <span>{interest}</span>
                      {isEditing && (
                        <button
                          onClick={() => removeInterest(interest)}
                          className="ml-1 text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
                {isEditing && (
                  <div className="flex space-x-2">
                    <Input
                      placeholder={
                        language === "am" ? "ፍላጎት ይጨምሩ" : "Add an interest"
                      }
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          addInterest(e.currentTarget.value);
                          e.currentTarget.value = "";
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === "am" ? "ማሳወቂያ ምርጫዎች" : "Notification Preferences"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>
                    {language === "am" ? "ኢሜይል ማሳወቂያዎች" : "Email Notifications"}
                  </Label>
                  <p className="text-sm text-gray-500">
                    {language === "am"
                      ? "አስፈላጊ ዜናዎችን በኢሜይል ተቀበል"
                      : "Receive important updates via email"}
                  </p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) =>
                    handleSettingsChange({ emailNotifications: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>
                    {language === "am" ? "የጸሎት ማስታወሻዎች" : "Prayer Reminders"}
                  </Label>
                  <p className="text-sm text-gray-500">
                    {language === "am"
                      ? "ለዕለታዊ ጸሎት ማስታወሻ ተቀበል"
                      : "Get reminders for daily prayers"}
                  </p>
                </div>
                <Switch
                  checked={settings.prayerReminders}
                  onCheckedChange={(checked) =>
                    handleSettingsChange({ prayerReminders: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>
                    {language === "am" ? "የኮርስ ዝማኔዎች" : "Course Updates"}
                  </Label>
                  <p className="text-sm text-gray-500">
                    {language === "am"
                      ? "ስለ አዲስ ትምህርቶች እና ዝማኔዎች ተረጋገጥ"
                      : "Get notified about new courses and updates"}
                  </p>
                </div>
                <Switch
                  checked={settings.courseUpdates}
                  onCheckedChange={(checked) =>
                    handleSettingsChange({ courseUpdates: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>
                    {language === "am"
                      ? "የማህበረሰብ ማሳወቂያዎች"
                      : "Community Notifications"}
                  </Label>
                  <p className="text-sm text-gray-500">
                    {language === "am"
                      ? "ስለ ማህበረሰብ እንቅስቃሴዎች ተረጋገጥ"
                      : "Stay updated on community activities"}
                  </p>
                </div>
                <Switch
                  checked={settings.communityNotifications}
                  onCheckedChange={(checked) =>
                    handleSettingsChange({ communityNotifications: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                {language === "am" ? "የግላዊነት ቁጥጥር" : "Privacy Controls"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>
                  {language === "am" ? "መገለጫ ታይታ" : "Profile Visibility"}
                </Label>
                <Select
                  value={settings.profileVisibility}
                  onValueChange={(value) =>
                    handleSettingsChange({ profileVisibility: value })
                  }
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">
                      {language === "am" ? "ለሁሉም" : "Public"}
                    </SelectItem>
                    <SelectItem value="members">
                      {language === "am" ? "ለአባላት ብቻ" : "Members Only"}
                    </SelectItem>
                    <SelectItem value="private">
                      {language === "am" ? "ግላዊ" : "Private"}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label>{language === "am" ? "ኢሜይል አሳይ" : "Show Email"}</Label>
                <Switch
                  checked={settings.showEmail}
                  onCheckedChange={(checked) =>
                    handleSettingsChange({ showEmail: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>
                  {language === "am" ? "ስልክ ቁጥር አሳይ" : "Show Phone"}
                </Label>
                <Switch
                  checked={settings.showPhone}
                  onCheckedChange={(checked) =>
                    handleSettingsChange({ showPhone: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === "am" ? "የመክፈቻ ቃል ቀይር" : "Change Password"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>
                  {language === "am" ? "የአሁኑ የመክፈቻ ቃል" : "Current Password"}
                </Label>
                <div className="relative">
                  <Input
                    type={showPasswords.current ? "text" : "password"}
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm((prev) => ({
                        ...prev,
                        currentPassword: e.target.value,
                      }))
                    }
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords((prev) => ({
                        ...prev,
                        current: !prev.current,
                      }))
                    }
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    {showPasswords.current ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>
                  {language === "am" ? "አዲስ የመክፈቻ ቃል" : "New Password"}
                </Label>
                <div className="relative">
                  <Input
                    type={showPasswords.new ? "text" : "password"}
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm((prev) => ({
                        ...prev,
                        newPassword: e.target.value,
                      }))
                    }
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords((prev) => ({ ...prev, new: !prev.new }))
                    }
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    {showPasswords.new ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>
                  {language === "am"
                    ? "አዲስ የመክፈቻ ቃል አረጋግጥ"
                    : "Confirm New Password"}
                </Label>
                <div className="relative">
                  <Input
                    type={showPasswords.confirm ? "text" : "password"}
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      setPasswordForm((prev) => ({
                        ...prev,
                        confirmPassword: e.target.value,
                      }))
                    }
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords((prev) => ({
                        ...prev,
                        confirm: !prev.confirm,
                      }))
                    }
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    {showPasswords.confirm ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button onClick={handlePasswordChange} className="w-full">
                <Lock className="w-4 h-4 mr-2" />
                {language === "am" ? "የመክፈቻ ቃል ቀይር" : "Change Password"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                {language === "am"
                  ? "የሁለት-ደረጃ ማረጋገጫ"
                  : "Two-Factor Authentication"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p>
                    {language === "am"
                      ? "ተጨማሪ ደህንነት ይጨምሩ"
                      : "Add extra security to your account"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {settings.twoFactorAuth
                      ? language === "am"
                        ? "ዕርዳታ ንቁ ነው"
                        : "2FA is enabled"
                      : language === "am"
                      ? "2FA ንቁ አይደለም"
                      : "2FA is not enabled"}
                  </p>
                </div>
                <Switch
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) =>
                    handleSettingsChange({ twoFactorAuth: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600">
                {language === "am" ? "አደገኛ ቀጠና" : "Danger Zone"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-red-600">
                    {language === "am" ? "መለያ ሰርዝ" : "Delete Account"}
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    {language === "am"
                      ? "መለያዎን በመሰረዝ ሁሉም መረጃዎች ይጠፋሉ። ይህ ተግባር ወደቦኋላ መመለስ አይቻልም።"
                      : "Permanently delete your account and all data. This action cannot be undone."}
                  </p>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      if (
                        window.confirm(
                          language === "am" ? "እርግጠኛ ኖት?" : "Are you sure?"
                        )
                      ) {
                        onDeleteAccount();
                      }
                    }}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    {language === "am" ? "መለያ ሰርዝ" : "Delete Account"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === "am" ? "የእኔ ንቃቶች" : "My Activities"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-5 h-5 text-blue-500" />
                    <span>
                      {language === "am" ? "ኮርሶች ተመዝግቧል" : "Courses Enrolled"}
                    </span>
                  </div>
                  <Badge>{currentUser?.enrolledCourses?.length || 0}</Badge>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span>
                      {language === "am" ? "የጸሎት ጥያቄዎች" : "Prayer Requests"}
                    </span>
                  </div>
                  <Badge>{currentUser?.prayerRequests?.length || 0}</Badge>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <Upload className="w-5 h-5 text-green-500" />
                    <span>
                      {language === "am" ? "የተላኩ ይዘቶች" : "Submitted Content"}
                    </span>
                  </div>
                  <Badge>{currentUser?.submittedContent?.length || 0}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  {language === "am" ? "የመለያ መረጃ" : "Account Info"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {language === "am" ? "የተመዘገበበት ቀን" : "Member Since"}:
                  </span>
                  <span>
                    {new Date(
                      currentUser?.createdAt || Date.now()
                    ).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {language === "am" ? "የመጨረሻ ግብኝት" : "Last Login"}:
                  </span>
                  <span>
                    {new Date(
                      currentUser?.lastLogin || Date.now()
                    ).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {language === "am" ? "መለያ ሁኔታ" : "Account Status"}:
                  </span>
                  <Badge variant="secondary">
                    {currentUser?.status === "active"
                      ? language === "am"
                        ? "ንቁ"
                        : "Active"
                      : language === "am"
                      ? "እንቅልፍ"
                      : "Inactive"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
