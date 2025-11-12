# Run the project locally (minimal steps)

This file contains the minimal, necessary steps for someone to add API keys and run the project locally.

1) Copy the example env file

   Open the project root and duplicate `.env.example` as `.env`.

   PowerShell:

   ```powershell
   cd "C:\Users\sanal\OneDrive\Desktop\chatbot"
   copy .env.example .env
   ```

2) Add the required API keys

   Edit `.env` and set these values (only the ones you need):

   - `PROVIDER` — `openai` or `groq` (set `openai` to use OpenAI)
   - `OPENAI_API_KEY` — your OpenAI key (if using `openai`)
   - `OPENAI_MODEL` — optional (e.g. `gpt-4o-mini`, `gpt-4o`, or `gpt-4.1`)
   - `USE_WEB_SEARCH` — `true` to enable web retrieval (optional)
   - `BING_API_KEY` — your Bing/ Azure Search key (only if `USE_WEB_SEARCH=true`)
   - `GROQ_API_KEY` — your Groq key (only if `PROVIDER=groq`)

   Save the file.

3) Install dependencies

   In PowerShell run:

   ```powershell
   npm install
   ```

4) Start the server

   ```powershell
   npm start
   ```

   If the server starts successfully it listens on the port in `.env` (default `5000`) and you can open the frontend `index.html` in your browser or use the API endpoints.

5) Quick manual test

   - Open `index.html` in a browser and send a message. The frontend will call `http://localhost:<PORT>/api/chat`.
   - Or run the small test script:

   ```powershell
   node test-api.js
   ```

6) Commit and push the change (example commands)

   ```powershell
   git add .env.example RUNNING_LOCALLY.md
   git commit -m "docs: add minimal run instructions"
   git push origin main
   ```

Notes
- Do NOT commit your real `.env` file with secrets. Only commit `.env.example` and documentation.
- If you prefer, set `PROVIDER=openai` and only add `OPENAI_API_KEY` and (optionally) `BING_API_KEY` for web search.

That's it — minimal steps to get the repository running locally and explain how to add keys safely.
