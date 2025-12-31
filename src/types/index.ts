// types/index.ts
export interface Client {
  id: number;
  name: string;
  custId: string;
  address: string;
  phone: string;
}

export interface Expense {
  id: number;
  date: string;
  desc: string;
  category: string;
  amount: number;
}

export interface DocumentItem {
  ref: string;
  desc: string;
  price: number;
}

export interface Document {
  id: string;
  type: 'quote' | 'invoice';
  number: string;
  date: string;
  clientName: string;
  clientDetails: string;
  projectTitle: string;
  items: DocumentItem[];
  discount: number;
  total: number;
  status: 'Pending' | 'Unpaid' | 'Paid';
}

export interface Settings {
  companyName: string;
  bankDetails: string;
  terms: string;
}