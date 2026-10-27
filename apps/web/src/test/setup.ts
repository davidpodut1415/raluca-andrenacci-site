import '@testing-library/jest-dom/vitest';
import { cleanup, configure } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

afterEach(() => cleanup());

// Lazy route chunks are transformed on first import, which can exceed the 1s default.
configure({ asyncUtilTimeout: 5000 });

// jsdom does not implement media playback.
HTMLMediaElement.prototype.play = vi.fn(() => Promise.resolve());
HTMLMediaElement.prototype.pause = vi.fn();
