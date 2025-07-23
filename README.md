# GenAI Code Search

A futuristic, GenAI-inspired app to search for code on GitHub using natural language, powered by CrewAI, Ollama (Mistral), and a beautiful React frontend.

## Features
- Natural language code search
- Local LLM (Mistral via Ollama)
- GitHub code search integration
- Futuristic, GenAI-inspired UI
- 100% open source and secure

---

## Prerequisites
- Python 3.8+
- Node.js 16+
- [Ollama](https://ollama.com/) with Mistral model installed (`ollama run mistral`)
- (Optional) GitHub personal access token for higher rate limits

---

## Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Set your GitHub token (optional, for higher rate limits)
set GITHUB_TOKEN=your_token_here  # On Windows
export GITHUB_TOKEN=your_token_here  # On Linux/Mac

# Start FastAPI server
uvicorn main:app --reload
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## Usage
1. Start Ollama with the Mistral model: `ollama run mistral`
2. Start the backend and frontend as above
3. Open the frontend in your browser (usually at http://localhost:3000)
4. Enter a code request (e.g., "python function to reverse a linked list")
5. View code results from GitHub, powered by GenAI!

---

## Security & Privacy
- All LLM inference is local (Ollama)
- No user data leaves your machine
- 100% open source stack

---

## License
MIT 