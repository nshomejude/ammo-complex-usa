// Mapping of product/firearm IDs to their unique images
export const firearmImages: Record<string, string> = {
  // Glock pistols
  "glock-17": "/images/firearms/glock-17.png",
  "glock-19": "/images/firearms/glock-19.png",
  "glock-22": "/images/firearms/glock-22.png",
  "glock-23": "/images/firearms/glock-23.png",
  "glock-48": "/images/firearms/glock-48.png",
  "glock-43x": "/images/firearms/glock-43x.png",
  
  // SIG Sauer
  "sig-p320": "/images/firearms/sig-p320-axg-legion.png",
  "sig-p226": "/images/firearms/sig-p226-legion.png",
  "sig-p229": "/images/firearms/sig-p229.png",
  "sig-p365": "/images/firearms/sig-p365.png",
  "sig-p365-xl": "/images/firearms/sig-p365-xl.png",
  "sig-p320-x5": "/images/firearms/sig-p320-x5.png",
  
  // Smith & Wesson
  "sw-mp-shield": "/images/firearms/sw-mp-shield.png",
  "sw-1911": "/images/firearms/sw-1911.png",
  "sw-mp9-m2": "/images/firearms/sw-mp9-m2.png",
  "sw-686": "/images/firearms/sw-686.png",
  
  // CZ
  "cz-p10c": "/images/firearms/cz-p10c.png",
  "cz-75-sp01": "/images/firearms/cz-75-sp01.png",
  
  // Beretta
  "beretta-92fs": "/images/firearms/beretta-92fs.png",
  "beretta-m9a3": "/images/firearms/beretta-m9a3.png",
  
  // FN
  "fn-five-seven": "/images/firearms/fn-five-seven.png",
  "fn-509-tactical": "/images/firearms/fn-509-tactical.png",
  "fn-scar": "/images/firearms/fn-scar.png",
  
  // HK
  "hk-vp9": "/images/firearms/hk-vp9.png",
  "hk-usp": "/images/firearms/hk-usp.png",
  
  // Other pistols
  "walther-ppq": "/images/firearms/walther-ppq.png",
  "kimber-1911": "/images/firearms/kimber-1911.png",
  "ruger-57": "/images/firearms/ruger-57.png",
  "springfield-1911": "/images/firearms/springfield-1911.png",
  "springfield-xds": "/images/firearms/springfield-xds.png",
  "canik-tp9": "/images/firearms/canik-tp9.png",
  
  // Revolvers
  "colt-python": "/images/firearms/colt-python.png",
  "ruger-gp100": "/images/firearms/ruger-gp100.png",
  
  // Rifles
  "ar15-standard": "/images/firearms/ar15-standard.png",
  "dd-ddm4": "/images/firearms/dd-ddm4.png",
  "remington-700": "/images/firearms/remington-700.png",
  "ruger-1022": "/images/firearms/ruger-1022.png",
  "ak47": "/images/firearms/ak47.png",
  "iwi-tavor": "/images/firearms/iwi-tavor.png",
  
  // Shotguns
  "remington-870": "/images/firearms/remington-870.png",
  "mossberg-500": "/images/firearms/mossberg-500.png",
  "benelli-m4": "/images/firearms/benelli-m4.png",
};

export const ammoImages: Record<string, string> = {
  // 5.56/.223 ammunition
  "556-federal-xm193": "/images/ammo/federal-xm193.png",
  "556-federal-xm855": "/images/ammo/federal-xm855.png",
  "223-winchester-usa-55": "/images/ammo/winchester-223.png",
  
  // 9mm ammunition
  "9mm-hornady-critical": "/images/ammo/hornady-9mm-critical.png",
  "9mm-federal-hst": "/images/ammo/federal-hst-9mm.png",
  
  // .45 ACP ammunition
  "45acp-remington": "/images/ammo/remington-45acp.png",
  
  // .40 S&W ammunition
  "40sw-federal": "/images/ammo/federal-40sw.png",
  
  // .308 Winchester ammunition
  "308-hornady": "/images/ammo/hornady-308.png",
  
  // 12 gauge shotgun
  "12ga-winchester": "/images/ammo/winchester-12ga.png",
  
  // .22 LR ammunition
  "22lr-cci": "/images/ammo/cci-22lr.png",
};

// Helper function to get firearm image with fallback
export const getFirearmImage = (id: string): string => {
  return firearmImages[id] || "/placeholder.svg";
};

// Helper function to get ammo image with fallback
export const getAmmoImage = (id: string): string => {
  return ammoImages[id] || "/placeholder.svg";
};
