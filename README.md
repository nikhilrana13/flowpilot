# 🚀 FlowPilot

FlowPilot is an AI-powered workflow automation platform that enables developers to visually build, execute, and monitor API-driven workflows using a drag-and-drop interface.

Instead of writing complex backend automation logic, developers can create reusable workflows, publish them as webhooks, and integrate them into any application with a single API call.

Inspired by tools like n8n and Zapier, FlowPilot focuses on simplicity, developer experience, and AI-powered automation.

---

## ✨ Features

### 🎨 Workflow Builder

- Drag & Drop Visual Workflow Builder
- Manual Trigger
- Webhook Trigger
- HTTP Request Node
- Gemini AI Node
- Response Node

### ⚡ Workflow Execution

- Real-Time Execution Progress
- Live Node Status
- Execution Timeline
- Execution Duration
- Success & Failed States
- Detailed Execution Logs
- Node Output Inspector

### 🚀 Platform

- Workspace Management
- JWT Authentication
- Real-Time Updates using Socket.io
- Responsive Dashboard
- Docker Support

---

## 💡 Example Workflow

```text
Webhook Trigger
        │
        ▼
HTTP Request
        │
        ▼
Gemini AI
        │
        ▼
Response
```

---

## 🌐 Webhook Integration

Every published workflow generates a unique webhook endpoint.

Applications can trigger workflows without implementing the automation logic inside their backend.

### Request

```http
POST /api/webhook/{workflowId}
```

```json
{
  "city": "Mohali"
}
```

### Response

```json
{
  "current_weather_summary": "...",
  "clothing_recommendation": "...",
  "carry_umbrella": false
}
```

This allows developers to integrate AI-powered workflows into any application with a simple HTTP request.

---

## 📌 Supported Nodes

- Manual Trigger
- Webhook Trigger
- HTTP Request
- Gemini AI
- Response

More workflow nodes coming soon.

---

## 📊 Execution Monitoring

Each workflow execution provides:

- Live execution progress
- Node execution status
- Execution duration
- Detailed logs
- Node outputs
- Error tracking
- Execution timeline

---

## 🛠 Tech Stack

### Frontend

- Next.js
- React
- React Flow
- Tailwind CSS
- Redux Toolkit
- RTK Query
- React Hook Form
- Socket.io Client

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.io
- JWT Authentication
- Gemini API

---

## 💼 Use Cases

FlowPilot can be used to build automations such as:

- 🌦 Weather Assistant
- 🤖 AI Content Generator
- 📄 Resume Analyzer
- 📧 Email Summarizer
- 🛍 Product Recommendation
- 📑 Invoice Processing
- 💬 Customer Support Automation
- 🔄 Data Transformation APIs

---


## 🚀 Getting Started

### Clone Repository

```bash
git clone https://github.com/your-username/FlowPilot.git
```

---

### Install Backend

```bash
cd backend
npm install
npm run dev
```

---

### Install Frontend

```bash
cd frontend
npm install
npm run dev --webpack
```

---

## 🐳 Docker

```bash
docker compose up --build
```

---

## 🌍 Environment Variables

### Backend

```env
PORT=
MONGO_URI=
JWT_SECRET=
GEMINI_API_KEY=
FRONTEND_URL=
```

### Frontend

```env
NEXT_PUBLIC_BACKEND_URL=
```

---

## 📈 Roadmap

- Google Sheets Integration
- Scheduler Trigger
- Delay Node
- Conditional Node
- Variables
- Loop Node
- Email Automation
- Slack Integration
- Discord Integration
- Workflow Templates
- Multi-user Collaboration

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

Feel free to fork the repository and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

## ⭐ Why FlowPilot?

FlowPilot helps developers automate backend workflows without writing repetitive automation logic. Design workflows visually, expose them through webhooks, integrate them into any application, and monitor every execution in real time.

---

Made with ❤️ using Next.js, Node.js, Express.js, MongoDB, Socket.io, and Gemini AI.
