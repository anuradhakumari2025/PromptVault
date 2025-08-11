import PromptCard from "./PromptCard";

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

interface PromptListProps {
  prompts: Prompt[];
  onVote: (id: string, vote: "up" | "down") => void;
}

export default function PromptList({ prompts, onVote }: PromptListProps) {
  if (!prompts?.length)
    return <div className="text-gray-500">No prompts yet.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* {prompts && prompts?.map(p => <PromptCard key={p._id} prompt={p} onVote={onVote} />)} */}
      <h1>kdjflskd</h1>
    </div>
  );
}
