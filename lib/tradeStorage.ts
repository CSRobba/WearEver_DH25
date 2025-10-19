import { Trade } from './types';

const TRADES_STORAGE_KEY = 'wearever_trades';

export function getAllTrades(): Trade[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(TRADES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading trades:', error);
    return [];
  }
}

export function getOutgoingTrades(): Trade[] {
  return getAllTrades().filter(trade => !trade.isIncoming);
}

export function getIncomingTrades(): Trade[] {
  return getAllTrades().filter(trade => trade.isIncoming);
}

export function createTrade(trade: Trade): void {
  if (typeof window === 'undefined') return;
  
  try {
    const trades = getAllTrades();
    trades.push(trade);
    localStorage.setItem(TRADES_STORAGE_KEY, JSON.stringify(trades));
  } catch (error) {
    console.error('Error creating trade:', error);
  }
}

export function updateTrade(tradeId: string, updates: Partial<Trade>): void {
  if (typeof window === 'undefined') return;
  
  try {
    const trades = getAllTrades();
    const index = trades.findIndex(t => t.id === tradeId);
    
    if (index !== -1) {
      trades[index] = { ...trades[index], ...updates };
      localStorage.setItem(TRADES_STORAGE_KEY, JSON.stringify(trades));
    }
  } catch (error) {
    console.error('Error updating trade:', error);
  }
}

export function deleteTrade(tradeId: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    const trades = getAllTrades();
    const filtered = trades.filter(t => t.id !== tradeId);
    localStorage.setItem(TRADES_STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting trade:', error);
  }
}
