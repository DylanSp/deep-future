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

type TechCard = CardCommonFields & {
  kind: "tech";

  era: Era;
  name?: string;
  // TODO - suits, advancements
};

type CivilizationCard = CardCommonFields & {
  kind: "civ";

  name: string;
  sector: Sector;
  era: Era;
  homeworldName: string;
  techs: Array<string>;
};

type BlankCard = CardCommonFields & {
  kind: "blank";
};

export type Card = WorldCard | TechCard | CivilizationCard | BlankCard;
