import { useState } from "react";
import { Header } from "@/components/Layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { 
  DollarSign, 
  Package, 
  Star, 
  TrendingUp,
  Calendar,
  MapPin,
  Edit,
  Eye,
  Trash2,
  Plus,
  User,
  Settings,
  Bell,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Sample data
  const stats = {
    totalEarnings: 1247,
    activeListings: 8,
    averageRating: 4.8,
    totalBookings: 23
  };

  const listings = [
    {
      id: 1,
      title: "Canon EOS R5 Camera",
      price: 45,
      image: "/placeholder.svg",
      status: "active",
      views: 234,
      bookings: 12,
      rating: 4.9
    },
    {
      id: 2,
      title: "Mountain Bike Trek",
      price: 25,
      image: "/placeholder.svg",
      status: "rented",
      views: 189,
      bookings: 8,
      rating: 4.7
    },
    {
      id: 3,
      title: "iPhone 15 Pro",
      price: 30,
      image: "/placeholder.svg",
      status: "draft",
      views: 0,
      bookings: 0,
      rating: 0
    }
  ];

  const bookings = [
    {
      id: 1,
      item: "Canon EOS R5 Camera",
      renter: "Alex Johnson",
      dates: "Dec 15-17, 2024",
      status: "confirmed",
      earnings: 135
    },
    {
      id: 2,
      item: "Mountain Bike Trek",
      renter: "Sarah Miller",
      dates: "Dec 20-22, 2024",
      status: "pending",
      earnings: 75
    },
    {
      id: 3,
      item: "iPhone 15 Pro",
      renter: "Maya Patel",
      dates: "Dec 18-19, 2024",
      status: "completed",
      earnings: 60
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "rented": return "bg-blue-500";
      case "draft": return "bg-gray-500";
      case "confirmed": return "bg-green-500";
      case "pending": return "bg-yellow-500";
      case "completed": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed": return <CheckCircle className="h-4 w-4" />;
      case "pending": return <Clock className="h-4 w-4" />;
      case "completed": return <CheckCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-urbanist font-bold mb-2">
              Welcome back, <span className="gradient-text">Sarah</span>!
            </h1>
            <p className="text-muted-foreground">
              Manage your listings and track your earnings
            </p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button variant="outline" size="icon" className="glass-effect">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="glass-effect">
              <Settings className="h-4 w-4" />
            </Button>
            <Link to="/post">
              <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="glass-card hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Earnings</p>
                  <p className="text-2xl font-urbanist font-bold gradient-text">
                    ${stats.totalEarnings}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Listings</p>
                  <p className="text-2xl font-urbanist font-bold">
                    {stats.activeListings}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Package className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                  <p className="text-2xl font-urbanist font-bold flex items-center">
                    {stats.averageRating}
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 ml-1" />
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <Star className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Bookings</p>
                  <p className="text-2xl font-urbanist font-bold">
                    {stats.totalBookings}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="glass-effect border-0 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {bookings.slice(0, 3).map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-3 glass-effect rounded-lg">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(booking.status)}
                        <div>
                          <p className="font-medium text-sm">{booking.item}</p>
                          <p className="text-xs text-muted-foreground">{booking.renter}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-sm">${booking.earnings}</p>
                        <Badge className={`text-xs ${getStatusColor(booking.status)} text-white`}>
                          {booking.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Top Performing Items */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Top Performing Items</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {listings.slice(0, 3).map((listing) => (
                    <div key={listing.id} className="flex items-center gap-3 p-3 glass-effect rounded-lg">
                      <img 
                        src={listing.image} 
                        alt={listing.title}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{listing.title}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            {listing.views}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {listing.bookings}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-sm">${listing.price}/day</p>
                        {listing.rating > 0 && (
                          <div className="flex items-center text-xs">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                            {listing.rating}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="listings">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>My Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {listings.map((listing) => (
                    <div key={listing.id} className="flex items-center gap-4 p-4 glass-effect rounded-lg hover-scale">
                      <img 
                        src={listing.image} 
                        alt={listing.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{listing.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span>${listing.price}/day</span>
                          <Badge className={`text-xs ${getStatusColor(listing.status)} text-white`}>
                            {listing.status}
                          </Badge>
                          <span className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            {listing.views} views
                          </span>
                          {listing.rating > 0 && (
                            <span className="flex items-center">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                              {listing.rating}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="glass-effect">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="glass-effect">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="glass-effect text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Booking Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 glass-effect rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{booking.item}</h3>
                          <p className="text-sm text-muted-foreground">
                            Rented by {booking.renter}
                          </p>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            {booking.dates}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold">${booking.earnings}</p>
                          <Badge className={`text-xs ${getStatusColor(booking.status)} text-white`}>
                            {booking.status}
                          </Badge>
                        </div>
                        {booking.status === "pending" && (
                          <div className="flex gap-2">
                            <Button size="sm" className="bg-gradient-to-r from-green-500 to-emerald-500">
                              Accept
                            </Button>
                            <Button size="sm" variant="outline" className="text-destructive">
                              Decline
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-lg">
                        SM
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">Sarah Mitchell</h3>
                      <p className="text-sm text-muted-foreground">sarah.mitchell@email.com</p>
                      <div className="flex items-center mt-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-sm">4.8 (127 reviews)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Downtown, San Francisco</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Member since January 2023</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full glass-effect">
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start glass-effect">
                    <Settings className="h-4 w-4 mr-2" />
                    Account Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start glass-effect">
                    <Bell className="h-4 w-4 mr-2" />
                    Notification Preferences
                  </Button>
                  <Button variant="outline" className="w-full justify-start glass-effect">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Payment Methods
                  </Button>
                  <Button variant="outline" className="w-full justify-start glass-effect">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Analytics & Insights
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;