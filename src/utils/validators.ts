/**
 * Validate if the input string is a valid CSS size.
 *
 * @remarks
 * The function tests if the input string matches a CSS size pattern, i.e., a number followed by
 * a valid CSS size unit. The recognized units are px, rem, em, vh, vw, vmin, vmax, and %.
 * 
 * @param size - The size string to validate.
 * @returns A boolean indicating whether the size is valid.
 *
 * @example
 * ```typescript
 * validateSize("100px"); // returns true
 * validateSize("100"); // returns false
 * ```
 */
export function validateSize(size: string): boolean {
  if (!size) return false;
  const sizeRegex = /^[0-9]+(px|rem|em|vh|vw|vmin|vmax|%)$/i;
  return sizeRegex.test(size);
}

/**
 * Validate if the input string is a valid hex color.
 *
 * @remarks
 * The function tests if the input string matches a hex color pattern, i.e., a hash followed by 
 * either three or six hexadecimal digits. This function only validates hex color values.
 * 
 * @param color - The color string to validate.
 * @returns A boolean indicating whether the color is valid.
 *
 * @example
 * ```typescript
 * validateColor("#ffffff"); // returns true
 * validateColor("#fff"); // returns true
 * validateColor("ffffff"); // returns false
 * ```
 */
export function validateColor(color: string): boolean {
  const colorRegex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
  return colorRegex.test(color);
}
