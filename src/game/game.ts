import type { WorldCard } from "./card";
import type { Deck } from "./deck";

export type Game = {
  neutralWorlds: Array<WorldCard>;
  deck: Deck;
  // TODO - map state
  // TODO - per-player state
};
