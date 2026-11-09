/**
 * portfolio-data.js — Centralized Portfolio Media & Content Registry
 * ===================================================================
 * Place your real project screenshots and certificate images in the paths below.
 * When you add the image files to assets/images/projects/ and assets/images/certificates/,
 * the portfolio automatically displays them seamlessly.
 */

'use strict';

const PORTFOLIO_DATA = {
  // Profile Portrait Image
  profile: {
    name: 'Mahmoud Taha Othman',
    role: 'Control & Automation Engineering',
    imagePath: 'assets/images/mahmoud.png'
  },

  // Primary Focus Areas
  focusAreas: [
    {
      id: 'industrial-automation',
      title: 'Industrial Automation',
      description: 'PLC programming, VFD configuration, sensor integration, and industrial robotic systems.'
    },
    {
      id: 'web-scraping',
      title: 'Web Scraping',
      description: 'Python-based automated data extraction, parsing pipelines, and workflow automation.'
    }
  ],

  // Featured Projects & Image Placeholders
  projects: [
    {
      id: 'robotic-arm',
      title: 'Robotic Arm Automation Prototype',
      category: 'Industrial Automation',
      organization: 'El Araby Group',
      period: 'October 2024 – December 2024',
      image: 'assets/images/projects/project-robotic-arm.jpg',
      aspectRatio: '16:9',
      placeholderLabel: 'project-robotic-arm.jpg'
    },
    {
      id: 'web-scraping-pipeline',
      title: 'Web Scraping & Data Extraction Pipeline',
      category: 'Web Scraping & Automation',
      organization: 'Independent Startup',
      period: 'July 2024 – March 2025',
      image: 'assets/images/projects/project-web-scraping.jpg',
      aspectRatio: '16:9',
      placeholderLabel: 'project-web-scraping.jpg'
    }
  ],

  // Certificates & Image Placeholders
  certificates: [
    {
      id: 'cert-automation',
      title: 'Basic Industrial Automation',
      issuer: 'HA Consulting Group',
      date: 'July – August 2025',
      image: 'assets/images/certificates/cert-industrial-automation.jpg',
      aspectRatio: '4:3',
      placeholderLabel: 'cert-industrial-automation.jpg'
    },
    {
      id: 'cert-c',
      title: 'C Programming',
      issuer: 'IEEE Al-Azhar',
      date: 'November 2023 – September 2024',
      image: 'assets/images/certificates/cert-c-programming.jpg',
      aspectRatio: '4:3',
      placeholderLabel: 'cert-c-programming.jpg'
    },
    {
      id: 'cert-altium',
      title: 'PCB Design with Altium Designer',
      issuer: 'Eng. Ahmed Abolfotouh',
      date: 'May 2026',
      image: 'assets/images/certificates/cert-altium-pcb.jpg',
      aspectRatio: '4:3',
      placeholderLabel: 'cert-altium-pcb.jpg'
    }
  ],

  // CV Download Path
  cv: {
    downloadPath: 'assets/cv/mahmoud-taha-cv.pdf',
    filename: 'Mahmoud-Taha-CV.pdf'
  }
};

