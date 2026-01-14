/**
 * @fileoverview Вспомогательные функции для работы с числами.
 * @description Содержит функции для форматирования, округления и проверки чисел.
 * @version 0.0.1
 */

/**
 * Проверяет, является ли переданное значение числом.
 * @param {*} value - Значение для проверки.
 * @returns {boolean} true, если значение является числом.
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && isFinite(value);
}

/**
 * Проверяет, является ли переданное значение положительным числом.
 * @param {*} value - Значение для проверки.
 * @returns {boolean} true, если значение является положительным число.
 */
export function isPositiveNumber(value: unknown): boolean {
  return isNumber(value) && value > 0;
}

/**
 * Проверяет, является ли переданное значение неотрицательным числом.
 * @param {*} value - Значение для проверки.
 * @returns {boolean} true, если значение является неотрицательным число.
 */
export function isNonNegativeNumber(value: unknown): boolean {
  return isNumber(value) && value >= 0;
}
