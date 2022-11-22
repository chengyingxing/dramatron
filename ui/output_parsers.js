/**
 * Generation-specific output parsers.
 */

import * as prefixes from './prefixes.js';

const PLACE_REGEX = /(Place: )(.*)(.\n)/g;

/**
 * Extracts text from sampled response.
 * @param {Object?} rawSample
 * @return {string}
 */
export function extractText(rawSample) {
  if (!rawSample.choices) return '';
  return rawSample.choices[0].text.trim();
}

/**
 * Extracts title from title response.
 * @param {string} text
 * @return {string}
 */
export function extractTitle(text) {
  if (text.includes(prefixes.TITLE_ELEMENT)) {
    text = text.split(prefixes.TITLE_ELEMENT)[1];
  }
  if (text.includes(prefixes.EXAMPLE_ELEMENT)) {
    text = text.split(prefixes.EXAMPLE_ELEMENT)[0];
  }
  return text;
}

/**
 * Extracts characters from characters response.
 * @param {string} text
 * @return {string}
 */
export function extractCharacters(text) {
  let charactersString = '';
  for (const character of text.split(prefixes.CHARACTER_MARKER)) {
    if (!character.length) continue;
    if (!character.includes(prefixes.DESCRIPTION_MARKER)) continue;
    const characterInfo = character.split(prefixes.DESCRIPTION_MARKER);
    const characterName = characterInfo[0].trim();
    const characterDescription = characterInfo[1].trim();
    charactersString += `${characterName}: ${characterDescription}\n`;
  }
  return charactersString.trim();
}

/**
 * Extracts scene descriptions from scenes response.
 * @param {string} text
 * @return {string}
 */
export function extractScenes(text) {
  return text.split(prefixes.SCENES_MARKER)[1].trim();
}

/**
 * Extracts place names from scenes response.
 * @param {string} scenes
 * @return {!Array<string>}
 */
export function extractPlaceNames(scenes) {
  const places = [];
  for (const place of scenes.matchAll(PLACE_REGEX)) {
    if (place.length >= 3) {
      places.push(place[2]);
    }
  }
  return places;
}

/**
 * Formats place description from place response.
 * @param {string} description
 * @param {string} prefix
 * @return {string}
 */
export function extractPlace(description, prefix) {
  return `${prefix.trim()}\n${description}`;
}