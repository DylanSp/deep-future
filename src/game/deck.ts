import type { Immutable } from "immer";
import { original, produce } from "immer";
import type { Card } from "./card";
import type { Rank, Suit } from "./commonTypes";

type Deck = {
  drawPile: Immutable<Array<Card>>; // 0th element = top of deck
  discardPile: Immutable<Array<Card>>; // 0th element = bottom of discard (shouldn't generally matter)
};

export function createBlankCard(deck: Deck): [Deck, Card] {
  const [deck1, rank] = getRandomRank(deck);
  const [deck2, suit] = getRandomSuit(deck1);
  const newCard: Card = {
    kind: "blank",
    rank,
    suit,
  };
  return [deck2, newCard];
}

function getRandomRank(deck: Deck): [Deck, Rank] {
  const [deckWithoutDraw, drawnCard] = drawCard(deck);
  const rank = drawnCard.rank;
  const deckWithDiscard = discardCard(deckWithoutDraw, drawnCard);
  return [deckWithDiscard, rank];
}

function getRandomSuit(deck: Deck): [Deck, Suit] {
  const [deckWithoutDraw, drawnCard] = drawCard(deck);
  const suit = drawnCard.suit;
  const deckWithDiscard = discardCard(deckWithoutDraw, drawnCard);
  return [deckWithDiscard, suit];
}

// assumes there's at least one card in either the draw pile or the discard pile
function drawCard(deck: Deck): [Deck, Card] {
  let drawnCard: Card;

  const newDeck = produce(deck, (draft) => {
    if (original(draft.drawPile.length) === 0) {
      // shuffle discard pile to make new deck
      draft.drawPile = shuffle(original(draft.discardPile)!);
      draft.discardPile = [];
    }

    drawnCard = draft.drawPile.pop()!; // non-null assertion needed because pop() can return undefined on an empty array
  });

  // @ts-expect-error - Supress error about drawnCard not being assigned; the produce() call will always run first
  return [newDeck, drawnCard];
}

function discardCard(deck: Deck, card: Card): Deck {
  const originals = {
    deck,
    card,
  };

  const result = produce(originals, (draft) => {
    const { deck: draftDeck, card: draftCard } = draft;
    draftDeck.discardPile.push(draftCard);
  });

  return result.deck;
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
