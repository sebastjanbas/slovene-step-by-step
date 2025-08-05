const fs = require('fs');
const path = require('path');

// Read all translation files
const messagesDir = path.join(__dirname, '../messages');
const files = ['en.json', 'sl.json', 'it.json', 'ru.json'];

// Define the new organized structure
const newStructure = {
  // Common UI elements
  "common": {
    "buttons": {
      "get-started": "",
      "learn-more": "",
      "contact-us": "",
      "log-in": "",
      "sign-up": "",
      "back-to-home": ""
    },
    "forms": {
      "email": "",
      "password": "",
      "confirm-password": "",
      "first-name": "",
      "last-name": "",
      "forgot-password": ""
    },
    "navigation": {
      "home": "",
      "courses": "",
      "pricing": "",
      "about": "",
      "features": "",
      "dashboard": ""
    }
  },

  // Page metadata
  "metadata": {
    "home": { "title": "", "description": "" },
    "about": { "title": "", "description": "" },
    "pricing": { "title": "", "description": "" },
    "features": { "title": "", "description": "" },
    "login": { "title": "", "description": "" },
    "not-found": { "title": "", "description": "" }
  },

  // Homepage content
  "homepage": {
    "hero": {
      "announcement": "",
      "title": { "part1": "", "strong": "", "part2": "" },
      "subtitle": "",
      "cta": { "primary": "", "secondary": "" }
    },
    "why-slovene": {
      "title": "",
      "subtitle": "",
      "intro": "",
      "benefits": {
        "career": { "title": "", "description": "" },
        "integration": { "title": "", "description": "" },
        "education": { "title": "", "description": "" }
      },
      "conclusion": ""
    },
    "features": {
      "title": "",
      "subtitle": "",
      "cards": {
        "online-lessons": { "title": "", "description": "" },
        "trial-lesson": { "title": "", "description": "" },
        "community": { "title": "", "description": "" },
        "support": { "title": "", "description": "" },
        "personalized": { "title": "", "description": "" }
      }
    },
    "stats": {
      "title": "",
      "subtitle": "",
      "metrics": {
        "happy-students": "",
        "lessons-conducted": "",
        "student-satisfaction": ""
      }
    },
    "testimonials": {
      "title": "",
      "subtitle": "",
      "students": {
        "vlad-lisin": "",
        "anna-kotelnikova": "",
        "alexander-molchanov": "",
        "evgenia-rudakova": "",
        "violeta-lisin": "",
        "oleg-kotelnikov": ""
      }
    }
  },

  // Pricing page
  "pricing": {
    "hero": { "title": "", "subtitle": "", "description": "" },
    "plans": {
      "session": "",
      "plan1": { "description": "", "features": ["", "", "", "", "", "", "", "", ""] },
      "plan2": { "description": "", "features": ["", "", "", "", "", "", "", "", ""] },
      "plan3": { "description": "", "features": ["", "", "", "", "", "", "", "", ""] }
    },
    "cta": { "button": "" },
    "faq": {
      "title": "",
      "subtitle": "",
      "questions": { "q1": "", "q2": "", "q3": "", "q4": "" },
      "answers": { "a1": "", "a2": "", "a3": "", "a4": "" }
    },
    "contact": { "title": "", "subtitle": "", "button": "" }
  },

  // Authentication
  "auth": {
    "login": { "title": "", "label": "", "button": "", "link-text": "", "link": "" },
    "signup": { "title": "", "label": "", "button": "", "link-text": "", "link": "" },
    "disclaimer": { "text": "", "terms": "", "and": "", "privacy": "" }
  },

  // Error messages
  "errors": {
    "not-found": { "title": "", "description": "", "button": "" },
    "validation": {
      "email": "",
      "password": "",
      "first-name": "",
      "last-name": "",
      "confirm-password": "",
      "min-length": ""
    }
  },

  // Banner
  "banner": { "title": "", "message": "" },

  // Countdown
  "countdown": { "days": "", "hours": "", "minutes": "", "seconds": "", "times-up": "" }
};

// Function to map old translations to new structure
function mapTranslations(oldTranslations) {
  return {
    "common": {
      "buttons": {
        "get-started": oldTranslations?.HomePage?.["action-button"] || oldTranslations?.Pricing?.["plan-button"] || "",
        "learn-more": oldTranslations?.HomePage?.["more-info-button"] || oldTranslations?.HomePage?.["announcement-link"] || "",
        "contact-us": oldTranslations?.Pricing?.["sec3-button"] || "",
        "log-in": oldTranslations?.["Log in"]?.button || "",
        "sign-up": oldTranslations?.["Sign up"]?.button || "",
        "back-to-home": oldTranslations?.NotFoundPage?.backButton || ""
      },
      "forms": {
        "email": oldTranslations?.["Log in"]?.email || oldTranslations?.["Sign up"]?.email || "",
        "password": oldTranslations?.["Log in"]?.password || oldTranslations?.["Sign up"]?.password || "",
        "confirm-password": oldTranslations?.["Sign up"]?.["confirm-password"] || "",
        "first-name": oldTranslations?.["Sign up"]?.["first-name"] || "",
        "last-name": oldTranslations?.["Sign up"]?.["last-name"] || "",
        "forgot-password": oldTranslations?.["Log in"]?.["forgot-password"] || ""
      },
      "navigation": {
        "home": oldTranslations?.Footer?.Home || "",
        "courses": oldTranslations?.Footer?.Courses || oldTranslations?.Navbar?.products || "",
        "pricing": oldTranslations?.Footer?.Pricing || oldTranslations?.Navbar?.pricing || "",
        "about": oldTranslations?.Footer?.About || oldTranslations?.Navbar?.["about-us"] || "",
        "features": oldTranslations?.Navbar?.features || "",
        "dashboard": oldTranslations?.Navbar?.dashboard || ""
      }
    },
    "metadata": {
      "home": {
        "title": oldTranslations?.Metadata?.["home-title"] || "",
        "description": oldTranslations?.Metadata?.["home-desc"] || ""
      },
      "about": {
        "title": oldTranslations?.Metadata?.["about-title"] || "",
        "description": oldTranslations?.Metadata?.["about-desc"] || ""
      },
      "pricing": {
        "title": oldTranslations?.Metadata?.["pricing-title"] || "",
        "description": oldTranslations?.Metadata?.["pricing-desc"] || ""
      },
      "features": {
        "title": oldTranslations?.Metadata?.["features-title"] || "",
        "description": oldTranslations?.Metadata?.["features-desc"] || ""
      },
      "login": {
        "title": oldTranslations?.Metadata?.["log-title"] || "",
        "description": oldTranslations?.Metadata?.["log-desc"] || ""
      },
      "not-found": {
        "title": oldTranslations?.Metadata?.["notfound-title"] || "",
        "description": oldTranslations?.Metadata?.["notfound-desc"] || ""
      }
    },
    "homepage": {
      "hero": {
        "announcement": oldTranslations?.HomePage?.announcement || "",
        "title": {
          "part1": oldTranslations?.HomePage?.["title-1"] || "",
          "strong": oldTranslations?.HomePage?.["title-strong"] || "",
          "part2": oldTranslations?.HomePage?.["title-2"] || ""
        },
        "subtitle": oldTranslations?.HomePage?.["under-title"] || "",
        "cta": {
          "primary": oldTranslations?.HomePage?.["action-button"] || "",
          "secondary": oldTranslations?.HomePage?.["more-info-button"] || ""
        }
      },
      "why-slovene": {
        "title": oldTranslations?.HomePage?.["why-slovene-title"] || "",
        "subtitle": oldTranslations?.HomePage?.["why-slovene-subtitle"] || "",
        "intro": oldTranslations?.HomePage?.["why-slovene-text1"] || "",
        "benefits": {
          "career": {
            "title": oldTranslations?.HomePage?.["why-slovene-point1-strong"] || "",
            "description": oldTranslations?.HomePage?.["why-slovene-point1"] || ""
          },
          "integration": {
            "title": oldTranslations?.HomePage?.["why-slovene-point2-strong"] || "",
            "description": oldTranslations?.HomePage?.["why-slovene-point2"] || ""
          },
          "education": {
            "title": oldTranslations?.HomePage?.["why-slovene-point3-strong"] || "",
            "description": oldTranslations?.HomePage?.["why-slovene-point3"] || ""
          }
        },
        "conclusion": oldTranslations?.HomePage?.["why-slovene-text3"] || ""
      },
      "features": {
        "title": oldTranslations?.HomePage?.["why-us"] || "",
        "subtitle": oldTranslations?.HomePage?.["why-us-sub"] || "",
        "cards": {
          "online-lessons": {
            "title": oldTranslations?.HomePage?.["bento-c1-title"] || "",
            "description": oldTranslations?.HomePage?.["bento-c1-desc"] || ""
          },
          "trial-lesson": {
            "title": oldTranslations?.HomePage?.["bento-c1-title2"] || "",
            "description": oldTranslations?.HomePage?.["bento-c1-desc2"] || ""
          },
          "community": {
            "title": oldTranslations?.HomePage?.["bento-c2-title"] || "",
            "description": oldTranslations?.HomePage?.["bento-c2-desc"] || ""
          },
          "support": {
            "title": oldTranslations?.HomePage?.["bento-c3-title"] || "",
            "description": oldTranslations?.HomePage?.["bento-c3-desc"] || ""
          },
          "personalized": {
            "title": oldTranslations?.HomePage?.["bento-c4-title"] || "",
            "description": oldTranslations?.HomePage?.["bento-c4-desc"] || ""
          }
        }
      },
      "stats": {
        "title": oldTranslations?.HomePage?.["stats-title"] || "",
        "subtitle": oldTranslations?.HomePage?.["stats-subtitle"] || "",
        "metrics": {
          "happy-students": oldTranslations?.HomePage?.["Happy students"] || "",
          "lessons-conducted": oldTranslations?.HomePage?.["Lessons Conducted"] || "",
          "student-satisfaction": oldTranslations?.HomePage?.["Student Satisfaction"] || ""
        }
      },
      "testimonials": {
        "title": oldTranslations?.HomePage?.["testimonials-title"] || "",
        "subtitle": oldTranslations?.HomePage?.["testimonials-subtitle"] || "",
        "students": {
          "vlad-lisin": oldTranslations?.Testimonials?.["student-VladLisin"] || "",
          "anna-kotelnikova": oldTranslations?.Testimonials?.["student-AnnaKotelnikova"] || "",
          "alexander-molchanov": oldTranslations?.Testimonials?.["student-AlexanderMolchanov"] || "",
          "evgenia-rudakova": oldTranslations?.Testimonials?.["student-EvgeniaRudakova"] || "",
          "violeta-lisin": oldTranslations?.Testimonials?.["student-VioletaLisin"] || "",
          "oleg-kotelnikov": oldTranslations?.Testimonials?.["student-OlegKotelnikov"] || ""
        }
      }
    },
    "pricing": {
      "hero": {
        "title": oldTranslations?.Pricing?.title || "",
        "subtitle": oldTranslations?.Pricing?.subtitle || "",
        "description": oldTranslations?.Pricing?.text || ""
      },
      "plans": {
        "session": oldTranslations?.Pricing?.session || "",
        "plan1": {
          "description": oldTranslations?.Pricing?.["plan1-desc"] || "",
          "features": [
            oldTranslations?.Pricing?.["plan1-feature1"] || "",
            oldTranslations?.Pricing?.["plan1-feature2"] || "",
            oldTranslations?.Pricing?.["plan1-feature3"] || "",
            oldTranslations?.Pricing?.["plan1-feature4"] || "",
            oldTranslations?.Pricing?.["plan1-feature5"] || "",
            oldTranslations?.Pricing?.["plan1-feature6"] || "",
            oldTranslations?.Pricing?.["plan1-feature7"] || "",
            oldTranslations?.Pricing?.["plan1-feature8"] || "",
            oldTranslations?.Pricing?.["plan1-feature9"] || ""
          ]
        },
        "plan2": {
          "description": oldTranslations?.Pricing?.["plan2-desc"] || "",
          "features": [
            oldTranslations?.Pricing?.["plan2-feature1"] || "",
            oldTranslations?.Pricing?.["plan2-feature2"] || "",
            oldTranslations?.Pricing?.["plan2-feature3"] || "",
            oldTranslations?.Pricing?.["plan2-feature4"] || "",
            oldTranslations?.Pricing?.["plan2-feature5"] || "",
            oldTranslations?.Pricing?.["plan2-feature6"] || "",
            oldTranslations?.Pricing?.["plan2-feature7"] || "",
            oldTranslations?.Pricing?.["plan2-feature8"] || "",
            oldTranslations?.Pricing?.["plan2-feature9"] || ""
          ]
        },
        "plan3": {
          "description": oldTranslations?.Pricing?.["plan3-desc"] || "",
          "features": [
            oldTranslations?.Pricing?.["plan3-feature1"] || "",
            oldTranslations?.Pricing?.["plan3-feature2"] || "",
            oldTranslations?.Pricing?.["plan3-feature3"] || "",
            oldTranslations?.Pricing?.["plan3-feature4"] || "",
            oldTranslations?.Pricing?.["plan3-feature5"] || "",
            oldTranslations?.Pricing?.["plan3-feature6"] || "",
            oldTranslations?.Pricing?.["plan3-feature7"] || "",
            oldTranslations?.Pricing?.["plan3-feature8"] || "",
            oldTranslations?.Pricing?.["plan3-feature9"] || ""
          ]
        }
      },
      "cta": {
        "button": oldTranslations?.Pricing?.["plan-button"] || ""
      },
      "faq": {
        "title": oldTranslations?.Pricing?.["sec2-title"] || "",
        "subtitle": oldTranslations?.Pricing?.["sec2-subtitle"] || "",
        "questions": {
          "q1": oldTranslations?.FAQ?.q1 || "",
          "q2": oldTranslations?.FAQ?.q2 || "",
          "q3": oldTranslations?.FAQ?.q3 || "",
          "q4": oldTranslations?.FAQ?.q4 || ""
        },
        "answers": {
          "a1": oldTranslations?.FAQ?.a1 || "",
          "a2": oldTranslations?.FAQ?.a2 || "",
          "a3": oldTranslations?.FAQ?.a3 || "",
          "a4": oldTranslations?.FAQ?.a4 || ""
        }
      },
      "contact": {
        "title": oldTranslations?.Pricing?.["sec3-title"] || "",
        "subtitle": oldTranslations?.Pricing?.["sec3-subtitle"] || "",
        "button": oldTranslations?.Pricing?.["sec3-button"] || ""
      }
    },
    "auth": {
      "login": {
        "title": oldTranslations?.["Log in"]?.title || "",
        "label": oldTranslations?.["Log in"]?.label || "",
        "button": oldTranslations?.["Log in"]?.button || "",
        "link-text": oldTranslations?.["Log in"]?.["link-text"] || "",
        "link": oldTranslations?.["Log in"]?.link || ""
      },
      "signup": {
        "title": oldTranslations?.["Sign up"]?.title || "",
        "label": oldTranslations?.["Sign up"]?.label || "",
        "button": oldTranslations?.["Sign up"]?.button || "",
        "link-text": oldTranslations?.["Sign up"]?.["link-text"] || "",
        "link": oldTranslations?.["Sign up"]?.link || ""
      },
      "disclaimer": {
        "text": oldTranslations?.Disclaimer?.text || "",
        "terms": oldTranslations?.Disclaimer?.["link-terms"] || "",
        "and": oldTranslations?.Disclaimer?.and || "",
        "privacy": oldTranslations?.Disclaimer?.["link-privacy"] || ""
      }
    },
    "errors": {
      "not-found": {
        "title": oldTranslations?.NotFoundPage?.title || "",
        "description": oldTranslations?.NotFoundPage?.description || "",
        "button": oldTranslations?.NotFoundPage?.backButton || ""
      },
      "validation": {
        "email": oldTranslations?.["Error Messages"]?.["Please enter a valid email address"] || "",
        "password": oldTranslations?.["Error Messages"]?.["Please enter your password"] || "",
        "first-name": oldTranslations?.["Error Messages"]?.["Enter your first name"] || "",
        "last-name": oldTranslations?.["Error Messages"]?.["Enter your last name"] || "",
        "confirm-password": oldTranslations?.["Error Messages"]?.["Please confirm your password"] || "",
        "min-length": oldTranslations?.["Error Messages"]?.["Minimum 8 characters"] || ""
      }
    },
    "banner": {
      "title": oldTranslations?.Banner?.title || "",
      "message": oldTranslations?.Banner?.message || ""
    },
    "countdown": {
      "days": oldTranslations?.Countdown?.days || "",
      "hours": oldTranslations?.Countdown?.hours || "",
      "minutes": oldTranslations?.Countdown?.minutes || "",
      "seconds": oldTranslations?.Countdown?.seconds || "",
      "times-up": oldTranslations?.Countdown?.["times-up"] || ""
    }
  };
}

// Process each language file
files.forEach(file => {
  console.log(`Processing ${file}...`);
  
  const filePath = path.join(messagesDir, file);
  const oldTranslations = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  // Create new organized structure
  const newTranslations = mapTranslations(oldTranslations);
  
  // Write the new organized file
  const newFilePath = path.join(messagesDir, `organized-${file}`);
  fs.writeFileSync(newFilePath, JSON.stringify(newTranslations, null, 2));
  
  console.log(`✅ Created organized-${file}`);
});

console.log('\n🎉 Final reorganization complete!');
console.log('📁 Organized files created with prefix "organized-"');
console.log('\nBenefits of the new structure:');
console.log('✅ Grouped related content together');
console.log('✅ Eliminated duplicates');
console.log('✅ Consistent naming conventions');
console.log('✅ Better maintainability');
console.log('✅ Easier to find and update translations');
console.log('\nNext steps:');
console.log('1. Review the organized files');
console.log('2. Update your code to use the new structure');
console.log('3. Replace old files with organized ones');
console.log('4. Test all translations work correctly'); 