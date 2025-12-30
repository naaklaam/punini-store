import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ProductCard, Product } from "@/components/ProductCard";
import { ProductModal } from "@/components/ProductModal";
import { FloatingParticles } from "@/components/FloatingParticles";
import { OrnamentDivider } from "@/components/OrnamentDivider";
import { useToast } from "@/hooks/use-toast";
import { Search, Filter, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Sample product data
const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Celestial Maiden Yuki",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop",
    price: 1500,
    rarity: "legendary",
    specs: {
      height: "165 cm",
      weight: "52 kg",
      bodyType: "Slender",
      hairColor: "Silver White",
      eyeColor: "Sapphire Blue",
    },
  },
  {
    id: 2,
    name: "Shadow Priestess Akane",
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=600&fit=crop",
    price: 1200,
    rarity: "epic",
    specs: {
      height: "170 cm",
      weight: "55 kg",
      bodyType: "Athletic",
      hairColor: "Raven Black",
      eyeColor: "Crimson Red",
    },
  },
  {
    id: 3,
    name: "Forest Spirit Hana",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop",
    price: 800,
    rarity: "rare",
    specs: {
      height: "158 cm",
      weight: "48 kg",
      bodyType: "Petite",
      hairColor: "Emerald Green",
      eyeColor: "Amber Gold",
    },
  },
  {
    id: 4,
    name: "Thunder Knight Rei",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop",
    price: 600,
    rarity: "rare",
    specs: {
      height: "175 cm",
      weight: "60 kg",
      bodyType: "Muscular",
      hairColor: "Electric Blue",
      eyeColor: "Violet Purple",
    },
  },
  {
    id: 5,
    name: "Sakura Dancer Miki",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=600&fit=crop",
    price: 400,
    rarity: "common",
    specs: {
      height: "160 cm",
      weight: "50 kg",
      bodyType: "Graceful",
      hairColor: "Cherry Pink",
      eyeColor: "Hazel Brown",
    },
  },
  {
    id: 6,
    name: "Ice Queen Setsuna",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop",
    price: 2000,
    rarity: "legendary",
    specs: {
      height: "172 cm",
      weight: "54 kg",
      bodyType: "Elegant",
      hairColor: "Platinum Blonde",
      eyeColor: "Ice Blue",
    },
  },
];

interface StorePageProps {
  userName: string;
  userBalance: number;
  onLogout: () => void;
  onPurchase: (amount: number) => void;
}

export const StorePage = ({ userName, userBalance, onLogout, onPurchase }: StorePageProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRarity, setSelectedRarity] = useState<string>("all");
  const { toast } = useToast();

  const filteredProducts = sampleProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRarity = selectedRarity === "all" || product.rarity === selectedRarity;
    return matchesSearch && matchesRarity;
  });

  const handleView = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handlePurchase = (product: Product) => {
    if (userBalance >= product.price) {
      onPurchase(product.price);
      setIsModalOpen(false);
      toast({
        title: "Purchase Successful!",
        description: `You have acquired ${product.name}!`,
      });
    } else {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough coins for this purchase.",
        variant: "destructive",
      });
    }
  };

  const rarityFilters = ["all", "common", "rare", "epic", "legendary"];

  return (
    <div className="min-h-screen pb-8">
      <FloatingParticles />
      <Navbar userBalance={userBalance} userName={userName} onLogout={onLogout} />

      {/* Main content */}
      <main className="container mx-auto px-4 pt-24">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <h1 className="font-cinzel text-4xl text-gold-gradient font-bold">
              Character Gallery
            </h1>
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <p className="text-muted-foreground font-philosopher">
            Discover and collect unique digital characters
          </p>
        </div>

        <OrnamentDivider symbol="✦" />

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search characters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {rarityFilters.map((rarity) => (
              <Button
                key={rarity}
                variant={selectedRarity === rarity ? "fantasy" : "fantasy-outline"}
                size="sm"
                onClick={() => setSelectedRarity(rarity)}
                className="capitalize"
              >
                {rarity === "all" && <Filter className="w-4 h-4 mr-1" />}
                {rarity}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard
                product={product}
                onView={handleView}
                onPurchase={handlePurchase}
              />
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground font-philosopher text-lg">
              No characters found matching your criteria.
            </p>
          </div>
        )}
      </main>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPurchase={handlePurchase}
        userBalance={userBalance}
      />
    </div>
  );
};
