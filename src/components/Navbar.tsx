"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { Logo } from "@/components/Logo";
import { Camera, Menu, X, LogOut, User, Crown } from "lucide-react";

const navLinks = [
  { href: "/calculator", label: "Calculator" },
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#faq", label: "FAQ" },
] as const;

function openPricing() {
  window.dispatchEvent(new CustomEvent("open-pricing"));
}

function UserMenu() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  if (status === "loading") {
    return <div className="w-9 h-9 rounded-full bg-gray-100 animate-pulse" />;
  }

  if (!session) {
    return (
      <button
        onClick={() => signIn("google")}
        className="text-sm font-medium text-muted hover:text-primary transition-colors"
      >
        Sign In
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-50 transition-colors"
      >
        {session.user?.image ? (
          <Image
            src={session.user.image}
            alt={session.user.name || "User"}
            width={32}
            height={32}
            className="rounded-full"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-60 bg-white rounded-xl border border-border shadow-lg z-50 overflow-hidden">
            <div className="p-4 border-b border-border">
              <p className="text-sm font-semibold text-foreground truncate">{session.user?.name}</p>
              <p className="text-xs text-muted truncate">{session.user?.email}</p>
            </div>
            <button
              onClick={() => { setOpen(false); openPricing(); }}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-amber-600 hover:bg-amber-50 transition-colors"
            >
              <Crown className="w-4 h-4" />
              Upgrade to Pro
            </button>
            <button
              onClick={() => signOut()}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-muted hover:text-red-500 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold text-foreground"
        >
          <Logo size={32} />
          <span>PhotoMath AI</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#solver"
            className="btn-primary text-sm px-4 py-2 gap-2"
          >
            <Camera className="w-4 h-4" />
            Solve Now
          </Link>
          <UserMenu />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <UserMenu />
          <button
            type="button"
            className="text-foreground"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="flex flex-col gap-1 px-4 pb-4 md:hidden bg-white border-b border-border">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted hover:text-primary hover:bg-surface transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#solver"
            className="btn-primary text-sm px-4 py-2.5 mt-2 gap-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Camera className="w-4 h-4" />
            Solve Now
          </Link>
        </div>
      )}
    </header>
  );
}
