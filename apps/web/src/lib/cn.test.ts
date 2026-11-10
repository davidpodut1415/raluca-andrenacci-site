import { describe, expect, it } from 'vitest';
import { cn } from './cn';

describe('cn', () => {
  it('keeps the text color when a custom font-size token is merged in', () => {
    expect(cn('text-button text-white', 'text-small')).toBe('text-white text-small');
  });

  it('still lets a later color override an earlier one', () => {
    expect(cn('text-white', 'text-black')).toBe('text-black');
  });
});
