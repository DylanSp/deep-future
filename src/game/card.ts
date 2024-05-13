import type { Era, Rank, Sector, Suit } from "./commonTypes";

type CardCommonFields = {
  suit: Suit;
  rank: Rank;
};

export type WorldCard = CardCommonFields & {
  kind: "world";

  name: string;
  sector: Sector;
  era: Era;
  // TODO -  advancements
};

export type TechCard = CardCommonFields & {
  kind: "tech";

  era: Era;
  name?: string;
  // TODO - suits, advancements
};

export type CivilizationCard = CardCommonFields & {
  kind: "civ";

  name: string;
  sector: Sector;
  era: Era;
  homeworldName: string;
  techs: Array<string>;
};

export type BlankCard = CardCommonFields & {
  kind: "blank";
};

export type Card = WorldCard | TechCard | CivilizationCard | BlankCard;

export function createHomeworld(initialCard: BlankCard, name: string, sector: Sector, era: Era): WorldCard {
  const homeworldCard: WorldCard = {
    kind: "world",

    name,
    era,
    sector,
    suit: initialCard.suit,
    rank: initialCard.rank,
  };

  // TODO - add a random starting advancement

  return homeworldCard;
}
