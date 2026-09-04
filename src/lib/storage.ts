import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const DATA_DIR = path.join(process.cwd(), 'data');

async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (err) {
    // Directory already exists or can't be created
  }
}

async function readJsonFile<T>(filename: string): Promise<T[]> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content) as T[];
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      return [];
    }
    console.error(`Error reading ${filename}:`, err);
    return [];
  }
}

async function writeJsonFile<T>(filename: string, data: T[]): Promise<void> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export interface StoredContact {
  id: string;
  name: string;
  email: string;
  organisation?: string;
  role?: string;
  telephone?: string;
  country?: string;
  inquiryType: string;
  subject: string;
  message: string;
  preferredContact: string;
  createdAt: string;
  status: 'new' | 'reviewed' | 'responded';
}

export interface StoredProjectInquiry {
  id: string;
  name: string;
  role: string;
  organisation: string;
  email: string;
  telephone?: string;
  country: string;
  projectLocation: string;
  organisationType: string;
  serviceRequired: string;
  description: string;
  projectStage?: string;
  desiredOutcome?: string;
  timeline?: string;
  budget?: string;
  stakeholders?: string;
  howHeard?: string;
  fileName?: string;
  fileSize?: number;
  createdAt: string;
  status: 'new' | 'in_review' | 'contacted' | 'mandate_active';
}

export interface StoredExpertApplication {
  id: string;
  fullName: string;
  email: string;
  telephone?: string;
  country: string;
  primaryDiscipline: string;
  secondaryDisciplines?: string[];
  yearsOfExperience: string;
  credentialsSummary: string;
  linkedInUrl?: string;
  regionalDeskPreference?: string;
  createdAt: string;
  status: 'pending_review' | 'vetted' | 'accepted' | 'declined';
}

export async function saveContactSubmission(data: Omit<StoredContact, 'id' | 'createdAt' | 'status'>): Promise<StoredContact> {
  const items = await readJsonFile<StoredContact>('contacts.json');
  const record: StoredContact = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: 'new',
  };
  items.unshift(record);
  await writeJsonFile('contacts.json', items);
  return record;
}

export async function getContactSubmissions(): Promise<StoredContact[]> {
  return readJsonFile<StoredContact>('contacts.json');
}

export async function saveProjectInquiry(data: Omit<StoredProjectInquiry, 'id' | 'createdAt' | 'status'>): Promise<StoredProjectInquiry> {
  const items = await readJsonFile<StoredProjectInquiry>('project-inquiries.json');
  const record: StoredProjectInquiry = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: 'new',
  };
  items.unshift(record);
  await writeJsonFile('project-inquiries.json', items);
  return record;
}

export async function getProjectInquiries(): Promise<StoredProjectInquiry[]> {
  return readJsonFile<StoredProjectInquiry>('project-inquiries.json');
}

export async function saveExpertApplication(data: Omit<StoredExpertApplication, 'id' | 'createdAt' | 'status'>): Promise<StoredExpertApplication> {
  const items = await readJsonFile<StoredExpertApplication>('expert-applications.json');
  const record: StoredExpertApplication = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: 'pending_review',
  };
  items.unshift(record);
  await writeJsonFile('expert-applications.json', items);
  return record;
}

export async function getExpertApplications(): Promise<StoredExpertApplication[]> {
  return readJsonFile<StoredExpertApplication>('expert-applications.json');
}

export async function logEmailOutbox(payload: {
  to: string;
  subject: string;
  html: string;
  text?: string;
  type: string;
}): Promise<void> {
  await ensureDataDir();
  const logPath = path.join(DATA_DIR, 'email-outbox.log');
  const timestamp = new Date().toISOString();
  const entry = `[${timestamp}] TYPE: ${payload.type} | TO: ${payload.to} | SUBJECT: ${payload.subject}\n\n${payload.text || payload.html}\n\n============================================================\n\n`;
  await fs.appendFile(logPath, entry, 'utf-8');
}
