export type UserRole = 'user' | 'doctor' | 'clinic' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface RetinalImage {
  id: string;
  filename: string;
  uploadDate: string;
  type: 'Fundus' | 'OCT';
  status: 'pending' | 'processing' | 'completed' | 'failed';
}

export interface DiagnosticResult {
  id: string;
  imageId: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  findings: string[];
  annotatedImageUrl?: string;
  createdAt: string;
  doctorNotes?: string;
  doctorValidated?: boolean;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  lastAnalysisDate?: string;
}

export interface ServicePackage {
  id: string;
  name: string;
  price: number;
  imageCredits: number;
  duration: number; // days
}

export interface PaymentHistory {
  id: string;
  amount: number;
  date: string;
  packageName: string;
  status: 'completed' | 'pending' | 'failed';
}
