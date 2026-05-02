import { Dimensions } from 'react-native';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const getFullWidth = () => {
  return Dimensions.get('window').width;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
