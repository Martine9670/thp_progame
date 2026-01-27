export function GameCard(game) {
  return `
    <a href="/game/${game.slug}" data-link class="card">
      <img src="${game.background_image}" />
      <h3>${game.name}</h3>
    </a>
  `;
}
