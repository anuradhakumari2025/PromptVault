import { useState } from "react";
import axios from "axios";

interface Prompt {
  _id: string;
  title: string;
  content: string;
  visibility: string;
  author?: {
    name: string;
    email: string;
  };
}

interface PromptEditorProps {
  onSaved?: (prompt: Prompt) => void;
  defaultAuthor?: string;
}

export default function PromptEditor({
  onSaved,
  defaultAuthor = "anon",
}: PromptEditorProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState("personal");
  const [useAi, setUseAi] = useState(true);

  async function handleSave() {
    const payload = {
      title,
      content,
      visibility,
      authorId: defaultAuthor,
      useAiTagging: useAi,
    };
    try {
      const res = await axios.post<Prompt>("/api/prompts", payload);
      if (res?.data) {
        setTitle("");
        setContent("");
        if (onSaved) onSaved(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <input
        className="w-full border rounded p-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full border rounded p-2 mt-3"
        rows={6}
        placeholder="Write prompt..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="mt-3 flex gap-3 items-center">
        <select
          className="border p-1 rounded"
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
        >
          <option value="personal">Personal</option>
          <option value="community">Community</option>
        </select>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={useAi}
            onChange={(e) => setUseAi(e.target.checked)}
          />
          Auto-tag (Gemini)
        </label>
        <button
          onClick={handleSave}
          className="ml-auto bg-blue-600 text-white px-3 py-1 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
}
