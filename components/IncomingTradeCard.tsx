'use client';

import { Trade } from '@/lib/types';
import { updateTrade } from '@/lib/tradeStorage';
import { MapPin, Clock, Check, X } from 'lucide-react';

interface IncomingTradeCardProps {
  trade: Trade;
  onUpdate: () => void;
}

export default function IncomingTradeCard({ trade, onUpdate }: IncomingTradeCardProps) {
  const handleAccept = () => {
    updateTrade(trade.id, { status: 'accepted' });
    onUpdate();
  };

  const handleDecline = () => {
    if (confirm('Are you sure you want to decline this trade request?')) {
      updateTrade(trade.id, { status: 'declined' });
      onUpdate();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border-2 border-fairytale-mint p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border-r-2 border-fairytale-mint/30 pr-6">
          <h3 className="text-lg font-bold text-purple-700 mb-4">Your Item</h3>
          
          <div className="bg-fairytale-pink/20 rounded-lg p-4 mb-4">
            <img 
              src={trade.requestedItem.imageUrl} 
              alt={trade.requestedItem.name}
              className="w-full h-64 object-cover rounded-lg mb-3"
            />
            <h4 className="font-bold text-xl text-gray-800 mb-2">{trade.requestedItem.name}</h4>
            <p className="text-sm text-gray-600 capitalize">Category: {trade.requestedItem.category}</p>
          </div>

          {trade.status === 'in progress' ? (
            <div className="space-y-3">
              <button
                onClick={handleAccept}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                Accept Trade
              </button>
              <button
                onClick={handleDecline}
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-red-600 hover:to-pink-600 transition-all shadow-md flex items-center justify-center gap-2"
              >
                <X className="w-5 h-5" />
                Decline Trade
              </button>
            </div>
          ) : (
            <div className={`px-4 py-3 rounded-lg font-semibold text-center ${
              trade.status === 'accepted' 
                ? 'bg-green-100 text-green-700 border-2 border-green-300'
                : 'bg-red-100 text-red-700 border-2 border-red-300'
            }`}>
              You {trade.status} this trade
            </div>
          )}
        </div>

        <div className="pl-6">
          <h3 className="text-lg font-bold text-purple-700 mb-4">Their Offer</h3>
          
          {trade.offeredItem ? (
            <div className="bg-fairytale-lavender/20 rounded-lg p-4 mb-4">
              <img 
                src={trade.offeredItem.imageUrl} 
                alt={trade.offeredItem.name}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
              <h4 className="font-bold text-lg text-gray-800 mb-1">{trade.offeredItem.name}</h4>
              <p className="text-sm text-gray-600 mb-2">From: {trade.requesterName}</p>
              <p className="text-sm text-gray-600 capitalize">Category: {trade.offeredItem.category}</p>
            </div>
          ) : (
            <div className="bg-yellow-100 border-2 border-yellow-300 rounded-lg p-4 mb-4">
              <p className="text-yellow-700 font-semibold">Waiting for offer...</p>
              <p className="text-yellow-600 text-sm mt-1">
                {trade.requesterName} hasn't selected an item yet
              </p>
            </div>
          )}

          {trade.meetingPlace && trade.meetingTime && (
            <div className="bg-gradient-to-r from-fairytale-sky to-fairytale-mint p-4 rounded-lg space-y-3">
              <h4 className="font-semibold text-purple-700 mb-2">Meeting Details</h4>
              
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-700">Location</p>
                  <p className="text-sm text-gray-600">{trade.meetingPlace}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-700">Time</p>
                  <p className="text-sm text-gray-600">
                    {new Date(trade.meetingTime).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
