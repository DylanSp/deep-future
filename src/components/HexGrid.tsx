import type { ReactElement } from "react";

// hexes are pointy top, compared to the rulebook's flat top; it makes the CSS easier
// CSS taken from this StackOverflow answer: https://stackoverflow.com/a/69432832/5847190
// box-shadow was removed - didn't see what that added

// TODO - this isn't remotely responsive, the width and height of each hex are a fixed number of pixels
export function HexGrid() {
  const rows: Array<ReactElement> = [];
  const hexagonPattern = [4, 5, 6, 7, 6, 5, 4];

  for (const rowSize of hexagonPattern) {
    const row: Array<ReactElement> = [];
    for (let j = 0; j < rowSize; j++) {
      const hex = (
        <div
          style={{
            display: "inline-block",
            width: "100px",
            height: "100px",
            background: "grey",
            margin: "2px",
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }}
        ></div>
      );
      row.push(hex);
    }
    rows.push(<div style={{ marginBottom: "-30px" }}>{...row}</div>);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {...rows}
    </div>
  );
}
