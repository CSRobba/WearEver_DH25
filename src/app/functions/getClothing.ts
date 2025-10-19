// lib/getClothingItems.ts
import { supabase } from "../supabaseClient";

export interface ClothingItem {
  id: number;
  category: string;
  color: string;
  style: string;
  fit: string;
  vibe: string;
  image_url: string;
  created_at: string;
}

/**
 * Fetch all clothing items from the database, ordered by creation date descending.
 */
export async function getClothingItems(): Promise<ClothingItem[]> {
  const { data, error } = await supabase
    .from("Clothing")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching clothing items:", error);
    return [];
  }

  return data as ClothingItem[];
}
