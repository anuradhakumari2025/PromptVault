
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


interface PromptCardProps {
  prompt: Prompt;
  onVote: (id: string, vote: 'up' | 'down') => void;
}

export default function PromptCard({ prompt, onVote }:PromptCardProps) {
  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h3 className="font-semibold">{prompt.title}</h3>
      <p className="text-sm mt-2 whitespace-pre-wrap">{prompt.content}</p>
      <div className="mt-3 flex items-center gap-2">
        {prompt.tags?.map(t => (
          <span key={t} className="text-xs bg-gray-100 px-2 py-1 rounded">{t}</span>
        ))}
      </div>
      <div className="mt-3 flex gap-2 items-center text-sm text-gray-600">
        <button onClick={() => onVote(prompt._id, 'up')} className="px-2 py-1 border rounded">▲ {prompt.upvotes}</button>
        <button onClick={() => onVote(prompt._id, 'down')} className="px-2 py-1 border rounded">▼ {prompt.downvotes}</button>
      </div>
    </div>
  );
}
