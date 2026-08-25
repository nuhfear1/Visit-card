"use client";

import React from "react";
import { Home, User, Briefcase, Mail } from "lucide-react";

interface GlassEffectProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  target?: string;
}

const GlassEffect: React.FC<GlassEffectProps> = ({
  children,
  className = "",
  style = {},
  href,
  target = "_blank",
}) => {
  const glassStyle = {
    boxShadow: "0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)",
    transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.2)",
    ...style,
  };

  const content = (
    <div
      className={`relative flex font-semibold overflow-hidden text-black cursor-pointer transition-all duration-700 ${className}`}
      style={glassStyle}
    >
      <div
        className="absolute inset-0 z-0 overflow-hidden rounded-inherit rounded-3xl"
        style={{
          backdropFilter: "blur(3px)",
          filter: "url(#glass-distortion)",
          isolation: "isolate",
        }}
      />
      <div
        className="absolute inset-0 z-10 rounded-inherit"
        style={{ background: "rgba(255, 255, 255, 0.25)" }}
      />
      <div
        className="absolute inset-0 z-20 rounded-inherit rounded-3xl overflow-hidden"
        style={{
          boxShadow:
            "inset 2px 2px 1px 0 rgba(255, 255, 255, 0.5), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.5)",
        }}
      />
      <div className="relative z-30">{children}</div>
    </div>
  );

  return href ? (
    <a href={href} target={target} rel="noopener noreferrer" className="block">
      {content}
    </a>
  ) : (
    content
  );
};

const GlassFilter: React.FC = () => (
  <svg style={{ display: "none" }}>
    <filter
      id="glass-distortion"
      x="0%"
      y="0%"
      width="100%"
      height="100%"
      filterUnits="objectBoundingBox"
    >
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.001 0.005"
        numOctaves="1"
        seed="17"
        result="turbulence"
      />
      <feComponentTransfer in="turbulence" result="mapped">
        <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
        <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
        <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
      </feComponentTransfer>
      <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
      <feSpecularLighting
        in="softMap"
        surfaceScale="5"
        specularConstant="1"
        specularExponent="100"
        lightingColor="white"
        result="specLight"
      >
        <fePointLight x="-200" y="-200" z="300" />
      </feSpecularLighting>
      <feComposite
        in="specLight"
        operator="arithmetic"
        k1="0"
        k2="1"
        k3="1"
        k4="0"
        result="litImage"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="softMap"
        scale="200"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  </svg>
);

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePageTransition } from "@/components/PageTransition";

export default function Navbar() {
  const pathname = usePathname();
  const { startTransition } = usePageTransition();

  const navItems = [
    { icon: <Home size={18} />, label: "Home", href: "/" },
    { icon: <User size={18} />, label: "About", href: "/about" },
    { icon: <Briefcase size={18} />, label: "Projects", href: "/projects" },
    { icon: <Mail size={18} />, label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <GlassFilter />
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <GlassEffect className="rounded-full p-1.5 hover:p-2 hover:rounded-full transition-all duration-500">
          <div className="flex items-center justify-center gap-2 rounded-full p-1 overflow-hidden">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={index}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    if (pathname !== item.href) {
                      startTransition(item.href);
                    }
                  }}
                  className={`flex items-center px-4 py-2 rounded-full transition-all duration-500 hover:scale-105 cursor-pointer group ${
                    isActive
                      ? "bg-[#F44A22] text-white"
                      : "bg-white/10 text-palette-stone hover:bg-[#F44A22] hover:text-white"
                  }`}
                  style={{
                    transformOrigin: "center center",
                    transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.2)",
                  }}
                >
                  {item.icon}
                  <span className="ml-2 text-sm font-medium tracking-wide">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </GlassEffect>
      </div>
    </>
  );
}
