"use client";

import { useEffect, useState } from "react";
import useUpdateNodeData from "@/hooks/useUpdateNodedata";

const HttpForm = ({ node }) => {
  const updateNodeData = useUpdateNodeData();

  const [headers, setHeaders] = useState("");
  const [query, setQuery] = useState("");
  const [body, setBody] = useState("");

  const [headerError, setHeaderError] = useState("");
  const [queryError, setQueryError] = useState("");
  const [bodyError, setBodyError] = useState("");

  useEffect(() => {
    setHeaders(JSON.stringify(node?.data?.headers || {}, null, 2));
    setQuery(JSON.stringify(node?.data?.query || {}, null, 2));
    setBody(JSON.stringify(node?.data?.body || {}, null, 2));

    setHeaderError("");
    setQueryError("");
    setBodyError("");
  }, [node?.id]);

  console.log("node",node)
  return (
    <div className="space-y-6 p-5">

      {/* Heading */}
      <div>
        <h2 className="text-lg font-semibold text-white">
          HTTP Request
        </h2>

        <p className="mt-1 text-sm text-[#A1A1AA]">
          Configure this HTTP request node.
        </p>
      </div>

      {/* Node Name */}
      <div>
        <label className="mb-2 block text-sm font-medium text-white">
          Node Name
        </label>

        <input
          type="text"
          value={node?.data?.label || ""}
          onChange={(e) =>
            updateNodeData(node.id, {
              label: e.target.value,
            })
          }
          placeholder="GitHub API"
          className="h-11 w-full rounded-xl border border-[#27272A] bg-[#111114] px-4 text-white outline-none transition focus:border-[#7C3AED]"
        />
      </div>

      {/* HTTP Method */}
      <div>
        <label className="mb-2 block text-sm font-medium text-white">
          HTTP Method
        </label>
        <select
          value={node?.data?.method || "GET"}
          onChange={(e) =>
            updateNodeData(node.id, {
              method: e.target.value,
            })
          }
          className="h-11 w-full rounded-xl border border-[#27272A] bg-[#111114] px-4 text-white outline-none transition focus:border-[#7C3AED]"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="PATCH">PATCH</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>

      {/* URL */}
      <div>
        <label className="mb-2 block text-sm font-medium text-white">
          Request URL
        </label>
        <input
          type="url"
          value={node?.data?.url || ""}
          placeholder="https://api.example.com/users"
          onChange={(e) =>
            updateNodeData(node.id, {
              url: e.target.value,
            })
          }
          className="h-11 w-full rounded-xl border border-[#27272A] bg-[#111114] px-4 text-white outline-none transition focus:border-[#7C3AED]"
        />
      </div>

      {/* Headers */}
      <div>
        <label className="mb-2 block text-sm font-medium text-white">
          Headers (JSON)
        </label>

        <textarea
          rows={5}
          value={headers}
          onChange={(e) => {
            const value = e.target.value;

            setHeaders(value);

            try {
              updateNodeData(node.id, {
                headers: JSON.parse(value),
              });

              setHeaderError("");
            } catch {
              setHeaderError("Invalid JSON. Please check commas, quotes and brackets.");
            }
          }}
          placeholder={`{
               "Authorization": "Bearer YOUR_TOKEN",
                "Content-Type": "application/json"
               }`}
          className="w-full resize-none rounded-xl border border-[#27272A] bg-[#111114] p-4 font-mono text-sm text-white outline-none transition focus:border-[#7C3AED]"
        />

        {headerError && (
          <p className="mt-2 text-xs text-red-500">
            {headerError}
          </p>
        )}
      </div>

      {/* Query */}
      <div>
        <label className="mb-2 block text-sm font-medium text-white">
          Query Parameters (JSON)
        </label>

        <textarea
          rows={5}
          value={query}
          onChange={(e) => {
            const value = e.target.value;

            setQuery(value);

            try {
              updateNodeData(node.id, {
                query: JSON.parse(value),
              });

              setQueryError("");
            } catch {
              setQueryError("Invalid JSON. Please check commas, quotes and brackets.");
            }
          }}
          placeholder={`
          {
            "page": 1,
           "limit": 10
           }`}
          className="w-full resize-none rounded-xl border border-[#27272A] bg-[#111114] p-4 font-mono text-sm text-white outline-none transition focus:border-[#7C3AED]"
        />

        {queryError && (
          <p className="mt-2 text-xs text-red-500">
            {queryError}
          </p>
        )}
      </div>

      {/* Body */}
      {["POST", "PUT", "PATCH"].includes(node?.data?.method) && (
        <div>
          <label className="mb-2 block text-sm font-medium text-white">
            Request Body (JSON)
          </label>

          <textarea
            rows={6}
            value={body}
            onChange={(e) => {
              const value = e.target.value;

              setBody(value);

              try {
                updateNodeData(node.id, {
                  body: JSON.parse(value),
                });

                setBodyError("");
              } catch {
                setBodyError("Invalid JSON. Please check commas, quotes and brackets.");
              }
            }}
            placeholder={`{\n  "name":"John Doe"\n}`}
            className="w-full resize-none rounded-xl border border-[#27272A] bg-[#111114] p-4 font-mono text-sm text-white outline-none transition focus:border-[#7C3AED]"
          />

          {bodyError && (
            <p className="mt-2 text-xs text-red-500">
              {bodyError}
            </p>
          )}
        </div>
      )}
      {/* Info */}
      <div className="rounded-xl border border-[#0566D9]/20 bg-[#0566D9]/10 p-4">
        <p className="text-sm leading-6 text-[#BFDBFE]">
          Configure your HTTP request using JSON. Changes are applied to the
          workflow immediately. Invalid JSON will not be saved until corrected.
        </p>
      </div>

    </div>
  );
};

export default HttpForm;