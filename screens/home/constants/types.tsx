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

export interface VerificationLimits {
  depositPerTransactionUsd: number;
  tradePerTransactionUsd: number;
  withdrawalPerTransactionUsd: number;
  dailyWithdrawalUsd: number;
}

export interface Verification {
  status: 'approved' | 'pending' | 'rejected';
  tier: string;
  level: number;
  label: string;
  limits: VerificationLimits;
  canTrade: boolean;
  canWithdraw: boolean;
  canUseSandboxDeposits: boolean;
}

export interface UserSettings {
  language: string;
  fiatCurrency: string;
  theme: 'light' | 'dark' | 'system';
  pushNotifications: boolean;
  biometricEnabled: boolean;
}

export interface UserProfile {
  id: string;
  role: 'customer' | 'admin';
  fullName: string;
  email: string;
  emailVerified: boolean;
  phone: string;
  twoFactorEnabled: boolean;
  kycStatus: 'approved' | 'pending' | 'rejected';
  verification: Verification;
  avatarUrl: string | null;
  watchlist: string[];
  settings: UserSettings;
  createdAt: string;
}

export interface UserProfileResponse {
  data: UserProfile;
}

export interface AssetStats {
  marketCapUsd: number;
  volume24hUsd: number;
  circulatingSupply: number;
  maxSupply: number;
  allTimeHighUsd: number;
  high24hUsd: number;
  low24hUsd: number;
  volumeToMarketCapRatio: number;
  about: string;
  websiteUrl: string;
  explorerUrl: string;
}

export interface AssetChartPoint {
  time: string;
  priceUsd: number;
}

export interface AssetDetails extends Asset {
  stats: AssetStats;
  chart: AssetChartPoint[];
}

export interface AssetDetailsResponse {
  data: AssetDetails;
}
