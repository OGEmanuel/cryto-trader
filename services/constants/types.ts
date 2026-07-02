export type RegisterType = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
};

export type RegisterResponse = {
  data: RegisterResponseData;
};

export type RegisterResponseData = {
  user: User;
  token: string;
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresAt: string;
  expiresInSeconds: number;
  refreshTokenExpiresAt: string;
};

export type User = {
  id: string;
  role: 'customer' | 'admin' | string;
  fullName: string;
  email: string;
  phone: string;
  twoFactorEnabled: boolean;
  kycStatus: 'pending' | 'approved' | 'rejected' | string;
  avatarUrl: string | null;
  watchlist: string[];
  settings: UserSettings;
  createdAt: string;
};

export type UserSettings = {
  language: string;
  fiatCurrency: string;
  theme: 'light' | 'dark' | 'system' | string;
  pushNotifications: boolean;
  biometricEnabled: boolean;
};

export type OtpData = {
  message: string;
  demoCode: string;
  expiresInSeconds: number;
};

export type VerifyOtpResponse = {
  data: OtpData;
};

export interface TwoFactorSetup {
  secret: string;
  otpauthUri: string;
  enabled: boolean;
}

export interface TwoFactorSetupResponse {
  data: TwoFactorSetup;
}

export interface TwoFactorChallenge {
  requiresTwoFactor: boolean;
  challengeId: string;
  attemptsRemaining: number;
  expiresAt: string;
}

export interface TwoFactorChallengeMeta {
  requestId: string;
}

export interface TwoFactorChallengeResponse {
  data: TwoFactorChallenge;
  meta: TwoFactorChallengeMeta;
}

export type GetAssetsParams = {
  q?: string;
  search?: string;
  page?: number;
  limit?: number;
  sort?: 'symbol' | 'priceUsd' | 'change24h' | 'minBuyUsd';
  order?: 'asc' | 'desc';
};

export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

export interface NotificationsMeta {
  count: number;
  unread: number;
}

export interface NotificationsResponse {
  data: Notification[];
  meta: NotificationsMeta;
}

export interface TwoFactorRecoverySettings {
  enabled: boolean;
  recoveryCodes: string[];
  recoveryCodeCount: number;
}

export interface TwoFactorRecoveryResponse {
  data: TwoFactorRecoverySettings;
}

export interface FileUploadData {
  uploadId: string;
  provider: 'cloudinary';
  uploaded: boolean;
  directUpload: boolean;
  storageKey: string;
  publicUrl: string;
  publicId: string;
  fileName: string;
  contentType: string;
  sizeBytes: number;
}

export interface FileUploadResponse {
  data: FileUploadData;
}

export type PickedFile = {
  name: string;
  uri: string;
  size?: number;
  mimeType?: string;
};

export interface CandlestickDataPoint {
  time: string;
  openUsd: number;
  highUsd: number;
  lowUsd: number;
  closeUsd: number;
  volume: number;
}

export type ChartInterval = '1m' | '5m' | '15m' | '1h' | '1d';

export interface CandlestickMeta {
  count: number;
  symbol: string;
  interval: ChartInterval;
}

export interface CandlestickResponse {
  data: CandlestickDataPoint[];
  meta: CandlestickMeta;
}
