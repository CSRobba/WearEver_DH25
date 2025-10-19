'use client';

import { useState, useEffect } from 'react';
import { Trade, ClothingItem, CampusLocation } from '@/lib/types';
import { getUserUploadedItems } from '@/lib/storage';
import { updateTrade } from '@/lib/tradeStorage';
import { campusLocations } from '@/lib/campusLocations';
import { MapPin, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';


interface OutgoingTradeCardProps {
  trade: Trade;
  onUpdate: () => void;
}

export default function OutgoingTradeCard({ trade, onUpdate }: OutgoingTradeCardProps) {
  const [userItems, setUserItems] = useState<ClothingItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string>(trade.offeredItemId || '');
  const [meetingPlace, setMeetingPlace] = useState<CampusLocation | ''>(trade.meetingPlace || '');
  const [meetingTime, setMeetingTime] = useState<string>(trade.meetingTime || '');

  useEffect(() => {
    setUserItems(getUserUploadedItems());
  }, []);

  const handleOfferUpdate = () => {
    if (!selectedItemId || !meetingPlace || !meetingTime) {
      alert('Please select an item, place, and time for your offer');
      return;
    }

    const selectedItem = userItems.find(item => item.id.toString() === selectedItemId);
    if (!selectedItem) return;

    updateTrade(trade.id, {
      offeredItemId: selectedItemId,
      offeredItem: selectedItem,
      meetingPlace: meetingPlace as CampusLocation,
      meetingTime: meetingTime
    });

    onUpdate();
  };

  const getStatusIcon = () => {
    switch (trade.status) {
      case 'accepted':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'declined':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = () => {
    switch (trade.status) {
      case 'accepted':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'declined':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border-2 border-fairytale-lavender p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border-r-2 border-fairytale-lavender/30 pr-6">
          <h3 className="text-lg font-bold text-purple-700 mb-4">Your Offer</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-purple-600 mb-2">
                Select Item to Offer *
              </label>
              <select
                value={selectedItemId}
                onChange={(e) => setSelectedItemId(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border-2 border-fairytale-lavender focus:border-purple-400 focus:outline-none"
                disabled={trade.status !== 'in progress'}
              >
                <option value="">Choose from your closet...</option>
                {userItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {trade.offeredItem && (
              <div className="bg-fairytale-pink/20 rounded-lg p-3">
                <img 
                  src={trade.offeredItem.imageUrl} 
                  alt={trade.offeredItem.name}
                  className="w-full h-48 object-cover rounded-lg mb-2"
                />
                <p className="font-semibold text-gray-800">{trade.offeredItem.name}</p>
                <p className="text-sm text-gray-600 capitalize">{trade.offeredItem.category}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-purple-600 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Meeting Place *
              </label>
              <select
                value={meetingPlace}
                onChange={(e) => setMeetingPlace(e.target.value as CampusLocation)}
                className="w-full px-4 py-2 rounded-lg border-2 border-fairytale-lavender focus:border-purple-400 focus:outline-none"
                disabled={trade.status !== 'in progress'}
              >
                <option value="">Select location...</option>
                {campusLocations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-purple-600 mb-2">
                <Clock className="w-4 h-4 inline mr-1" />
                Meeting Time *
              </label>
              <input
                type="datetime-local"
                value={meetingTime}
                onChange={(e) => setMeetingTime(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border-2 border-fairytale-lavender focus:border-purple-400 focus:outline-none"
                disabled={trade.status !== 'in progress'}
              />
            </div>

            {trade.status === 'in progress' && (
              <button
                onClick={handleOfferUpdate}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-md"
              >
                Update Offer
              </button>
            )}
          </div>
        </div>

        <div className="pl-6">
          <h3 className="text-lg font-bold text-purple-700 mb-4">Requested Item</h3>
          
          <div className="bg-fairytale-mint/20 rounded-lg p-4 mb-4">
            <img 
              src={trade.requestedItem.imageUrl} 
              alt={trade.requestedItem.name}
              className="w-full h-64 object-cover rounded-lg mb-3"
            />
            <h4 className="font-bold text-xl text-gray-800 mb-2">{trade.requestedItem.name}</h4>
            <p className="text-sm text-gray-600 mb-1">Owner: {trade.ownerName}</p>
            <p className="text-sm text-gray-600 capitalize">Category: {trade.requestedItem.category}</p>
          </div>

          <div className="bg-gradient-to-r from-fairytale-lavender to-fairytale-sky p-4 rounded-lg">
            <h4 className="font-semibold text-purple-700 mb-3 flex items-center gap-2">
              {getStatusIcon()}
              Status
            </h4>
            <div className={`px-4 py-2 rounded-lg border-2 ${getStatusColor()} font-semibold capitalize text-center`}>
              {trade.status}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}