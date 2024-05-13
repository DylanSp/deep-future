import { createHomeworld, type Card, type TechCard, type WorldCard } from "./card";
import type { Era } from "./commonTypes";
import { drawCard, generateBlankCard, generateRandomSector, type Deck } from "./deck";

type Tracks = {
  culture: number; // 0 to 12
  might: number; // -6 to 6
  stability: number; // -6 to 6
  xenoRelations: number;
};

type Tableau = {
  // TODO - need to represent upkeep cubes
  // upper row - can hold upkeep cubes
  homeworld: WorldCard;
  techs: Array<TechCard>;
  settledWorlds: Array<WorldCard>;
};

export type Game = {
  era: Era;

  deck: Deck;
  neutralWorlds: Array<WorldCard>;
  // TODO - map state

  // player state
  tracks: Tracks;
  hand: Array<Card>;
  tableau: Tableau;
};

export function newGame(era: Era, deck: Deck): Game {
  // TODO - choose color? maybe just keep that in UI logic?

  // select homeworld
  const possibleHomeworldCards: Array<Card> = [];
  for (let i = 0; i < 5; i++) {
    const drawnCard = drawCard(deck);
    possibleHomeworldCards.push(drawnCard);
  }

  // TODO - remove type assertion once Typescript 5.5 is released, with inferred type predicates:
  // https://devblogs.microsoft.com/typescript/announcing-typescript-5-5-beta/
  const homeworldOptions: Array<WorldCard> = possibleHomeworldCards.filter(
    (card) => card.kind === "world",
  ) as Array<WorldCard>;

  let homeworld: WorldCard;
  if (homeworldOptions.length !== 0) {
    // TODO - get a choice of homeworld from user input
    homeworld = homeworldOptions[0]; // PLACEHOLDER
  } else {
    // rulebook:
    // "A player that did not receive a homeworld must create
    // and name a new homeworld on a new card in a
    // randomly chosen sector"
    const blankCardForHomeworld = generateBlankCard(deck);
    const homeworldSector = generateRandomSector(deck);

    // TODO - get name from user input
    const name = "";
    homeworld = createHomeworld(blankCardForHomeworld, name, homeworldSector, era);
  }

  const game: Game = {
    era,
    deck,
    neutralWorlds: [],
    tracks: {
      culture: 0,
      might: 0,
      stability: 0,
      xenoRelations: 0,
    },
    hand: [],
    tableau: {
      homeworld,
      techs: [],
      settledWorlds: [],
    },
  };

  // TODO - rest of game setup (rulebook section 1.7)

  return game;
}
