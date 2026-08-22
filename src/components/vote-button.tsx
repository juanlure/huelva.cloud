import { useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function VoteButton({
  votes,
  onVote,
}: {
  votes: number;
  onVote: () => Promise<void>;
}) {
  const [count, setCount] = useState(votes);
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      disabled={pending || done}
      onClick={async () => {
        if (done) return;
        setPending(true);
        try {
          await onVote();
          setCount((n) => n + 1);
          setDone(true);
        } finally {
          setPending(false);
        }
      }}
      className={cn(done && "border-tide text-tide")}
    >
      <ArrowUp />
      <span className="tabular-nums">{count}</span>
    </Button>
  );
}
