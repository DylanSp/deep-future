import type { ReactElement } from "react";

type SectorDigit = "1" | "2" | "3" | "4" | "5" | "6";
type SectorNumber = `${SectorDigit}${SectorDigit}` | "blackhole";

type HexProps = {
  sectorNumber: SectorNumber; // the number on the rulebook's map; used for gameplay, not a coordinate system
};

// hexes are oriented with the pointy top up, compared to the rulebook's flat top orientation; it makes the CSS easier
// CSS taken from this StackOverflow answer: https://stackoverflow.com/a/69432832/5847190
// box-shadow was removed - I didn't see what that added

// we have to use a lookup table for sector numbers:
// the game's sector numbers don't follow any coordinate system that I can understand
// this also encodes the shape of the map - each sub-array's length is the number of hexes in that row
// sector numbers are taken from the rulebook PDF, reading the map sideways (in the PDF's default orientation)
const SECTOR_NUMBERS: Array<Array<SectorNumber>> = [
  ["21", "22", "23", "31"], // 4 hexes
  ["13", "24", "25", "34", "32"], // 5 hexes
  ["12", "15", "26", "36", "35", "33"], // 6 hexes
  ["11", "14", "16", "blackhole", "46", "44", "41"], // 7 hexes
  ["63", "65", "66", "56", "45", "42"], // 6 hexes
  ["62", "64", "55", "54", "43"], // 5 hexes
  ["61", "53", "52", "51"], // 4 hexes
];

function Hex(props: HexProps) {
  return (
    <div
      style={{
        display: "inline-block",

        // TODO - having fixed width and height like this feels hacky and isn't responsive
        width: "100px",
        height: "100px",
        margin: "2px",

        // these properties ensure that the text doesn't change the hex sizes/mess with the spacing, but it feels hacky
        overflow: "hidden",
        whiteSpace: "nowrap",

        clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        background: "grey",
      }}
    >
      <span>{props.sectorNumber === "blackhole" ? "*" : props.sectorNumber}</span>
      {/* {props.sectorNumber === "blackhole" ? "*" : props.sectorNumber} */}
    </div>
  );
}

export function HexGrid() {
  const hexRows: Array<ReactElement> = [];

  for (const row of SECTOR_NUMBERS) {
    const hexRow: Array<ReactElement> = [];
    for (const sectorNumber of row) {
      const hex = <Hex sectorNumber={sectorNumber} />;
      hexRow.push(hex);
    }
    hexRows.push(<div style={{ marginBottom: "-30px" }}>{...hexRow}</div>);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {...hexRows}
    </div>
  );
}
