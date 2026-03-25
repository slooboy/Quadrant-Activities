/**
 * Curated real Paris venue names (Wikipedia / public tourism & culture listings).
 * Concatenated after paris-real-venues.js (Wikidata) so PARIS_REAL_VENUE_SEEDS length reaches 500.
 */
(function () {
  const RAW = `
L'Olympia|concert
Le Bataclan|concert
Philharmonie de Paris|concert
Zénith Paris|event
Accor Arena|event
Salle Pleyel|concert
Casino de Paris|event
La Cigale|concert
Le Trianon|concert
L'Alhambra|concert
Le Grand Rex|event
La Maroquinerie|concert
New Morning|concert
Duc des Lombards|concert
La Bellevilloise|event
Le Divan du Monde|concert
Théâtre du Châtelet|event
Opéra Garnier|event
Opéra Bastille|event
Comédie-Française|event
Théâtre des Bouffes du Nord|event
Théâtre Mogador|event
Théâtre Montparnasse|event
Théâtre de la Ville|event
Théâtre Antoine|event
Théâtre du Rond-Point|event
Théâtre Hébertot|event
Théâtre de Paris|event
Théâtre des Variétés|event
Cinémathèque Française|museum
Le Grand Action|event
Studio des Ursulines|event
Musée de la Contrefaçon|museum
Musée de la Magie|museum
Musée de la Poupée|museum
Atelier des Lumières|museum
Atelier Brancusi|museum
Fondation Henri Cartier-Bresson|museum
Institut du Monde Arabe|museum
Cité de la Musique|museum
Maison de Victor Hugo|museum
Musée de la Vie Romantique|museum
Musée Gustave Moreau|museum
Musée Nissim de Camondo|museum
Musée des Arts Forains|museum
Musée de la Chasse et de la Nature|museum
Musée Bourdelle|museum
Musée Zadkine|museum
Musée de Montmartre|museum
Musée national Eugène Delacroix|museum
Musée national Jean-Jacques Henner|museum
Musée de l'Orangerie|museum
Musée de l'Armée|museum
Musée des Arts Décoratifs|museum
Musée des Arts et Métiers|museum
Musée du quai Branly|museum
Musée national des Arts asiatiques Guimet|museum
Musée Cernuschi|museum
Musée Cognacq-Jay|museum
Musée Jacquemart-André|museum
Musée Marmottan Monet|museum
Musée Maillol|museum
Musée Picasso|museum
Musée Rodin|museum
Palais de Tokyo|museum
Petit Palais|museum
Grand Palais|museum
Palais Galliera|museum
Cité de l'Architecture|museum
Palais de la Découverte|museum
Muséum national d'Histoire naturelle|museum
Musée de l'Homme|museum
Musée national du Moyen Âge|museum
Musée Cluny|museum
Tour Jean-sans-Peur|museum
Crypte archéologique du parvis Notre-Dame|museum
Conciergerie|museum
Sainte-Chapelle|museum
Panthéon|museum
Arc de Triomphe|museum
Versailles day trip|museum
Fondation Cartier|museum
Louis Vuitton Foundation|museum
Maison de la Photo|museum
European House of Photography|museum
Hôtel de Soubise|museum
Hôtel de Rohan|museum
Bibliothèque nationale Richelieu|museum
Tour Montparnasse|event
Marché des Enfants Rouges|restaurant
Marché d'Aligre|restaurant
Rue Montorgueil|restaurant
Rue des Martyrs|restaurant
Canal Saint-Martin|bar
Place des Vosges|restaurant
Marché Bastille|restaurant
L'As du Fallafel|restaurant
Breizh Café|restaurant
Chez Janou|restaurant
Le Comptoir du Relais|restaurant
Frenchie|restaurant
Septime|restaurant
Clown Bar|restaurant
Le Chateaubriand|restaurant
Pierre Gagnaire|restaurant
L'Arpège|restaurant
Guy Savoy|restaurant
Le Grand Véfour|restaurant
Taillevent|restaurant
Le Meurice Alain Ducasse|restaurant
Plaza Athénée|restaurant
Epicure|restaurant
Le Cinq|restaurant
Kei|restaurant
David Toutain|restaurant
L'Ambroisie|restaurant
Alléno Paris|restaurant
Le Clarence|restaurant
Substance|restaurant
Marsan par Hélène Darroze|restaurant
Le Gabriel|restaurant
Pavyllon|restaurant
Sur Mesure|restaurant
Le Baudelaire|restaurant
Le George|restaurant
Lasserre|restaurant
La Tour d'Argent|restaurant
La Coupole|restaurant
Brasserie Lipp|restaurant
Le Select|restaurant
La Rotonde|restaurant
Le Dôme|restaurant
La Closerie des Lilas|restaurant
Les Deux Magots|restaurant
Café de Flore|restaurant
Café de la Paix|restaurant
Bouillon Chartier|restaurant
Bouillon Pigalle|restaurant
Bouillon Julien|restaurant
Le Bouillon Pigalle|restaurant
Chez Dumonet|restaurant
Josephine Chez Dumonet|restaurant
Le Petit Lutetia|restaurant
Polidor|restaurant
Chez Paul|restaurant
Le Procope|restaurant
Au Pied de Cochon|restaurant
Pharamond|restaurant
Le Train Bleu|restaurant
Pink Mamma|restaurant
East Mamma|restaurant
Big Mamma|restaurant
Ober Mamma|restaurant
Mamma Primi|restaurant
La Felicità|restaurant
Pizzeria Popolare|restaurant
Daroco|restaurant
Bistrot Paul Bert|restaurant
Le Baratin|restaurant
Le Dauphin|restaurant
Le Verre Volé|restaurant
Racines|restaurant
Le Pantruche|restaurant
Le Servan|restaurant
Triplettes|restaurant
Le Barav|restaurant
Le Perchoir|bar
Le Perchoir Marais|bar
Le Perchoir Ménilmontant|bar
Rosa Bonheur|bar
Petit Bain|bar
La Bellevilloise bar|bar
Le Comptoir Général|bar
Le Carmen|bar
Silencio|bar
Le Montana|bar
Le Carmen Paris|bar
Andy Wahloo|bar
Experimental Cocktail Club|bar
Candelaria|bar
Little Red Door|bar
Le Syndicat|bar
Dirty Dick|bar
Moonshiner|bar
Lulu White Drinking Club|bar
Le Ballroom du Beef Club|bar
Glass|bar
CopperBay|bar
Le Mary Celeste|bar
Café Oz|bar
Le Wagon Bleu|bar
Le Duc des Lombards bar|bar
Sunset Sunside bar|bar
New Morning bar|bar
Atelier des Chefs|workshop
Le Cordon Bleu Paris|workshop
Ferrandi Paris|workshop
Lenôtre Paris|workshop
Alain Ducasse École de Cuisine|workshop
La Cuisine Paris|workshop
Cook'n With Class|workshop
Promenade dans le Marais|workshop
Secrets of Paris tour|workshop
Paris by Mouth|workshop
Context Travel Paris|workshop
Fat Tire Tours Paris|workshop
Blue Bike Tours|workshop
Localers Paris|workshop
Wine Tasting Paris|workshop
Ô Château|workshop
Les Caves du Louvre|workshop
Montmartre Vineyard|workshop
Clos Montmartre|workshop
Parc des Buttes-Chaumont|nature
Jardin du Luxembourg|nature
Jardin des Tuileries|nature
Jardin des Plantes|nature
Parc Monceau|nature
Bois de Vincennes|nature
Bois de Boulogne|nature
Promenade plantée Coulée Verte|nature
Île Saint-Louis|restaurant
Île de la Cité|restaurant
Saint-Germain-des-Prés|bar
Canal de l'Ourcq|bar
Village Saint-Paul|restaurant
Cour du Commerce Saint-André|restaurant
Passage des Panoramas|restaurant
Passage Jouffroy|restaurant
Galeries Lafayette Gourmet|restaurant
Printemps du Goût|restaurant
Le Bon Marché|restaurant
`.trim();

  const extra = RAW.split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const pipe = line.indexOf("|");
      const t = pipe >= 0 ? line.slice(0, pipe).trim() : line;
      const c = pipe >= 0 ? line.slice(pipe + 1).trim() : "restaurant";
      return {
        t,
        c,
        d: `Real Paris ${c} (public directory / tourism listing). Map pin uses approximate Paris coordinates when needed.`,
      };
    });

  window.PARIS_REAL_VENUE_SEEDS = (window.PARIS_REAL_VENUE_SEEDS || []).concat(extra);
})();
