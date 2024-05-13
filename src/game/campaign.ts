import type { Card, WorldCard } from "./card";
import type { Era, Rank, Sector, Suit } from "./commonTypes";
import type { Deck } from "./deck";
import { createBlankCard, discardCard, generateRandomSector } from "./deck";
import type { Game } from "./game";

type WonderType = "territory" | "population" | "culture" | "might" | "stability" | "xeno";

type Wonder = {
  sector: Sector;
  type: WonderType;
};

type PlayerName = string;

type PreviousGame = {
  era: Era;
  homeworlds: { [n in PlayerName]: WorldCard };
};

type CampaignCommonFields = {
  wonders: Array<Wonder>;
  previousGames: Array<PreviousGame>;
};

type CampaignWithActiveGame = CampaignCommonFields & {
  kind: "activeGame";

  game: Game;
};

type CampaignWithoutGame = CampaignCommonFields & {
  kind: "noGame";

  currentEra: Era;
  deck: Deck;
};

export type Campaign = CampaignWithActiveGame | CampaignWithoutGame;

export function newCampaign(): Campaign {
  const deck: Deck = {
    drawPile: [],
    discardPile: [],
  };

  // initialize deck with the first 36 cards
  const suits: Array<Suit> = ["foot", "hand", "heart", "moon", "skull", "sun"];
  for (const suit of suits) {
    for (let rank: Rank = 1; rank <= 6; rank++) {
      const card: Card = {
        kind: "blank",
        suit,
        rank,
      };
      // put cards in discard pile;
      // as soon as we start drawing, discard pile will be shuffled to form draw pile with all the cards
      deck.discardPile.push(card);
    }
  }

  const campaign: Campaign = {
    kind: "noGame",

    wonders: [],
    previousGames: [],

    currentEra: "O",
    deck,
  };

  for (let i = 0; i < 12; i++) {
    const blankHomeworld = createBlankCard(deck);
    const homeworldSector = generateRandomSector(deck);

    const unnamedHomeworld: WorldCard = {
      kind: "world",

      era: "O",
      name: "",
      rank: blankHomeworld.rank,
      suit: blankHomeworld.suit,
      sector: homeworldSector,
    };
    // TODO - add a random advancement to homeworld

    // TODO - get a name for each world from user input
    // (rulebook says to deal these worlds evenly to players - we're assuming a solo game)

    discardCard(deck, unnamedHomeworld);
  }

  campaign.currentEra = 1;

  return campaign;
}
