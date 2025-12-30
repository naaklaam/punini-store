import { Product } from "./ProductCard";
import { Button } from "./ui/button";
import { Coins, X, Ruler, Scale, Heart, Palette, Eye } from "lucide-react";
import { OrnamentDivider } from "./OrnamentDivider";
import { cn } from "@/lib/utils";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (product: Product) => void;
  userBalance: number;
}

const rarityColors = {
  common: "text-gray-400 border-gray-400",
  rare: "text-blue-400 border-blue-400",
  epic: "text-purple-400 border-purple-400",
  legendary: "text-amber-400 border-amber-400",
};

export const ProductModal = ({ product, isOpen, onClose, onPurchase, userBalance }: ProductModalProps) => {
  if (!product || !isOpen) return null;

  const canAfford = userBalance >= product.price;

  const specs = [
    { icon: Ruler, label: "Height", value: product.specs.height },
    { icon: Scale, label: "Weight", value: product.specs.weight },
    { icon: Heart, label: "Body Type", value: product.specs.bodyType },
    { icon: Palette, label: "Hair Color", value: product.specs.hairColor },
    { icon: Eye, label: "Eye Color", value: product.specs.eyeColor },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/90 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-lg fantasy-border bg-card/95 animate-scale-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-card/80 text-foreground/60 hover:text-primary hover:bg-card transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Image section */}
          <div className="relative aspect-[3/4] md:aspect-auto">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/50 hidden md:block" />
          </div>

          {/* Details section */}
          <div className="p-6 md:p-8 overflow-y-auto max-h-[60vh] md:max-h-none">
            {/* Header */}
            <div className="mb-4">
              <span
                className={cn(
                  "inline-block px-3 py-1 rounded-full text-xs font-cinzel uppercase tracking-wider border",
                  rarityColors[product.rarity]
                )}
              >
                {product.rarity}
              </span>
            </div>

            <h2 className="font-cinzel text-3xl text-gold-gradient font-bold mb-2">
              {product.name}
            </h2>

            <div className="flex items-center gap-2 text-primary text-xl mb-6">
              <Coins className="w-6 h-6" />
              <span className="font-semibold">{product.price} Coins</span>
            </div>

            <OrnamentDivider symbol="✦" />

            {/* Specifications */}
            <div className="mb-6">
              <h3 className="font-cinzel text-lg text-foreground mb-4">
                Anatomical Specifications
              </h3>
              <div className="space-y-3">
                {specs.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between py-2 border-b border-border/30"
                  >
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Icon className="w-4 h-4 text-primary/60" />
                      <span className="font-philosopher">{label}</span>
                    </div>
                    <span className="text-foreground font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <OrnamentDivider symbol="◇" />

            {/* Purchase section */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4 text-sm">
                <span className="text-muted-foreground">Your Balance</span>
                <span className={cn("font-semibold", canAfford ? "text-primary" : "text-destructive")}>
                  {userBalance} Coins
                </span>
              </div>

              <Button
                variant="fantasy"
                size="xl"
                className="w-full"
                onClick={() => onPurchase(product)}
                disabled={!canAfford}
              >
                {canAfford ? (
                  <>
                    <Coins className="w-5 h-5 mr-2" />
                    Purchase for {product.price} Coins
                  </>
                ) : (
                  "Insufficient Balance"
                )}
              </Button>

              {!canAfford && (
                <p className="text-center text-sm text-muted-foreground mt-3">
                  You need {product.price - userBalance} more coins
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
