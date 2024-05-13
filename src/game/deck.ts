import { produce } from "immer";
import type { Card } from "./card";
import type { Rank, Sector, Suit } from "./commonTypes";

export type Deck = {
  drawPile: Array<Card>; // 0th element = top of deck
  discardPile: Array<Card>; // 0th element = bottom of discard (shouldn't generally matter)
};

export function generateRandomSector(deck: Deck): Sector {
  const firstDigit = generateRandomRank(deck);
  const secondDigit = generateRandomRank(deck);
  const sector = `${firstDigit}${secondDigit}`;
  return sector;
}

export function createBlankCard(deck: Deck): Card {
  const rank = generateRandomRank(deck);
  const suit = generateRandomSuit(deck);
  const newCard: Card = {
    kind: "blank",
    rank,
    suit,
  };
  return newCard;
}

function generateRandomRank(deck: Deck): Rank {
  const drawnCard = drawCard(deck);
  const rank = drawnCard.rank;
  discardCard(deck, drawnCard);
  return rank;
}

function generateRandomSuit(deck: Deck): Suit {
  const drawnCard = drawCard(deck);
  const suit = drawnCard.suit;
  discardCard(deck, drawnCard);
  return suit;
}

// assumes there's at least one card in either the draw pile or the discard pile
function drawCard(deck: Deck): Card {
  if (deck.drawPile.length === 0) {
    // shuffle discard pile to make new deck
    deck.drawPile = shuffle(deck.discardPile);
    deck.discardPile = [];
  }

  // non-null assertion needed because pop() can return undefined on an empty array,
  // but we know from preconditions and shuffling discard pile in that drawPile won't be empty
  const drawnCard = deck.drawPile.pop()!;
  return drawnCard;
}

export function discardCard(deck: Deck, card: Card) {
  deck.discardPile.push(card);
}

// Fisher-Yates shuffle
// implementation from https://stackoverflow.com/a/2450976/5847190
function shuffle<T>(arr: Array<T>): Array<T> {
  const shuffledArr = produce(arr, (draft) => {
    let currentIndex = draft.length;
    while (currentIndex !== 0) {
      // pick an element from the section of the array before currentIndex (not yet shuffled)
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [draft[currentIndex], draft[randomIndex]] = [draft[randomIndex], draft[currentIndex]];
    }
  });
  return shuffledArr;
}
