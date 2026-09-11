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

/**
 * ARCHITECTURE NOTICE — CLOUD STORAGE REQUIREMENT:
 * Local file storage to `data/uploads/` is implemented for local development
 * and single-server deployments. For production deployment on serverless platforms
 * such as Vercel or AWS Lambda, container disk storage is strictly ephemeral and
 * will not persist across invocations or deployments. Before deploying to production,
 * file uploads must be adapted to stream directly to an S3-compatible cloud bucket,
 * Cloudflare R2, or Cloudinary.
 */

export interface StoredUploadedFile {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  urlPath: string;
  savedAt: string;
}

const UPLOADS_DIR = path.join(DATA_DIR, 'uploads');

export async function ensureUploadsDir(subfolder = ''): Promise<string> {
  const dir = subfolder ? path.join(UPLOADS_DIR, subfolder) : UPLOADS_DIR;
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (err) {
    // Already exists
  }
  return dir;
}

export async function saveUploadedFile(
  file: File,
  subfolder: 'cv' | 'photo' | 'certificates',
  allowedMimes: string[]
): Promise<StoredUploadedFile> {
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB limit
  if (file.size > MAX_SIZE) {
    throw new Error(`File "${file.name}" exceeds the maximum allowed size of 5MB.`);
  }

  const mimeType = file.type.toLowerCase();
  const ext = path.extname(file.name).toLowerCase();

  const allowedExtensions: Record<string, string[]> = {
    cv: ['.pdf', '.doc', '.docx'],
    photo: ['.jpg', '.jpeg', '.png', '.webp'],
    certificates: ['.pdf', '.jpg', '.jpeg', '.png', '.webp'],
  };

  const validExts = allowedExtensions[subfolder] || [];
  const matchesMime = allowedMimes.includes(mimeType);
  const matchesExt = validExts.includes(ext);

  if (!matchesMime && !matchesExt) {
    throw new Error(`Invalid file type for "${file.name}". Allowed extensions: ${validExts.join(', ')}`);
  }

  const targetDir = await ensureUploadsDir(subfolder);
  const cleanOriginalName = path.basename(file.name).replace(/[^a-zA-Z0-9._-]/g, '_');
  const storedFilename = `${crypto.randomUUID()}-${cleanOriginalName}`;
  const destinationPath = path.join(targetDir, storedFilename);

  const arrayBuffer = await file.arrayBuffer();
  await fs.writeFile(destinationPath, Buffer.from(arrayBuffer));

  return {
    filename: storedFilename,
    originalName: file.name,
    mimeType: file.type || 'application/octet-stream',
    size: file.size,
    urlPath: `/data/uploads/${subfolder}/${storedFilename}`,
    savedAt: new Date().toISOString(),
  };
}

export interface StoredExpertApplication {
  id: string;
  fullName: string;
  preferredName?: string;
  email: string;
  telephone: string;
  country: string;
  city: string;
  jobTitle: string;
  organisation: string;
  primaryDiscipline: string;
  secondaryDisciplines?: string;
  yearsOfExperience: string;
  academicQualifications: string;
  professionalRegistrations?: string;
  projectExperience: string;
  servicesProvided: string;
  sectorExperience: string;
  workRegions: string;
  travelAvailability: string;
  languages: string;
  engagementType: string;
  linkedInUrl: string;
  websiteUrl?: string;
  references: string;
  bio: string;
  statementOfInterest: string;
  consentVerification: boolean;
  consentPublication: boolean;
  acknowledgementNoGuarantee: boolean;
  privacyConsent: boolean;
  cvFile?: StoredUploadedFile;
  photoFile?: StoredUploadedFile;
  certificateFiles?: StoredUploadedFile[];
  credentialsSummary?: string;
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
