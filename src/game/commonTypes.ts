// TODO - is it possible to have a restricted type for Sector, or is that too inconvenient?
// type SectorDigit = "1" | "2" | "3" | "4" | "5" | "6";
// export type Sector = `${SectorDigit}${SectorDigit}`;
export type Sector = string;

// TODO - is it easier to just have type Era = number, use 0 to represent the original era, and adjust the view logic?
export type Era = "O" | number; // O string represents the original era

// TODO - use restricted union type, newtype around number, or just number?
// NOTE: for loop in newCampaign() doesn't work with union type

// export type Rank = 1 | 2 | 3 | 4 | 5 | 6;
export type Rank = number;

export type Suit = "sun" | "moon" | "heart" | "skull" | "hand" | "foot";
