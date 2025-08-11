import { useEffect, useState } from "react";
import axios from "axios";
// import PromptList from "../components/PromptList";

// Define Prompt type according to your backend model
interface Prompt {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  visibility: string;
  author: string | { name: string; email: string };
  upvotes: number;
  downvotes: number;
  createdAt: string;
}

export default function Community() {
  // const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [tag, setTag] = useState<string>("");

  useEffect(() => {
    fetchCommunity();
  }, [tag]);

  async function fetchCommunity() {
    const res = await axios.get<Prompt[]>("http://localhost:3000/api/prompts/community");
    console.log("Fetched community prompts:", res);
    // setPrompts(res?.data || []);
  }

  // async function handleVote(id: string, vote: "up" | "down") {
  //   const res = await axios
  //     .post(`/api/prompts/${id}/vote`, { vote })
  //     .catch(() => null);
  //   if (res?.data) {
  //     setPrompts((prev) => prev.map((p) => (p._id === id ? res.data : p)));
  //   }
  // }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-xl font-bold text-teal-400">Community Vault</h1>
      <div className="flex gap-3">
        <input
          placeholder="Filter by tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="border p-2 rounded border-teal-400 text-teal-400 placeholder:text-teal-200 focus:border-teal-700 active:text-teal-700 "
        />
        <button onClick={fetchCommunity} className="px-3 py-1 border rounded border-teal-400 text-teal-400 focus:border-teal-700 active:text-teal-700 hover:text-teal-500">
          Apply
        </button>
      </div>
      {/* <PromptList prompts={prompts} onVote={handleVote} /> */}
    </div>
  );
}
