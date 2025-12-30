import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FantasyCard } from "@/components/FantasyCard";
import { FloatingParticles } from "@/components/FloatingParticles";
import { OrnamentDivider } from "@/components/OrnamentDivider";
import { Lock, User, Sparkles, Banana } from "lucide-react";
import fantasyBg from "@/assets/fantasy-bg.jpg";

interface LoginPageProps {
  onLogin: (username: string) => void;
}

export const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Demo credentials
  const validUsers = [
    { username: "traveler", password: "pisang123" },
    { username: "owner", password: "admin123" },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const user = validUsers.find(
      (u) => u.username === username.toLowerCase() && u.password === password
    );

    if (user) {
      onLogin(user.username);
      navigate("/store");
    } else {
      setError("Invalid credentials. Access denied.");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${fantasyBg})` }}
      />
      <div className="absolute inset-0 bg-background/70" />

      {/* Particles */}
      <FloatingParticles />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md animate-fade-in">
        <FantasyCard className="p-8">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 mx-auto rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center animate-glow-pulse">
                <Banana className="w-14 h-14 text-primary" />
              </div>
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-primary animate-pulse" />
            </div>
            <h1 className="font-cinzel text-3xl text-gold-gradient font-bold mb-2">
              Punini Store
            </h1>
            <p className="text-muted-foreground font-philosopher">
              Gateway to the Collector's Realm
            </p>
          </div>

          <OrnamentDivider symbol="✧" />

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4 mt-6">
            <div className="space-y-2">
              <label className="text-sm font-cinzel text-foreground/80 flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Traveler Name
              </label>
              <Input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-cinzel text-foreground/80 flex items-center gap-2">
                <Lock className="w-4 h-4 text-primary" />
                Secret Key
              </label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="p-3 rounded-md bg-destructive/10 border border-destructive/30 text-destructive text-sm text-center">
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="fantasy"
              size="xl"
              className="w-full mt-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="animate-pulse">Authenticating...</span>
              ) : (
                "Enter the Realm"
              )}
            </Button>
          </form>

          <OrnamentDivider symbol="◈" className="mt-6" />

          {/* Footer note */}
          <p className="text-center text-xs text-muted-foreground mt-4">
            This is a private realm. Only invited travelers may enter.
          </p>

          {/* Demo credentials hint */}
          <div className="mt-6 p-3 rounded-md bg-primary/5 border border-primary/20">
            <p className="text-xs text-center text-muted-foreground">
              <span className="text-primary">Demo:</span> traveler / pisang123
            </p>
          </div>
        </FantasyCard>
      </div>
    </div>
  );
};
