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

export interface SparklinePoint {
  time: string;
  priceUsd: number;
}

export interface TrendingAsset extends Asset {
  sparkline: SparklinePoint[];
}

export interface FeaturedAsset {
  type: string;
  symbol: string;
  name: string;
  priceUsd: number;
  change24h: number;
  reason: string;
}

export interface TrendingAssetsMeta {
  count: number;
  include: string[];
  featured: FeaturedAsset;
}

export interface TrendingAssetsResponse {
  data: TrendingAsset[];
  meta: TrendingAssetsMeta;
}

export interface WatchlistMeta {
  count: number;
}

export interface WatchlistResponse {
  data: Asset[];
  meta: WatchlistMeta;
}
