import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { safeAnimate, safeTransition } from './utils/animationUtils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface AdminAccessProps {
  onAccessGranted: () => void;
}

export function AdminAccess({ onAccessGranted }: AdminAccessProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Simple password check - in production, this should be server-side
  const ADMIN_PASSWORD = 'ispora2025';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (password === ADMIN_PASSWORD) {
      // Store admin session in localStorage
      localStorage.setItem('adminAuthenticated', 'true');
      localStorage.setItem('adminLoginTime', new Date().toISOString());
      onAccessGranted();
    } else {
      setError('Invalid password. Please try again.');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={safeAnimate({ opacity: 1, scale: 1 })}
        transition={safeTransition({ duration: 0.5 })}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-semibold text-foreground">
              Admin Access
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter admin password to access the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                  Admin Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    required
                    className="h-12 pr-10 border-border/50 focus:border-primary focus:ring-primary/20"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert className="border-red-200 bg-red-50 text-red-800">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                disabled={isLoading || !password}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-200"
              >
                {isLoading ? 'Authenticating...' : 'Access Dashboard'}
              </Button>
            </form>

            <div className="mt-6 pt-4 border-t border-border/50">
              <p className="text-xs text-muted-foreground text-center">
                This is a protected admin area. Unauthorized access is prohibited.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
