'use client';

import { useState, useEffect } from 'react';
import { Inbox as InboxIcon, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import OutgoingTradeCard from '@/components/OutgoingTradeCard';
import IncomingTradeCard from '@/components/IncomingTradeCard';
import { Trade, ClothingItem } from '@/lib/types';
import { getAllTrades, createTrade } from '@/lib/tradeStorage';
import { seedIncomingTrade } from '@/lib/seedTrades';

import { supabase } from "../../supabaseClient";

// Helper function to fetch all clothing items
async function fetchClothingItems(): Promise<ClothingItem[]> {
  const { data, error } = await supabase
    .from("ClothingItems")
    .select("*")
    .eq("owner", "You")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching clothing items:", error);
    return [];
  }

  return data as ClothingItem[];
}

export default function InboxPage() {
  const [posts, setPosts] = useState<ClothingItem[]>([]);
  // Fetch posts on mount
  useEffect(() => {
    const fetchData = async () => {
      const items = await fetchClothingItems();
      setPosts(items);
    };
    fetchData();
  }, []);


  const [trades, setTrades] = useState<Trade[]>([]);
  const [pendingItem, setPendingItem] = useState<ClothingItem | null>(null);

  useEffect(() => {
    seedSampleTrade();
    loadTrades();
    checkPendingTrade();
  }, []);

  const seedSampleTrade = () => {
    const allTrades = getAllTrades();
    const hasIncomingTrades = allTrades.some(t => t.isIncoming);
    
    if (!hasIncomingTrades) {
      seedIncomingTrade();
    }
  };

  const loadTrades = () => {
    setTrades(getAllTrades());
  };

  const checkPendingTrade = () => {
    if (typeof window === 'undefined') return;
    
    const pendingTradeItem = localStorage.getItem('wearever_pending_trade_item');
    if (pendingTradeItem) {
      const item: ClothingItem = JSON.parse(pendingTradeItem);
      setPendingItem(item);
      
      const newTrade: Trade = {
        id: `trade-${Date.now()}`,
        requestedItemId: item.id.toString(),
        requestedItem: item,
        offeredItemId: null,
        offeredItem: null,
        requesterName: 'You',
        ownerName: item.owner,
        meetingPlace: null,
        meetingTime: null,
        status: 'in progress',
        isIncoming: false,
        createdAt: Date.now()
      };
      
      createTrade(newTrade);
      localStorage.removeItem('wearever_pending_trade_item');
      loadTrades();
    }
  };

  const outgoingTrades = trades.filter(t => !t.isIncoming);
  const incomingTrades = trades.filter(t => t.isIncoming);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border-4 border-fairytale-lavender/30">
          <div className="flex items-center gap-3 mb-8">
            <InboxIcon className="w-8 h-8 text-purple-500" />
            <h1 className="text-3xl font-bold text-purple-700">Trade Inbox</h1>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-purple-600 mb-4 flex items-center gap-2">
                <ArrowRight className="w-6 h-6" />
                Outgoing Requests
                <span className="text-sm font-normal text-gray-500">
                  ({outgoingTrades.length})
                </span>
              </h2>
              
              {outgoingTrades.length === 0 ? (
                <div className="text-center py-12 bg-fairytale-pink/20 rounded-xl">
                  <p className="text-gray-500">No outgoing trade requests</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Browse the home page and click "Request Trade" on items you like!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {outgoingTrades.map((trade) => (
                    <OutgoingTradeCard 
                      key={trade.id} 
                      trade={trade}
                      onUpdate={loadTrades}
                    />
                  ))}
                </div>
              )}
            </section>

            <section>
              <h2 className="text-2xl font-bold text-purple-600 mb-4 flex items-center gap-2">
                <ArrowRight className="w-6 h-6 rotate-180" />
                Incoming Requests
                <span className="text-sm font-normal text-gray-500">
                  ({incomingTrades.length})
                </span>
              </h2>
              
              {incomingTrades.length === 0 ? (
                <div className="text-center py-12 bg-fairytale-mint/20 rounded-xl">
                  <p className="text-gray-500">No incoming trade requests</p>
                  <p className="text-sm text-gray-400 mt-1">
                    When others want to trade for your items, they'll appear here!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {incomingTrades.map((trade) => (
                    <IncomingTradeCard 
                      key={trade.id} 
                      trade={trade}
                      onUpdate={loadTrades}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
