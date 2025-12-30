import { useState } from "react";
import { FantasyCard } from "./FantasyCard";
import { Button } from "./ui/button";
import { Coins, Eye, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  rarity: "common" | "rare" | "epic" | "legendary";
  specs: {
    height: string;
    weight: string;
    bodyType: string;
    hairColor: string;
    eyeColor: string;
  };
}

interface ProductCardProps {
  product: Product;
  onView: (product: Product) => void;
  onPurchase: (product: Product) => void;
}

const rarityColors = {
  common: "from-gray-400 to-gray-500",
  rare: "from-blue-400 to-blue-600",
  epic: "from-purple-400 to-purple-600",
  legendary: "from-amber-400 to-amber-600",
};

const rarityGlow = {
  common: "shadow-gray-500/20",
  rare: "shadow-blue-500/30",
  epic: "shadow-purple-500/30",
  legendary: "shadow-amber-500/40",
};

export const ProductCard = ({ product, onView, onPurchase }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <FantasyCard
      className={cn(
        "group cursor-pointer overflow-hidden p-0",
        isHovered && `shadow-lg ${rarityGlow[product.rarity]}`
      )}
    >
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Rarity indicator */}
        <div
          className={cn(
            "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r",
            rarityColors[product.rarity]
          )}
        />

        {/* Image container */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay on hover */}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent transition-opacity duration-300",
              isHovered ? "opacity-90" : "opacity-0"
            )}
          />
          
          {/* Actions on hover */}
          <div
            className={cn(
              "absolute inset-0 flex flex-col items-center justify-center gap-3 transition-all duration-300",
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            <Button
              variant="fantasy"
              size="lg"
              onClick={() => onView(product)}
              className="gap-2"
            >
              <Eye className="w-4 h-4" />
              View Details
            </Button>
            <Button
              variant="fantasy-outline"
              size="default"
              onClick={() => onPurchase(product)}
              className="gap-2"
            >
              <Coins className="w-4 h-4" />
              {product.price} Coins
            </Button>
          </div>
        </div>

        {/* Info section */}
        <div className="p-4 bg-card/90">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-cinzel text-lg text-gold-gradient font-semibold truncate">
              {product.name}
            </h3>
            <div className="flex items-center gap-1 text-primary shrink-0">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-semibold">{product.rarity}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-muted-foreground">
            <Coins className="w-4 h-4 text-primary" />
            <span className="font-philosopher">{product.price} Coins</span>
          </div>
        </div>
      </div>
    </FantasyCard>
  );
};
