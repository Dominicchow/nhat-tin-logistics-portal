# Figma MCP Integration Guide

This project is configured to work with the **Model Context Protocol (MCP)** for Figma. This allows AI agents to read your designs and help you build components faster.

## 1. Environment Variable
The Figma access token is stored in `.env`:
`VITE_FIGMA_ACCESS_TOKEN=your_token_here`

## 2. Using with Claude Desktop (Recommended)
Add the following to your Claude Desktop configuration (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-figma"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "YOUR_FIGMA_TOKEN_HERE"
      }
    }
  }
}
```

## 3. Developer Usage
To fetch design data within the project, you can use the Figma REST API. 
The token is available via `import.meta.env.VITE_FIGMA_ACCESS_TOKEN`.

### Example API Call:
```javascript
const response = await fetch(`https://api.figma.com/v1/files/${FILE_KEY}`, {
  headers: {
    'X-Figma-Token': import.meta.env.VITE_FIGMA_ACCESS_TOKEN
  }
});
```
