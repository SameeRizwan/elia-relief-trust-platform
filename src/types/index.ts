export type UserRole = "admin" | "donor" | "volunteer";

export interface UserProfile {
    uid: string;
    email: string;
    displayName?: string;
    phoneNumber?: string;
    role: UserRole;
    createdAt: string;
    address?: {
        line1: string;
        city: string;
        country: string;
        postalCode: string;
    };
    preferences?: {
        marketing: boolean;
        updates: boolean;
    };
}

export type CampaignCategory = "Water" | "Education" | "Orphans" | "Emergency" | "Medical" | "Food" | "Ramadan";

export interface Campaign {
    id: string;
    title: string;
    slug: string;
    description: string;
    category: CampaignCategory;
    country: string;
    imageUrl: string;
    galleryImages?: string[];
    goalAmount: number;
    raisedAmount: number;
    isUrgent: boolean;
    active: boolean;
    isZakatEligible: boolean;
    createdAt: string;
    updates?: CampaignUpdate[];
}

export interface CampaignUpdate {
    id: string;
    date: string;
    title: string;
    content: string;
    imageUrl?: string;
}

export interface Donation {
    id: string;
    amount: number;
    currency: string;
    campaignId: string;
    campaignTitle: string;
    donorId?: string; // Optional (guest checkout)
    donorEmail: string;
    donorName: string;
    status: "succeeded" | "pending" | "failed";
    type: "one-time" | "monthly";
    stripePaymentIntentId?: string;
    isGiftAid: boolean; // UK Gift Aid
    createdAt: string;
}

export interface Orphan {
    id: string;
    firstName: string;
    age: number;
    gender: "male" | "female";
    country: string;
    story: string;
    imageUrl: string;
    sponsorshipCost: number; // Monthly cost
    isSponsored: boolean;
    sponsorId?: string;
    reports?: OrphanReport[];
}

export interface OrphanReport {
    id: string;
    date: string;
    title: string; // e.g. "Summer 2024 Report"
    content: string;
    pdfUrl?: string;
}
