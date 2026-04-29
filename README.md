## Setup Instructions

1. Install Node.js on your system  
2. Install Ollama from the official website  
3. Start Ollama and download a model (e.g., llama3.2)  
4. Open terminal in the project folder  
5. Install dependencies  
6. Start the backend server  
7. Open the application in browser at localhost  
8. Paste a transcript and run analysis  

---

## Ollama Model Used

I used the **llama3.2** model.

Reason:
- Lightweight and runs smoothly on local machine  
- Fast enough for real-time response  
- Good balance between performance and resource usage  

---

## Architecture Overview

The system consists of a simple frontend and backend connected to a local AI model.

- The frontend provides a textbox where the user pastes a transcript and triggers analysis  
- The backend (Node.js + Express) receives the transcript and sends it to Ollama  
- Ollama processes the input using an LLM and returns structured output  
- The backend parses and sends the result back to the frontend  
- The frontend displays the structured report  

Flow:
User → Frontend → Backend → Ollama → Backend → Frontend  

---

## Design Challenges Tackled

### 1. Structured Output Reliability
Problem:
- The LLM often returned unstructured text instead of JSON  

Solution:
- Enforced strict JSON-only output in prompt  
- Added parsing logic to extract valid JSON  
- Implemented fallback handling when output is invalid  

---

### 2. 6 vs 7 Scoring Boundary
Problem:
- Model tended to over-score based on positive tone  

Solution:
- Explicitly defined rule in prompt:
  - 6 = task execution  
  - 7 = independent problem identification  
- Used this to prevent incorrect scoring  

---

## Improvements (With More Time)

- Add a side-by-side view of transcript and analysis for better usability  
- Highlight evidence directly inside the transcript  
- Add confidence score to each output section  
- Improve UI by separating sections instead of showing raw JSON  
- Add retry button when AI output fails  
- Improve gap detection using multiple prompt calls  
