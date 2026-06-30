import { readDeckFromBackend } from "./deck-backend";

export async function readOutputDeck() {
  return readDeckFromBackend();
}
