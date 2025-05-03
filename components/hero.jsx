"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // 👈 corrected this line
import Image from "next/image";

const HeroSection = () => {

    const imageRef = useRef()
    useEffect(() => {
        const imageElement = imageRef.current;

        const handlescroll=()=>{
            const scrollPosition = window.scrollY;
            const scrollThreshold = 100;

            if(scrollPosition>scrollThreshold){
                imageElement.classList.add("scrolled");
            } else {
                imageElement.classList.remove("scrolled");
            }

        }

        window.addEventListener("scroll" ,handlescroll);

        return () => window.removeEventListener("scroll", handlescroll);
    }, [])
  return (
    <div className="pb-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title">
          Manage Your Finances <br /> with Intelligence
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          An AI-powered financial management platform that helps you track, analyze, and optimize your spending with real-time insights.
        </p>
        <div className="flex justify-center space-x-4">
        <Link href="/dashboard">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
</Link>
          
        </div>
        <div className="hero-image-wrapper">
            <div ref={imageRef} className="hero-image">
                <Image src='/banner.jpg'
                 width={1280}
                  height={720}
                  alt="Dashboard Preview"
                  className="rounded-lg shadow-2xl border mx-auto"
                  priority/>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
