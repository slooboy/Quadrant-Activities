/**
 * Paris venue/event set: 500 synthetic + 500 real-seeded (Wikidata + curated public listings).
 * Images: distinct Picsum seeds per id (replace with real URLs later if needed).
 *
 * Set `INCLUDE_SYNTHETIC_EVENTS` to `true` to include the 500 invented events (ids 0–499) again.
 */
(function () {
  /** When false, only real-seeded venues (ids 500–999) are emitted; synthetic generators stay in the file. */
  const INCLUDE_SYNTHETIC_EVENTS = false;

  const CATEGORIES = ["concert", "museum", "bar", "restaurant", "event", "workshop"];

  const ADJECTIVES = [
    "Petit",
    "Grand",
    "Vieux",
    "Nouveau",
    "Bleu",
    "Rouge",
    "Doré",
    "Secret",
    "Royal",
    "Populaire",
    "Charmant",
    "Moderne",
    "Classique",
    "Bohème",
    "Élégant",
  ];

  const NOUNS = [
    "Jazz",
    "Blues",
    "Rock",
    "Opéra",
    "Cabaret",
    "Galerie",
    "Atelier",
    "Marché",
    "Salon",
    "Cave",
    "Terrasse",
    "Comptoir",
    "Cuisine",
    "Table",
    "Scène",
    "Studio",
    "Musée",
    "Collection",
    "Expo",
    "Soirée",
  ];

  const AREAS = [
    "Marais",
    "Montmartre",
    "Latin Quarter",
    "Saint-Germain",
    "Bastille",
    "Canal Saint-Martin",
    "Châtelet",
    "République",
    "Belleville",
    "Passy",
    "Batignolles",
    "Pigalle",
    "Odéon",
    "Invalides",
    "Bercy",
  ];

  const VENUE_SUFFIX = [
    "Saint-Louis",
    "des Arts",
    "du Nord",
    "de la Cité",
    "des Halles",
    "du Panthéon",
    "Saint-Michel",
    "Notre-Dame",
    "du Louvre",
    "des Tuileries",
  ];

  /** Paris street names + arrondissement codes for synthetic addresses */
  const STREETS = [
    "Rue de Rivoli",
    "Boulevard Saint-Germain",
    "Rue Montorgueil",
    "Avenue des Champs-Élysées",
    "Rue Oberkampf",
    "Boulevard Haussmann",
    "Rue des Martyrs",
    "Quai de la Tournelle",
    "Rue du Faubourg Saint-Antoine",
    "Boulevard Richard-Lenoir",
    "Rue de la Roquette",
    "Rue de Belleville",
    "Avenue de la République",
    "Rue du Commerce",
    "Rue Lepic",
    "Boulevard Saint-Michel",
    "Rue de Charonne",
    "Rue des Archives",
    "Rue de Buci",
    "Rue de la Pompe",
  ];

  const ARRONDISSEMENTS = [
    "75001",
    "75002",
    "75003",
    "75004",
    "75005",
    "75006",
    "75007",
    "75008",
    "75009",
    "75010",
    "75011",
    "75012",
    "75013",
    "75014",
    "75015",
    "75016",
    "75017",
    "75018",
    "75019",
    "75020",
  ];

  /** Deterministic pseudo-random in [0, 1) from seed */
  function mulberry32(seed) {
    return function () {
      let t = (seed += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /** Rough Paris bounding box for map pins */
  function coordsFor(id) {
    const rand = mulberry32(id + 90210);
    const lat = 48.815 + rand() * (48.902 - 48.815);
    const lng = 2.224 + rand() * (2.469 - 2.224);
    return { lat: Math.round(lat * 1e6) / 1e6, lng: Math.round(lng * 1e6) / 1e6 };
  }

  function streetLineFor(id) {
    const num = 2 + (id % 178);
    const street = STREETS[id % STREETS.length];
    return `${num} ${street}`;
  }

  function addressFor(id) {
    const cp = ARRONDISSEMENTS[id % ARRONDISSEMENTS.length];
    return `${streetLineFor(id)}, ${cp} Paris, France`;
  }

  function pad2(n) {
    return String(n).padStart(2, "0");
  }

  const MONTH_ABBR = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  /** Calendar day strictly after today; spread across the next ~400 days by `id`. */
  function futureDateForEventId(id) {
    const d = new Date();
    d.setHours(12, 0, 0, 0);
    d.setDate(d.getDate() + 1 + (id % 400));
    return d;
  }

  function todayNoon() {
    const d = new Date();
    d.setHours(12, 0, 0, 0);
    return d;
  }

  /** e.g. `24 Mar` (two-digit day, space, three-letter month). */
  function formatDdMon(d) {
    const day = pad2(d.getDate());
    const mon = MONTH_ABBR[d.getMonth()];
    return `${day} ${mon}`;
  }

  /**
   * `ongoing` = opening hours (museum, bar, restaurant).
   * `today` / `coming_up` = dated shows (concert, event, workshop).
   */
  function timeRowForCategory(category, id) {
    if (category === "museum" || category === "bar" || category === "restaurant") return "ongoing";
    const h = (id * 31 + (id % 7)) % 10;
    return h < 4 ? "today" : "coming_up";
  }

  function scheduleFor(category, id) {
    const row = timeRowForCategory(category, id);
    const hour = 11 + (id % 10);
    const min = [0, 15, 30, 45][id % 4];

    if (row === "ongoing") {
      switch (category) {
        case "museum":
          return ["Tue–Sun 10:00–18:00", "Wed–Mon 9:30–17:45", "Daily 10:00–20:00 (Fri until 22:00)"][id % 3];
        case "restaurant":
          return ["12:00–14:30 · 19:00–23:00", "Daily 11:30–15:00 · 18:30–23:30", "Tue–Sat 12:00–14:00 · 19:00–00:00"][id % 3];
        case "bar":
          return ["17:00–02:00", "Daily 16:00–01:30", "Wed–Sun 18:00–03:00"][id % 3];
        default:
          return ["Hours vary — check venue", "Open daily — see site for times", "See venue for seasonal hours"][id % 3];
      }
    }

    const d = row === "today" ? todayNoon() : futureDateForEventId(id);
    const dateStr = formatDdMon(d);

    switch (category) {
      case "concert":
      case "event":
        return `${dateStr} · ${pad2(hour)}:${pad2(min)}`;
      case "workshop":
        return `${dateStr} · ${pad2(10 + (id % 6))}:00–${pad2(12 + (id % 4))}:30`;
      default:
        return `${dateStr} · ${pad2(hour)}:${pad2(min)}`;
    }
  }

  function titleFor(category, id) {
    const a = ADJECTIVES[id % ADJECTIVES.length];
    const n = NOUNS[(id * 7) % NOUNS.length];
    const ar = AREAS[(id * 3) % AREAS.length];
    const suf = VENUE_SUFFIX[(id * 5) % VENUE_SUFFIX.length];

    switch (category) {
      case "concert":
        return `${a} ${n} — live @ ${ar}`;
      case "museum":
        return `Musée ${a} ${n} · ${suf}`;
      case "bar":
        return `Bar ${n} ${suf}`;
      case "restaurant":
        return `Restaurant ${a} ${n} (${ar})`;
      case "event":
        return `Soirée ${n} — ${ar}`;
      case "workshop":
        return `Atelier ${n} · ${ar}`;
      default:
        return `${a} ${n} ${ar}`;
    }
  }

  function imageUrl(id) {
    return `https://picsum.photos/seed/quadrant-paris-${id}/800/520`;
  }

  /** Matches `ACTIVITY_CATEGORIES` in app.js (WHAT chips). */
  const ACTIVITY_KEYS = [
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

  /** WHY labels must match mood cards in app.js. */
  const MOOD_POOLS = {
    concert: [
      "adventuresome",
      "splashy",
      "thirsty",
      "antsy",
      "creative",
      "poetic",
      "romantic",
      "nostalgic",
    ],
    museum: [
      "curious",
      "tranquil",
      "readerly",
      "romantic",
      "creative",
      "pious",
      "penniless",
      "poetic",
    ],
    bar: ["thirsty", "nostalgic", "romantic", "penniless", "splashy", "antsy", "tranquil"],
    restaurant: ["hungry", "romantic", "tranquil", "splashy", "creative", "penniless", "curious"],
    event: [
      "adventuresome",
      "splashy",
      "creative",
      "poetic",
      "antsy",
      "thirsty",
      "readerly",
      "romantic",
    ],
    workshop: ["crafty", "creative", "curious", "tranquil", "readerly", "pious", "hungry"],
  };

  function emptyWhatBase(id) {
    const rand = mulberry32(id + 60001);
    return Object.fromEntries(ACTIVITY_KEYS.map((k) => [k, 0.03 + rand() * 0.07]));
  }

  function bumpWhat(w, keys, amount, rand) {
    keys.forEach((k) => {
      if (!(k in w)) return;
      w[k] = Math.min(1, (w[k] || 0) + amount + (rand() - 0.5) * 0.04);
    });
  }

  /**
   * WHAT: per–activity-type affinity in [0, 1] (which WHAT chips fit this event).
   * @param {string} category
   * @param {number} id
   */
  function whatScoresFor(category, id) {
    const rand = mulberry32(id + 70002);
    const w = emptyWhatBase(id);
    switch (category) {
      case "concert":
        bumpWhat(w, ["live music", "nightlife"], 0.72, rand);
        bumpWhat(w, ["theatre", "sports"], 0.22, rand);
        break;
      case "museum":
        bumpWhat(w, ["museum", "art gallery", "walking tour"], 0.68, rand);
        bumpWhat(w, ["kids & family", "class"], 0.18, rand);
        break;
      case "bar":
        bumpWhat(w, ["nightlife", "coffee & cafés"], 0.7, rand);
        bumpWhat(w, ["live music"], 0.28, rand);
        break;
      case "restaurant":
        bumpWhat(w, ["restaurant"], 0.78, rand);
        bumpWhat(w, ["nightlife", "coffee & cafés"], 0.22, rand);
        break;
      case "event":
        bumpWhat(w, ["live music", "nightlife", "theatre"], 0.58, rand);
        bumpWhat(w, ["cinema", "shopping"], 0.2, rand);
        break;
      case "workshop":
        bumpWhat(w, ["workshop", "class", "art gallery"], 0.7, rand);
        bumpWhat(w, ["spa & wellness", "nature"], 0.2, rand);
        break;
      default:
        bumpWhat(w, ["walking tour", "nature"], 0.35, rand);
    }
    return w;
  }

  /**
   * WHO: strong peaks for a few roles per venue type; low background elsewhere (for top-N filtering).
   */
  function whoScoresFor(category, id) {
    const rand = mulberry32(id + 80003);
    const keys = ["just me", "date", "with kids", "out with friends", "colleagues", "older visitors"];
    const base = {};
    keys.forEach((k) => {
      base[k] = 0.05 + rand() * 0.08;
    });
    const strong = (k, amt) => {
      if (!(k in base)) return;
      base[k] = Math.min(0.99, base[k] + amt + (rand() - 0.5) * 0.05);
    };
    switch (category) {
      case "concert":
        strong("out with friends", 0.82);
        strong("date", 0.4);
        strong("older visitors", 0.52);
        break;
      case "museum":
        strong("older visitors", 0.86);
        strong("just me", 0.56);
        strong("with kids", 0.44);
        break;
      case "bar":
        strong("out with friends", 0.74);
        strong("date", 0.5);
        strong("older visitors", 0.3);
        break;
      case "restaurant":
        strong("date", 0.74);
        strong("out with friends", 0.7);
        strong("older visitors", 0.6);
        break;
      case "workshop":
        strong("colleagues", 0.64);
        strong("with kids", 0.5);
        strong("older visitors", 0.44);
        break;
      case "event":
        strong("out with friends", 0.8);
        strong("date", 0.42);
        strong("older visitors", 0.5);
        break;
      default:
        break;
    }
    return base;
  }

  /** Every WHY chip label in app.js — order matches MOOD_CARDS. */
  const MOOD_LABEL_KEYS = [
    "adventuresome",
    "romantic",
    "tranquil",
    "curious",
    "hungry",
    "nostalgic",
    "antsy",
    "thirsty",
    "crafty",
    "creative",
    "poetic",
    "readerly",
    "pious",
    "splashy",
    "penniless",
  ];

  /**
   * WHY: scalar per mood (0–1), strong peaks on `whyTags`, low background elsewhere.
   */
  function whyScalarsFor(category, id, tags) {
    const rand = mulberry32(id + 93005);
    const o = {};
    for (const label of MOOD_LABEL_KEYS) {
      o[label] = 0.04 + rand() * 0.09;
    }
    for (const t of tags) {
      if (Object.prototype.hasOwnProperty.call(o, t)) {
        o[t] = Math.min(0.98, o[t] + 0.76 + rand() * 0.14);
      }
    }
    return o;
  }

  /**
   * WHY: subset of mood labels describing this event.
   */
  function whyTagsFor(category, id) {
    const pool = MOOD_POOLS[category] || MOOD_POOLS.event;
    const rand = mulberry32(id + 90004);
    const n = 4 + (id % 2);
    const tags = [];
    const used = new Set();
    let guard = 0;
    while (tags.length < n && guard++ < 80) {
      const pick = pool[Math.floor(rand() * pool.length) % pool.length];
      if (!used.has(pick)) {
        used.add(pick);
        tags.push(pick);
      }
    }
    return tags;
  }

  function descPoolIndex(id, category, poolLen) {
    let h = 2166136261;
    const s = String(category) + "\0" + id;
    for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
    return (h >>> 0) % poolLen;
  }

  function safeVenueName(t) {
    const s = String(t)
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 100);
    return s || "This spot";
  }

  /** Synthetic events: many rotating blurbs (no venue name). */
  const SYNTHETIC_DESC = {
    concert: [
      `PA stacks and a room that rewards showing up before doors. Check whether the bar stays open after the last encore.`,
      `House lights down, crowd tight to the stage—expect a short opener then a headline set that runs past midnight on weekends.`,
      `Standing room closer to the stage, seats further back if you book early. Sound tends to be loud and dry; earplugs aren’t silly.`,
      `A {ar}-leaning bill one month and touring acts the next; follow the venue’s calendar rather than assuming a fixed genre.`,
      `Merch table by the exit, card often accepted but cash still speeds things up. Last entry policies vary—read the fine print.`,
      `Intimate enough to read the setlist on phones, big enough to feel a proper crowd swell on the choruses.`,
      `Late shows common on Fridays; Tuesday–Thursday can be easier tickets. Arrive when doors open if you care about sightlines.`,
      `Acoustics favour electric bands over solo piano; spoken-word and comedy nights happen here too depending on the season.`,
      `Bag checks at the door, compact bags preferred. Cloakroom sometimes crowded—travel light if you can.`,
      `The room runs hot in summer; layered clothes help. Bar queues peak between sets.`,
      `Support acts get a tight 30–40 minutes; headliners often play two blocks with a short break. Encores depend on the crowd.`,
      `Wheelchair access varies by room layout—message the box office ahead. Subtitles or surtitles rarely available for music.`,
      `Street noise bleeds in during summer smokers’ breaks; winter shows feel more sealed-in and bass-heavy.`,
      `Local bills mix with international tours; check language of lyrics if that matters to you. All-ages shows are the exception, not the rule.`,
      `Photography rules differ per artist; assume no flash. Phone filming may get staff warnings.`,
    ],
    museum: [
      `Galleries loop in a logical order but you can cherry-pick rooms if time is short. Weekday openings are quieter than Sunday afternoons.`,
      `Temporary shows rotate through the main hall; the permanent collection rewards a second pass after coffee.`,
      `Labels are bilingual in many rooms; audioguides rent by the hour. Expect airport-style bag checks at busy times.`,
      `Stairs between floors are marble and can be slick in rain; lifts exist but queues form on free-entry Sundays.`,
      `Natural light in the skylit rooms is glorious until about 4 p.m.; plan portraits and pastels before then if you care about photos.`,
      `Children’s trails and family worksheets sometimes at the desk—ask on arrival. Strollers allowed in most wings.`,
      `The café overlooks the courtyard; pastries run out by mid-afternoon. Bookshop stocks exhibition catalogues in French and English.`,
      `Free lockers for backpacks in the basement; €1–2 coins sometimes required. Water bottles allowed, food is not.`,
      `Guided tours in English run a few mornings a week; private tours book out early in peak season.`,
      `Climate control keeps humidity steady for works on paper; you may feel a chill after an hour.`,
      `Sculpture terraces close in high winds; ask staff before planning outdoor photos.`,
      `The building mixes grand staircases with narrow side rooms—allow two hours minimum for a first visit.`,
      `Late openings on certain Thursdays; tickets often cheaper online than at the door.`,
      `Coat check lines spike at opening; arrive 15 minutes after doors if you hate queues.`,
      `Sketching permitted in some galleries with pencil only; ink and paint require advance permission.`,
    ],
    bar: [
      `Wine by the glass rotates weekly; the chalkboard is the source of truth. Standing room peaks after 9 p.m.`,
      `Natural wine leans funky on purpose; ask for “plus souple” if you prefer softer bottles. Small plates vanish fast.`,
      `Beer taps favour local brasseries and occasional Belgian imports. Happy hour rarely advertised—watch the clock.`,
      `Seats at the bar are first-come; tables turn slowly on weekends. Reservations rarely taken.`,
      `Smoking happens on the terrace even when it’s cold; indoor air stays clearer than at many brasseries.`,
      `Cash still welcome; splitting cards on large rounds can annoy on busy nights.`,
      `DJ sets or playlists shift the vibe after 11; conversation-friendly before then.`,
      `Dogs sometimes allowed at sidewalk tables; indoor policy varies. Water bowls appear on warm evenings.`,
      `Cocktails are classic, not molecular; expect stirred drinks and measured pours.`,
      `The back room opens for private parties some Fridays—call before making plans.`,
      `Service can feel brusque; it’s often pace, not rudeness. A polite “excusez-moi” goes far.`,
      `Ice is generous in highballs; specify if you want less dilution. Non-alcoholic options beyond soda are hit-or-miss.`,
      `Music volume creeps up after 10; ear fatigue is real on stone floors.`,
      `Rainy Tuesdays draw locals escaping offices nearby; sunny Thursdays pull tourists from nearby sights.`,
      `Last pour times follow neighbourhood rules; don’t expect kitchen food after midnight.`,
    ],
    restaurant: [
      `Menu follows the market—expect the fish course to change if the catch didn’t land. Lunch service is calmer than dinner.`,
      `Tables are close; voices carry. Ask for a corner if you want a quieter anniversary meal.`,
      `Vegetarian mains exist but may need 24 hours’ notice for tasting menus. Bread and butter are serious here.`,
      `Wine list skews French regions; sommeliers appreciate a budget ceiling upfront. Corkage rarely allowed.`,
      `Reservations essential Thursday–Saturday; same-day lunch sometimes possible by phone after 11 a.m.`,
      `Service pacing is French—gaps between courses are normal, not neglect. Coffee comes after dessert, not with.`,
      `Allergies: write them down if your French is shaky; staff will confirm with the kitchen.`,
      `The tasting menu runs long—plan three hours. À la carte suits tighter schedules.`,
      `Lunch formules offer the best value; dinner à la carte climbs quickly with supplements.`,
      `Terrace seats in summer book first; indoor tables near the kitchen trade noise for theatre.`,
      `Children’s menus are uncommon at this level; simpler plates can be split on request.`,
      `Dress is smart-casual; sneakers pass at lunch, less so at dinner on weekends.`,
      `Tap water is free by law; sparkling costs extra. Service charge is included but rounding up is kind.`,
      `Cheese before dessert is the local rhythm; say no early if you’re full.`,
      `Kitchen tours or chef’s table slots exist on quiet Mondays—ask when booking.`,
    ],
    event: [
      `Seating charts matter—stalls versus balcony changes sightlines and acoustics. Doors lock once the performance starts.`,
      `Intermissions are long enough for a drink if you sprint; queues for the ladies’ room don’t forgive dawdling.`,
      `Subtitles or surtitles depend on the production; surtitled performances are marked in listings.`,
      `Latecomers may wait in the wings until a scene break; refunds are rare if you miss the window.`,
      `Coat check is sometimes mandatory for large bags; photography is almost always forbidden once lights dim.`,
      `Standing ovations are common but not obligatory—follow the room if unsure.`,
      `Air conditioning can run cold; bring a layer even in summer.`,
      `Merch and programmes sell in the lobby; card terminals sometimes glitch—carry cash.`,
      `Accessible seating exists but must be booked; don’t assume same-day availability.`,
      `Running time in listings includes intermission; plan transport for after 11 p.m. finishes.`,
      `Cast changes happen; printed programmes may already be outdated—check the board.`,
      `Student rush tickets sometimes at the box office an hour before—IDs required.`,
      `Touring shows may perform in English with French surtitles, or vice versa—verify language.`,
      `Children under a certain age may be discouraged; check age guidance before buying.`,
      `Exit signs can be dim during blackouts—note the nearest aisle when you sit down.`,
    ],
    workshop: [
      `Materials are listed in the confirmation email—bring an apron if paint or clay is involved. Aprons sometimes provided.`,
      `Class size caps keep feedback useful; late arrivals miss the safety intro at the start.`,
      `Beginners share tables with returnees; pace is set to the median skill level.`,
      `Breaks are short; snacks help if the slot runs three hours. Water is on you.`,
      `Photography of your own work is fine; respect others’ privacy in group shots.`,
      `Hand washing stations are basic; nail polish and rings can be a nuisance for pottery.`,
      `English-language instruction is common but not guaranteed—check the session language.`,
      `Certificates or take-home pieces depend on firing or drying time—pickup dates follow by email.`,
      `Refund policies are strict within 48 hours of start; exchanges easier than cash back.`,
      `Street shoes may need covers in studio spaces; sandals discouraged for wood or metal workshops.`,
      `Left-handed stations exist but are limited—request when booking.`,
      `Group bookings can privatise a slot on quiet weekday mornings.`,
      `Kids’ sessions run separately; adult classes aren’t suited for under-16s unless noted.`,
      `Noise levels vary—printmaking is calm, percussion less so. Ear protection provided where needed.`,
      `Follow-up resources (PDFs, supplier lists) arrive after class by email.`,
    ],
    default: [
      `A neighbourhood fixture worth checking hours online—seasonal closures aren’t always obvious from the street.`,
      `Staff rotate; the person who answers email may not be on floor duty the day you visit.`,
      `Peak crowds cluster around lunch and post-work hours; mid-morning visits breathe easier.`,
      `Payment cards widely accepted; American Express less so in smaller independents.`,
      `Public transport links are good but strikes happen—have a backup walking route.`,
      `Weather in the doorway can mean queues outside; dress for rain even if the forecast looks clear.`,
      `Reviews age quickly in Paris; cross-check the date on blog posts before trusting details.`,
      `Photography policies vary room by room; when in doubt, ask before pulling out a camera.`,
      `Accessibility information is easiest to get by phone or email in advance.`,
      `Pet policies differ; assume dogs aren’t allowed indoors unless you see a bowl at the door.`,
      `Noise from the street rises on weekend nights; earplugs help light sleepers at nearby hotels.`,
      `Tips are included in many bills; rounding up in cash is still appreciated.`,
      `Holiday hours differ from Google’s default—confirm on the official site.`,
      `Construction on adjacent streets can affect entrances—check social media for updates.`,
      `Combine with a walk along the river or through a nearby market for a full afternoon.`,
    ],
  };

  /** Real venue names: varied copy referencing the place by name. */
  const NAMED_DESC = {
    concert: [
      `{name} has hosted generations of touring acts—expect tight security, a sticky floor, and honest volume.`,
      `Gigs at {name} run the gamut from jazz trios to full rock stacks; check tonight’s genre before you dress up.`,
      `{name} is a Paris live-music staple: bars at the back, merch by the exit, and encores if the crowd pushes.`,
      `Sound at {name} favours electric bands; acoustic sets happen but aren’t the main identity.`,
      `{name} fills fast on weekends—buy tickets early and read the door time; Paris audiences arrive fashionably late.`,
      `If you only know {name} from photos, the room feels smaller in person—sightlines from the balcony differ from the pit.`,
      `{name} books French artists alongside imports; language of between-song banter varies by bill.`,
      `Late-night sets at {name} can run past métro hours—plan a taxi or night bus.`,
      `{name} is the kind of venue where the opening act can steal the night; show up for doors.`,
      `Crowd energy at {name} spikes on Fridays; weeknights can feel like a private show.`,
      `{name} mixes seated and standing zones—ticket category matters more than at arena shows.`,
      `Beer lines at {name} peak between bands; grab drinks before the headliner if you hate waiting.`,
      `{name} has seen its share of legendary bootlegs; house policy on recording is strict—respect it.`,
      `Acoustics at {name} suit amplified music; unplugged nights are special events, not the default.`,
      `{name} is worth a visit even when you don’t know the band—discovery bills are part of the DNA.`,
    ],
    museum: [
      `{name} rewards slow looking—temporary shows rotate while the building itself is part of the draw.`,
      `Collections at {name} span more than a single school; pick a focus or you’ll try to see everything.`,
      `{name} runs quieter on weekday mornings; school groups pack Wednesday afternoons.`,
      `Audioguides at {name} add context without crowding the wall text; rent one if your French is rusty.`,
      `{name} mixes blockbuster loans with permanent rooms—check which ticket tier you need.`,
      `Natural light at {name} changes how colours read on canvases—revisit a favourite room at a different hour if you can.`,
      `{name} has a café worth the pause; don’t skip the bookshop for exhibition catalogues.`,
      `Stairs at {name} are part of the charm; lifts exist but may queue on free Sundays.`,
      `{name} often extends hours on certain nights—ideal if you hate midday crowds.`,
      `Family trails at {name} appear during school holidays; adult visitors can ignore them but expect noisier rooms.`,
      `{name} participates in city-wide museum nights; tickets sell out fast when announced.`,
      `Photography rules at {name} differ by gallery—look for icons at each doorway.`,
      `{name} sits among other sights—bundle tickets if a combined pass exists.`,
      `Climate control at {name} protects works on paper; bring a light layer even in summer.`,
      `{name} is a credible rainy-day anchor; sunny days pull crowds anyway—book ahead.`,
    ],
    bar: [
      `{name} pours natural wine, classic cocktails, or both depending on the night—ask what’s open.`,
      `The crowd at {name} skews local after 10 p.m.; early evening is easier for conversation.`,
      `{name} keeps pours generous; pace yourself if you’re hopping between arrondissements.`,
      `Standing room dominates at {name}; snag a stool if you see one free.`,
      `{name} rotates taps and bottles—regulars watch the chalkboard, not the printed menu.`,
      `Smokers cluster outside {name}; inside air stays tolerable compared to older dives.`,
      `{name} runs a tight playlist—DJs some nights, vinyl others; check socials.`,
      `Snacks at {name} are simple—cheese, charcuterie, olives—enough to soak up a bottle.`,
      `{name} closes when the neighbourhood quiets; don’t plan a nightcap after last métro without a backup.`,
      `Staff at {name} prefer cards for tabs over splitting five ways—come with Revolut or cash for easier math.`,
      `{name} fills after nearby restaurants let out; arrive early for a quiet glass.`,
      `The back room at {name} opens for overflow on Fridays—same drinks, louder vibe.`,
      `{name} is a solid solo-drinker bar; reading at the counter won’t raise eyebrows.`,
      `Wine flights at {name} change weekly; ask what’s drinking best tonight.`,
      `{name} doesn’t do reservations—first come, first served.`,
    ],
    restaurant: [
      `{name} cooks from the market list—menus shift more than photos online suggest.`,
      `Dinner at {name} runs long by design; lunch is the move if you want speed.`,
      `{name} takes allergies seriously—flag them when booking, not only at the table.`,
      `Wine pairings at {name} follow the chef’s rhythm; trust the somm or set a price ceiling early.`,
      `{name} is a splurge for many locals—make it count with the tasting menu if your budget allows.`,
      `Tables at {name} are tight; intimacy is part of the experience, not a flaw.`,
      `{name} books out Thursday–Saturday; Tuesday can feel like a private dining room.`,
      `Bread and butter at {name} deserve attention—don’t fill up before the mains land.`,
      `{name} serves cheese before dessert; say no when you’re full rather than wasting plates.`,
      `Coffee after dessert at {name} is the French rhythm—espresso, not cappuccino, after 11 a.m.`,
      `{name} sources fish daily—if it’s not on the board, it didn’t come in.`,
      `Vegetarian tasting menus at {name} need advance notice; à la carte is more flexible.`,
      `{name} terrace seats in summer are gold; indoor tables near the pass are loud but fun.`,
      `Service at {name} won’t rush you; flag if you have theatre tickets.`,
      `{name} is worth comparing lunch versus dinner pricing—often a big gap for similar food.`,
    ],
    event: [
      `{name} programmes theatre, dance, and one-off shows—read the language and surtitle notes before buying.`,
      `Seating at {name} varies wildly by price band; study the chart rather than trusting “best available”.`,
      `{name} enforces latecomer holds—arrive early if you hate missing the opening.`,
      `Intervals at {name} are long enough for the bar if you move quickly; toilets queue fast.`,
      `{name} runs ice-cold air in summer auditoriums—bring a layer.`,
      `Programmes at {name} sell in the lobby; casts can change—check the board.`,
      `{name} sometimes streams select performances—verify if you need in-person tickets.`,
      `Accessibility at {name} is best arranged when booking; don’t rely on door staff alone.`,
      `{name} hosts school matinees on certain mornings—adult evenings feel different.`,
      `Standing room at {name} is rare but exists for some concerts—knees beware.`,
      `{name} has a strict no-photo policy once lights dim; ushers enforce it.`,
      `Merch tables at {name} vary by production—cash helps when terminals fail.`,
      `{name} sits in a lively district—plan dinner before, drinks after, with time buffers.`,
      `Subtitles at {name} may be French only—check before bringing visitors who need English.`,
      `{name} is a reason to dress up a notch; jeans pass but effort is noticed.`,
    ],
    workshop: [
      `{name} runs hands-on sessions—materials lists land by email; read before you pack.`,
      `Classes at {name} cap headcount so the instructor can circulate; late entry misses safety basics.`,
      `{name} suits beginners and returnees in the same room—pace follows the median.`,
      `Bring an apron to {name} if clay, paint, or oil is involved—some sessions supply them, some don’t.`,
      `{name} schedules pickup for fired or dried work later in the week—don’t plan to carry everything home day one.`,
      `English sessions at {name} sell out first—book early in tourist season.`,
      `{name} offers private group slots on quiet mornings—worth asking for birthdays.`,
      `Kids and adults rarely mix at {name}; check age tags on listings.`,
      `{name} sends follow-up PDFs with suppliers and reading—check spam folders.`,
      `Left-handed benches exist at {name} but are limited—request on booking.`,
      `Noise at {name} depends on discipline—printmaking is calm, percussion less so.`,
      `{name} refunds reluctantly inside 48 hours—swaps easier than cash.`,
      `Breaks at {name} are short; eat beforehand if the slot spans lunch.`,
      `{name} studios can be chilly in winter—layers beat a heavy coat you can’t store.`,
      `Photos of your own work at {name} are fine; ask before posting classmates’ pieces.`,
    ],
  };

  /** Synthetic events: pick from large pools by hash. */
  function descriptionFor(category, id) {
    const key = category in SYNTHETIC_DESC ? category : "default";
    const pool = SYNTHETIC_DESC[key];
    let line = pool[descPoolIndex(id, category, pool.length)];
    const ar = AREAS[(id * 3) % AREAS.length];
    const st = STREETS[id % STREETS.length];
    line = line.replace(/\{ar\}/g, ar).replace(/\{st\}/g, st);
    return line;
  }

  /** Real seeded venues: name-specific varied blurbs. */
  function descriptionForVenueTitle(title, category, id) {
    const key = category in NAMED_DESC ? category : "restaurant";
    const pool = NAMED_DESC[key];
    const name = safeVenueName(title);
    let line = pool[descPoolIndex(id, name + category, pool.length)];
    return line.replace(/\{name\}/g, name);
  }

  const ALLOWED_CATEGORIES = new Set(CATEGORIES);

  function normalizeSeedCategory(c) {
    if (c && ALLOWED_CATEGORIES.has(c)) return c;
    if (c === "concert") return "concert";
    return "restaurant";
  }

  function pushSyntheticEvent(out, i) {
    const category = CATEGORIES[i % CATEGORIES.length];
    const { lat, lng } = coordsFor(i);
    const whyTags = whyTagsFor(category, i);
    out.push({
      id: i,
      title: titleFor(category, i),
      category,
      timeRow: timeRowForCategory(category, i),
      image: imageUrl(i),
      schedule: scheduleFor(category, i),
      address: addressFor(i),
      streetLine: streetLineFor(i),
      description: descriptionFor(category, i),
      lat,
      lng,
      whyTags,
      why: whyScalarsFor(category, i, whyTags),
      what: whatScoresFor(category, i),
      who: whoScoresFor(category, i),
    });
  }

  function getRealSeeds() {
    const raw = typeof window !== "undefined" && window.PARIS_REAL_VENUE_SEEDS ? window.PARIS_REAL_VENUE_SEEDS : [];
    if (raw.length >= 500) return raw.slice(0, 500);
    const a = raw.slice();
    while (a.length < 500) a.push(null);
    return a;
  }

  function generateParisEvents() {
    const out = [];
    const seeds = getRealSeeds();
    if (INCLUDE_SYNTHETIC_EVENTS) {
      for (let i = 0; i < 500; i++) {
        pushSyntheticEvent(out, i);
      }
    }
    for (let i = 500; i < 1000; i++) {
      const seed = seeds[i - 500];
      if (seed && seed.t) {
        const category = normalizeSeedCategory(seed.c);
        const { lat: clat, lng: clng } = coordsFor(i);
        const hasCoord = seed.lat != null && seed.lng != null && Number.isFinite(seed.lat) && Number.isFinite(seed.lng);
        const lat = hasCoord ? seed.lat : clat;
        const lng = hasCoord ? seed.lng : clng;
        const whyTags = whyTagsFor(category, i);
        out.push({
          id: i,
          title: String(seed.t),
          category,
          timeRow: timeRowForCategory(category, i),
          image: imageUrl(i),
          schedule: scheduleFor(category, i),
          address: addressFor(i),
          streetLine: streetLineFor(i),
          description: descriptionForVenueTitle(String(seed.t), category, i),
          lat,
          lng,
          whyTags,
          why: whyScalarsFor(category, i, whyTags),
          what: whatScoresFor(category, i),
          who: whoScoresFor(category, i),
        });
      } else if (INCLUDE_SYNTHETIC_EVENTS) {
        pushSyntheticEvent(out, i);
      }
    }
    return out;
  }

  window.PARIS_EVENTS = generateParisEvents();
})();
