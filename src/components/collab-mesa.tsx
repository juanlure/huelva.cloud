import { ExternalLink } from "lucide-react";
import type { CollabSpot } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

export function CollabMesa({ spot }: { spot: CollabSpot }) {
  const linkLabel = spot.linkType === "whatsapp" ? "WhatsApp" : "Web";

  return (
    <aside className="my-10 rounded-xl border-2 border-tinto/20 bg-paper p-6 shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <Badge variant="solid" className="mb-3">
            Colabora
          </Badge>
          <h3 className="font-display text-2xl tracking-tight">{spot.name}</h3>
          <p className="mt-3 leading-relaxed text-muted">{spot.blurb}</p>
          {spot.linkUrl ? (
            <a
              href={spot.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-tide hover:underline"
            >
              {linkLabel}
              <ExternalLink className="size-4" />
            </a>
          ) : null}
        </div>
        {spot.photoUrl ? (
          <img
            src={spot.photoUrl}
            alt={spot.name}
            className="size-28 shrink-0 rounded-lg object-cover shadow-border sm:size-32"
          />
        ) : null}
      </div>
    </aside>
  );
}
