import { useEffect } from "react";
import axios from "axios";
import ExportButton from "../components/ExportButton";
// import PromptEditor from "../components/PromptEditor";
// import PromptList from "../components/PromptList";

// Prompt ka type define karo
// interface Prompt {
//   _id: string;
//   title?: string;
//   content?: string;
//   tag?: string;
//   votes?: number;
//   author?: string;
// }

export default function Dashboard() {
  const author = "anon"; // replace with logged-in user's id later
  // const [prompts, setPrompts] = useState<Prompt[]>([]);

  useEffect(() => {
    fetchPrompts();
  }, []);

  async function fetchPrompts() {
    const res = await axios
      .get("/api/prompts/personal", { params: { author } })
      .catch(() => null);
    console.log("Fetched prompts:", res?.data);
    // setPrompts(res?.data || []);
  }

  // async function handleVote(id: string, vote: "up" | "down") {
  //   const res = await axios.post<Prompt>(`/api/prompts/${id}/vote`, { vote });
  //   if (res?.data) {
  //     setPrompts((prev) => prev.map((p) => (p._id === id ? res.data : p)));
  //   }
  // }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">My Vault</h1>
        <ExportButton author={author} />
      </div>
      {/* <PromptEditor
        onSaved={(p: Prompt) => setPrompts((prev) => [p, ...prev])}
        defaultAuthorId={author}
      /> */}
      {/* <PromptList prompts={prompts} onVote={handleVote} /> */}
    </div>
  );
}
