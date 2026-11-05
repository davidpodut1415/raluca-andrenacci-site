import type { ProgramKey } from '../i18n/routes';
import type { ImageName } from './images.generated';

/** Photo used for each program (banner on its page, tile elsewhere). Placeholders until new photography exists. */
export const PROGRAM_IMAGES: Record<ProgramKey, ImageName> = {
  coLeadership: 'event-fullbody',
  nextgenMentoring: 'portrait-armchair',
  successorIntegration: 'working-laptop',
  entrepreneurInResidence: 'marble-table',
  governanceBoard: 'portrait-leaning',
  audit: 'hero-portrait',
};
