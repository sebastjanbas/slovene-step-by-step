const fs = require('fs');
const path = require('path');

// Read the new organized files
const messagesDir = path.join(__dirname, '../messages');
const files = ['new-en.json', 'new-sl.json', 'new-it.json', 'new-ru.json'];

// Function to properly map nested structures
function mapNestedStructure(structure, oldTranslations) {
  const result = {};
  
  for (const [key, value] of Object.entries(structure)) {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      result[key] = mapNestedStructure(value, oldTranslations);
    } else if (Array.isArray(value)) {
      // Handle arrays (like features arrays)
      result[key] = value.map((item, index) => {
        if (typeof item === 'string') {
          return mapOldToNew(`${key}-${index + 1}`, oldTranslations);
        }
        return item;
      });
    } else {
      result[key] = mapOldToNew(key, oldTranslations);
    }
  }
  
  return result;
}

// Enhanced mapping function
function mapOldToNew(key, oldTranslations) {
  const mapping = {
    // Common buttons
    "get-started": oldTranslations?.HomePage?.["action-button"] || oldTranslations?.Pricing?.["plan-button"],
    "learn-more": oldTranslations?.HomePage?.["more-info-button"] || oldTranslations?.HomePage?.["announcement-link"],
    "contact-us": oldTranslations?.Pricing?.["sec3-button"],
    "log-in": oldTranslations?.["Log in"]?.button,
    "sign-up": oldTranslations?.["Sign up"]?.button,
    "back-to-home": oldTranslations?.NotFoundPage?.backButton,

    // Forms
    "email": oldTranslations?.["Log in"]?.email || oldTranslations?.["Sign up"]?.email,
    "password": oldTranslations?.["Log in"]?.password || oldTranslations?.["Sign up"]?.password,
    "confirm-password": oldTranslations?.["Sign up"]?.["confirm-password"],
    "first-name": oldTranslations?.["Sign up"]?.["first-name"],
    "last-name": oldTranslations?.["Sign up"]?.["last-name"],
    "forgot-password": oldTranslations?.["Log in"]?.["forgot-password"],

    // Navigation
    "home": oldTranslations?.Footer?.Home,
    "courses": oldTranslations?.Footer?.Courses || oldTranslations?.Navbar?.products,
    "pricing": oldTranslations?.Footer?.Pricing || oldTranslations?.Navbar?.pricing,
    "about": oldTranslations?.Footer?.About || oldTranslations?.Navbar?.["about-us"],
    "features": oldTranslations?.Navbar?.features,
    "dashboard": oldTranslations?.Navbar?.dashboard,

    // Metadata
    "title": oldTranslations?.Metadata?.["home-title"] || oldTranslations?.Metadata?.["about-title"] || oldTranslations?.Metadata?.["pricing-title"] || oldTranslations?.Metadata?.["features-title"] || oldTranslations?.Metadata?.["log-title"] || oldTranslations?.Metadata?.["notfound-title"],
    "description": oldTranslations?.Metadata?.["home-desc"] || oldTranslations?.Metadata?.["about-desc"] || oldTranslations?.Metadata?.["pricing-desc"] || oldTranslations?.Metadata?.["features-desc"] || oldTranslations?.Metadata?.["log-desc"] || oldTranslations?.Metadata?.["notfound-desc"],

    // Homepage hero
    "announcement": oldTranslations?.HomePage?.announcement,
    "part1": oldTranslations?.HomePage?.["title-1"],
    "strong": oldTranslations?.HomePage?.["title-strong"],
    "part2": oldTranslations?.HomePage?.["title-2"],
    "subtitle": oldTranslations?.HomePage?.["under-title"],
    "primary": oldTranslations?.HomePage?.["action-button"],
    "secondary": oldTranslations?.HomePage?.["more-info-button"],

    // Why Slovene
    "why-slovene-title": oldTranslations?.HomePage?.["why-slovene-title"],
    "why-slovene-subtitle": oldTranslations?.HomePage?.["why-slovene-subtitle"],
    "why-slovene-intro": oldTranslations?.HomePage?.["why-slovene-text1"],
    "career-title": oldTranslations?.HomePage?.["why-slovene-point1-strong"],
    "career-description": oldTranslations?.HomePage?.["why-slovene-point1"],
    "integration-title": oldTranslations?.HomePage?.["why-slovene-point2-strong"],
    "integration-description": oldTranslations?.HomePage?.["why-slovene-point2"],
    "education-title": oldTranslations?.HomePage?.["why-slovene-point3-strong"],
    "education-description": oldTranslations?.HomePage?.["why-slovene-point3"],
    "why-slovene-conclusion": oldTranslations?.HomePage?.["why-slovene-text3"],

    // Features
    "features-title": oldTranslations?.HomePage?.["why-us"],
    "features-subtitle": oldTranslations?.HomePage?.["why-us-sub"],
    "online-lessons-title": oldTranslations?.HomePage?.["bento-c1-title"],
    "online-lessons-description": oldTranslations?.HomePage?.["bento-c1-desc"],
    "trial-lesson-title": oldTranslations?.HomePage?.["bento-c1-title2"],
    "trial-lesson-description": oldTranslations?.HomePage?.["bento-c1-desc2"],
    "community-title": oldTranslations?.HomePage?.["bento-c2-title"],
    "community-description": oldTranslations?.HomePage?.["bento-c2-desc"],
    "support-title": oldTranslations?.HomePage?.["bento-c3-title"],
    "support-description": oldTranslations?.HomePage?.["bento-c3-desc"],
    "personalized-title": oldTranslations?.HomePage?.["bento-c4-title"],
    "personalized-description": oldTranslations?.HomePage?.["bento-c4-desc"],

    // Stats
    "stats-title": oldTranslations?.HomePage?.["stats-title"],
    "stats-subtitle": oldTranslations?.HomePage?.["stats-subtitle"],
    "happy-students": oldTranslations?.HomePage?.["Happy students"],
    "lessons-conducted": oldTranslations?.HomePage?.["Lessons Conducted"],
    "student-satisfaction": oldTranslations?.HomePage?.["Student Satisfaction"],

    // Testimonials
    "testimonials-title": oldTranslations?.HomePage?.["testimonials-title"],
    "testimonials-subtitle": oldTranslations?.HomePage?.["testimonials-subtitle"],
    "vlad-lisin": oldTranslations?.Testimonials?.["student-VladLisin"],
    "anna-kotelnikova": oldTranslations?.Testimonials?.["student-AnnaKotelnikova"],
    "alexander-molchanov": oldTranslations?.Testimonials?.["student-AlexanderMolchanov"],
    "evgenia-rudakova": oldTranslations?.Testimonials?.["student-EvgeniaRudakova"],
    "violeta-lisin": oldTranslations?.Testimonials?.["student-VioletaLisin"],
    "oleg-kotelnikov": oldTranslations?.Testimonials?.["student-OlegKotelnikov"],

    // Pricing
    "pricing-hero-title": oldTranslations?.Pricing?.title,
    "pricing-hero-subtitle": oldTranslations?.Pricing?.subtitle,
    "pricing-hero-description": oldTranslations?.Pricing?.text,
    "session": oldTranslations?.Pricing?.session,
    "plan1-description": oldTranslations?.Pricing?.["plan1-desc"],
    "plan1-feature1": oldTranslations?.Pricing?.["plan1-feature1"],
    "plan1-feature2": oldTranslations?.Pricing?.["plan1-feature2"],
    "plan1-feature3": oldTranslations?.Pricing?.["plan1-feature3"],
    "plan1-feature4": oldTranslations?.Pricing?.["plan1-feature4"],
    "plan1-feature5": oldTranslations?.Pricing?.["plan1-feature5"],
    "plan1-feature6": oldTranslations?.Pricing?.["plan1-feature6"],
    "plan1-feature7": oldTranslations?.Pricing?.["plan1-feature7"],
    "plan1-feature8": oldTranslations?.Pricing?.["plan1-feature8"],
    "plan1-feature9": oldTranslations?.Pricing?.["plan1-feature9"],
    "plan2-description": oldTranslations?.Pricing?.["plan2-desc"],
    "plan2-feature1": oldTranslations?.Pricing?.["plan2-feature1"],
    "plan2-feature2": oldTranslations?.Pricing?.["plan2-feature2"],
    "plan2-feature3": oldTranslations?.Pricing?.["plan2-feature3"],
    "plan2-feature4": oldTranslations?.Pricing?.["plan2-feature4"],
    "plan2-feature5": oldTranslations?.Pricing?.["plan2-feature5"],
    "plan2-feature6": oldTranslations?.Pricing?.["plan2-feature6"],
    "plan2-feature7": oldTranslations?.Pricing?.["plan2-feature7"],
    "plan2-feature8": oldTranslations?.Pricing?.["plan2-feature8"],
    "plan2-feature9": oldTranslations?.Pricing?.["plan2-feature9"],
    "plan3-description": oldTranslations?.Pricing?.["plan3-desc"],
    "plan3-feature1": oldTranslations?.Pricing?.["plan3-feature1"],
    "plan3-feature2": oldTranslations?.Pricing?.["plan3-feature2"],
    "plan3-feature3": oldTranslations?.Pricing?.["plan3-feature3"],
    "plan3-feature4": oldTranslations?.Pricing?.["plan3-feature4"],
    "plan3-feature5": oldTranslations?.Pricing?.["plan3-feature5"],
    "plan3-feature6": oldTranslations?.Pricing?.["plan3-feature6"],
    "plan3-feature7": oldTranslations?.Pricing?.["plan3-feature7"],
    "plan3-feature8": oldTranslations?.Pricing?.["plan3-feature8"],
    "plan3-feature9": oldTranslations?.Pricing?.["plan3-feature9"],
    "pricing-cta-button": oldTranslations?.Pricing?.["plan-button"],
    "faq-title": oldTranslations?.Pricing?.["sec2-title"],
    "faq-subtitle": oldTranslations?.Pricing?.["sec2-subtitle"],
    "faq-q1": oldTranslations?.FAQ?.q1,
    "faq-q2": oldTranslations?.FAQ?.q2,
    "faq-q3": oldTranslations?.FAQ?.q3,
    "faq-q4": oldTranslations?.FAQ?.q4,
    "faq-a1": oldTranslations?.FAQ?.a1,
    "faq-a2": oldTranslations?.FAQ?.a2,
    "faq-a3": oldTranslations?.FAQ?.a3,
    "faq-a4": oldTranslations?.FAQ?.a4,
    "contact-title": oldTranslations?.Pricing?.["sec3-title"],
    "contact-subtitle": oldTranslations?.Pricing?.["sec3-subtitle"],
    "contact-button": oldTranslations?.Pricing?.["sec3-button"],

    // Auth
    "login-title": oldTranslations?.["Log in"]?.title,
    "login-label": oldTranslations?.["Log in"]?.label,
    "login-button": oldTranslations?.["Log in"]?.button,
    "login-link-text": oldTranslations?.["Log in"]?.["link-text"],
    "login-link": oldTranslations?.["Log in"]?.link,
    "signup-title": oldTranslations?.["Sign up"]?.title,
    "signup-label": oldTranslations?.["Sign up"]?.label,
    "signup-button": oldTranslations?.["Sign up"]?.button,
    "signup-link-text": oldTranslations?.["Sign up"]?.["link-text"],
    "signup-link": oldTranslations?.["Sign up"]?.link,
    "disclaimer-text": oldTranslations?.Disclaimer?.text,
    "disclaimer-terms": oldTranslations?.Disclaimer?.["link-terms"],
    "disclaimer-and": oldTranslations?.Disclaimer?.and,
    "disclaimer-privacy": oldTranslations?.Disclaimer?.["link-privacy"],

    // Errors
    "not-found-title": oldTranslations?.NotFoundPage?.title,
    "not-found-description": oldTranslations?.NotFoundPage?.description,
    "not-found-button": oldTranslations?.NotFoundPage?.backButton,
    "validation-email": oldTranslations?.["Error Messages"]?.["Please enter a valid email address"],
    "validation-password": oldTranslations?.["Error Messages"]?.["Please enter your password"],
    "validation-first-name": oldTranslations?.["Error Messages"]?.["Enter your first name"],
    "validation-last-name": oldTranslations?.["Error Messages"]?.["Enter your last name"],
    "validation-confirm-password": oldTranslations?.["Error Messages"]?.["Please confirm your password"],
    "validation-min-length": oldTranslations?.["Error Messages"]?.["Minimum 8 characters"],

    // Banner
    "banner-title": oldTranslations?.Banner?.title,
    "banner-message": oldTranslations?.Banner?.message,

    // Countdown
    "countdown-days": oldTranslations?.Countdown?.days,
    "countdown-hours": oldTranslations?.Countdown?.hours,
    "countdown-minutes": oldTranslations?.Countdown?.minutes,
    "countdown-seconds": oldTranslations?.Countdown?.seconds,
    "countdown-times-up": oldTranslations?.Countdown?.["times-up"]
  };

  return mapping[key] || "";
}

// Process each new file and fix the mapping
files.forEach(file => {
  console.log(`Fixing ${file}...`);
  
  const filePath = path.join(messagesDir, file);
  const newTranslations = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  // Read the original file to get proper translations
  const originalFile = file.replace('new-', '');
  const originalPath = path.join(messagesDir, originalFile);
  const oldTranslations = JSON.parse(fs.readFileSync(originalPath, 'utf8'));
  
  // Fix the mapping
  const fixedTranslations = mapNestedStructure(newTranslations, oldTranslations);
  
  // Write the fixed file
  const fixedFilePath = path.join(messagesDir, `fixed-${file}`);
  fs.writeFileSync(fixedFilePath, JSON.stringify(fixedTranslations, null, 2));
  
  console.log(`✅ Created fixed-${file}`);
});

console.log('\n🎉 Fixed reorganization complete!');
console.log('📁 Fixed files created with prefix "fixed-"'); 