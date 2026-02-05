import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { inject } from 'vue';
import { useRatingContext } from './useRatingContext';
import { RATING_KEYS, DEFAULT_ICON_SIZE } from '../constants';
import type { MockInstance } from 'vitest';

vi.mock('vue', () => ({
  inject: vi.fn(),
}));

describe('useRatingContext', () => {
  let consoleWarnSpy: MockInstance;

  beforeEach(() => {
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('iconName и iconSize переданы через inject.', () => {
    const DEFAULT_ICON_DATA = {
      name: 'public:star',
      size: '1.5rem',
    };

    vi.mocked(inject).mockImplementation((key) => {
      if (key === RATING_KEYS.iconName) return DEFAULT_ICON_DATA.name;
      if (key === RATING_KEYS.iconSize) return DEFAULT_ICON_DATA.size;
      return;
    });

    const result = useRatingContext();

    expect(result.iconName).toBe(DEFAULT_ICON_DATA.name);
    expect(result.iconSize).toBe(DEFAULT_ICON_DATA.size);
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });

  it('Не передан iconName.', () => {
    const wrongResult = undefined;

    vi.mocked(inject).mockReturnValue(wrongResult);

    expect(() => useRatingContext()).toThrowError(
      `[VscRating]: компоненту не передан размер иконки (${wrongResult}).`,
    );
  });

  it('Не передан iconSize.', () => {
    vi.mocked(inject).mockImplementation((key) => {
      if (key === RATING_KEYS.iconName) return 'public:heart';
      if (key === RATING_KEYS.iconSize) return undefined;
      return undefined;
    });

    const result = useRatingContext();

    expect(result.iconSize).toBe(DEFAULT_ICON_SIZE);
    expect(inject).toHaveBeenCalledWith(RATING_KEYS.iconSize);
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      `[VscRating]: компоненту не передан размер иконки (${undefined}). Используется значение по умолчанию.`,
    );
  });
});
