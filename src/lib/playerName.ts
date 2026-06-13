const PLAYER_NAME_REGEX = /^[a-zA-Z0-9_]{3,16}$/;
const VALID_CHAR_REGEX = /[a-zA-Z0-9_]/g;
const MAX_LENGTH = 16;

/**
 * Returns true if the name matches the allowed player name pattern:
 * 3-16 characters, alphanumeric and underscores only.
 */
export function isValidPlayerName(name: string): boolean {
  return PLAYER_NAME_REGEX.test(name);
}

/**
 * Strips disallowed characters from the input and truncates to 16 characters.
 * Preserves the relative order of all valid characters from the input.
 */
export function filterPlayerName(input: string): string {
  const matches = input.match(VALID_CHAR_REGEX);
  if (!matches) return "";
  return matches.join("").slice(0, MAX_LENGTH);
}
