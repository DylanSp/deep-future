import type { Era, Rank, Sector, Suit } from "./commonTypes";
import type { Immutable } from "immer";

type CardCommonFields = Immutable<{
  suit: Suit;
  rank: Rank;
}>;

export type WorldCard = Immutable<
  CardCommonFields & {
    kind: "world";

    name: string;
    sector: Sector;
    era: Era;
    // TODO -  advancements
  }
>;

type TechCard = Immutable<
  CardCommonFields & {
    kind: "tech";

    era: Era;
    name?: string;
    // TODO - suits, advancements
  }
>;

type CivilizationCard = Immutable<
  CardCommonFields & {
    kind: "civ";

    name: string;
    sector: Sector;
    era: Era;
    homeworldName: string;
    techs: Array<string>;
  }
>;

type BlankCard = Immutable<
  CardCommonFields & {
    kind: "blank";
  }
>;

export type Card = Immutable<WorldCard | TechCard | CivilizationCard | BlankCard>;
