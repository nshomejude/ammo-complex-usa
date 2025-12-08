// Mapping of product/firearm IDs to their unique images
export const firearmImages: Record<string, string> = {
  // Glock pistols
  "glock-17": "/images/firearms/glock-17.png",
  "glock-19": "/images/firearms/glock-19.png",
  "glock-22": "/images/firearms/glock-22.png",
  "glock-23": "/images/firearms/glock-23.png",
  "glock-20": "/images/firearms/glock-22.png", // Uses G22 image (similar)
  "glock-21": "/images/firearms/glock-22.png", // Uses G22 image (similar)
  "glock-26": "/images/firearms/glock-19.png", // Compact similar to G19
  "glock-27": "/images/firearms/glock-23.png", // Similar to G23
  "glock-30": "/images/firearms/glock-22.png",
  "glock-34": "/images/firearms/glock-17.png", // Long slide G17
  "glock-43": "/images/firearms/glock-43x.png",
  "glock-43x": "/images/firearms/glock-43x.png",
  "glock-48": "/images/firearms/glock-48.png",
  "glock-45": "/images/firearms/glock-19.png", // Crossover similar to G19
  
  // SIG Sauer
  "sig-p320": "/images/firearms/sig-p320-axg-legion.png",
  "sig-p320-m17": "/images/firearms/sig-p320-axg-legion.png",
  "sig-p320-x5": "/images/firearms/sig-p320-x5.png",
  "sig-p226": "/images/firearms/sig-p226-legion.png",
  "sig-p226-legion": "/images/firearms/sig-p226-legion.png",
  "sig-p229": "/images/firearms/sig-p229.png",
  "sig-p365": "/images/firearms/sig-p365.png",
  "sig-p365-xl": "/images/firearms/sig-p365-xl.png",
  "sig-p938": "/images/firearms/sig-p365.png",
  
  // Smith & Wesson
  "sw-mp-shield": "/images/firearms/sw-mp-shield.png",
  "sw-mp-shield-plus": "/images/firearms/sw-mp-shield.png",
  "sw-mp9-m2": "/images/firearms/sw-mp9-m2.png",
  "sw-mp-m2": "/images/firearms/sw-mp9-m2.png",
  "sw-1911": "/images/firearms/sw-1911.png",
  "sw-1911-e-series": "/images/firearms/sw-1911.png",
  "sw-686": "/images/firearms/sw-686.png",
  "sw-642": "/images/firearms/sw-686.png",
  "sw-model-29": "/images/firearms/sw-686.png",
  
  // CZ
  "cz-p10c": "/images/firearms/cz-p10c.png",
  "cz-p10f": "/images/firearms/cz-p10c.png",
  "cz-p10s": "/images/firearms/cz-p10c.png",
  "cz-75": "/images/firearms/cz-75-sp01.png",
  "cz-75-sp01": "/images/firearms/cz-75-sp01.png",
  "cz-75-shadow": "/images/firearms/cz-75-sp01.png",
  
  // Beretta
  "beretta-92fs": "/images/firearms/beretta-92fs.png",
  "beretta-92x": "/images/firearms/beretta-92fs.png",
  "beretta-m9": "/images/firearms/beretta-92fs.png",
  "beretta-m9a3": "/images/firearms/beretta-m9a3.png",
  "beretta-m9a4": "/images/firearms/beretta-m9a3.png",
  "beretta-apx": "/images/firearms/beretta-92fs.png",
  
  // FN
  "fn-five-seven": "/images/firearms/fn-five-seven.png",
  "fn-509": "/images/firearms/fn-509-tactical.png",
  "fn-509-tactical": "/images/firearms/fn-509-tactical.png",
  "fn-scar": "/images/firearms/fn-scar.png",
  "fn-scar-17": "/images/firearms/fn-scar.png",
  "fn-scar-16": "/images/firearms/fn-scar.png",
  
  // HK
  "hk-vp9": "/images/firearms/hk-vp9.png",
  "hk-vp9sk": "/images/firearms/hk-vp9.png",
  "hk-usp": "/images/firearms/hk-usp.png",
  "hk-usp-compact": "/images/firearms/hk-usp.png",
  "hk-p30": "/images/firearms/hk-vp9.png",
  "hk-45": "/images/firearms/hk-usp.png",
  
  // Walther
  "walther-ppq": "/images/firearms/walther-ppq.png",
  "walther-pdp": "/images/firearms/walther-ppq.png",
  "walther-pps": "/images/firearms/walther-ppq.png",
  
  // Springfield Armory
  "springfield-1911": "/images/firearms/springfield-1911.png",
  "springfield-xd": "/images/firearms/springfield-xds.png",
  "springfield-xds": "/images/firearms/springfield-xds.png",
  "springfield-xdm": "/images/firearms/springfield-xds.png",
  "springfield-hellcat": "/images/firearms/springfield-xds.png",
  
  // Kimber
  "kimber-1911": "/images/firearms/kimber-1911.png",
  "kimber-custom": "/images/firearms/kimber-1911.png",
  "kimber-pro": "/images/firearms/kimber-1911.png",
  "kimber-ultra": "/images/firearms/kimber-1911.png",
  
  // Ruger
  "ruger-57": "/images/firearms/ruger-57.png",
  "ruger-sr9": "/images/firearms/ruger-57.png",
  "ruger-security-9": "/images/firearms/ruger-57.png",
  "ruger-gp100": "/images/firearms/ruger-gp100.png",
  "ruger-sp101": "/images/firearms/ruger-gp100.png",
  "ruger-1022": "/images/firearms/ruger-1022.png",
  "ruger-10-22": "/images/firearms/ruger-1022.png",
  "ruger-mini-14": "/images/firearms/ruger-1022.png",
  
  // Colt
  "colt-python": "/images/firearms/colt-python.png",
  "colt-king-cobra": "/images/firearms/colt-python.png",
  "colt-1911": "/images/firearms/springfield-1911.png",
  
  // Canik
  "canik-tp9": "/images/firearms/canik-tp9.png",
  "canik-tp9-elite": "/images/firearms/canik-tp9.png",
  "canik-tp9sfx": "/images/firearms/canik-tp9.png",
  
  // Rifles - AR-15 Platform
  "ar15": "/images/firearms/ar15-standard.png",
  "ar15-standard": "/images/firearms/ar15-standard.png",
  "ar-15": "/images/firearms/ar15-standard.png",
  "dd-ddm4": "/images/firearms/dd-ddm4.png",
  "daniel-defense-ddm4": "/images/firearms/dd-ddm4.png",
  "bcm-recce": "/images/firearms/ar15-standard.png",
  "aero-precision": "/images/firearms/ar15-standard.png",
  "psa-ar15": "/images/firearms/ar15-standard.png",
  
  // Rifles - Bolt Action
  "remington-700": "/images/firearms/remington-700.png",
  "remington-783": "/images/firearms/remington-700.png",
  "savage-110": "/images/firearms/remington-700.png",
  "tikka-t3x": "/images/firearms/remington-700.png",
  "winchester-70": "/images/firearms/remington-700.png",
  "ruger-american": "/images/firearms/remington-700.png",
  
  // Rifles - AK Platform
  "ak47": "/images/firearms/ak47.png",
  "ak-47": "/images/firearms/ak47.png",
  "akm": "/images/firearms/ak47.png",
  "wasr-10": "/images/firearms/ak47.png",
  "zastava-m70": "/images/firearms/ak47.png",
  
  // Rifles - Other
  "iwi-tavor": "/images/firearms/iwi-tavor.png",
  "tavor-x95": "/images/firearms/iwi-tavor.png",
  
  // Shotguns
  "remington-870": "/images/firearms/remington-870.png",
  "remington-870-express": "/images/firearms/remington-870.png",
  "remington-870-tactical": "/images/firearms/remington-870.png",
  "mossberg-500": "/images/firearms/mossberg-500.png",
  "mossberg-590": "/images/firearms/mossberg-500.png",
  "mossberg-590a1": "/images/firearms/mossberg-500.png",
  "mossberg-shockwave": "/images/firearms/mossberg-500.png",
  "benelli-m4": "/images/firearms/benelli-m4.png",
  "benelli-m2": "/images/firearms/benelli-m4.png",
  "benelli-supernova": "/images/firearms/mossberg-500.png",
};

export const ammoImages: Record<string, string> = {
  // 5.56/.223 ammunition
  "556-federal-xm193": "/images/ammo/federal-xm193.png",
  "556-federal-xm855": "/images/ammo/federal-xm855.png",
  "223-winchester-usa-55": "/images/ammo/winchester-223.png",
  "223-hornady-frontier": "/images/ammo/winchester-223.png",
  "223-pmc-bronze": "/images/ammo/winchester-223.png",
  "556-hornady-black": "/images/ammo/federal-xm855.png",
  "556-barnes-vor-tx": "/images/ammo/federal-xm855.png",
  
  // 9mm ammunition
  "9mm-federal-american-eagle": "/images/ammo/federal-hst-9mm.png",
  "9mm-winchester-white-box": "/images/ammo/federal-hst-9mm.png",
  "9mm-speer-gold-dot": "/images/ammo/hornady-9mm-critical.png",
  "9mm-hornady-critical-defense": "/images/ammo/hornady-9mm-critical.png",
  "9mm-federal-hst": "/images/ammo/federal-hst-9mm.png",
  "9mm-sig-v-crown": "/images/ammo/hornady-9mm-critical.png",
  "9mm-remington-umc": "/images/ammo/federal-hst-9mm.png",
  "9mm-pmc-bronze": "/images/ammo/federal-hst-9mm.png",
  "9mm-blazer-brass": "/images/ammo/federal-hst-9mm.png",
  "9mm-fiocchi-fmj": "/images/ammo/federal-hst-9mm.png",
  
  // .45 ACP ammunition
  "45acp-federal-american-eagle": "/images/ammo/remington-45acp.png",
  "45acp-winchester-white-box": "/images/ammo/remington-45acp.png",
  "45acp-speer-gold-dot": "/images/ammo/remington-45acp.png",
  "45acp-hornady-critical-duty": "/images/ammo/remington-45acp.png",
  "45acp-federal-hst": "/images/ammo/remington-45acp.png",
  "45acp-remington-umc": "/images/ammo/remington-45acp.png",
  
  // .40 S&W ammunition
  "40sw-federal-american-eagle": "/images/ammo/federal-40sw.png",
  "40sw-winchester-ranger": "/images/ammo/federal-40sw.png",
  "40sw-speer-gold-dot": "/images/ammo/federal-40sw.png",
  "40sw-hornady-critical-duty": "/images/ammo/federal-40sw.png",
  
  // .308 Winchester / 7.62 NATO ammunition
  "308-federal-gold-medal": "/images/ammo/hornady-308.png",
  "308-hornady-match": "/images/ammo/hornady-308.png",
  "308-winchester-super-x": "/images/ammo/hornady-308.png",
  "762-federal-xm80": "/images/ammo/hornady-308.png",
  "762-pmc-bronze": "/images/ammo/hornady-308.png",
  
  // 12 gauge shotgun
  "12ga-federal-flitecontrol": "/images/ammo/winchester-12ga.png",
  "12ga-hornady-critical-defense": "/images/ammo/winchester-12ga.png",
  "12ga-winchester-pdx1": "/images/ammo/winchester-12ga.png",
  "12ga-remington-express": "/images/ammo/winchester-12ga.png",
  
  // .22 LR ammunition
  "22lr-cci-minimag": "/images/ammo/cci-22lr.png",
  "22lr-federal-automatch": "/images/ammo/cci-22lr.png",
  "22lr-winchester-super-x": "/images/ammo/cci-22lr.png",
  "22lr-aguila-super-extra": "/images/ammo/cci-22lr.png",
  
  // .357 Magnum
  "357mag-federal-american-eagle": "/images/ammo/hornady-9mm-critical.png",
  "357mag-hornady-critical-defense": "/images/ammo/hornady-9mm-critical.png",
  
  // 10mm Auto
  "10mm-federal-american-eagle": "/images/ammo/federal-40sw.png",
  "10mm-hornady-xtp": "/images/ammo/federal-40sw.png",
  
  // 7.62x39
  "762x39-wolf-military": "/images/ammo/hornady-308.png",
  "762x39-tula-steel": "/images/ammo/hornady-308.png",
};

// Helper function to get firearm image with smart fallbacks based on manufacturer and type
export const getFirearmImage = (id: string, manufacturer?: string, actionType?: string): string => {
  // Try exact match first
  if (firearmImages[id]) return firearmImages[id];
  
  const idLower = id.toLowerCase();
  const mfgLower = (manufacturer || "").toLowerCase();
  
  // Try partial ID matching
  for (const [key, value] of Object.entries(firearmImages)) {
    if (idLower.includes(key) || key.includes(idLower)) {
      return value;
    }
  }
  
  // Manufacturer-based fallbacks
  if (mfgLower.includes("glock")) return "/images/firearms/glock-17.png";
  if (mfgLower.includes("sig") || mfgLower.includes("sauer")) return "/images/firearms/sig-p320-axg-legion.png";
  if (mfgLower.includes("smith") || mfgLower.includes("wesson") || mfgLower === "s&w") return "/images/firearms/sw-mp9-m2.png";
  if (mfgLower.includes("beretta")) return "/images/firearms/beretta-92fs.png";
  if (mfgLower.includes("fn") || mfgLower.includes("fabrique")) return "/images/firearms/fn-509-tactical.png";
  if (mfgLower.includes("hk") || mfgLower.includes("heckler") || mfgLower.includes("koch")) return "/images/firearms/hk-vp9.png";
  if (mfgLower.includes("walther")) return "/images/firearms/walther-ppq.png";
  if (mfgLower.includes("springfield")) return "/images/firearms/springfield-1911.png";
  if (mfgLower.includes("kimber")) return "/images/firearms/kimber-1911.png";
  if (mfgLower.includes("ruger")) return "/images/firearms/ruger-57.png";
  if (mfgLower.includes("colt")) return "/images/firearms/colt-python.png";
  if (mfgLower.includes("canik")) return "/images/firearms/canik-tp9.png";
  if (mfgLower.includes("cz") || mfgLower.includes("ceska")) return "/images/firearms/cz-p10c.png";
  if (mfgLower.includes("remington")) {
    if (idLower.includes("870") || idLower.includes("shotgun")) return "/images/firearms/remington-870.png";
    if (idLower.includes("700")) return "/images/firearms/remington-700.png";
    return "/images/firearms/remington-700.png";
  }
  if (mfgLower.includes("mossberg")) return "/images/firearms/mossberg-500.png";
  if (mfgLower.includes("benelli")) return "/images/firearms/benelli-m4.png";
  if (mfgLower.includes("winchester")) return "/images/firearms/remington-700.png";
  if (mfgLower.includes("savage")) return "/images/firearms/remington-700.png";
  if (mfgLower.includes("tikka")) return "/images/firearms/remington-700.png";
  if (mfgLower.includes("daniel") || mfgLower.includes("dd")) return "/images/firearms/dd-ddm4.png";
  if (mfgLower.includes("iwi")) return "/images/firearms/iwi-tavor.png";
  if (mfgLower.includes("zastava") || mfgLower.includes("ak")) return "/images/firearms/ak47.png";
  
  // Action type based fallbacks
  const actionLower = (actionType || "").toLowerCase();
  if (actionLower.includes("bolt")) return "/images/firearms/remington-700.png";
  if (actionLower.includes("pump") || actionLower.includes("shotgun")) return "/images/firearms/remington-870.png";
  if (actionLower.includes("semi") && actionLower.includes("shotgun")) return "/images/firearms/benelli-m4.png";
  if (actionLower.includes("over") || actionLower.includes("under") || actionLower.includes("break")) return "/images/firearms/remington-870.png";
  if (actionLower.includes("lever")) return "/images/firearms/remington-700.png";
  if (actionLower.includes("revolver")) return "/images/firearms/sw-686.png";
  
  // ID keyword matching
  if (idLower.includes("ar") || idLower.includes("rifle") && idLower.includes("semi")) return "/images/firearms/ar15-standard.png";
  if (idLower.includes("ak") || idLower.includes("kalash")) return "/images/firearms/ak47.png";
  if (idLower.includes("shotgun") || idLower.includes("12ga") || idLower.includes("gauge")) return "/images/firearms/remington-870.png";
  if (idLower.includes("revolver")) return "/images/firearms/sw-686.png";
  if (idLower.includes("1911")) return "/images/firearms/springfield-1911.png";
  if (idLower.includes("pistol") || idLower.includes("handgun")) return "/images/firearms/glock-17.png";
  
  // Default to a generic pistol
  return "/images/firearms/glock-17.png";
};

// Helper function to get ammo image with fallback  
export const getAmmoImage = (id: string): string => {
  // Try exact match first
  if (ammoImages[id]) return ammoImages[id];
  
  // Try partial match based on caliber/manufacturer
  const idLower = id.toLowerCase();
  if (idLower.includes("556") || idLower.includes("223")) {
    if (idLower.includes("federal")) return "/images/ammo/federal-xm193.png";
    if (idLower.includes("winchester")) return "/images/ammo/winchester-223.png";
    return "/images/ammo/federal-xm193.png";
  }
  if (idLower.includes("9mm")) {
    if (idLower.includes("hornady")) return "/images/ammo/hornady-9mm-critical.png";
    if (idLower.includes("federal")) return "/images/ammo/federal-hst-9mm.png";
    return "/images/ammo/federal-hst-9mm.png";
  }
  if (idLower.includes("45") || idLower.includes("45acp")) {
    return "/images/ammo/remington-45acp.png";
  }
  if (idLower.includes("40") || idLower.includes("40sw")) {
    return "/images/ammo/federal-40sw.png";
  }
  if (idLower.includes("308") || idLower.includes("762")) {
    return "/images/ammo/hornady-308.png";
  }
  if (idLower.includes("12ga") || idLower.includes("shotgun")) {
    return "/images/ammo/winchester-12ga.png";
  }
  if (idLower.includes("22lr") || idLower.includes("22-lr")) {
    return "/images/ammo/cci-22lr.png";
  }
  
  return "/placeholder.svg";
};
