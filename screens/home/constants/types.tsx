import { StyleProp, ViewStyle } from 'react-native';

export type CoinListType = {
  id: number;
  price: string;
  coin: React.ReactNode;
  pair: string;
  percentage: string;
};

export type IconActionType = {
  id: number;
  name: string;
  icon: (props: { style?: StyleProp<ViewStyle> }) => React.JSX.Element;
};

export interface Asset {
  change24h: number;
  iconUrl: string;
  id: string;
  isActive: boolean;
  minBuyUsd: number;
  minSellUsd: number;
  name: string;
  network: string;
  priceUsd: number;
  symbol: string;
}

export interface Market {
  lastUpdatedAt: string;
  mode: string;
  source: string;
  tickIntervalMs: number;
}

export interface AssetsMeta {
  count: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  limit: number;
  market: Market;
  order: string;
  page: number;
  query: string | null;
  requestId: string;
  sort: string;
  total: number;
  totalPages: number;
}

export interface AssetsResponse {
  data: Asset[];
  meta: AssetsMeta;
}
