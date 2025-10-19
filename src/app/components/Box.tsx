// Box.tsx
import type { ClothingItem } from "../types";
import "./Box.css";

interface BoxProps {
  data: ClothingItem; // <-- this is correct
}

export default function Box({ data }: BoxProps) {
  return (
    <div className="box">
      <img
        src={data.image_url}
        alt={data.category}
        className="box-img"
      />
      {/* <div className="text-sm mt-1">
        {data.category} – {data.color} – {data.style} – {data.fit} – {data.vibe}
      </div> */}
    </div>
  );
}
