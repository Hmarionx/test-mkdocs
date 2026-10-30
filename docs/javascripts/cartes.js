// Cartes interactives (Leaflet + OpenStreetMap).
// Chaque <div class="carte" id="..."> de la page est rempli à partir de CARTES.
const WIKI = "https://fr.wikipedia.org/wiki/";

const CARTES = {
  "carte-guerre-froide": {
    centre: [35, 40], zoom: 2,
    points: [
      { pos: [52.52, 13.40], titre: "Berlin", texte: "Blocus (1948-1949), mur (1961-1989)", wiki: "Mur_de_Berlin" },
      { pos: [38.0, 127.5], titre: "Corée", texte: "Guerre de Corée (1950-1953), division au 38e parallèle", wiki: "Guerre_de_Corée" },
      { pos: [23.13, -82.38], titre: "Cuba", texte: "Crise des missiles (octobre 1962)", wiki: "Crise_des_missiles_de_Cuba" },
      { pos: [16.0, 107.8], titre: "Viêt Nam", texte: "Engagement américain de 1965 à 1973", wiki: "Guerre_du_Viêt_Nam" },
      { pos: [34.53, 69.17], titre: "Afghanistan", texte: "Invasion soviétique en 1979", wiki: "Guerre_d'Afghanistan_(2001-2021)" },
      { pos: [38.9, -77.04], titre: "Washington", texte: "Capitale du bloc de l'Ouest", wiki: "Doctrine_Truman" },
      { pos: [55.75, 37.62], titre: "Moscou", texte: "Capitale du bloc de l'Est", wiki: "Dissolution_de_l'URSS" }
    ]
  },
  "carte-decolonisation": {
    centre: [15, 40], zoom: 2,
    points: [
      { pos: [28.61, 77.21], titre: "Inde", texte: "Indépendance en 1947", wiki: "Indépendance_de_l'Inde" },
      { pos: [21.39, 103.02], titre: "Diên Biên Phu", texte: "Défaite française en 1954", wiki: "Bataille_de_Diên_Biên_Phu" },
      { pos: [-6.92, 107.61], titre: "Bandung", texte: "Conférence de 1955", wiki: "Conférence_de_Bandung" },
      { pos: [30.0, 32.55], titre: "Canal de Suez", texte: "Crise de 1956", wiki: "Crise_du_canal_de_Suez" },
      { pos: [36.75, 3.06], titre: "Alger", texte: "Guerre d'Algérie (1954-1962)", wiki: "Guerre_d'Algérie" },
      { pos: [5.60, -0.19], titre: "Accra", texte: "Indépendance du Ghana en 1957", wiki: "Décolonisation_de_l'Afrique" },
      { pos: [46.40, 6.59], titre: "Évian-les-Bains", texte: "Accords du 18 mars 1962", wiki: "Accords_d'Évian" }
    ]
  },
  "carte-europe": {
    centre: [49, 10], zoom: 4,
    points: [
      { pos: [48.86, 2.35], titre: "Paris", texte: "Traité de Paris (CECA), 1951", wiki: "Communauté_européenne_du_charbon_et_de_l'acier" },
      { pos: [41.89, 12.50], titre: "Rome", texte: "Traité de Rome (CEE), 1957", wiki: "Traité_de_Rome_(1957)" },
      { pos: [50.85, 5.69], titre: "Maastricht", texte: "Traité de l'Union européenne, 1992", wiki: "Traité_de_Maastricht" },
      { pos: [50.85, 4.35], titre: "Bruxelles", texte: "Commission et Conseil", wiki: "Union_européenne" },
      { pos: [48.58, 7.75], titre: "Strasbourg", texte: "Siège du Parlement européen", wiki: "Union_européenne" },
      { pos: [49.47, 6.36], titre: "Schengen", texte: "Accords sur la libre circulation", wiki: "Accords_de_Schengen" },
      { pos: [51.51, -0.13], titre: "Londres", texte: "Brexit, sortie le 31 janvier 2020", wiki: "Brexit" }
    ]
  },
  "carte-monde-1991": {
    centre: [30, 30], zoom: 2,
    points: [
      { pos: [40.71, -74.01], titre: "New York", texte: "Attentats du 11 septembre 2001", wiki: "Attentats_du_11_septembre_2001" },
      { pos: [29.38, 47.99], titre: "Koweït", texte: "Guerre du Golfe, 1991", wiki: "Guerre_du_Golfe" },
      { pos: [43.86, 18.41], titre: "Sarajevo", texte: "Guerres de Yougoslavie (1991-1999)", wiki: "Guerres_de_Yougoslavie" },
      { pos: [-1.95, 30.06], titre: "Kigali", texte: "Génocide des Tutsi, 1994", wiki: "Génocide_des_Tutsi_au_Rwanda" },
      { pos: [34.53, 69.17], titre: "Kaboul", texte: "Intervention en Afghanistan, 2001", wiki: "Guerre_d'Afghanistan_(2001-2021)" },
      { pos: [33.31, 44.37], titre: "Bagdad", texte: "Intervention en Irak, 2003", wiki: "Guerre_d'Irak" },
      { pos: [44.95, 34.10], titre: "Crimée", texte: "Annexion par la Russie, 2014", wiki: "Annexion_de_la_Crimée_par_la_Russie_en_2014" },
      { pos: [50.45, 30.52], titre: "Kiev", texte: "Invasion russe de l'Ukraine, 2022", wiki: "Invasion_de_l'Ukraine_par_la_Russie_en_2022" }
    ]
  }
};

function creerCarte(id, conf) {
  const el = document.getElementById(id);
  if (!el || el.dataset.ok) return;
  el.dataset.ok = "1";
  const carte = L.map(el, { scrollWheelZoom: false }).setView(conf.centre, conf.zoom);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 12,
    attribution: "&copy; contributeurs <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
  }).addTo(carte);
  conf.points.forEach(function (p) {
    const html = "<strong>" + p.titre + "</strong><br>" + p.texte +
      "<br><a href='" + WIKI + encodeURI(p.wiki) + "' target='_blank' rel='noopener'>Wikipédia</a>";
    L.marker(p.pos).addTo(carte).bindPopup(html);
  });
}

function initCartes() {
  if (typeof L === "undefined") return;
  Object.keys(CARTES).forEach(function (id) { creerCarte(id, CARTES[id]); });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCartes);
} else {
  initCartes();
}
