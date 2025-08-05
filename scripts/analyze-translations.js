const fs = require('fs');
const path = require('path');

// Read all translation files
const messagesDir = path.join(__dirname, '../messages');
const files = ['en.json', 'sl.json', 'it.json', 'ru.json'];

const translations = {};
const allKeys = new Set();
const duplicates = {};
const missingTranslations = {};

// Read all files
files.forEach(file => {
  const filePath = path.join(messagesDir, file);
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  translations[file] = content;
  
  // Collect all keys
  const collectKeys = (obj, prefix = '') => {
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (typeof value === 'object' && value !== null) {
        collectKeys(value, fullKey);
      } else {
        allKeys.add(fullKey);
      }
    }
  };
  
  collectKeys(content);
});

// Find duplicates within each file
files.forEach(file => {
  const content = translations[file];
  const seen = new Set();
  const fileDuplicates = [];
  
  const findDuplicates = (obj, prefix = '') => {
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (typeof value === 'object' && value !== null) {
        findDuplicates(value, fullKey);
      } else {
        if (seen.has(value)) {
          fileDuplicates.push({ key: fullKey, value });
        } else {
          seen.add(value);
        }
      }
    }
  };
  
  findDuplicates(content);
  if (fileDuplicates.length > 0) {
    duplicates[file] = fileDuplicates;
  }
});

// Find missing translations
allKeys.forEach(key => {
  const missing = [];
  files.forEach(file => {
    const keys = key.split('.');
    let value = translations[file];
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        missing.push(file);
        break;
      }
    }
  });
  
  if (missing.length > 0) {
    missingTranslations[key] = missing;
  }
});

// Find structural inconsistencies
const structuralIssues = {};
files.forEach(file => {
  const content = translations[file];
  const structure = {};
  
  const analyzeStructure = (obj, prefix = '') => {
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (typeof value === 'object' && value !== null) {
        structure[fullKey] = 'object';
        analyzeStructure(value, fullKey);
      } else {
        structure[fullKey] = typeof value;
      }
    }
  };
  
  analyzeStructure(content);
  structuralIssues[file] = structure;
});

// Generate report
console.log('=== TRANSLATION ANALYSIS REPORT ===\n');

console.log('1. DUPLICATES FOUND:');
if (Object.keys(duplicates).length === 0) {
  console.log('✅ No duplicates found within individual files');
} else {
  Object.entries(duplicates).forEach(([file, dups]) => {
    console.log(`\n📁 ${file}:`);
    dups.forEach(dup => {
      console.log(`   - "${dup.key}": "${dup.value}"`);
    });
  });
}

console.log('\n2. MISSING TRANSLATIONS:');
if (Object.keys(missingTranslations).length === 0) {
  console.log('✅ All files have complete translations');
} else {
  Object.entries(missingTranslations).forEach(([key, missingFiles]) => {
    console.log(`\n🔑 ${key}:`);
    missingFiles.forEach(file => {
      console.log(`   - Missing in ${file}`);
    });
  });
}

console.log('\n3. STRUCTURAL ANALYSIS:');
const allStructures = Object.values(structuralIssues);
const baseStructure = allStructures[0];
let structuralConsistent = true;

Object.entries(baseStructure).forEach(([key, type]) => {
  allStructures.forEach((structure, index) => {
    if (structure[key] !== type) {
      console.log(`⚠️  Inconsistent type for "${key}": ${files[0]} has ${type}, ${files[index]} has ${structure[key]}`);
      structuralConsistent = false;
    }
  });
});

if (structuralConsistent) {
  console.log('✅ All files have consistent structure');
}

console.log('\n4. RECOMMENDATIONS:');
console.log('- Group common UI elements (buttons, forms, navigation)');
console.log('- Separate content sections (homepage, about, pricing)');
console.log('- Create shared components for repeated elements');
console.log('- Standardize naming conventions');
console.log('- Add validation for missing translations');

// Save detailed report
const report = {
  duplicates,
  missingTranslations,
  structuralIssues,
  recommendations: [
    'Group common UI elements (buttons, forms, navigation)',
    'Separate content sections (homepage, about, pricing)',
    'Create shared components for repeated elements',
    'Standardize naming conventions',
    'Add validation for missing translations'
  ]
};

fs.writeFileSync(
  path.join(__dirname, 'translation-analysis-report.json'),
  JSON.stringify(report, null, 2)
);

console.log('\n📄 Detailed report saved to: scripts/translation-analysis-report.json'); 