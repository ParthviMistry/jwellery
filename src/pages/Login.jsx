import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("priya@lumierejewels.com");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="flex h-20 w-full items-center justify-center rounded-md bg-white/0">
            <img
              src="/Regnor.jpg"
              alt="Regnor"
              className="h-16 w-auto object-contain"
            />
          </div>
          <h1 className="mt-4 font-display text-2xl font-semibold text-white">
            Regnor Admin
          </h1>
          <p className="mt-1 text-sm text-white/50">
            Sign in to manage your jewellery operations
          </p>
        </div>

        <Card className="border-white/10 bg-white/[0.04] shadow-none backdrop-blur">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-white/70">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
                  placeholder="you@lumierejewels.com"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-white/70">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="flex items-center justify-between text-xs text-white/50">
                <label className="flex items-center gap-1.5">
                  <input
                    type="checkbox"
                    className="rounded border-white/20 bg-transparent"
                  />
                  Remember me
                </label>
                <a href="#" className="hover:text-gold">
                  Forgot password?
                </a>
              </div>
              <Button type="submit" variant="gold" className="w-full">
                Sign in
              </Button>
            </form>
          </CardContent>
        </Card>
        <p className="mt-6 text-center text-xs text-white/30">
          Demo build — click "Sign in" with any details to continue.
        </p>
      </div>
    </div>
  );
}
