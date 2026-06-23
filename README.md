# 🤖 AI Watcher - Node.js

A simple Node.js application that watches a text file (`questions.txt`) and automatically replies to any new question using a free AI API (via FreeTheAI).

## 🚀 Features

- Watches a local `.txt` file for changes.
- Extracts the last user question (ignores AI replies).
- Sends the question to an AI model (GLM, Gemini, DeepSeek, etc.).
- Appends the AI reply back to the same file with a `$$` marker.
- Supports automatic retries (3 attempts) if the API fails.
- Prevents duplicate processing using `isProcessing` flag.

## 🛠️ How It Works

1. You write a question in `questions.txt` and save the file.
2. The app detects the change, reads the last line (ignoring previous AI replies).
3. It sends the question to the FreeTheAI API using a specified model.
4. The AI reply is appended to the file with the prefix `AI:` and a `$$` end marker.
5. The app ignores any lines ending with `$$` to avoid infinite loops.

## 📦 Setup & Run

### Option 1: Using the Self-Installer (Windows)
- Double-click `Run.bat` to automatically:
  - Install Node.js (if missing)
  - Install dependencies (`axios`, `dotenv`)
  - Start the application

### Option 2: Manual Setup
1. Install Node.js from [nodejs.org](https://nodejs.org).
2. Clone this repository:
   ```bash
   git clone https://github.com/HeroSam/ai-watcher.git
   cd ai-watcher
Install dependencies:

bash
npm install
Create a .env file with your FreeTheAI API key:

text
FREETHEAI_API_KEY=your_key_here
Run the app:

bash
node index.js
🔑 Getting a FreeTheAI API Key
Join the FreeTheAI Discord server: discord.gg/secrets

Run /signup to get your API key.

Run /checkin daily to activate it.

Copy the key into your .env file.

🧪 Tested AI Models
Model ID	Status	Notes
glm/glm-5.2	✅ Working	Zhipu AI (GLM) - Recommended
opc/deepseek-v4-flash-free	⚠️ Empty responses	DeepSeek (may need adjustment)
bbl/gemini-2.5-flash	❌ Unavailable	Returns "unknown aliased model"
bbl/gpt-5.5-mini	❌ Routed to Gemini	FreeTheAI redirects it
To change the model, edit aiService.js:

javascript
const MODEL = 'glm/glm-5.2'; // Change this line
📁 Project Structure
text
AI-watcher/
├── index.js          # Main entry point (watcher logic)
├── aiService.js      # AI API communication (with retries)
├── fileHandle.js     # File operations (read/write, watching)
├── Run.bat           # Self-installer for Windows
├── .env              # API key (ignored by Git)
├── .gitignore        # Ignores node_modules/, .env
├── package.json      # Dependencies and scripts
└── questions.txt     # Auto-created file for questions/replies
🧠 Architecture Diagram
text
[User writes question in questions.txt]
         ↓
[fs.watch detects file change]
         ↓
[getLastUserQuestion() ignores AI lines & $$]
         ↓
[askAI() sends to FreeTheAI API with retries]
         ↓
[appendReply() writes AI: answer $$]
         ↓
[Back to watching...]
🛡️ Security Notes
The .env file is ignored by Git (via .gitignore).

Never share your API key publicly.

Use FREETHEAI_API_KEY as the environment variable name.

🤝 Contributing
Feel free to fork this repo, open issues, or submit pull requests!

📄 License
MIT — use it however you like.

Made with ❤️ by Bassam