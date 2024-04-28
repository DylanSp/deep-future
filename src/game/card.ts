import type { VariantOf } from "variant";
import { fields, variantModule } from "variant";
import type { Era, Rank, Sector, Suit } from "./commonTypes";

type EmptyObject = Record<string, never>;

// TODO - better, more concise name
const CardTypeSpecificData = variantModule({
  world: fields<{ name: string; sector: Sector; era: Era }>(), // TODO -  advancements
  tech: fields<{ era: Era; name?: string }>(), // TODO - suits, advancements
  civilization: fields<{ name: string; sector: Sector; era: Era; homeworldName: string; techs: Array<string> }>(), // TODO - card effects
  blank: fields<EmptyObject>(),
});
type CardTypeSpecificData = VariantOf<typeof CardTypeSpecificData>;

export type Card = {
  suit: Suit;
  rank: Rank;
  cardTypeSpecificData: CardTypeSpecificData;
};
