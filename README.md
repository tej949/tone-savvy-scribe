✨ CultureCraft is an AI system that rewrites emails to match different cultural business norms (British, American, Japanese, etc.).
It analyzes the original message, detects potential cross-cultural misunderstandings, and transforms it using culturally appropriate formality, greetings, phrasing, and industry-specific language.
The system is document-aware (CV vs. resume, contract vs. memo) and helps non-native speakers avoid tone-related mistakes that could cost job opportunities — while saving the 2.3 hours/week usually spent manually rewording emails.

🌟 Key Features
🎭 Cultural Tone Transformation: Convert messages between 8+ business norms (British formal, American direct, Japanese keigo, and more)
📄 Document-Aware Rewriting: Detects and adjusts tone based on document type (e.g., CV, informal note, contract)
🧠 Industry-Specific Language: Supports domain-specific tone and terminology
🛡️ Tone Guard: Flags culturally inappropriate or offensive expressions
⏱️ Time Saver: Reduces editing time from hours to minutes
🧰 Tech Stack

Layer	Technology
Frontend	React + Vite + TypeScript
UI	shadcn-ui + Tailwind CSS
AI Engine	Google Gemini 2.0 Flash API
Hosting	Lovable (with custom domain support)

⚙️ Getting Started
1. Clone the Repository
git clone https://github.com/yourusername/culturecraft.git
cd culturecraft

3. Configure Environment Variables
Create a .env file in the root:
VITE_GEMINI_API_KEY=your_api_key_here
VITE_GEMINI_ENDPOINT=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent

3. Install Dependencies & Run Locally
npm install
npm run dev

🔍 How It Works
sequenceDiagram
    User->>UI: Inputs email + selects target culture
    UI->>Gemini API: Sends culturally structured prompt
    Gemini API->>Backend: Returns adapted content
    Backend->>UI: Renders comparison view
    UI->>User: Displays tone analysis and suggestions
    
🧠 Core AI Logic
✨ Prompt Engineering
const generatePrompt = (text: string, culture: Culture) => `
Rewrite this email for ${culture.name} business norms:
- Formality level: ${culture.formality}/10
- Required phrases: ${culture.requiredPhrases}
- Taboo expressions: ${culture.taboos}
- Document type: ${detectDocumentType(text)}

Special rules:
${culture.specialRules}

Original text:
"""
${text}
"""
`;
🖼 UI Preview
✨ Cultural Adaptation Interface
🔍 Comparison View: Original vs Adapted email
📱 Fully responsive and mobile-ready
DASHBOARD
![Screenshot (232)](https://github.com/user-attachments/assets/bee6bbc8-10e9-4b51-bf6b-9bddc4457f4d)
RESULT1
![Screenshot (233)](https://github.com/user-attachments/assets/09549625-4267-481f-a5da-ad24534a6792)
RESULT2
![Screenshot (234)](https://github.com/user-attachments/assets/6e60e328-54b3-456d-9837-92be23bb2ac7)

🚀 Deployment
Push updates to the main branch
In the Lovable dashboard:
Click Share → Publish
(Optional) Connect your custom domain

🛠 Development Guide
🧩 Adding New Cultures
To support a new culture or business style, update src/lib/cultures.ts:
export const cultures = {
  'en-GB': {
    name: 'British Formal',
    formality: 9,
    taboos: ['ASAP', 'Hey'],
    specialRules: 'Use passive voice, hedge statements'
  },
  'ja-JP': {
    name: 'Japanese Keigo',
    formality: 10,
    requiredPhrases: '恐れ入りますが (I humbly apologize)'
  }
};
🤝 Contributing
We welcome cultural experts, devs, and designers!
Fork the repo
Add or improve culture definitions in src/lib/cultures.ts
Test changes:
npm run test
Submit a pull request with example inputs + before/after output

📄 License
MIT License © 2024 VALLEM TEJOMAI

🧩 Bonus: GitHub Templates
.github/ISSUE_TEMPLATE.md
---
name: Feature Request
about: Suggest a new culture or enhancement
title: '[FEATURE]'
labels: enhancement
---

**Which culture would you like to add?**
- [ ] German
- [ ] French
- [ ] Arabic
- [ ] Other (please specify)

**Additional context**
Describe the specific business tone, norms, or phrases expected.
CONTRIBUTING.md
# Contribution Guide

Thanks for improving CultureCraft!
