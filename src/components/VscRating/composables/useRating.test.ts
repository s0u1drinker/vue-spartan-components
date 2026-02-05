import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ref } from 'vue';
import { useRating } from './useRating';
import { isNonNegativeNumber, isPositiveNumber } from '@utils';
import type { MockInstance } from 'vitest';
import type { UseRatingParams } from './types';

vi.mock('@utils', () => ({
  isNonNegativeNumber: vi.fn(),
  isPositiveNumber: vi.fn(),
}));

describe('useRating', () => {
  const createValidProps = (): UseRatingParams => ({
    current: ref(3),
    max: ref(5),
    icon: ref('public:star'),
    setRating: ref(false),
  });

  let consoleWarnSpy: MockInstance;
  let consoleErrorSpy: MockInstance;

  beforeEach(() => {
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mocked(isNonNegativeNumber).mockReturnValue(true);
    vi.mocked(isPositiveNumber).mockReturnValue(true);
  });

  afterEach(() => {
    consoleWarnSpy.mockRestore();
    consoleErrorSpy.mockRestore();
    vi.clearAllMocks();
  });

  describe('Валидация данных', () => {
    it('Данные валидны.', () => {
      const props = createValidProps();
      const { isValidData } = useRating(props);

      expect(isValidData.value).toBe(true);
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it('Текущее значение не валидно.', () => {
      const props = createValidProps();
      const { isValidData } = useRating(props);

      vi.mocked(isNonNegativeNumber).mockReturnValue(false);

      expect(isValidData.value).toBe(false);
      expect(isNonNegativeNumber).toHaveBeenCalledWith(3);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('текущее значение рейтинга')
      );
    });

    it('Максимальное значение не валидно.', () => {
      const props = createValidProps();
      const { isValidData } = useRating(props);

      vi.mocked(isPositiveNumber).mockReturnValue(false);

      expect(isValidData.value).toBe(false);
      expect(isPositiveNumber).toHaveBeenCalledWith(5);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('максимальное значение рейтинга')
      );
    });

    it('Значение иконки не валидно.', () => {
      const props = {
        ...createValidProps(),
        icon: ref(''),
      };

      // @ts-ignore
      const { isValidData } = useRating(props);

      expect(isValidData.value).toBe(false);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('не передано значение иконки')
      );
    });

    it('Ошибка логики.', () => {
      const props = {
        ...createValidProps(),
        max: ref(2),
        current: ref(5),
      };

      const { isValidData } = useRating(props);

      expect(isValidData.value).toBe(false);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          'максимальное значение рейтинга меньше текущего'
        )
      );
    });
  });

  describe('Инициализация', () => {
    it('Текущее значение больше 0 при setRating = true.', () => {
      const current = ref(5);
      const props = {
        ...createValidProps(),
        current,
        setRating: ref(true),
      };

      useRating(props);

      expect(current.value).toBe(0);
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('при установленном флаге "setRating"')
      );
    });

    it('Текущее значение равно 0 при setRating = true.', () => {
      const current = ref(0);
      const props = {
        ...createValidProps(),
        current,
        setRating: ref(true),
      };

      useRating(props);

      expect(current.value).toBe(0);
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });

    it('Не проверяет текущее значение при setRating = false.', () => {
      const current = ref(5);
      const props = {
        ...createValidProps(),
        current,
        setRating: ref(false),
      };

      useRating(props);

      expect(current.value).toBe(5);
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });
  });

  describe('Реактивность', () => {
    it('isValidData пересчитывается при изменении входных данных.', () => {
      const props = createValidProps();
      const { isValidData } = useRating(props);

      expect(isValidData.value).toBe(true);

      props.max.value = 1;

      expect(isValidData.value).toBe(false);
    });
  });
});
