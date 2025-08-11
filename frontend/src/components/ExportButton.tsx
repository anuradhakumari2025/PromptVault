import axios from "axios";
import { useState } from "react";

interface ExportButtonProps {
  author: string;
}

export default function ExportButton({ author }: ExportButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleExport(format = "json") {
    setLoading(true);
    try {
      const res = await axios.post(
        "/api/prompts/export",
        { author, format },
        { responseType: format === "pdf" ? "blob" : "json" }
      );
      if (format === "json") {
        const blob = new Blob([JSON.stringify(res.data, null, 2)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "prompts.json";
        a.click();
      } else if (format === "pdf") {
        const blob = new Blob([res.data], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "prompts.pdf";
        a.click();
      }
    } catch (err) {
      console.error(err);
      alert("Export failed");
    }
    setLoading(false);
  }

  return (
    <div className="flex gap-2">
      <button
        disabled={loading}
        onClick={() => handleExport("json")}
        className="px-3 py-1 border rounded"
      >
        Export JSON
      </button>
      <button
        disabled={loading}
        onClick={() => handleExport("pdf")}
        className="px-3 py-1 border rounded"
      >
        Export PDF
      </button>
    </div>
  );
}
