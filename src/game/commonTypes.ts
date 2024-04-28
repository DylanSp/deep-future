type SectorDigit = "1" | "2" | "3" | "4" | "5" | "6";
export type Sector = `${SectorDigit}${SectorDigit}`;

// TODO - is it easier to just have type Era = number, use 0 to represent the original era, and adjust the view logic?
export type Era = "O" | number; // O string represents the original era

export type Rank = 1 | 2 | 3 | 4 | 5 | 6;
export type Suit = "sun" | "moon" | "heart" | "skull" | "hand" | "foot";
