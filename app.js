(function () {
  const DESIGN_W = 1179;
  const DESIGN_H = 2556;

  function updateFitScale() {
    const shell = document.getElementById("scaleShell");
    if (!shell) return;
    const sx = window.innerWidth / DESIGN_W;
    const sy = window.innerHeight / DESIGN_H;
    shell.style.setProperty("--fit-scale", String(Math.min(sx, sy)));
  }

  window.addEventListener("resize", updateFitScale);
  window.addEventListener("orientationchange", () => {
    requestAnimationFrame(updateFitScale);
  });
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateFitScale);
  } else {
    updateFitScale();
  }
})();

(function () {
  const ACTIVITY_CATEGORIES = [
    "live music",
    "restaurant",
    "nature",
    "class",
    "museum",
    "theatre",
    "cinema",
    "sports",
    "shopping",
    "nightlife",
    "coffee & cafés",
    "walking tour",
    "kids & family",
    "art gallery",
    "spa & wellness",
    "workshop",
  ];

  /** @type {{ label: string; image: string; fallback: string }[]} */
  const MOOD_CARDS = [
    {
      label: "adventuresome",
      image:
        "https://images.unsplash.com/photo-1454496522488-7a8e0e996dd3?auto=format&fit=crop&w=1200&q=85",
      fallback:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=85",
    },
    {
      label: "romantic",
      image:
        "https://images.unsplash.com/photo-1516589178581-6cd78383a4d1?auto=format&fit=crop&w=1200&q=85",
      fallback:
        "https://images.unsplash.com/photo-1529634597503-139d3726fed5?auto=format&fit=crop&w=1200&q=85",
    },
    {
      label: "tranquil",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
      fallback:
        "https://images.unsplash.com/photo-1470071459604-96b6937e0e0a?auto=format&fit=crop&w=1200&q=85",
    },
    {
      label: "curious",
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=85",
      fallback:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=85",
    },
    {
      label: "hungry",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9fc836?auto=format&fit=crop&w=1200&q=85",
      fallback:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=85",
    },
    {
      label: "nostalgic",
      image:
        "https://images.unsplash.com/photo-1516979187457-637627e2e561?auto=format&fit=crop&w=1200&q=85",
      fallback:
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=85",
    },
    {
      label: "antsy",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=85",
      fallback:
        "https://images.unsplash.com/photo-1517963879433-43165446c5bc?auto=format&fit=crop&w=1200&q=85",
    },
    {
      label: "thirsty",
      image:
        "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1200&q=85",
      fallback:
        "https://images.unsplash.com/photo-1514362548677-3f4468a84189?auto=format&fit=crop&w=1200&q=85",
    },
    {
      label: "crafty",
      image:
        "https://images.unsplash.com/photo-1452860606247-bbef30c4ea17?auto=format&fit=crop&w=1200&q=85",
      fallback:
        "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=1200&q=85",
    },
    {
      label: "creative",
      image:
        "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=85",
      fallback:
        "https://images.unsplash.com/photo-1513475382583-d06e58bcb0e0?auto=format&fit=crop&w=1200&q=85",
    },
    {
      label: "poetic",
      image:
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=85",
      fallback:
        "https://images.unsplash.com/photo-1507840410988-562e0461d943?auto=format&fit=crop&w=1200&q=85",
    },
    {
      label: "readerly",
      image:
        "https://images.unsplash.com/photo-1524578271616-d227ffa33be7?auto=format&fit=crop&w=1200&q=85",
      fallback:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=85",
    },
    {
      label: "pious",
      image:
        "https://images.unsplash.com/photo-1438032007031-6dd6634caf23?auto=format&fit=crop&w=1200&q=85",
      fallback:
        "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1200&q=85",
    },
    {
      label: "splashy",
      image:
        "https://images.unsplash.com/photo-1505142468610-359e7d316be0?auto=format&fit=crop&w=1200&q=85",
      fallback:
        "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1200&q=85",
    },
    {
      label: "penniless",
      image:
        "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1200&q=85",
      fallback:
        "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=85",
    },
  ];

  /** @type {L.Map | null} */
  let mapInstance = null;

  /** @type {L.Marker | null} */
  let parisEventMarker = null;

  /** Small dots for other events in the active time row (no address labels). */
  /** @type {L.LayerGroup | null} */
  let parisRowDotMarkersLayer = null;

  /** Invalidates in-flight row-dot geocode refreshes when the row or map state changes. */
  let parisRowDotsRefreshGen = 0;

  /** Set by `initEventsCarousel` — `{ timeRow, events }` for the selected time row from `baseFilteredList`. */
  let getParisRowEventsForMap = () => ({ timeRow: "today", events: /** @type {any[]} */ [] });

  /** Set by `initEventsCarousel` — focuses the events carousel on an event id (e.g. map row-dot click). */
  let selectPresentationEventById = (/** @type {number} */ _id) => {};

  /** Centered carousel event (synced from `fillSlides`) for map default view */
  /** @type {{ lat: number; lng: number; title?: string; image?: string; address?: string; streetLine?: string } | null} */
  let currentParisEvent = null;

  /** Geocoded coords from address (Photon); falls back to `ev.lat`/`ev.lng` until resolved */
  const resolvedCoordsById = new Map();
  /** Ids where Photon returned no usable hit (avoid repeat requests) */
  const geocodeUnresolvableIds = new Set();
  /** @type {Map<number, Promise<void>>} */
  const geocodeInflight = new Map();

  /** Paris bbox (lon,lat) — keeps Photon results inside the city */
  const PARIS_PHOTON_BBOX = "2.224,48.815,2.469,48.902";

  /**
   * @param {{ id?: number; lat: number; lng: number }} ev
   */
  function getCoordsForEvent(ev) {
    if (!ev) return { lat: NaN, lng: NaN };
    if (ev.id == null) return { lat: ev.lat, lng: ev.lng };
    const r = resolvedCoordsById.get(ev.id);
    if (r && Number.isFinite(r.lat) && Number.isFinite(r.lng)) return r;
    return { lat: ev.lat, lng: ev.lng };
  }

  function coordsInParisBox(lat, lng) {
    return (
      Number.isFinite(lat) &&
      Number.isFinite(lng) &&
      lat >= 48.815 &&
      lat <= 48.902 &&
      lng >= 2.224 &&
      lng <= 2.469
    );
  }

  /**
   * @param {string} q
   * @returns {Promise<{ lat: number; lng: number } | null>}
   */
  async function photonGeocodeOneQuery(q) {
    async function fetchFeatures(useBbox) {
      const params = new URLSearchParams({ q, limit: "8", lang: "fr" });
      if (useBbox) params.set("bbox", PARIS_PHOTON_BBOX);
      const res = await fetch(`https://photon.komoot.io/api/?${params.toString()}`);
      if (!res.ok) return [];
      const data = await res.json();
      return data.features || [];
    }
    let features = await fetchFeatures(true);
    if (!features.length) features = await fetchFeatures(false);
    for (const f of features) {
      if (!f.geometry || !Array.isArray(f.geometry.coordinates)) continue;
      const [lng, lat] = f.geometry.coordinates;
      if (coordsInParisBox(lat, lng)) return { lat, lng };
    }
    return null;
  }

  /**
   * Geocode many events in small batches (Photon); avoids hammering the API.
   * @param {any[]} events
   * @param {number} [chunkSize]
   */
  async function geocodeEventsInChunks(events, chunkSize = 4) {
    for (let i = 0; i < events.length; i += chunkSize) {
      const slice = events.slice(i, i + chunkSize);
      await Promise.allSettled(slice.map((ev) => geocodeEventAddress(ev)));
    }
  }

  /**
   * Resolve accurate lat/lng from `ev.address` via Photon (OSM-backed), cached per id.
   * Tries full address, then street line variants — picks first result inside the Paris bbox.
   * @param {{ id?: number; address?: string; streetLine?: string; lat: number; lng: number }} ev
   */
  function geocodeEventAddress(ev) {
    if (!ev || ev.id == null) return Promise.resolve();
    if (resolvedCoordsById.has(ev.id)) return Promise.resolve();
    if (geocodeUnresolvableIds.has(ev.id)) return Promise.resolve();
    const existing = geocodeInflight.get(ev.id);
    if (existing) return existing;

    const p = (async () => {
      const parts = [];
      if (ev.address && String(ev.address).trim()) parts.push(String(ev.address).trim());
      if (ev.streetLine && String(ev.streetLine).trim()) {
        const s = String(ev.streetLine).trim();
        parts.push(`${s}, Paris, France`);
        parts.push(`${s}, Paris`);
      }
      if (!parts.length) parts.push(`${ev.streetLine || ""}, Paris, France`.trim() || "Paris, France");
      const uniq = [...new Set(parts)];
      try {
        for (const q of uniq) {
          const hit = await photonGeocodeOneQuery(q);
          if (hit) {
            resolvedCoordsById.set(ev.id, hit);
            return;
          }
        }
        geocodeUnresolvableIds.add(ev.id);
      } catch (_) {
        /* synthetic coords in events-data remain */
      } finally {
        geocodeInflight.delete(ev.id);
      }
    })();

    geocodeInflight.set(ev.id, p);
    return p;
  }

  const overlays = {
    map: document.getElementById("overlay-map"),
    people: document.getElementById("overlay-people"),
    activities: document.getElementById("overlay-activities"),
    mood: document.getElementById("overlay-mood"),
  };

  const corners = Array.from(document.querySelectorAll(".presentation-corner[data-overlay]"));

  /** Set by `initEventsCarousel`; reapplies WHY / WHAT / WHO filters to the feed. */
  let refreshEventFilter = () => {
    updateCornerFilterBadges();
  };

  /** Set by `initMoodDeckIfNeeded`; clears WHY selections and internal state. */
  let clearAllMoodSelections = () => {};

  const FILTER_PICK_MIN = 5;
  const FILTER_SCORE_TAIL = 0.62;
  /** Carousel always shows at least this many events when the dataset has enough (scalar-ranked). */
  const MIN_CAROUSEL_EVENTS = 2;

  function stableHash32(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619);
    return h >>> 0;
  }

  /** Stable string for the current WHY / WHAT / WHO selection (order-independent). */
  function filterSelectionKey(sel) {
    const w = [...sel.whys].sort();
    const t = [...sel.whats].sort();
    const o = [...sel.whos].sort();
    return `w:${w.join(",")}|t:${t.join(",")}|o:${o.join(",")}`;
  }

  function getFilterState() {
    const whys = new Set();
    document.querySelectorAll(".mood-card[aria-pressed='true']").forEach((el) => {
      const l = el.dataset.moodLabel;
      if (l) whys.add(l);
    });
    const whats = new Set();
    document.querySelectorAll(".activity-chip[aria-pressed='true']").forEach((el) => {
      whats.add(el.textContent.trim().toLowerCase());
    });
    const whos = new Set();
    document.querySelectorAll(".people-card[aria-pressed='true']").forEach((el) => {
      const lab = el.querySelector(".people-card__label");
      if (lab) whos.add(lab.textContent.trim().toLowerCase());
    });
    return { whys, whats, whos };
  }

  function updateCornerFilterBadges() {
    const sel = getFilterState();
    const nWho = sel.whos.size;
    const nWhat = sel.whats.size;
    const nWhy = sel.whys.size;

    function apply(btn, n) {
      if (!btn) return;
      const badge = btn.querySelector(".presentation-corner__filter-badge");
      if (!badge) return;
      if (n <= 0) {
        badge.hidden = true;
        badge.textContent = "";
        badge.setAttribute("aria-hidden", "true");
        btn.classList.remove("presentation-corner--has-filters");
      } else {
        badge.hidden = false;
        badge.textContent = String(n);
        badge.setAttribute("aria-hidden", "false");
        btn.classList.add("presentation-corner--has-filters");
      }
    }

    apply(document.querySelector(".presentation-corner--tr"), nWho);
    apply(document.querySelector(".presentation-corner--bl"), nWhat);
    apply(document.querySelector(".presentation-corner--br"), nWhy);
  }

  /**
   * @param {any[]} events
   * @param {(ev: any) => number} getScore
   * @param {{ pickMin?: number; pickMax?: number; scoreTail?: number }} [opts]
   */
  function pickTopByScalar(events, getScore, opts = {}) {
    const pickMin = opts.pickMin ?? FILTER_PICK_MIN;
    const pickMax = opts.pickMax ?? 20;
    const scoreTail = opts.scoreTail ?? FILTER_SCORE_TAIL;
    const scored = events
      .map((ev) => ({ ev, s: getScore(ev) }))
      .sort((a, b) => b.s - a.s);
    if (!scored.length) return [];
    const top = scored[0].s;
    const out = [];
    for (let i = 0; i < scored.length && out.length < pickMax; i++) {
      const { ev, s } = scored[i];
      if (out.length >= pickMin && top > 0 && s < top * scoreTail) break;
      out.push(ev);
    }
    return out;
  }

  /**
   * Max scalar among currently selected tags (for ordering the union).
   * @param {any} ev
   * @param {{ whys: Set<string>; whats: Set<string>; whos: Set<string> }} sel
   */
  function maxSelectedScalar(ev, sel) {
    let m = 0;
    for (const label of sel.whys) m = Math.max(m, ev.why?.[label] ?? 0);
    for (const label of sel.whats) m = Math.max(m, ev.what?.[label] ?? 0);
    for (const label of sel.whos) m = Math.max(m, ev.who?.[label] ?? 0);
    return m;
  }

  /**
   * Scalar used to rank events for display padding. With no chips selected, spreads ties deterministically.
   * @param {any} ev
   * @param {{ whys: Set<string>; whats: Set<string>; whos: Set<string> }} sel
   */
  function maxScalarForDisplay(ev, sel) {
    const n = sel.whys.size + sel.whats.size + sel.whos.size;
    if (n === 0) return 0.5 + (Number(ev.id) % 10007) / 1e8;
    return maxSelectedScalar(ev, sel);
  }

  function dedupeEventsById(list) {
    const seen = new Set();
    const out = [];
    for (const ev of list) {
      if (seen.has(ev.id)) continue;
      seen.add(ev.id);
      out.push(ev);
    }
    return out;
  }

  /**
   * Ensures at least `min` events by appending highest scalar matches from `universe` (does not reorder existing head).
   * @param {any[]} list
   * @param {{ whys: Set<string>; whats: Set<string>; whos: Set<string> }} sel
   * @param {any[]} universe
   * @param {number} min
   */
  function ensureMinScalarMatches(list, sel, universe, min) {
    const out = dedupeEventsById(list);
    if (out.length >= min) return out;
    const seen = new Set(out.map((e) => e.id));
    const sorted = [...universe]
      .filter((ev) => !seen.has(ev.id))
      .sort((a, b) => maxScalarForDisplay(b, sel) - maxScalarForDisplay(a, sel));
    for (const ev of sorted) {
      out.push(ev);
      if (out.length >= min) break;
    }
    return out;
  }

  /**
   * Time-row slice; pads to `min` using scalar-ranked events from `list` then `universe`, preferring `timeRow` first.
   */
  function sliceTimeRowWithPadding(list, sel, universe, timeRow, min, getTimeRow) {
    const byScalar = [...list].sort((a, b) => maxScalarForDisplay(b, sel) - maxScalarForDisplay(a, sel));
    let sliced = dedupeEventsById(list.filter((ev) => getTimeRow(ev) === timeRow));
    if (sliced.length >= min) return sliced;

    const seen = new Set(sliced.map((e) => e.id));
    for (const ev of byScalar) {
      if (seen.has(ev.id)) continue;
      if (getTimeRow(ev) !== timeRow) continue;
      sliced.push(ev);
      seen.add(ev.id);
      if (sliced.length >= min) return sliced;
    }
    for (const ev of byScalar) {
      if (seen.has(ev.id)) continue;
      sliced.push(ev);
      seen.add(ev.id);
      if (sliced.length >= min) return sliced;
    }
    const uniSorted = [...universe].sort((a, b) => maxScalarForDisplay(b, sel) - maxScalarForDisplay(a, sel));
    for (const ev of uniSorted) {
      if (seen.has(ev.id)) continue;
      if (getTimeRow(ev) !== timeRow) continue;
      sliced.push(ev);
      seen.add(ev.id);
      if (sliced.length >= min) return sliced;
    }
    for (const ev of uniSorted) {
      if (seen.has(ev.id)) continue;
      sliced.push(ev);
      seen.add(ev.id);
      if (sliced.length >= min) return sliced;
    }
    return sliced;
  }

  /**
   * Union of top matches per selected tag, ordered by strongest match across selected tags.
   * Counts **tags** (WHY + WHAT + WHO chips), not overlay panels.
   * — 1 tag: variable top list (about 5–25) for that tag only.
   * — 2 tags: union per tag, then cap at 50 (typical union size centers ~15).
   * — 3+ tags: same per-tag rule as 2 tags, no union cap.
   * @param {any[]} ALL_EVENTS
   * @param {{ whys: Set<string>; whats: Set<string>; whos: Set<string> }} sel
   */
  function buildUnionFilteredList(ALL_EVENTS, sel) {
    const { whys, whats, whos } = sel;
    const nSel = whys.size + whats.size + whos.size;
    const h = stableHash32(filterSelectionKey(sel));

    /** Per-tag ceiling (elbow may stop earlier). */
    let perTagPickMax;
    /** Max union size after dedupe + sort (Infinity = no cap). */
    let unionCap;

    if (nSel <= 1) {
      perTagPickMax = 5 + (h % 21);
      unionCap = perTagPickMax;
    } else if (nSel === 2) {
      perTagPickMax = 9 + (h % 8);
      unionCap = 50;
    } else {
      perTagPickMax = 9 + (h % 8);
      unionCap = Number.MAX_SAFE_INTEGER;
    }

    const pickOpts = { pickMin: FILTER_PICK_MIN, pickMax: perTagPickMax };

    const bestById = new Map();

    function consider(ev) {
      const s = maxSelectedScalar(ev, sel);
      const prev = bestById.get(ev.id);
      if (!prev || s > prev.score) bestById.set(ev.id, { ev, score: s });
    }

    for (const label of whys) {
      pickTopByScalar(ALL_EVENTS, (e) => e.why?.[label] ?? 0, pickOpts).forEach(consider);
    }
    for (const label of whats) {
      pickTopByScalar(ALL_EVENTS, (e) => e.what?.[label] ?? 0, pickOpts).forEach(consider);
    }
    for (const label of whos) {
      pickTopByScalar(ALL_EVENTS, (e) => e.who?.[label] ?? 0, pickOpts).forEach(consider);
    }

    const merged = [...bestById.values()].sort((a, b) => b.score - a.score);
    return merged.slice(0, unionCap).map((x) => x.ev);
  }

  function resetAllToFullList() {
    clearAllMoodSelections();
    document.querySelectorAll(".activity-chip[aria-pressed='true']").forEach((btn) => {
      btn.setAttribute("aria-pressed", "false");
    });
    document.querySelectorAll(".people-card[aria-pressed='true']").forEach((btn) => {
      btn.setAttribute("aria-pressed", "false");
    });
    lastChatQuery = "";
    llmOrderedChatIds = null;
    const chatInput = document.getElementById("chat-input");
    if (chatInput) chatInput.value = "";
    refreshEventFilter();
  }

  let lastChatQuery = "";
  /** @type {number[] | null} LLM semantic filter (ordered ids, may be empty). Null ⇒ use local keyword fallback. */
  let llmOrderedChatIds = null;

  const CHAT_STOPWORDS = new Set([
    "the",
    "a",
    "an",
    "for",
    "and",
    "or",
    "to",
    "in",
    "on",
    "at",
    "with",
    "my",
    "me",
    "we",
    "our",
    "some",
    "any",
    "get",
    "go",
    "is",
    "it",
    "be",
    "are",
    "this",
    "that",
    "what",
    "how",
    "",
  ]);

  function tokenizeChatQuery(q) {
    return String(q)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/gi, " ")
      .split(/\s+/)
      .filter((t) => t.length > 1 && !CHAT_STOPWORDS.has(t));
  }

  function expandChatTokens(toks) {
    const out = new Set(toks);
    for (const t of toks) {
      if (t.length > 3 && t.endsWith("s")) out.add(t.slice(0, -1));
    }
    return [...out];
  }

  function scoreEventForChat(ev, toks) {
    const expanded = expandChatTokens(toks);
    let s = 0;
    const title = (ev.title || "").toLowerCase();
    const desc = (ev.description || "").toLowerCase();
    const cat = (ev.category || "").toLowerCase();
    const tagStr = (ev.whyTags || []).join(" ").toLowerCase();
    const why = ev.why && typeof ev.why === "object" ? ev.why : null;
    const what = ev.what && typeof ev.what === "object" ? ev.what : null;
    const who = ev.who && typeof ev.who === "object" ? ev.who : null;
    for (const t of expanded) {
      if (title.includes(t)) s += 5;
      if (cat.includes(t)) s += 5;
      if (desc.includes(t)) s += 2;
      if (tagStr.includes(t)) s += 4;
      if (why) {
        for (const [k, v] of Object.entries(why)) {
          if (k.includes(t) || t.includes(k)) s += 5 * v;
        }
      }
      if (what) {
        for (const [k, v] of Object.entries(what)) {
          if (k.includes(t) || t.includes(k)) s += 4 * v;
        }
      }
      if (who) {
        for (const [k, v] of Object.entries(who)) {
          if (k.includes(t) || t.includes(k)) s += 4 * v;
        }
      }
    }
    return s;
  }

  /** Ids with positive keyword overlap only (no API). */
  function rankEventsLocallyForChat(query, candidates) {
    const toks = tokenizeChatQuery(query);
    if (!toks.length) return [];
    const scored = candidates.map((ev) => ({ ev, s: scoreEventForChat(ev, toks) }));
    scored.sort((a, b) => b.s - a.s || a.ev.id - b.ev.id);
    return scored.filter((x) => x.s > 0).map((x) => x.ev.id);
  }

  function compactLineForLlm(e) {
    const title = String(e.title || "")
      .replace(/\|/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const desc = String(e.description || "")
      .replace(/\|/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 220);
    return `${e.id}|${e.category}|${title}|${desc}`;
  }

  /**
   * Semantic filter: which event ids match the user message (best first).
   * @param {string} query
   * @param {any[]} candidates
   * @returns {Promise<number[] | null>} ids on success (may be empty), `null` if no key or request failed
   */
  async function fetchOpenAiEventRanking(query, candidates) {
    const key =
      (typeof window !== "undefined" && window.quadrantOpenAiKey) ||
      (typeof localStorage !== "undefined" && localStorage.getItem("quadrant-openai-key"));
    if (!key || !candidates.length) return null;
    const lines = candidates.map(compactLineForLlm).join("\n");
    const chatUrl =
      (typeof window !== "undefined" && window.quadrantOpenAiChatCompletionsUrl) ||
      "https://api.openai.com/v1/chat/completions";
    const res = await fetch(chatUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.15,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              'You filter Paris venue/event listings. Return JSON only: {"ids":[...]} — an array of integer event ids that **semantically match** the user\'s message (themes, activities, mood, audience — not literal substring). **Omit** ids that do not fit. Order by best match first. Use **only** ids from the provided list. If nothing fits, return {"ids":[]}.',
          },
          {
            role: "user",
            content: `User message: ${query}\n\nEach line is: id|category|title|description_excerpt\n\n${lines}`,
          },
        ],
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const raw = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
    if (!raw) return null;
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (_) {
      return null;
    }
    const ids = parsed.ids;
    if (!Array.isArray(ids)) return null;
    return ids.map((x) => Number(x)).filter((n) => Number.isFinite(n));
  }

  /** Ranks events from the chat box (LLM + local fallback); defined here so Enter works even if carousel init bails early. */
  async function executeChatQuery() {
    const input = document.getElementById("chat-input");
    const q = input && input.value ? input.value.trim() : "";
    lastChatQuery = q;
    if (!q) {
      llmOrderedChatIds = null;
      refreshEventFilter();
      return;
    }
    const ALL_EVENTS = window.PARIS_EVENTS;
    if (!ALL_EVENTS || !ALL_EVENTS.length) return;
    const sel = getFilterState();
    let pool =
      sel.whys.size === 0 && sel.whats.size === 0 && sel.whos.size === 0
        ? ALL_EVENTS
        : buildUnionFilteredList(ALL_EVENTS, sel);
    const minDisplay = Math.min(MIN_CAROUSEL_EVENTS, ALL_EVENTS.length);
    pool = ensureMinScalarMatches(pool, sel, ALL_EVENTS, minDisplay);
    llmOrderedChatIds = null;
    refreshEventFilter();

    const carouselEl = document.getElementById("events-carousel");
    if (carouselEl) carouselEl.setAttribute("aria-busy", "true");
    try {
      const ranked = await fetchOpenAiEventRanking(q, pool);
      llmOrderedChatIds = ranked === null ? null : ranked;
    } catch (_) {
      llmOrderedChatIds = null;
    } finally {
      if (carouselEl) carouselEl.removeAttribute("aria-busy");
    }
    refreshEventFilter();
  }

  /** @type {string | null} */
  let activeMode = null;

  function syncCornerAria() {
    corners.forEach((btn) => {
      const mode = btn.getAttribute("data-overlay");
      btn.setAttribute("aria-pressed", mode === activeMode ? "true" : "false");
    });
  }

  function openOverlay(mode) {
    const el = overlays[mode];
    if (!el) return;

    if (activeMode && activeMode !== mode) {
      closeOverlayImmediate();
    }

    activeMode = mode;
    syncCornerAria();

    el.removeAttribute("hidden");
    el.setAttribute("aria-hidden", "false");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.classList.add("is-open");
        if (mode === "map") {
          scheduleMapInit();
        }
        if (mode === "mood") {
          initMoodDeckIfNeeded();
          document.querySelector("#mood-deck .mood-scroll")?.focus({ preventScroll: true });
        }
        if (mode === "people") {
          initPeopleChooserScroll();
          document.querySelector("#overlay-people .people-scroll")?.focus({ preventScroll: true });
        }
      });
    });
  }

  function closeOverlayImmediate() {
    if (!activeMode) return;
    const el = overlays[activeMode];
    if (el) {
      el.classList.remove("is-open");
      el.setAttribute("hidden", "");
      el.setAttribute("aria-hidden", "true");
    }
    activeMode = null;
    syncCornerAria();
  }

  function scheduleMapInit() {
    window.setTimeout(() => {
      ensureMap();
    }, 80);
  }

  function fallbackHexFromString(s) {
    let n = 2166136261;
    for (let i = 0; i < s.length; i++) n = Math.imul(n ^ s.charCodeAt(i), 16777619);
    const r = 72 + (n & 0x7f);
    const g = 72 + ((n >>> 8) & 0x7f);
    const b = 72 + ((n >>> 16) & 0x7f);
    return `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
  }

  /**
   * Samples a downscaled image and returns a saturated mid-tone hex for markers.
   * @param {Uint8ClampedArray} data
   */
  function pickDominantHex(data) {
    const counts = new Map();
    for (let i = 0; i < data.length; i += 4) {
      const a = data[i + 3];
      if (a < 12) continue;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const bright = (r + g + b) / 3;
      if (bright > 248 || bright < 8) continue;
      const key = (r >> 4) + "," + (g >> 4) + "," + (b >> 4);
      counts.set(key, (counts.get(key) || 0) + 1);
    }
    let bestKey = "8,8,8";
    let best = 0;
    counts.forEach((v, k) => {
      if (v > best) {
        best = v;
        bestKey = k;
      }
    });
    const parts = bestKey.split(",").map(Number);
    const rs = (parts[0] << 4) | parts[0];
    const gs = (parts[1] << 4) | parts[1];
    const bs = (parts[2] << 4) | parts[2];
    return `#${rs.toString(16).padStart(2, "0")}${gs.toString(16).padStart(2, "0")}${bs.toString(16).padStart(2, "0")}`;
  }

  function dominantColorFromImageUrl(url, callback) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const w = 48;
        const h = 48;
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          callback(fallbackHexFromString(url));
          return;
        }
        ctx.drawImage(img, 0, 0, w, h);
        const { data } = ctx.getImageData(0, 0, w, h);
        callback(pickDominantHex(data));
      } catch (_) {
        callback(fallbackHexFromString(url));
      }
    };
    img.onerror = () => callback(fallbackHexFromString(url));
    img.src = url;
  }

  function removeParisEventMarker() {
    if (parisEventMarker && mapInstance) {
      mapInstance.removeLayer(parisEventMarker);
      parisEventMarker = null;
    }
  }

  function removeParisRowDotMarkers() {
    if (parisRowDotMarkersLayer && mapInstance) {
      mapInstance.removeLayer(parisRowDotMarkersLayer);
    }
    parisRowDotMarkersLayer = null;
  }

  const PIN_FADE_MS = 220;
  /** Bumps when user taps another event; stale async pin flows bail out */
  let eventPinPlacementGen = 0;

  /** Fade out existing pin, remove layer, then resolve */
  function fadeOutParisMarkerIfAny() {
    return new Promise((resolve) => {
      if (!parisEventMarker || !mapInstance) {
        resolve();
        return;
      }
      const wrap = parisEventMarker.getElement();
      if (!wrap) {
        removeParisEventMarker();
        resolve();
        return;
      }
      if (wrap.classList.contains("leaflet-event-pin-wrap--hidden")) {
        removeParisEventMarker();
        resolve();
        return;
      }
      let finished = false;
      function done() {
        if (finished) return;
        finished = true;
        wrap.removeEventListener("transitionend", onTransitionEnd);
        removeParisEventMarker();
        resolve();
      }
      function onTransitionEnd(ev) {
        if (ev.propertyName !== "opacity") return;
        done();
      }
      wrap.addEventListener("transitionend", onTransitionEnd);
      wrap.classList.add("leaflet-event-pin-wrap--hidden");
      window.setTimeout(done, PIN_FADE_MS + 80);
    });
  }

  /** Pan/zoom after animation completes (moveend) */
  function panMapToCoords(lat, lng, zoom) {
    return new Promise((resolve) => {
      if (!mapInstance) {
        resolve();
        return;
      }
      let finished = false;
      function done() {
        if (finished) return;
        finished = true;
        mapInstance.off("moveend", onMoveEnd);
        resolve();
      }
      function onMoveEnd() {
        done();
      }
      mapInstance.once("moveend", onMoveEnd);
      mapInstance.setView([lat, lng], zoom, { animate: true });
      window.setTimeout(done, 1500);
    });
  }

  function escapeHtmlForPin(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /** Screen px radius of circle (3× original 12); diameter 72px */
  const EVENT_PIN_DOT_RADIUS_PX = 36;

  /**
   * @param {any[]} events
   * @param {number | undefined} excludeId
   * @returns {L.LayerGroup}
   */
  function buildParisRowDotMarkersLayer(events, excludeId) {
    const rSmall = EVENT_PIN_DOT_RADIUS_PX / 2;
    const d = rSmall * 2;
    const group = L.layerGroup();
    for (const ev of events) {
      if (ev == null || ev.id === excludeId) continue;
      if (ev.lat == null || ev.lng == null) continue;
      const fill = fallbackHexFromString(String(ev.id ?? ev.title ?? ""));
      const html = `<span class="leaflet-event-row-dot" style="background-color:${escapeHtmlForPin(fill)}"></span>`;
      const icon = L.divIcon({
        className: "leaflet-event-row-dot-wrap",
        html,
        iconSize: [d, d],
        iconAnchor: [rSmall, rSmall],
      });
      const c = getCoordsForEvent(ev);
      if (!Number.isFinite(c.lat) || !Number.isFinite(c.lng)) continue;
      const m = L.marker([c.lat, c.lng], {
        icon,
        keyboard: true,
        interactive: true,
        zIndexOffset: -300,
      });
      m.on("click", (e) => {
        L.DomEvent.stopPropagation(e);
        if (ev.id != null) selectPresentationEventById(ev.id);
      });
      group.addLayer(m);
    }
    return group;
  }

  /**
   * Half-size dots (no address text) for other events in the selected time row.
   * Geocodes row events in the background (Photon) and rebuilds dots when coords resolve.
   * @param {number | undefined} [excludeEventId] Prefer excluding this id (e.g. the main pin).
   */
  function syncParisRowDotsOnMap(excludeEventId) {
    if (!mapInstance || activeMode !== "map") return;
    const refreshGen = ++parisRowDotsRefreshGen;
    removeParisRowDotMarkers();
    const { events } = getParisRowEventsForMap();
    const excludeId = excludeEventId !== undefined ? excludeEventId : currentParisEvent?.id;
    parisRowDotMarkersLayer = buildParisRowDotMarkersLayer(events, excludeId);
    parisRowDotMarkersLayer.addTo(mapInstance);

    const needGeocode = events.filter(
      (ev) =>
        ev &&
        ev.id != null &&
        ev.lat != null &&
        ev.lng != null &&
        !resolvedCoordsById.has(ev.id) &&
        !geocodeUnresolvableIds.has(ev.id)
    );
    if (needGeocode.length === 0) return;

    void (async () => {
      await geocodeEventsInChunks(needGeocode, 4);
      if (refreshGen !== parisRowDotsRefreshGen || !mapInstance || activeMode !== "map") return;
      removeParisRowDotMarkers();
      const { events: evNext } = getParisRowEventsForMap();
      const excludeNext = excludeEventId !== undefined ? excludeEventId : currentParisEvent?.id;
      parisRowDotMarkersLayer = buildParisRowDotMarkersLayer(evNext, excludeNext);
      parisRowDotMarkersLayer.addTo(mapInstance);
    })();
  }

  /**
   * Add pin at resolved coords, starting invisible then fading in (map should already be panned).
   * @param {{ lat: number; lng: number; title?: string; image?: string; address?: string; streetLine?: string }} ev
   * @param {string} fillCss
   */
  function addParisEventMarkerWithFadeIn(ev, fillCss) {
    if (!mapInstance || ev.lat == null || ev.lng == null) return;
    removeParisEventMarker();
    const d = EVENT_PIN_DOT_RADIUS_PX * 2;
    const gap = 10;
    /** Match CSS: .leaflet-event-pin__addr max-width 1.5× former 360px; height budget for wrapped lines */
    const addrW = 540;
    const pinBodyH = 220;
    const streetLabel =
      ev.streetLine ||
      (ev.address ? String(ev.address).split(",")[0].trim() : "");
    const addr = streetLabel ? escapeHtmlForPin(streetLabel) : "";
    const html = `<div class="leaflet-event-pin">
      <span class="leaflet-event-pin__dot" style="background-color:${escapeHtmlForPin(fillCss)}"></span>
      <span class="leaflet-event-pin__addr">${addr}</span>
    </div>`;
    const icon = L.divIcon({
      className: "leaflet-event-pin-wrap leaflet-event-pin-wrap--hidden",
      html,
      iconSize: [d + gap + addrW, pinBodyH],
      iconAnchor: [EVENT_PIN_DOT_RADIUS_PX, EVENT_PIN_DOT_RADIUS_PX],
    });
    const c = getCoordsForEvent(ev);
    parisEventMarker = L.marker([c.lat, c.lng], {
      icon,
      keyboard: false,
      zIndexOffset: 400,
    }).addTo(mapInstance);
    parisEventMarker._pinnedEventId = ev.id;
    if (ev.title) {
      const parts = [ev.title, streetLabel || ev.address].filter(Boolean).map(escapeHtmlForPin);
      parisEventMarker.bindPopup(parts.join("<br>"));
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!parisEventMarker) return;
        const wrap = parisEventMarker.getElement();
        if (wrap) wrap.classList.remove("leaflet-event-pin-wrap--hidden");
      });
    });
  }

  function syncMapViewToCurrentEvent() {
    if (!mapInstance || !currentParisEvent || currentParisEvent.lat == null) return;
    const z = Math.max(14, mapInstance.getZoom());
    const ev = currentParisEvent;
    const id = ev.id;
    const c0 = getCoordsForEvent(ev);
    mapInstance.setView([c0.lat, c0.lng], z);
    geocodeEventAddress(ev).then(() => {
      if (!mapInstance || !currentParisEvent || currentParisEvent.id !== id) return;
      const c = getCoordsForEvent(currentParisEvent);
      mapInstance.setView([c.lat, c.lng], Math.max(14, mapInstance.getZoom()));
    });
  }

  /**
   * Drop a marker for the tapped event when the map overlay is open: fade out old pin → geocode → pan → fade in new pin.
   * @param {{ lat: number; lng: number; title?: string; image?: string }} ev
   */
  function pinParisEventOnMapIfVisible(ev) {
    if (!ev || ev.lat == null || activeMode !== "map") return;
    ensureMap();
    if (!mapInstance) return;
    const fill = fallbackHexFromString(String(ev.id ?? ev.title ?? ev.image ?? ""));
    const gen = ++eventPinPlacementGen;

    (async () => {
      await fadeOutParisMarkerIfAny();
      if (gen !== eventPinPlacementGen || !mapInstance || activeMode !== "map") return;
      await geocodeEventAddress(ev);
      if (gen !== eventPinPlacementGen || !mapInstance || activeMode !== "map") return;
      const c = getCoordsForEvent(ev);
      await panMapToCoords(c.lat, c.lng, 15);
      if (gen !== eventPinPlacementGen || !mapInstance || activeMode !== "map") return;
      syncParisRowDotsOnMap(ev.id);
      addParisEventMarkerWithFadeIn(ev, fill);
      if (ev.image) {
        dominantColorFromImageUrl(ev.image, (hex) => {
          if (gen !== eventPinPlacementGen || !parisEventMarker || !mapInstance) return;
          const root = parisEventMarker.getElement();
          const dot = root && root.querySelector(".leaflet-event-pin__dot");
          if (dot) dot.style.backgroundColor = hex;
        });
      }
    })();
  }

  function ensureMap() {
    const container = document.getElementById("map-paris");
    if (!container || typeof L === "undefined") {
      if (container && typeof L === "undefined") {
        container.textContent = "Map unavailable (offline).";
      }
      return;
    }

    if (mapInstance) {
      mapInstance.invalidateSize();
      syncMapViewToCurrentEvent();
      syncParisRowDotsOnMap();
      return;
    }

    mapInstance = L.map(container, {
      zoomControl: true,
      attributionControl: false,
      dragging: true,
      scrollWheelZoom: true,
      touchZoom: true,
      doubleClickZoom: true,
      boxZoom: true,
      keyboard: true,
    }).setView([48.8566, 2.3522], 14);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/credits/">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 20,
    }).addTo(mapInstance);

    syncMapViewToCurrentEvent();
    syncParisRowDotsOnMap();

    window.setTimeout(() => {
      if (mapInstance) {
        mapInstance.invalidateSize();
        syncMapViewToCurrentEvent();
        syncParisRowDotsOnMap();
      }
    }, 420);
  }

  function buildActivityGrid() {
    const grid = document.getElementById("activity-grid");
    if (!grid || grid.children.length) return;

    ACTIVITY_CATEGORIES.forEach((label) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "activity-chip";
      btn.textContent = label;
      btn.setAttribute("aria-pressed", "false");
      btn.addEventListener("click", () => {
        const on = btn.getAttribute("aria-pressed") === "true";
        btn.setAttribute("aria-pressed", on ? "false" : "true");
        refreshEventFilter();
      });
      grid.appendChild(btn);
    });
  }

  function moodPlaceholderDataUri(label) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="560" viewBox="0 0 1200 560"><rect fill="#c8cad4" width="1200" height="560"/><text x="600" y="290" dominant-baseline="middle" text-anchor="middle" font-family="Lexend,system-ui,sans-serif" font-size="84" fill="#2a2a35">${label}</text></svg>`;
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }

  /**
   * Sobel edge detection → line-art style (light grey field, dark outlines).
   * @param {HTMLImageElement} img
   */
  function applyOutlineTraceToMoodImage(img) {
    try {
      const w = Math.min(img.naturalWidth || 800, 640);
      const h = Math.min(img.naturalHeight || 500, 480);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, w, h);
      const src = ctx.getImageData(0, 0, w, h);
      const d = src.data;
      const gray = new Float32Array(w * h);
      for (let i = 0, p = 0; p < w * h; i += 4, p++) {
        gray[p] = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
      }
      const out = ctx.createImageData(w, h);
      const od = out.data;
      const th = 42;
      const bg = 238;
      const line = 36;
      for (let p = 0; p < w * h; p++) {
        const o = p * 4;
        od[o] = bg;
        od[o + 1] = bg;
        od[o + 2] = bg;
        od[o + 3] = 255;
      }
      for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
          const i = y * w + x;
          const gx =
            -gray[i - w - 1] +
            gray[i - w + 1] -
            2 * gray[i - 1] +
            2 * gray[i + 1] -
            gray[i + w - 1] +
            gray[i + w + 1];
          const gy =
            -gray[i - w - 1] -
            2 * gray[i - w] -
            gray[i - w + 1] +
            gray[i + w - 1] +
            2 * gray[i + w] +
            gray[i + w + 1];
          const mag = Math.sqrt(gx * gx + gy * gy);
          const v = mag > th ? line : bg;
          const o = i * 4;
          od[o] = v;
          od[o + 1] = v;
          od[o + 2] = v + 1;
          od[o + 3] = 255;
        }
      }
      ctx.putImageData(out, 0, 0);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
      img.onload = null;
      img.src = dataUrl;
    } catch (_) {
      img.classList.add("mood-card__img--outline-fallback");
    }
  }

  function loadMoodImage(img, cardData) {
    img.removeAttribute("data-tried-fallback");
    img.alt = cardData.label;
    img.crossOrigin = "anonymous";
    img.onload = function () {
      img.classList.remove("mood-card__img--fallback");
      applyOutlineTraceToMoodImage(img);
    };
    img.onerror = function () {
      if (img.dataset.triedFallback !== "1") {
        img.dataset.triedFallback = "1";
        img.removeAttribute("crossorigin");
        img.src = cardData.fallback;
        return;
      }
      img.onerror = null;
      img.classList.add("mood-card__img--fallback");
      img.removeAttribute("crossorigin");
      img.src = moodPlaceholderDataUri(cardData.label);
    };
    img.src = cardData.image;
  }

  /**
   * Horizontal strip scroll (mood WHY, people WHO): pointer drag, wheel, keys.
   * @param {HTMLElement} scrollEl
   * @param {HTMLElement} deckEl
   * @param {HTMLElement | null} overlay
   * @param {{ draggingClass: string; cardSelector: string }} options
   */
  function wireHorizontalScrollStrip(scrollEl, deckEl, overlay, options) {
    if (!overlay) return;

    const { draggingClass, cardSelector } = options;
    const KEY_STEP = 220;
    const DRAG_THRESHOLD = 14;

    let ptrId = null;
    let startX = 0;
    let startSl = 0;
    let gestureDragged = false;
    let suppressNextCardClick = false;

    function onPointerDown(ev) {
      if (ev.button !== 0) return;
      ptrId = ev.pointerId;
      startX = ev.clientX;
      startSl = scrollEl.scrollLeft;
      gestureDragged = false;
      suppressNextCardClick = false;
      scrollEl.classList.add(draggingClass);
      /* Do not setPointerCapture here. Capture steals the gesture from the real target
         (e.g. .mood-card), so the browser never emits a real click on the card for taps. */
    }

    function onPointerMove(ev) {
      if (ev.pointerId !== ptrId) return;
      const screenDx = ev.clientX - startX;

      if (!gestureDragged) {
        if (Math.abs(screenDx) <= DRAG_THRESHOLD) return;
        gestureDragged = true;
        try {
          scrollEl.setPointerCapture(ev.pointerId);
        } catch (_) {
          /* ignore */
        }
      }

      const rect = scrollEl.getBoundingClientRect();
      const ratio = rect.width > 0 ? scrollEl.clientWidth / rect.width : 1;
      const dx = screenDx * ratio;
      scrollEl.scrollLeft = startSl - dx;
      ev.preventDefault();
    }

    function onPointerUp(ev) {
      if (ev.pointerId !== ptrId) return;
      suppressNextCardClick = gestureDragged;
      ptrId = null;
      scrollEl.classList.remove(draggingClass);
      try {
        scrollEl.releasePointerCapture(ev.pointerId);
      } catch (_) {
        /* ignore */
      }
    }

    scrollEl.addEventListener("pointerdown", onPointerDown);
    scrollEl.addEventListener("pointermove", onPointerMove, { passive: false });
    scrollEl.addEventListener("pointerup", onPointerUp);
    scrollEl.addEventListener("pointercancel", onPointerUp);

    deckEl.addEventListener(
      "click",
      (ev) => {
        const card = ev.target.closest(cardSelector);
        if (!card || !deckEl.contains(card)) return;
        if (suppressNextCardClick) {
          ev.preventDefault();
          ev.stopPropagation();
          ev.stopImmediatePropagation();
          suppressNextCardClick = false;
        }
      },
      true
    );

    scrollEl.addEventListener(
      "wheel",
      (ev) => {
        const dx = Math.abs(ev.deltaX) > Math.abs(ev.deltaY) ? ev.deltaX : ev.shiftKey ? ev.deltaY : 0;
        if (dx === 0) return;
        scrollEl.scrollLeft += dx;
        ev.preventDefault();
      },
      { passive: false }
    );

    overlay.addEventListener(
      "keydown",
      (ev) => {
        if (!overlay.classList.contains("is-open")) return;
        if (!overlay.contains(ev.target)) return;
        if (ev.target.closest(cardSelector) && (ev.key === " " || ev.key === "Enter")) return;
        if (ev.key === "ArrowRight") {
          ev.preventDefault();
          scrollEl.scrollLeft += KEY_STEP;
        } else if (ev.key === "ArrowLeft") {
          ev.preventDefault();
          scrollEl.scrollLeft -= KEY_STEP;
        } else if (ev.key === "Home") {
          ev.preventDefault();
          scrollEl.scrollLeft = 0;
        } else if (ev.key === "End") {
          ev.preventDefault();
          scrollEl.scrollLeft = scrollEl.scrollWidth;
        }
      },
      true
    );
  }

  function initMoodDeckIfNeeded() {
    const deck = document.getElementById("mood-deck");
    if (!deck || deck.dataset.moodGridReady) return;
    deck.dataset.moodGridReady = "1";

    const selected = new Set();

    const scroll = document.createElement("div");
    scroll.className = "mood-scroll";
    scroll.setAttribute("tabindex", "0");
    scroll.setAttribute("role", "region");
    scroll.setAttribute("aria-label", "Mood choices");

    const grid = document.createElement("div");
    grid.className = "mood-grid";

    function toggleMood(realIdx) {
      if (selected.has(realIdx)) {
        selected.delete(realIdx);
      } else {
        selected.add(realIdx);
      }
      const on = selected.has(realIdx);
      grid.querySelectorAll(`[data-real-index="${realIdx}"]`).forEach((el) => {
        el.classList.toggle("mood-card--selected", on);
        el.setAttribute("aria-pressed", on ? "true" : "false");
      });
      refreshEventFilter();
    }

    function createMoodCardElement(cardData, realIdx) {
      const card = document.createElement("div");
      card.className = "mood-card";
      card.dataset.moodLabel = cardData.label;
      card.dataset.realIndex = String(realIdx);
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-pressed", "false");
      card.setAttribute("aria-label", `${cardData.label}. Tap to mark.`);

      const check = document.createElement("div");
      check.className = "mood-card__check";
      check.setAttribute("aria-hidden", "true");
      check.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';

      const img = document.createElement("img");
      img.className = "mood-card__img";
      img.decoding = "async";
      img.draggable = false;
      loadMoodImage(img, cardData);

      const body = document.createElement("div");
      body.className = "mood-card__body";
      const label = document.createElement("span");
      label.className = "mood-card__label";
      label.textContent = cardData.label;
      body.appendChild(label);

      card.appendChild(check);
      card.appendChild(img);
      card.appendChild(body);

      card.addEventListener("click", (ev) => {
        ev.preventDefault();
        toggleMood(realIdx);
      });
      card.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter" || ev.key === " ") {
          ev.preventDefault();
          toggleMood(realIdx);
        }
      });

      return card;
    }

    MOOD_CARDS.forEach((cardData, idx) => {
      grid.appendChild(createMoodCardElement(cardData, idx));
    });

    scroll.appendChild(grid);
    deck.appendChild(scroll);
    wireHorizontalScrollStrip(scroll, deck, document.getElementById("overlay-mood"), {
      draggingClass: "mood-scroll--dragging",
      cardSelector: ".mood-card",
    });

    clearAllMoodSelections = function () {
      selected.clear();
      grid.querySelectorAll(".mood-card").forEach((el) => {
        el.classList.remove("mood-card--selected");
        el.setAttribute("aria-pressed", "false");
      });
    };
  }

  function initPeopleChooserScroll() {
    const deck = document.querySelector("#overlay-people .people-deck");
    const scroll = deck && deck.querySelector(".people-scroll");
    if (!deck || !scroll || scroll.dataset.peopleScrollReady) return;
    scroll.dataset.peopleScrollReady = "1";
    wireHorizontalScrollStrip(scroll, deck, document.getElementById("overlay-people"), {
      draggingClass: "people-scroll--dragging",
      cardSelector: ".people-card",
    });
  }

  const EVENT_GAP = 12;
  const EVENT_CARD_RATIO = 0.78;
  const EVENT_SWIPE_THRESHOLD = 52;
  const EVENT_TAP_MAX_MOVE = 12;
  /** Below this count, the carousel does not wrap; first/last have no neighbor card. */

  /**
   * Updates the events panel subtitle: “<n> things to try”.
   * Call again when filtering changes the active list size.
   * @param {number} n
   */
  function setEventsPanelThingsCount(n) {
    const el = document.getElementById("events-things-count");
    if (!el) return;
    const v = Math.max(0, Math.floor(Number(n)) || 0);
    el.textContent = String(v);
  }

  window.setEventsPanelThingsCount = setEventsPanelThingsCount;

  function initEventsCarousel() {
    const ALL_EVENTS = window.PARIS_EVENTS;
    if (!ALL_EVENTS || !ALL_EVENTS.length) return;

    const carousel = document.getElementById("events-carousel");
    const track = document.getElementById("events-carousel-track");
    if (!carousel || !track || track.dataset.eventsCarouselReady) return;
    track.dataset.eventsCarouselReady = "1";

    /** After WHY/WHAT/WHO + chat; sliced by active time row for the carousel. */
    let baseFilteredList = ALL_EVENTS;
    /** @type {"coming_up" | "today" | "ongoing"} */
    let activeTimeRow = "today";

    function timeRowOf(ev) {
      return ev.timeRow || "today";
    }

    const minCarousel = Math.min(MIN_CAROUSEL_EVENTS, ALL_EVENTS.length);
    const selInitial = getFilterState();
    baseFilteredList = ensureMinScalarMatches(baseFilteredList, selInitial, ALL_EVENTS, minCarousel);

    /** @type {typeof ALL_EVENTS} */
    let displayEvents = sliceTimeRowWithPadding(
      baseFilteredList,
      selInitial,
      ALL_EVENTS,
      activeTimeRow,
      minCarousel,
      timeRowOf
    );

    getParisRowEventsForMap = () => ({
      timeRow: activeTimeRow,
      events: baseFilteredList.filter((ev) => (ev.timeRow || "today") === activeTimeRow),
    });

    setEventsPanelThingsCount(displayEvents.length);

    let eventIndex = 0;
    /** Which slide (0,1,2) is visually centered; steady state is 1 */
    let visualCenter = 1;
    let dragX = 0;
    let startClientX = 0;
    let startClientY = 0;
    let dragging = false;
    let carouselGesturePending = false;
    let pointerId = null;
    let animating = false;

    const timeStack = document.getElementById("events-time-stack");
    const eventsPanelInner = document.getElementById("events-panel-inner");
    const TIME_ROW_ORDER = ["coming_up", "today", "ongoing"];

    /** Normalize wheel delta so trackpads and mouse wheels both change rows reliably. */
    function normalizedWheelAxis(ev, axis) {
      const d = axis === "x" ? ev.deltaX : ev.deltaY;
      if (ev.deltaMode === 1) return d * 32;
      if (ev.deltaMode === 2) return d * 480;
      return d;
    }

    function syncTimeRowShell() {
      TIME_ROW_ORDER.forEach((row) => {
        const slot = document.querySelector(`#events-time-stack .events-time-slot[data-time-row="${row}"]`);
        if (!slot) return;
        const heading = slot.querySelector(".events-time-heading");
        const body = slot.querySelector(".events-time-slot__body");
        const on = row === activeTimeRow;
        slot.classList.toggle("events-time-slot--selected", on);
        if (heading) {
          heading.classList.toggle("events-time-heading--active", on);
          heading.setAttribute("aria-pressed", on ? "true" : "false");
        }
        if (body) {
          if (on) {
            body.hidden = false;
            body.appendChild(carousel);
          } else {
            body.hidden = true;
          }
        }
      });
      const activeHeading = document.querySelector(
        `#events-time-stack .events-time-heading[data-time-row="${activeTimeRow}"]`
      );
      if (carousel && activeHeading && activeHeading.id) {
        carousel.setAttribute("aria-labelledby", activeHeading.id);
      }
    }

    let lastTimeRowWheelMs = 0;

    const ROW_DRAG_STEP = 120;
    const ROW_DRAG_THRESHOLD = ROW_DRAG_STEP * 0.35;
    let rowDragTranslate = 0;
    let rowDragPointerId = null;
    let rowDragActive = false;
    let rowDragSettling = false;
    let rowDragStartY = 0;
    let rowDragStartX = 0;
    let rowDragStartTranslate = 0;

    function clampRowTranslate(t, i) {
      if (i === 0) return Math.min(ROW_DRAG_STEP, Math.max(0, t));
      if (i === 1) return Math.min(ROW_DRAG_STEP, Math.max(-ROW_DRAG_STEP, t));
      if (i === 2) return Math.min(0, Math.max(-ROW_DRAG_STEP, t));
      return t;
    }

    function bumpTimeRow(delta) {
      const i = TIME_ROW_ORDER.indexOf(activeTimeRow);
      const ni = Math.max(0, Math.min(TIME_ROW_ORDER.length - 1, i + delta));
      if (ni === i) return;
      activeTimeRow = TIME_ROW_ORDER[ni];
      eventIndex = 0;
      syncTimeRowShell();
      applyTimeRowSlice();
      if (timeStack) {
        timeStack.style.transform = "";
        timeStack.classList.remove("events-time-stack--dragging", "events-time-stack--drag-anim");
        rowDragTranslate = 0;
      }
    }

    function goToTimeRow(row) {
      if (row === activeTimeRow) return;
      activeTimeRow = row;
      eventIndex = 0;
      syncTimeRowShell();
      applyTimeRowSlice();
      if (timeStack) {
        timeStack.style.transform = "";
        timeStack.classList.remove("events-time-stack--dragging", "events-time-stack--drag-anim");
        rowDragTranslate = 0;
      }
    }

    function settleRowDrag() {
      if (!timeStack) return;
      const i = TIME_ROW_ORDER.indexOf(activeTimeRow);
      const t = rowDragTranslate;
      let delta = 0;
      if (t > ROW_DRAG_THRESHOLD && i < 2) delta = 1;
      else if (t < -ROW_DRAG_THRESHOLD && i > 0) delta = -1;

      rowDragPointerId = null;
      rowDragActive = false;
      rowDragSettling = true;
      timeStack.classList.remove("events-time-stack--dragging");

      if (delta === 0) {
        const start = t;
        timeStack.classList.add("events-time-stack--drag-anim");
        timeStack.style.transform = `translateY(${start}px)`;
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            timeStack.style.transform = "translateY(0)";
          });
        });
        const once = (e) => {
          if (e.propertyName !== "transform") return;
          timeStack.removeEventListener("transitionend", once);
          timeStack.style.transform = "";
          timeStack.classList.remove("events-time-stack--drag-anim");
          rowDragTranslate = 0;
          rowDragSettling = false;
        };
        timeStack.addEventListener("transitionend", once);
        return;
      }

      const target = delta > 0 ? ROW_DRAG_STEP : -ROW_DRAG_STEP;
      timeStack.classList.add("events-time-stack--drag-anim");
      timeStack.style.transform = `translateY(${t}px)`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          timeStack.style.transform = `translateY(${target}px)`;
        });
      });
      const once = (e) => {
        if (e.propertyName !== "transform") return;
        timeStack.removeEventListener("transitionend", once);
        bumpTimeRow(delta);
        rowDragSettling = false;
      };
      timeStack.addEventListener("transitionend", once);
    }

    function smoothBumpTimeRow(delta) {
      const i = TIME_ROW_ORDER.indexOf(activeTimeRow);
      const ni = Math.max(0, Math.min(2, i + delta));
      if (ni === i) return;
      if (!timeStack) {
        bumpTimeRow(delta);
        return;
      }
      rowDragSettling = true;
      timeStack.classList.add("events-time-stack--drag-anim");
      timeStack.classList.remove("events-time-stack--dragging");
      const slide = delta > 0 ? 40 : -40;
      timeStack.style.transform = "translateY(0)";
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          timeStack.style.transform = `translateY(${slide}px)`;
        });
      });
      const once = (e) => {
        if (e.propertyName !== "transform") return;
        timeStack.removeEventListener("transitionend", once);
        bumpTimeRow(delta);
        rowDragSettling = false;
        timeStack.style.transform = "";
        timeStack.classList.remove("events-time-stack--drag-anim");
      };
      timeStack.addEventListener("transitionend", once);
    }

    function applyTimeRowSlice() {
      const sel = getFilterState();
      const minDisplay = Math.min(MIN_CAROUSEL_EVENTS, ALL_EVENTS.length);
      displayEvents = sliceTimeRowWithPadding(
        baseFilteredList,
        sel,
        ALL_EVENTS,
        activeTimeRow,
        minDisplay,
        timeRowOf
      );
      if (displayEvents.length === 0 && ALL_EVENTS.length > 0) {
        displayEvents = dedupeEventsById(ALL_EVENTS).slice(0, Math.min(minDisplay, ALL_EVENTS.length));
      }
      const n = displayEvents.length;
      setEventsPanelThingsCount(n);
      if (n === 0) {
        eventIndex = 0;
      } else if (eventIndex >= n) {
        eventIndex = n - 1;
      }
      animating = false;
      visualCenter = 1;
      dragX = 0;
      fillSlides();
      layout();
      updateCornerFilterBadges();
    }

    function makeSlide() {
      const el = document.createElement("article");
      el.className = "event-slide";
      el.setAttribute("aria-hidden", "true");
      const img = document.createElement("img");
      img.className = "event-slide__img";
      img.decoding = "async";
      img.loading = "lazy";
      img.draggable = false;
      const body = document.createElement("div");
      body.className = "event-slide__body";
      const cat = document.createElement("span");
      cat.className = "event-slide__cat";
      const title = document.createElement("h3");
      title.className = "event-slide__title";
      const addr = document.createElement("p");
      addr.className = "event-slide__address";
      const desc = document.createElement("p");
      desc.className = "event-slide__desc";
      const sched = document.createElement("p");
      sched.className = "event-slide__schedule";
      body.appendChild(cat);
      body.appendChild(title);
      body.appendChild(addr);
      body.appendChild(desc);
      body.appendChild(sched);
      el.appendChild(img);
      el.appendChild(body);
      return el;
    }

    const slides = [makeSlide(), makeSlide(), makeSlide()];
    slides.forEach((s) => track.appendChild(s));

    function applyEvent(slideEl, ev) {
      if (!ev) return;
      slideEl.classList.remove("event-slide--buffer");
      const img = slideEl.querySelector(".event-slide__img");
      img.style.display = "";
      img.src = ev.image;
      img.alt = ev.title;
      slideEl.querySelector(".event-slide__cat").textContent = ev.category;
      slideEl.querySelector(".event-slide__title").textContent = ev.title;
      const addrEl = slideEl.querySelector(".event-slide__address");
      if (addrEl) {
        addrEl.textContent = ev.address || "";
      }
      const descEl = slideEl.querySelector(".event-slide__desc");
      if (descEl) {
        descEl.textContent = ev.description || "";
      }
      slideEl.querySelector(".event-slide__schedule").textContent = ev.schedule;
    }

    function applyEmptySlide(slideEl) {
      slideEl.classList.remove("event-slide--buffer");
      const img = slideEl.querySelector(".event-slide__img");
      img.style.display = "none";
      img.removeAttribute("src");
      img.alt = "";
      slideEl.querySelector(".event-slide__cat").textContent = "";
      slideEl.querySelector(".event-slide__title").textContent = "No events match";
      slideEl.querySelector(".event-slide__address").textContent = "";
      slideEl.querySelector(".event-slide__desc").textContent =
        "Adjust WHY, WHAT, or WHO, try another time row, or change your search.";
      slideEl.querySelector(".event-slide__schedule").textContent = "";
    }

    /** Finite = no wrap at ends. Only when WHY/WHAT/WHO or chat narrows the list; full “all events” feed wraps. */
    function isFiniteListMode() {
      const sel = getFilterState();
      const hasChips = sel.whys.size > 0 || sel.whats.size > 0 || sel.whos.size > 0;
      const hasChat = Boolean(lastChatQuery && lastChatQuery.trim());
      return hasChips || hasChat;
    }

    function applyNeighborPlaceholder(slideEl) {
      slideEl.classList.add("event-slide--buffer");
      const img = slideEl.querySelector(".event-slide__img");
      img.style.display = "none";
      img.removeAttribute("src");
      img.alt = "";
      slideEl.querySelector(".event-slide__cat").textContent = "";
      slideEl.querySelector(".event-slide__title").textContent = "";
      slideEl.querySelector(".event-slide__address").textContent = "";
      slideEl.querySelector(".event-slide__desc").textContent = "";
      slideEl.querySelector(".event-slide__schedule").textContent = "";
    }

    function fillSlides() {
      let list = displayEvents;
      if (list.length === 0 && ALL_EVENTS.length > 0) {
        const sel = getFilterState();
        const minD = Math.min(MIN_CAROUSEL_EVENTS, ALL_EVENTS.length);
        list = sliceTimeRowWithPadding(
          ensureMinScalarMatches([], sel, ALL_EVENTS, minD),
          sel,
          ALL_EVENTS,
          activeTimeRow,
          minD,
          timeRowOf
        );
        displayEvents = list;
        setEventsPanelThingsCount(list.length);
      }
      const N = list.length;
      if (N === 0) {
        slides.forEach((el) => applyEmptySlide(el));
        slides[1].setAttribute("aria-hidden", "false");
        slides[0].setAttribute("aria-hidden", "true");
        slides[2].setAttribute("aria-hidden", "true");
        carousel.setAttribute("aria-label", "No matching events");
        currentParisEvent = null;
        syncParisRowDotsOnMap();
        return;
      }
      const i = eventIndex;
      const finite = isFiniteListMode();
      if (finite) {
        if (i > 0) applyEvent(slides[0], list[i - 1]);
        else applyNeighborPlaceholder(slides[0]);
        applyEvent(slides[1], list[i]);
        if (i < N - 1) applyEvent(slides[2], list[i + 1]);
        else applyNeighborPlaceholder(slides[2]);
      } else {
        applyEvent(slides[0], list[(i - 1 + N) % N]);
        applyEvent(slides[1], list[i]);
        applyEvent(slides[2], list[(i + 1) % N]);
      }
      slides[1].setAttribute("aria-hidden", "false");
      slides[0].setAttribute("aria-hidden", "true");
      slides[2].setAttribute("aria-hidden", "true");
      carousel.setAttribute("aria-label", `Paris events — ${list[i].title}`);
      currentParisEvent = list[i];
      syncParisRowDotsOnMap();
    }

    function recomputeDisplay() {
      const sel = getFilterState();
      let list =
        sel.whys.size === 0 && sel.whats.size === 0 && sel.whos.size === 0
          ? ALL_EVENTS
          : buildUnionFilteredList(ALL_EVENTS, sel);

      if (lastChatQuery.trim()) {
        if (llmOrderedChatIds !== null) {
          const allowed = new Set(list.map((c) => c.id));
          const byId = new Map(list.map((c) => [c.id, c]));
          const seen = new Set();
          const out = [];
          for (const id of llmOrderedChatIds) {
            if (!allowed.has(id) || seen.has(id)) continue;
            seen.add(id);
            const ev = byId.get(id);
            if (ev) out.push(ev);
          }
          list = out;
        } else {
          const ids = rankEventsLocallyForChat(lastChatQuery, list);
          const byId = new Map(list.map((c) => [c.id, c]));
          list = ids.map((id) => byId.get(id)).filter(Boolean);
        }
      }

      const minDisplay = Math.min(MIN_CAROUSEL_EVENTS, ALL_EVENTS.length);
      list = ensureMinScalarMatches(list, sel, ALL_EVENTS, minDisplay);
      baseFilteredList = list;
      applyTimeRowSlice();
    }

    refreshEventFilter = recomputeDisplay;

    selectPresentationEventById = function (id) {
      const targetId = Number(id);
      if (!Number.isFinite(targetId)) return;
      const idx = displayEvents.findIndex((e) => e.id === targetId);
      if (idx < 0) return;
      eventIndex = idx;
      visualCenter = 1;
      dragX = 0;
      animating = false;
      fillSlides();
      setTrackTransform(0, false);
      layout();
      carousel.scrollIntoView({ behavior: "smooth", block: "nearest" });
      if (activeMode === "map") {
        pinParisEventOnMapIfVisible(displayEvents[eventIndex]);
      }
    };

    function getSizes() {
      const w = carousel.offsetWidth;
      const cardW = w * EVENT_CARD_RATIO;
      return { w, cardW };
    }

    function translateForVisualCenter(slideIdx, extra) {
      const { w, cardW } = getSizes();
      return w / 2 - (slideIdx * (cardW + EVENT_GAP) + cardW / 2) + (extra || 0);
    }

    function setTrackTransform(extra, animate) {
      const tx = translateForVisualCenter(visualCenter, extra);
      track.style.transition = animate ? "transform 0.35s cubic-bezier(0.22, 0.9, 0.32, 1)" : "none";
      track.style.transform = `translateX(${tx}px)`;
    }

    function layout() {
      const { cardW } = getSizes();
      if (cardW <= 0) return;
      carousel.style.setProperty("--event-card-w", `${cardW}px`);
      carousel.style.setProperty("--event-gap", `${EVENT_GAP}px`);
      setTrackTransform(dragX, false);
    }

    function onTransitionEnd(ev) {
      if (ev.target !== track || ev.propertyName !== "transform") return;
      if (!animating) return;
      const N = displayEvents.length;
      if (N === 0) {
        animating = false;
        return;
      }
      animating = false;
      if (isFiniteListMode()) {
        if (visualCenter === 2) {
          eventIndex = Math.min(eventIndex + 1, N - 1);
        } else if (visualCenter === 0) {
          eventIndex = Math.max(eventIndex - 1, 0);
        }
      } else {
        if (visualCenter === 2) {
          eventIndex = (eventIndex + 1) % N;
        } else if (visualCenter === 0) {
          eventIndex = (eventIndex - 1 + N) % N;
        }
      }
      visualCenter = 1;
      fillSlides();
      track.style.transition = "none";
      dragX = 0;
      setTrackTransform(0, false);
      track.offsetHeight;
      track.style.transition = "";
    }

    track.addEventListener("transitionend", onTransitionEnd);

    function onPointerDown(ev) {
      if (ev.button !== 0 || animating) return;
      if (rowDragSettling) return;
      if (displayEvents.length === 0) return;
      carouselGesturePending = true;
      pointerId = ev.pointerId;
      startClientX = ev.clientX;
      startClientY = ev.clientY;
      dragX = 0;
      dragging = false;
    }

    function onPointerMove(ev) {
      if (ev.pointerId !== pointerId) return;
      if (rowDragSettling) return;
      if (carouselGesturePending && !dragging) {
        const dx = ev.clientX - startClientX;
        const dy = ev.clientY - startClientY;
        if (Math.abs(dx) <= 14 && Math.abs(dy) <= 14) return;
        if (Math.abs(dy) > Math.abs(dx) * 1.15) {
          carouselGesturePending = false;
          pointerId = null;
          return;
        }
        dragging = true;
        carouselGesturePending = false;
        carousel.setPointerCapture(ev.pointerId);
        track.style.transition = "none";
      }
      if (!dragging) return;
      ev.preventDefault();
      dragX = ev.clientX - startClientX;
      setTrackTransform(dragX, false);
    }

    function onPointerUp(ev) {
      if (ev.pointerId !== pointerId) return;
      if (rowDragSettling) return;
      if (carouselGesturePending && !dragging) {
        carouselGesturePending = false;
        pointerId = null;
        const dx = ev.clientX - startClientX;
        const dy = ev.clientY - startClientY;
        if (Math.abs(dx) <= EVENT_TAP_MAX_MOVE && Math.abs(dy) <= EVENT_TAP_MAX_MOVE) {
          openOverlay("map");
          pinParisEventOnMapIfVisible(displayEvents[eventIndex]);
        }
        return;
      }
      if (!dragging) return;
      dragging = false;
      try {
        carousel.releasePointerCapture(ev.pointerId);
      } catch (_) {
        /* ignore */
      }
      pointerId = null;

      const dx = ev.clientX - startClientX;
      const N = displayEvents.length;
      const finite = isFiniteListMode();

      if (Math.abs(dx) <= EVENT_TAP_MAX_MOVE) {
        dragX = 0;
        visualCenter = 1;
        setTrackTransform(0, true);
        openOverlay("map");
        pinParisEventOnMapIfVisible(displayEvents[eventIndex]);
        return;
      }

      if (dx < -EVENT_SWIPE_THRESHOLD && visualCenter < 2) {
        if (finite && eventIndex >= N - 1) {
          dragX = 0;
          visualCenter = 1;
          setTrackTransform(0, true);
        } else {
          animating = true;
          visualCenter = 2;
          dragX = 0;
          setTrackTransform(0, true);
        }
      } else if (dx > EVENT_SWIPE_THRESHOLD && visualCenter > 0) {
        if (finite && eventIndex <= 0) {
          dragX = 0;
          visualCenter = 1;
          setTrackTransform(0, true);
        } else {
          animating = true;
          visualCenter = 0;
          dragX = 0;
          setTrackTransform(0, true);
        }
      } else {
        dragX = 0;
        visualCenter = 1;
        setTrackTransform(0, true);
      }
    }

    function onPointerCancel(ev) {
      if (ev.pointerId !== pointerId) return;
      dragging = false;
      carouselGesturePending = false;
      try {
        carousel.releasePointerCapture(ev.pointerId);
      } catch (_) {
        /* ignore */
      }
      pointerId = null;
      animating = false;
      dragX = 0;
      visualCenter = 1;
      setTrackTransform(0, true);
    }

    carousel.addEventListener("pointerdown", onPointerDown);
    carousel.addEventListener("pointermove", onPointerMove, { passive: false });
    carousel.addEventListener("pointerup", onPointerUp);
    carousel.addEventListener("pointercancel", onPointerCancel);

    carousel.setAttribute("tabindex", "0");
    carousel.addEventListener("keydown", (ev) => {
      if (animating) return;
      const N = displayEvents.length;
      if (N === 0) return;
      const finite = isFiniteListMode();
      if (ev.key === "ArrowRight") {
        ev.preventDefault();
        if (finite && eventIndex >= N - 1) return;
        eventIndex = finite ? Math.min(eventIndex + 1, N - 1) : (eventIndex + 1) % N;
        fillSlides();
        setTrackTransform(0, true);
      } else if (ev.key === "ArrowLeft") {
        ev.preventDefault();
        if (finite && eventIndex <= 0) return;
        eventIndex = finite ? Math.max(eventIndex - 1, 0) : (eventIndex - 1 + N) % N;
        fillSlides();
        setTrackTransform(0, true);
      }
    });

    document.querySelectorAll("#events-time-stack .events-time-heading").forEach((btn) => {
      btn.addEventListener("click", () => {
        const row = btn.getAttribute("data-time-row");
        if (!row || row === activeTimeRow) return;
        goToTimeRow(row);
      });
    });

    function onPointerDownRow(ev) {
      if (ev.button !== 0) return;
      if (rowDragSettling) return;
      if (ev.target.closest && ev.target.closest("#events-reset-all")) return;
      rowDragPointerId = ev.pointerId;
      rowDragStartY = ev.clientY;
      rowDragStartX = ev.clientX;
      rowDragStartTranslate = rowDragTranslate;
      rowDragActive = false;
    }

    function onPointerMoveRow(ev) {
      if (ev.pointerId !== rowDragPointerId) return;
      if (!timeStack) return;
      const dy = ev.clientY - rowDragStartY;
      const dx = ev.clientX - rowDragStartX;
      if (!rowDragActive) {
        if (Math.abs(dy) < 16 && Math.abs(dx) < 16) return;
        if (Math.abs(dx) >= Math.abs(dy) * 0.95) {
          rowDragPointerId = null;
          return;
        }
        rowDragActive = true;
        timeStack.classList.add("events-time-stack--dragging");
      }
      ev.preventDefault();
      ev.stopPropagation();
      const i = TIME_ROW_ORDER.indexOf(activeTimeRow);
      const t = clampRowTranslate(rowDragStartTranslate + dy, i);
      rowDragTranslate = t;
      timeStack.style.transform = t === 0 ? "" : `translateY(${t}px)`;
    }

    function onPointerUpRow(ev) {
      if (ev.pointerId !== rowDragPointerId) return;
      if (!rowDragActive) {
        rowDragPointerId = null;
        return;
      }
      settleRowDrag();
    }

    function onPointerCancelRow(ev) {
      if (ev.pointerId !== rowDragPointerId) return;
      if (!rowDragActive) return;
      settleRowDrag();
    }

    if (eventsPanelInner) {
      eventsPanelInner.addEventListener("pointerdown", onPointerDownRow, { capture: true });
      eventsPanelInner.addEventListener("pointermove", onPointerMoveRow, { capture: true });
      eventsPanelInner.addEventListener("pointerup", onPointerUpRow, { capture: true });
      eventsPanelInner.addEventListener("pointercancel", onPointerCancelRow, { capture: true });

      eventsPanelInner.addEventListener(
        "wheel",
        (e) => {
          if (rowDragSettling) return;
          const dy = normalizedWheelAxis(e, "y");
          const dx = normalizedWheelAxis(e, "x");
          if (Math.abs(dy) < 18) return;
          if (Math.abs(dx) > Math.abs(dy) * 0.85) return;
          const now = Date.now();
          if (now - lastTimeRowWheelMs < 200) return;
          lastTimeRowWheelMs = now;
          e.preventDefault();
          smoothBumpTimeRow(dy > 0 ? 1 : -1);
        },
        { passive: false }
      );
    }

    if (timeStack) {
      timeStack.addEventListener("keydown", (ev) => {
        if (rowDragSettling) return;
        if (ev.key === "ArrowDown") {
          ev.preventDefault();
          smoothBumpTimeRow(1);
        } else if (ev.key === "ArrowUp") {
          ev.preventDefault();
          smoothBumpTimeRow(-1);
        }
      });
    }

    syncTimeRowShell();

    fillSlides();
    const ro = new ResizeObserver(() => layout());
    ro.observe(carousel);
    requestAnimationFrame(() => {
      requestAnimationFrame(layout);
    });
  }

  function init() {
    initEventsCarousel();
    buildActivityGrid();

    const chatForm = document.getElementById("chat-form");
    const chatInput = document.getElementById("chat-input");
    if (chatForm) {
      chatForm.addEventListener("submit", (ev) => {
        ev.preventDefault();
        void executeChatQuery();
      });
    }
    if (chatInput) {
      chatInput.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter" || ev.key === "NumpadEnter") {
          ev.preventDefault();
          void executeChatQuery();
        }
      });
    }

    const resetAllBtn = document.getElementById("events-reset-all");
    if (resetAllBtn) {
      resetAllBtn.addEventListener("click", () => {
        resetAllToFullList();
      });
    }

    corners.forEach((btn) => {
      btn.addEventListener("click", () => {
        const mode = btn.getAttribute("data-overlay");
        if (!mode) return;
        if (activeMode === mode) return;
        openOverlay(mode);
      });
    });

    document.querySelectorAll(".people-card").forEach((btn) => {
      btn.addEventListener("click", () => {
        const on = btn.getAttribute("aria-pressed") === "true";
        btn.setAttribute("aria-pressed", on ? "false" : "true");
        refreshEventFilter();
      });
    });

    initPeopleChooserScroll();

    openOverlay("map");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
