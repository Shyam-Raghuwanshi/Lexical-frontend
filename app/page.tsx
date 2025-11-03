"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Files, FileScan, Languages, LogsIcon, Upload } from "lucide-react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

const FAQ_Questions_Answers = [
  { q: "Is the converter free to use?", a: "Yes, our PDF to text converter is completely free to use." },
  {
    q: "What file formats can I export to?", a: "You can export your converted files as plain text (.txt) or searchable PDF files."
  },
  {
    q: "Is my data secure?", a: "Yes, all files are processed securely and deleted immediately after conversion."
  },
  {
    q: "Do you offer enterprise plans and API support?", a: "Yes, we offer enterprise plans with API access. Contact us for more details."
  },
  {
    q: "My document is not in English. Do you support other languages?",
    a: "Yes, our OCR technology supports over 100+ languages for text extraction."
  }

];

export default function Home() {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type === "application/pdf") {
      setSelectedFile(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="px-5 py-4 w-full h-[72px] z-10 flex justify-start items-center fixed backdrop-blur-sm">
        <div className="w-full flex justify-between items-center">
          <Image src="/logo.png" alt="Logo" width={86} height={24} />
          <SignedOut>
            <SignInButton>
              <Button variant="secondary">Login</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-10 px-5 lg:px-16 lg:pt-[140px] lg:pb-25">
        <div className="flex flex-col justify-center items-center gap-8">
          <div className="relative max-w-[640px] flex flex-col justify-center gap-4 text-start sm:text-center ">
            <h1 className="text-4xl font-medium leading-[1.05em] lg:text-[64px]">
              Convert any PDF to text with OCR
            </h1>
            <p className="text-[16px] text-text">
              Convert your PDF files to text with OCR functionality. Export as txt or searchable PDFs.
            </p>
          </div>

          {/* Upload Area */}
          <div className="w-full h-[280px] lg:h-[480px]">
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleClick}
              className={`
                border-2 border-dashed rounded-lg bg-bg-light p-8 md:p-12 lg:p-16 text-center cursor-pointer transition-all h-full flex flex-col justify-center ${isDragging
                  ? "border-primary bg-card"
                  : "border-border hover:border-muted"
                }`}
            >
              <div className="flex flex-col justify-center items-center gap-4">
                <div className="w-12 h-12 md:w-16 md:h-16 border-2 border-border rounded-lg flex items-center justify-center">
                  <Upload />
                </div>
                <div>
                  {selectedFile ? (
                    <div className="space-y-2">
                      <p className="text-white text-sm md:text-base font-medium">
                        {selectedFile.name}
                      </p>
                      <p className="text-muted-foreground text-xs md:text-sm">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFile(null);
                          if (fileInputRef.current) {
                            fileInputRef.current.value = "";
                          }
                        }}
                        variant="outline"
                        size="sm"
                        className="mt-2"
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm md:text-base">
                      Drag and drop your PDF here or click to browse
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full relative flex flex-col gap-5 py-10 px-5 items-center justify-center lg:px-16 lg:py-25">
        <div className="w-full flex flex-col gap-8 justify-center items-center">
          <div className="w-full relative max-w-[640px]">
            <h2 className="text-[36px] leading-[1.05em] lg:text-[64px] lg:text-center">
              Features of our{" "}
              <span className="text-primary">
                PDF to text converter
              </span>
            </h2>
          </div>

          <div className="relative w-full flex flex-col justify-center items-center gap-4 lg:flex-row lg:gap-6">
            {/* Feature 1 */}
            <div className="w-full h-[300px] rounded-[12px] flex flex-col bg-bg justify-between p-5 item-center">
              <Files className="h-9 w-9 text-primary" />
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl text-white leading-[1.4em] font-medium">
                  Create Searchable PDFs
                </h3>
                <p className="text-text">
                  Retain the original formatting of your scanned PDF and export as searchable PDF.
                </p>
              </div>
            </div>
            <div className="w-full h-[300px] rounded-[12px] flex flex-col bg-bg justify-between p-5 item-center">
              <Languages className="h-9 w-9 text-primary" />
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl text-white leading-[1.4em] font-medium">
                  Support for multiple languages
                </h3>
                <p className="text-text">
                  Works with content in over 100+ languages.
                </p>
              </div>
            </div>
            <div className="w-full h-[300px] rounded-[12px] flex flex-col bg-bg justify-between p-5 item-center">
              <FileScan className="h-9 w-9 text-primary" />
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl text-white leading-[1.4em] font-medium">
                  Works with scanned PDFs
                </h3>
                <p className="text-text">
                  With OCR, text extraction works on scanned and image-based PDFs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full relative flex justify-center items-center px-5 py-10 lg:px-16 lg:py-25">
        <div className="gap-8 flex flex-col items-start justify-center lg:flex-row lg:gap-16 w-full">
          <div className="w-full max-w-[640px]">
            <h1 className="text-4xl leading-[1.05em] font-medium lg:text-[64px] text-start">
              Frequently Asked
              Questions
            </h1>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {FAQ_Questions_Answers.map((item, index) => (
              <AccordionItem
                key={item.q}
                value={`item-${index}`}
                className="border-b-[1px] border-border data-[state=open]"
              >
                <AccordionTrigger className="text-white">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-text text-[16px] leading-[1.6em] h-auto text-start lg:text-[18px]">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="h-[185px] w-full px-10 py-20">
        <div className="w-full flex flex-col gap-5 justify-start items-start sm:flex-row sm:justify-between">
          <Image src="/logo.png" alt="Logo" width={86} height={24} />
          <p className="text-text text-[18px]">
            Copyright © 2025 - All rights reserved
          </p>
        </div>
      </footer>
    </div >
  );
}
