import { z } from 'zod';
import { LOCALES } from './locales.js';

export const LEAD_TYPES = ['contact', 'free_session'] as const;
export const LEAD_AUDIENCES = ['founder', 'successor', 'executive', 'other'] as const;

/** Payload of `POST /api/leads`. Used by the web form and validated again by the API. */
export const leadInputSchema = z.object({
  type: z.enum(LEAD_TYPES),
  name: z.string().trim().min(2).max(100),
  email: z.email().max(200),
  phone: z
    .string()
    .trim()
    .max(30)
    .regex(/^[+\d][\d\s().-]*$/)
    .optional(),
  audience: z.enum(LEAD_AUDIENCES).optional(),
  program: z.string().trim().max(80).optional(),
  message: z.string().trim().min(10).max(4000),
  locale: z.enum(LOCALES),
  consent: z.literal(true),
  /** Honeypot: real users never fill this in. */
  website: z.string().max(0).optional(),
  turnstileToken: z.string().max(2048).optional(),
});

export type LeadInput = z.infer<typeof leadInputSchema>;
