import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Rocket,
  Webhook,
  Workflow,
  Bot,
  Code2,
  Box,
  ArrowRight,
} from "lucide-react";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";

const sections = [
  "Getting Started",
  "Workflow Builder",
  "Webhook",
  "Execution",
  "API",
];

const page = () => {
  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-[#09090B] text-white">
      {/* Hero */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="inline-flex items-center rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
            <BookOpen className="mr-2 h-4 w-4" />
            FlowPilot Documentation
          </div>

          <h1 className="mt-6 text-5xl font-bold leading-tight">
            Build Workflow
            <span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
              {" "}
              Automations
            </span>{" "}
            Visually.
          </h1>

          <p className="mt-6 max-w-2xl text-zinc-400 text-lg">
            Learn how to build workflows, trigger them using webhooks, integrate
            AI, and monitor executions in real-time.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              href="#getting-started"
              className="rounded-xl bg-violet-600 px-6 py-3 font-medium hover:bg-violet-500"
            >
              Get Started
            </Link>

            <Link
              href="#api"
              className="rounded-xl border border-white/10 px-6 py-3 hover:bg-white/5"
            >
              API Reference
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto flex max-w-7xl">
        {/* Sidebar */}

        <aside className="sticky top-0 hidden h-screen w-64 border-r border-white/10 p-6 lg:block">
          <p className="mb-6 font-semibold text-zinc-400">Documentation</p>

          <nav className="space-y-2">
            {sections.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                className="block rounded-lg px-3 py-2 text-zinc-400 transition hover:bg-white/5 hover:text-white"
              >
                {item}
              </a>
            ))}
          </nav>
        </aside>

        {/* Content */}

        <main className="flex-1 px-6 py-12 space-y-16">
          {/* Cards */}

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <Card
              icon={<Rocket />}
              title="Quick Start"
              desc="Build your first workflow in minutes."
            />

            <Card
              icon={<Webhook />}
              title="Webhooks"
              desc="Trigger workflows from any application."
            />

            <Card
              icon={<Bot />}
              title="Gemini AI"
              desc="Generate AI-powered responses."
            />

            <Card
              icon={<Code2 />}
              title="API Reference"
              desc="Complete REST API documentation."
            />
          </div>

          {/* Getting Started */}

          <section id="getting-started">
            <h2 className="text-3xl font-bold">Getting Started</h2>

            <p className="mt-4 text-zinc-400">
              FlowPilot lets you visually build API workflows using
              drag-and-drop nodes and expose them as webhooks.
            </p>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="space-y-4">
                <Step number="1" text="Create a Workspace" />
                <Step number="2" text="Create a Workflow" />
                <Step number="3" text="Connect Workflow Nodes" />
                <Step number="4" text="Publish Workflow" />
                <Step number="5" text="Use the Generated Webhook URL" />
              </div>
            </div>
          </section>

          {/* Workflow */}

          <section id="workflow-builder">
            <h2 className="text-3xl font-bold">Workflow Builder</h2>
            <div className="mt-8 rounded-2xl border border-white/10 bg-[#111113] p-8">
              <div className="flex flex-col items-center gap-5">
                <Node title="Webhook Trigger" />
                ↓
                <Node title="HTTP Request" />
                ↓
                <Node title="Gemini AI" />
                ↓
                <Node title="Response" />
              </div>
            </div>
          </section>
          {/* Webhook */}
          <section id="webhook">
            <h2 className="text-3xl font-bold">Webhook</h2>

            <p className="mt-4 text-zinc-400">
              Every published workflow generates a unique webhook URL. Send an
              HTTP request to this endpoint to trigger the workflow.
            </p>

            <Code
              title="Webhook Endpoint"
              code={`POST https://your-flowpilot-domain.com/api/webhooks/{webhookId}`}
            />

            <div className="mt-6">
              <h3 className="text-lg font-semibold">Example Request</h3>

              <Code
                title="Request Body"
                code={`{
  "key": "value"
}`}
              />
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold">Example Response</h3>

              <Code
                title="Response"
                code={`{
  "success": true,
  "data": {
    "...": "Workflow Output"
  }
}`}
              />
            </div>
          </section>

          {/* API */}
          <section id="api">
            <h2 className="text-3xl font-bold">Using Your Workflow</h2>

            <p className="mt-4 text-zinc-400">
              Once your workflow is published, FlowPilot generates a unique
              webhook URL. Send an HTTP request to this endpoint to execute the
              workflow from any application.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-[#111113] p-6">
                <h3 className="font-semibold text-lg">1. Publish Workflow</h3>

                <p className="mt-2 text-sm text-zinc-400">
                  Publish your workflow to generate a webhook endpoint.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#111113] p-6">
                <h3 className="font-semibold text-lg">2. Copy Webhook URL</h3>

                <p className="mt-2 text-sm text-zinc-400">
                  Copy the generated webhook URL from the workflow settings.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#111113] p-6">
                <h3 className="font-semibold text-lg">3. Send HTTP Request</h3>

                <p className="mt-2 text-sm text-zinc-400">
                  Trigger the workflow from your application using any HTTP
                  client.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
    <Footer />
    </>
    
  );
};

export default page;

function Card({ icon, title, desc }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#111113] p-6 hover:border-violet-500/40 transition">
      <div className="text-violet-400">{icon}</div>

      <h3 className="mt-5 text-lg font-semibold">{title}</h3>

      <p className="mt-2 text-sm text-zinc-400">{desc}</p>
    </div>
  );
}

function Step({ number, text }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-600 font-bold">
        {number}
      </div>

      <span>{text}</span>
    </div>
  );
}

function Node({ title }) {
  return (
    <div className="rounded-xl border border-violet-500/30 bg-violet-500/10 px-8 py-4">
      {title}
    </div>
  );
}

function Code({ title, code }) {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
      <div className="border-b border-white/10 bg-[#18181B] px-5 py-3 text-sm text-zinc-400">
        {title}
      </div>

      <pre className="overflow-x-auto bg-[#0F0F10] p-5 text-sm text-green-400">
        <code>{code}</code>
      </pre>
    </div>
  );
}
