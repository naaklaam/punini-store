import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { FantasyCard, FantasyCardTitle } from "@/components/FantasyCard";
import { FloatingParticles } from "@/components/FloatingParticles";
import { OrnamentDivider } from "@/components/OrnamentDivider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Coins, Gift, User, Calendar, Sparkles, Check, X } from "lucide-react";

interface ProfilePageProps {
  userName: string;
  userBalance: number;
  onLogout: () => void;
  onRedeemCode: (amount: number) => void;
}

// Valid daily codes (in real app, this would be validated server-side)
const validCodes: Record<string, { value: number; claimed: boolean }> = {
  PISANGHARIINI: { value: 500, claimed: false },
  PUNINIBONUS: { value: 250, claimed: false },
  LEGENDARYWEEK: { value: 1000, claimed: false },
  DAILYREWARD: { value: 100, claimed: false },
};

export const ProfilePage = ({ userName, userBalance, onLogout, onRedeemCode }: ProfilePageProps) => {
  const [code, setCode] = useState("");
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [claimedCodes, setClaimedCodes] = useState<string[]>([]);
  const { toast } = useToast();

  const handleRedeemCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRedeeming(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const upperCode = code.toUpperCase();
    const codeData = validCodes[upperCode];

    if (!codeData) {
      toast({
        title: "Invalid Code",
        description: "This code doesn't exist or has expired.",
        variant: "destructive",
      });
    } else if (claimedCodes.includes(upperCode)) {
      toast({
        title: "Already Claimed",
        description: "You have already redeemed this code today.",
        variant: "destructive",
      });
    } else {
      onRedeemCode(codeData.value);
      setClaimedCodes([...claimedCodes, upperCode]);
      toast({
        title: "Code Redeemed!",
        description: `You received ${codeData.value} coins!`,
      });
    }

    setCode("");
    setIsRedeeming(false);
  };

  const recentActivity = [
    { type: "purchase", item: "Celestial Maiden Yuki", amount: -1500, date: "Today" },
    { type: "redeem", item: "Daily Code: PISANGHARIINI", amount: 500, date: "Today" },
    { type: "purchase", item: "Forest Spirit Hana", amount: -800, date: "Yesterday" },
  ];

  return (
    <div className="min-h-screen pb-8">
      <FloatingParticles />
      <Navbar userBalance={userBalance} userName={userName} onLogout={onLogout} />

      <main className="container mx-auto px-4 pt-24 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <User className="w-6 h-6 text-primary" />
            <h1 className="font-cinzel text-4xl text-gold-gradient font-bold">
              Traveler Profile
            </h1>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Profile Info Card */}
          <FantasyCard className="h-fit">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center mb-4">
                <User className="w-12 h-12 text-primary" />
              </div>
              <h2 className="font-cinzel text-2xl text-gold-gradient font-bold capitalize mb-1">
                {userName}
              </h2>
              <p className="text-muted-foreground text-sm">Traveler</p>

              <OrnamentDivider symbol="◆" className="my-4" />

              <div className="flex items-center justify-center gap-2 text-2xl">
                <Coins className="w-8 h-8 text-primary" />
                <span className="font-cinzel font-bold text-primary">
                  {userBalance.toLocaleString()}
                </span>
                <span className="text-muted-foreground text-base">Coins</span>
              </div>
            </div>
          </FantasyCard>

          {/* Redeem Code Card */}
          <FantasyCard>
            <FantasyCardTitle className="flex items-center gap-2 mb-4">
              <Gift className="w-5 h-5" />
              Redeem Daily Code
            </FantasyCardTitle>

            <p className="text-muted-foreground text-sm mb-4">
              Enter a valid daily code to receive coins. Each code can only be claimed once per day.
            </p>

            <form onSubmit={handleRedeemCode} className="space-y-4">
              <Input
                placeholder="Enter your code..."
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="font-mono text-center tracking-widest"
                required
              />
              <Button
                type="submit"
                variant="fantasy"
                className="w-full"
                disabled={isRedeeming || !code}
              >
                {isRedeeming ? (
                  <span className="animate-pulse">Validating...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Redeem Code
                  </>
                )}
              </Button>
            </form>

            {/* Demo codes hint */}
            <div className="mt-4 p-3 rounded-md bg-primary/5 border border-primary/20">
              <p className="text-xs text-muted-foreground">
                <span className="text-primary">Demo codes:</span> PISANGHARIINI, PUNINIBONUS, DAILYREWARD
              </p>
            </div>
          </FantasyCard>
        </div>

        <OrnamentDivider symbol="✧" className="my-8" />

        {/* Activity History */}
        <FantasyCard>
          <FantasyCardTitle className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5" />
            Recent Activity
          </FantasyCardTitle>

          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-border/30 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.amount > 0
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {activity.amount > 0 ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <X className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{activity.item}</p>
                    <p className="text-xs text-muted-foreground">{activity.date}</p>
                  </div>
                </div>
                <span
                  className={`font-cinzel font-semibold ${
                    activity.amount > 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {activity.amount > 0 ? "+" : ""}
                  {activity.amount}
                </span>
              </div>
            ))}
          </div>
        </FantasyCard>
      </main>
    </div>
  );
};
