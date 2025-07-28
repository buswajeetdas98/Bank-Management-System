import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Edit,
  Save,
  X,
} from "lucide-react";
import Sidebar from "../dashboard/Sidebar";

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  dateOfBirth: string;
  accountType: "Basic" | "Premium" | "VIP";
  memberSince: string;
  lastLogin: string;
  securityLevel: "Standard" | "Enhanced";
}

const ProfilePage = () => {
  // Wrap the component in a layout similar to other pages
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <ProfileContent />
      </div>
    </div>
  );
};

const ProfileContent = () => {
  const [profile, setProfile] = useState<UserProfile>({
    id: "USR-001",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    address: {
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
    },
    dateOfBirth: "1990-05-15",
    accountType: "Premium",
    memberSince: "2020-01-15",
    lastLogin: "2023-06-15T10:30:00",
    securityLevel: "Enhanced",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);

  const handleEdit = () => {
    setEditedProfile(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    if (field.includes("address.")) {
      const addressField = field.split(".")[1];
      setEditedProfile({
        ...editedProfile,
        address: {
          ...editedProfile.address,
          [addressField]: value,
        },
      });
    } else {
      setEditedProfile({
        ...editedProfile,
        [field]: value,
      });
    }
  };

  const getAccountTypeBadgeVariant = (type: string) => {
    switch (type) {
      case "Basic":
        return "secondary";
      case "Premium":
        return "default";
      case "VIP":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const currentProfile = isEditing ? editedProfile : profile;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Profile Settings
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your personal information and account preferences
            </p>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Summary Card */}
          <div className="lg:col-span-1">
            <Card className="bg-white shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentProfile.firstName}`}
                      alt={`${currentProfile.firstName} ${currentProfile.lastName}`}
                    />
                    <AvatarFallback className="text-2xl">
                      {currentProfile.firstName[0]}
                      {currentProfile.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-xl">
                  {currentProfile.firstName} {currentProfile.lastName}
                </CardTitle>
                <p className="text-gray-600">{currentProfile.email}</p>
                <div className="flex justify-center mt-2">
                  <Badge
                    variant={
                      getAccountTypeBadgeVariant(
                        currentProfile.accountType,
                      ) as any
                    }
                  >
                    {currentProfile.accountType} Member
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">Member since</span>
                    <span className="font-medium">
                      {new Date(
                        currentProfile.memberSince,
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Shield className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">Security Level</span>
                    <Badge variant="outline" className="text-xs">
                      {currentProfile.securityLevel}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">Last Login</span>
                    <span className="font-medium">
                      {new Date(currentProfile.lastLogin).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      {isEditing ? (
                        <Input
                          id="firstName"
                          value={currentProfile.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                        />
                      ) : (
                        <p className="mt-1 text-sm font-medium">
                          {currentProfile.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      {isEditing ? (
                        <Input
                          id="lastName"
                          value={currentProfile.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                        />
                      ) : (
                        <p className="mt-1 text-sm font-medium">
                          {currentProfile.lastName}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      {isEditing ? (
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={currentProfile.dateOfBirth}
                          onChange={(e) =>
                            handleInputChange("dateOfBirth", e.target.value)
                          }
                        />
                      ) : (
                        <p className="mt-1 text-sm font-medium">
                          {new Date(
                            currentProfile.dateOfBirth,
                          ).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="accountType">Account Type</Label>
                      {isEditing ? (
                        <Select
                          value={currentProfile.accountType}
                          onValueChange={(value) =>
                            handleInputChange("accountType", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Basic">Basic</SelectItem>
                            <SelectItem value="Premium">Premium</SelectItem>
                            <SelectItem value="VIP">VIP</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="mt-1 text-sm font-medium">
                          {currentProfile.accountType}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={currentProfile.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                        />
                      ) : (
                        <p className="mt-1 text-sm font-medium">
                          {currentProfile.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      {isEditing ? (
                        <Input
                          id="phone"
                          value={currentProfile.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                        />
                      ) : (
                        <p className="mt-1 text-sm font-medium">
                          {currentProfile.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Address Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Address Information
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor="street">Street Address</Label>
                      {isEditing ? (
                        <Input
                          id="street"
                          value={currentProfile.address.street}
                          onChange={(e) =>
                            handleInputChange("address.street", e.target.value)
                          }
                        />
                      ) : (
                        <p className="mt-1 text-sm font-medium">
                          {currentProfile.address.street}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        {isEditing ? (
                          <Input
                            id="city"
                            value={currentProfile.address.city}
                            onChange={(e) =>
                              handleInputChange("address.city", e.target.value)
                            }
                          />
                        ) : (
                          <p className="mt-1 text-sm font-medium">
                            {currentProfile.address.city}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        {isEditing ? (
                          <Input
                            id="state"
                            value={currentProfile.address.state}
                            onChange={(e) =>
                              handleInputChange("address.state", e.target.value)
                            }
                          />
                        ) : (
                          <p className="mt-1 text-sm font-medium">
                            {currentProfile.address.state}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        {isEditing ? (
                          <Input
                            id="zipCode"
                            value={currentProfile.address.zipCode}
                            onChange={(e) =>
                              handleInputChange(
                                "address.zipCode",
                                e.target.value,
                              )
                            }
                          />
                        ) : (
                          <p className="mt-1 text-sm font-medium">
                            {currentProfile.address.zipCode}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      {isEditing ? (
                        <Input
                          id="country"
                          value={currentProfile.address.country}
                          onChange={(e) =>
                            handleInputChange("address.country", e.target.value)
                          }
                        />
                      ) : (
                        <p className="mt-1 text-sm font-medium">
                          {currentProfile.address.country}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
