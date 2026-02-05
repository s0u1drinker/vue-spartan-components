import { describe, it, expect } from 'vitest';
import { isNumber, isPositiveNumber, isNonNegativeNumber } from './index';

describe('isNumber', () => {
  const incorrectValues = [
    'строка',
    undefined,
    NaN,
    null,
    true,
    false,
    Infinity,
    -Infinity,
    100n,
  ];

  const correctValues = [45, -78, 0, -12.34];

  it('Не передано значение в функцию.', () => {
    // @ts-ignore
    expect(isNumber()).toBe(false);
  });

  it.each(incorrectValues)('Вернёт false, если значение: %s.', (val) => {
    expect(isNumber(val)).toBe(false);
  });

  it.each(correctValues)('Вернёт true, если значение: %s.', (val) => {
    expect(isNumber(val)).toBe(true);
  });
});

describe('isPositiveNumber', () => {
  it('Не передано значение в функцию.', () => {
    // @ts-ignore
    expect(isPositiveNumber()).toBe(false);
  });

  it('Передана строка с числом.', () => {
    expect(isPositiveNumber('100')).toBe(false);
  });

  it('Передано значение NaN.', () => {
    expect(isPositiveNumber(NaN)).toBe(false);
  });

  it('Передано отрицательное значение.', () => {
    expect(isPositiveNumber(-4)).toBe(false);
  });

  it('Передан ноль.', () => {
    expect(isPositiveNumber(0)).toBe(false);
  });

  it('Передано положительное значение.', () => {
    expect(isPositiveNumber(7)).toBe(true);
  });
});

describe('isNonNegativeNumber', () => {
  it('Не передано значение в функцию.', () => {
    // @ts-ignore
    expect(isNonNegativeNumber()).toBe(false);
  });

  it('Передана строка с числом.', () => {
    expect(isNonNegativeNumber('77')).toBe(false);
  });

  it('Передано значение null.', () => {
    expect(isNonNegativeNumber(null)).toBe(false);
  });

  it('Передано отрицательное значение.', () => {
    expect(isNonNegativeNumber(-17)).toBe(false);
  });

  it('Передан ноль.', () => {
    expect(isNonNegativeNumber(0)).toBe(true);
  });

  it('Передано положительное значение.', () => {
    expect(isNonNegativeNumber(39)).toBe(true);
  });
});
