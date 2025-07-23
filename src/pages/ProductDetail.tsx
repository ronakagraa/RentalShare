import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Calendar as CalendarIcon,
  Shield,
  Clock,
  Heart,
  Share2,
  MessageCircle,
  User,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // Sample product data
  const product = {
    id: id,
    title: "Canon EOS R5 Camera with 24-70mm Lens",
    price: 45,
    rating: 4.9,
    reviewCount: 127,
    category: "Photography",
    owner: {
      name: "Sarah Mitchell",
      avatar: "/placeholder.svg",
      rating: 4.8,
      responseTime: "Usually responds within 2 hours"
    },
    location: "Downtown, 0.5 km away",
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    description: "Professional mirrorless camera perfect for both photography and videography. Includes camera body, 24-70mm lens, battery charger, and camera bag. Great for events, portraits, and travel photography.",
    features: [
      "45MP Full-Frame Sensor",
      "8K Video Recording",
      "In-Body Image Stabilization",
      "Dual Memory Card Slots",
      "Weather Sealed Body"
    ],
    availability: "Available most days",
    policies: [
      "No smoking around equipment",
      "Must be returned in same condition",
      "24-hour minimum rental",
      "Security deposit required"
    ]
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-6">
        {/* Back Button */}
        <Link 
          to="/explore" 
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Explore
        </Link>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden glass-card">
              <img 
                src={product.images[currentImageIndex]} 
                alt={product.title}
                className="w-full h-full object-cover"
              />
              
              {product.images.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 glass-effect"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 glass-effect"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
              
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="glass-effect hover-scale"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="glass-effect hover-scale"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex 
                        ? 'border-primary shadow-lg' 
                        : 'border-transparent hover:border-border'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-3" variant="secondary">{product.category}</Badge>
              <h1 className="text-3xl font-urbanist font-bold mb-3">{product.title}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-semibold">{product.rating}</span>
                  <span className="text-muted-foreground ml-1">({product.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {product.location}
                </div>
              </div>
              
              <div className="text-3xl font-urbanist font-bold text-primary mb-6">
                ${product.price}/day
              </div>
            </div>

            {/* Owner Info */}
            <Card className="glass-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{product.owner.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        {product.owner.rating} • {product.owner.responseTime}
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="glass-effect">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Booking Section */}
            <Card className="glass-card">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Select Rental Dates</h3>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal glass-effect"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? (
                        selectedDate.toDateString()
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                
                <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Daily rate</span>
                    <span>${product.price}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Service fee</span>
                    <span>$5</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${product.price + 5}</span>
                  </div>
                </div>
                
                <Button className="w-full mt-4 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                  Request to Rent
                </Button>
                
                <Button variant="outline" className="w-full mt-2 glass-effect">
                  Propose a Swap
                </Button>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="glass-card">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Features & Specifications</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Description */}
        <div className="mt-8 grid lg:grid-cols-2 gap-8">
          <Card className="glass-card">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-3">Availability</h4>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2" />
                  {product.availability}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Rental Policies</h3>
              <ul className="space-y-3">
                {product.policies.map((policy, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <Shield className="h-4 w-4 mr-3 mt-0.5 text-primary flex-shrink-0" />
                    {policy}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;