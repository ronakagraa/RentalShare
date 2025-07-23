import { useState, useEffect } from "react";
import { Header } from "@/components/Layout/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { 
  MapPin, 
  Search, 
  Filter, 
  Star, 
  Camera,
  Bike,
  Smartphone,
  X
} from "lucide-react";

const Explore = () => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Sample data for demonstration
  const mapItems = [
    {
      id: 1,
      title: "Canon EOS R5 Camera",
      price: 45,
      rating: 4.9,
      category: "Photography",
      image: "/placeholder.svg",
      location: [51.505, -0.09],
      owner: "Sarah M.",
      distance: "0.5 km",
      icon: Camera
    },
    {
      id: 2,
      title: "Mountain Bike Trek",
      price: 25,
      rating: 4.7,
      category: "Sports",
      image: "/placeholder.svg",
      location: [51.51, -0.1],
      owner: "Alex K.",
      distance: "1.2 km",
      icon: Bike
    },
    {
      id: 3,
      title: "iPhone 15 Pro",
      price: 30,
      rating: 4.8,
      category: "Electronics",
      image: "/placeholder.svg",
      location: [51.515, -0.11],
      owner: "Maya P.",
      distance: "2.1 km",
      icon: Smartphone
    }
  ];

  const filteredItems = mapItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)]">
        {/* Map Section */}
        <div className="flex-1 relative">
          {/* Search Overlay */}
          <div className="absolute top-4 left-4 right-4 z-[1000]">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search items on map..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 glass-effect border-0 shadow-lg"
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                className="glass-effect hover-scale"
                onClick={() => setShowFilters(true)}
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Map */}
          <div className="h-full w-full bg-muted/20 rounded-lg flex items-center justify-center">
            <div className="text-center p-8">
              <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
              <p className="text-muted-foreground">
                Map integration coming soon. Browse items in the sidebar for now.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-96 border-l border-border bg-card p-4 overflow-y-auto">
          <div className="mb-6">
            <h2 className="font-urbanist font-bold text-xl mb-2">
              Items Near You
            </h2>
            <p className="text-muted-foreground text-sm">
              {filteredItems.length} items found
            </p>
          </div>

          <div className="space-y-4">
            {filteredItems.map((item) => (
              <Card 
                key={item.id} 
                className={`hover-scale cursor-pointer transition-all ${
                  selectedItem?.id === item.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedItem(item)}
              >
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm truncate mb-1">
                        {item.title}
                      </h3>
                      <Badge variant="secondary" className="text-xs mb-2">
                        {item.category}
                      </Badge>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {item.distance}
                        </div>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                          {item.rating}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-semibold text-primary">
                          ${item.price}/day
                        </span>
                        <span className="text-xs text-muted-foreground">
                          by {item.owner}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" className="w-full mt-3" asChild>
                    <Link to={`/item/${item.id}`}>
                      View Details
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Filters Sheet */}
      <Sheet open={showFilters} onOpenChange={setShowFilters}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filter Items</SheetTitle>
          </SheetHeader>
          <div className="py-6 space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <div className="space-y-2">
                {['Photography', 'Sports', 'Electronics', 'Tools', 'Gaming'].map((category) => (
                  <label key={category} className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">{category}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Price Range</label>
              <div className="flex gap-2">
                <Input placeholder="Min" type="number" />
                <Input placeholder="Max" type="number" />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Distance</label>
              <select className="w-full p-2 border rounded-md">
                <option>Within 1 km</option>
                <option>Within 5 km</option>
                <option>Within 10 km</option>
                <option>Any distance</option>
              </select>
            </div>
            
            <Button className="w-full">Apply Filters</Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Selected Item Detail (Mobile) */}
      {selectedItem && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[1001]">
          <Card className="rounded-t-2xl rounded-b-none glass-card">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold">{selectedItem.title}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedItem(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-3">
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <Badge variant="secondary" className="mb-2">
                    {selectedItem.category}
                  </Badge>
                  <div className="text-sm text-muted-foreground mb-2">
                    {selectedItem.distance} • by {selectedItem.owner}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-lg text-primary">
                      ${selectedItem.price}/day
                    </span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      {selectedItem.rating}
                    </div>
                  </div>
                </div>
              </div>
              <Button className="w-full mt-3" asChild>
                <Link to={`/item/${selectedItem.id}`}>
                  View Full Details
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Explore;