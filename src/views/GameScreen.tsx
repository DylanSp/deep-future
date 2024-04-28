// the main view when playing a game, displaying the map, the player's hand, the player's tableau, tracks, and neutral worlds

import { HexGrid } from "../components/HexGrid";

export function GameScreen() {
  return (
    <div
      style={{
        display: "grid",
        // TODO - probably specify row/column sizes, aim to keep the third row (showing the player's hand) at ~1/3 of the screen
        // gridTemplateRows: "1fr 1fr 1fr",
        // gridTemplateColumns: "1fr 1fr 1fr",

        // these are identifiers referencing child elements' grid-area values
        // see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Grid_template_areas
        gridTemplateAreas: `
        'neutral neutral deck'
        'tableau map tracks'
        'hand hand hand'
      `,
      }}
    >
      <div
        style={{
          gridArea: "neutral",
        }}
      >
        <span>Neutral worlds</span>
      </div>
      <div
        style={{
          gridArea: "deck",
        }}
      >
        <span>Deck</span>
      </div>
      <div
        style={{
          gridArea: "tableau",
        }}
      >
        <span>Tableau</span>
      </div>
      <div
        style={{
          gridArea: "map",
        }}
      >
        <HexGrid />
      </div>
      <div
        style={{
          gridArea: "tracks",
        }}
      >
        <span>Tracks</span>
      </div>
      <div
        style={{
          gridArea: "hand",
        }}
      >
        <span>Hand</span>
      </div>
    </div>
  );
}
