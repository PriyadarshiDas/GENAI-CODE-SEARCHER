import requests
import os
from github import Github
import re
from itertools import islice

# Configure GitHub token here or via environment variable
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN", "")
OLLAMA_URL = "http://localhost:11434/api/generate"

print("Using GitHub token:", GITHUB_TOKEN)

# Initialize GitHub client
if GITHUB_TOKEN:
    g = Github(GITHUB_TOKEN)
else:
    g = Github()

def query_ollama(prompt):
    payload = {
        "model": "mistral",
        "prompt": prompt,
        "stream": False
    }
    response = requests.post(OLLAMA_URL, json=payload)
    response.raise_for_status()
    return response.json().get("response", "")

def github_code_search(query):
    # GitHub code search query must not exceed 400 characters
    query = query.strip()
    if len(query) > 400:
        query = query[:400]
    results = g.search_code(query)
    code_snippets = []
    # Use islice to safely limit to top 3 results
    for file in islice(results, 3):
        snippet = {
            "name": file.name,
            "path": file.path,
            "repository": file.repository.full_name,
            "html_url": file.html_url,
            "text_matches": getattr(file, 'text_matches', None)
        }
        code_snippets.append(snippet)
    return code_snippets

def extract_github_query(response):
    code_block = re.search(r"```(?:\w+)?\n(.*?)```", response, re.DOTALL)
    if code_block:
        return code_block.group(1).strip()
    # Remove any leading/trailing whitespace and explanations
    lines = response.strip().splitlines()
    # Try to find the first non-empty line that looks like a query
    for line in lines:
        if line.strip() and not line.strip().startswith("#"):
            return line.strip()
    return response.strip()

def run_code_search(user_query):
    # Use Ollama/Mistral to refine the query
    refined_query = query_ollama(f"Refine this code search query for GitHub: {user_query}")
    # Extract only the valid query
    clean_query = extract_github_query(refined_query)
    # Search GitHub
    results = github_code_search(clean_query)
    return results 
