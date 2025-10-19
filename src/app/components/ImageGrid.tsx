"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { supabase } from "../supabaseClient";

interface ClothingItem {
  id: number;
  category: string;
  color: string;
  style: string;
  fit: string;
  vibe: string;
  image_url: string;
  created_at: string;
}

// Options for each tag
const CATEGORY_OPTIONS = ["dress", "jacket", "pants", "top", "shoes", "accessories"];
const COLOR_OPTIONS = [
  "black","white","beige","brown","red","pink","blue","green","yellow","purple","gray","multicolor"
];
const STYLE_OPTIONS = [
  "vintage","streetwear","minimalist","y2k","cottagecore","grunge","academia","boho","chic","sporty",
  "preppy","kawaii","techwear","classic","fairycore","indie","retro","girly","punk","elegant"
];
const FIT_OPTIONS = [
  "oversized","cropped","fitted","flowy","high-waisted","loose","bodycon","layered","structured"
];
const VIBE_OPTIONS = [
  "casual","formal","date night","interview","presentation","party","everyday","picnic","beach","festival","cozy","academic","workwear"
];

export default function ImageGrid() {
    //array of Clothing objects (fetched rows)
  const [posts, setPosts] = useState<ClothingItem[]>([]);
  const [file, setFile] = useState<File | null>(null);

  // Selected tags
  const [category, setCategory] = useState<string>(CATEGORY_OPTIONS[0]);
  const [color, setColor] = useState<string>(COLOR_OPTIONS[0]);
  const [style, setStyle] = useState<string>(STYLE_OPTIONS[0]);
  const [fit, setFit] = useState<string>(FIT_OPTIONS[0]);
  const [vibe, setVibe] = useState<string>(VIBE_OPTIONS[0]);

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("Clothing")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.error(error);
      else if (data) setPosts(data as ClothingItem[]);
    };

    fetchPosts();
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null;
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image first!");
      return;
    }

    const fileName = `${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(fileName, file);

    if (uploadError) {
      console.error("Upload error:", uploadError);
      alert("Image upload failed!");
      return;
    }

    const { data: publicData } = supabase.storage
      .from("images")
      .getPublicUrl(fileName);

    const imageUrl = publicData.publicUrl;

    const { error: insertError } = await supabase.from("Clothing").insert([
      {
        category,
        color,
        style,
        fit,
        vibe,
        image_url: imageUrl,
      },
    ]);

    if (insertError) {
      console.error("Insert error:", insertError);
      alert("Database insert failed!");
      return;
    }

    // Refresh posts
    const { data: newData } = await supabase
      .from("Clothing")
      .select("*")
      .order("created_at", { ascending: false });

    if (newData) setPosts(newData as ClothingItem[]);
    setFile(null);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-col md:flex-row gap-2">
        <input type="file" accept="image/*" onChange={handleFileChange} />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORY_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>

        <select value={color} onChange={(e) => setColor(e.target.value)}>
          {COLOR_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>

        <select value={style} onChange={(e) => setStyle(e.target.value)}>
          {STYLE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>

        <select value={fit} onChange={(e) => setFit(e.target.value)}>
          {FIT_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>

        <select value={vibe} onChange={(e) => setVibe(e.target.value)}>
          {VIBE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>

        <button
          onClick={handleUpload}
          className="bg-green-600 text-white px-3 py-2 rounded"
        >
          Upload
        </button>
      </div>

      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {posts.map((item) => (
            <li key={item.id} className="border p-2 rounded shadow">
              <img src={item.image_url} alt={item.category} style={{ height: 100 }} />
              <div className="text-sm">
                {item.category} – {item.color} – {item.style} – {item.fit} – {item.vibe}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
