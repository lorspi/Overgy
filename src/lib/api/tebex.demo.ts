import type { TebexCategory, TebexPackage } from "./tebex.types";

// === Datos demo para cuando VITE_TEBEX_TOKEN no está configurado ===

const DEMO_CURRENCY = "USD";

// --- Paquetes: Rangos ---

const rangoVIP: TebexPackage = {
  id: 9001,
  name: "Rango VIP",
  description:
    "<ul><li>Acceso a /fly en el lobby</li><li>Kit VIP diario</li><li>3 homes adicionales</li><li>Prefijo [VIP] en chat</li><li>Acceso a servidor VIP</li></ul>",
  image: null,
  type: "single",
  category: { id: 101, name: "Rangos" },
  base_price: 9.99,
  sales_tax: 0,
  total_price: 9.99,
  currency: DEMO_CURRENCY,
  discount: 0,
  disable_quantity: true,
  disable_gifting: false,
  expiration_date: null,
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
};

const rangoMVP: TebexPackage = {
  id: 9002,
  name: "Rango MVP",
  description:
    "<ul><li>Todo lo del VIP</li><li>Acceso a /fly en survival</li><li>Kit MVP diario con diamantes</li><li>5 homes adicionales</li><li>Prefijo [MVP] en chat</li></ul>",
  image: null,
  type: "single",
  category: { id: 101, name: "Rangos" },
  base_price: 19.99,
  sales_tax: 0,
  total_price: 19.99,
  currency: DEMO_CURRENCY,
  discount: 0,
  disable_quantity: true,
  disable_gifting: false,
  expiration_date: null,
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
};

const rangoLegendario: TebexPackage = {
  id: 9003,
  name: "Rango Legendario",
  description:
    "<ul><li>Todo lo del MVP</li><li>Acceso a /god temporalmente</li><li>Kit Legendario con netherite</li><li>10 homes adicionales</li><li>Prefijo [LEGEND] animado en chat</li></ul>",
  image: null,
  type: "single",
  category: { id: 101, name: "Rangos" },
  base_price: 34.99,
  sales_tax: 0,
  total_price: 34.99,
  currency: DEMO_CURRENCY,
  discount: 0,
  disable_quantity: true,
  disable_gifting: false,
  expiration_date: null,
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
};

// --- Paquetes: Mejoras de Rango ---

const mejoraVIPtoMVP: TebexPackage = {
  id: 9004,
  name: "Mejora VIP → MVP",
  description:
    "<ul><li>Upgrade de VIP a MVP</li><li>Conservas todos los beneficios anteriores</li><li>Obtienes beneficios de MVP inmediatamente</li></ul>",
  image: null,
  type: "single",
  category: { id: 102, name: "Mejoras de Rango" },
  base_price: 12.99,
  sales_tax: 0,
  total_price: 12.99,
  currency: DEMO_CURRENCY,
  discount: 0,
  disable_quantity: true,
  disable_gifting: false,
  expiration_date: null,
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
};

const mejoraMVPtoLegendario: TebexPackage = {
  id: 9005,
  name: "Mejora MVP → Legendario",
  description:
    "<ul><li>Upgrade de MVP a Legendario</li><li>Conservas todos los beneficios anteriores</li><li>Obtienes beneficios Legendarios inmediatamente</li></ul>",
  image: null,
  type: "single",
  category: { id: 102, name: "Mejoras de Rango" },
  base_price: 19.99,
  sales_tax: 0,
  total_price: 19.99,
  currency: DEMO_CURRENCY,
  discount: 0,
  disable_quantity: true,
  disable_gifting: false,
  expiration_date: null,
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
};

const mejoraVIPtoLegendario: TebexPackage = {
  id: 9006,
  name: "Mejora VIP → Legendario",
  description:
    "<ul><li>Upgrade directo de VIP a Legendario</li><li>Ahorra comparado con comprar por separado</li><li>Beneficios Legendarios inmediatos</li></ul>",
  image: null,
  type: "single",
  category: { id: 102, name: "Mejoras de Rango" },
  base_price: 29.99,
  sales_tax: 0,
  total_price: 29.99,
  currency: DEMO_CURRENCY,
  discount: 0,
  disable_quantity: true,
  disable_gifting: false,
  expiration_date: null,
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
};

// --- Paquetes: Mascotas ---

const mascotaDragon: TebexPackage = {
  id: 9007,
  name: "Mascota Dragón",
  description:
    "<ul><li>Dragón bebé que te sigue</li><li>Efectos de partículas de fuego</li><li>Animaciones exclusivas</li><li>Permanente</li></ul>",
  image: null,
  type: "single",
  category: { id: 103, name: "Mascotas" },
  base_price: 7.99,
  sales_tax: 0,
  total_price: 7.99,
  currency: DEMO_CURRENCY,
  discount: 0,
  disable_quantity: true,
  disable_gifting: false,
  expiration_date: null,
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
};

const mascotaLobo: TebexPackage = {
  id: 9008,
  name: "Mascota Lobo Místico",
  description:
    "<ul><li>Lobo con aura mística</li><li>Efectos de partículas mágicas</li><li>Puede sentarse junto a ti</li><li>Permanente</li></ul>",
  image: null,
  type: "single",
  category: { id: 103, name: "Mascotas" },
  base_price: 5.99,
  sales_tax: 0,
  total_price: 5.99,
  currency: DEMO_CURRENCY,
  discount: 0,
  disable_quantity: true,
  disable_gifting: false,
  expiration_date: null,
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
};

const mascotaFenix: TebexPackage = {
  id: 9009,
  name: "Mascota Fénix",
  description:
    "<ul><li>Fénix que vuela a tu alrededor</li><li>Partículas de fuego y cenizas</li><li>Brilla en la oscuridad</li><li>Permanente</li></ul>",
  image: null,
  type: "single",
  category: { id: 103, name: "Mascotas" },
  base_price: 8.99,
  sales_tax: 0,
  total_price: 8.99,
  currency: DEMO_CURRENCY,
  discount: 0,
  disable_quantity: true,
  disable_gifting: false,
  expiration_date: null,
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
};

// --- Paquetes: Comandos ---

const comandoFly: TebexPackage = {
  id: 9010,
  name: "Comando /fly",
  description:
    "<ul><li>Acceso permanente al comando /fly</li><li>Funciona en todos los mundos survival</li><li>Sin límite de tiempo</li></ul>",
  image: null,
  type: "single",
  category: { id: 104, name: "Comandos" },
  base_price: 14.99,
  sales_tax: 0,
  total_price: 14.99,
  currency: DEMO_CURRENCY,
  discount: 0,
  disable_quantity: true,
  disable_gifting: false,
  expiration_date: null,
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
};

const comandoHeal: TebexPackage = {
  id: 9011,
  name: "Comando /heal",
  description:
    "<ul><li>Cura tu vida al máximo</li><li>Cooldown de 5 minutos</li><li>Funciona en combate PvE</li><li>Permanente</li></ul>",
  image: null,
  type: "single",
  category: { id: 104, name: "Comandos" },
  base_price: 6.99,
  sales_tax: 0,
  total_price: 6.99,
  currency: DEMO_CURRENCY,
  discount: 0,
  disable_quantity: true,
  disable_gifting: false,
  expiration_date: null,
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
};

const comandoRepair: TebexPackage = {
  id: 9012,
  name: "Comando /repair",
  description:
    "<ul><li>Repara el ítem en tu mano</li><li>Cooldown de 10 minutos</li><li>Funciona con cualquier herramienta o armadura</li><li>Permanente</li></ul>",
  image: null,
  type: "single",
  category: { id: 104, name: "Comandos" },
  base_price: 4.99,
  sales_tax: 0,
  total_price: 4.99,
  currency: DEMO_CURRENCY,
  discount: 0,
  disable_quantity: true,
  disable_gifting: false,
  expiration_date: null,
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
};

// --- Categorías Demo ---

export const DEMO_CATEGORIES: TebexCategory[] = [
  {
    id: 101,
    name: "Rangos",
    slug: "rangos",
    parent: {},
    description: "Rangos disponibles en el servidor",
    packages: [rangoVIP, rangoMVP, rangoLegendario],
    order: 1,
    display_type: "grid",
  },
  {
    id: 102,
    name: "Mejoras de Rango",
    slug: "mejoras-de-rango",
    parent: {},
    description: "Mejora tu rango actual a uno superior",
    packages: [mejoraVIPtoMVP, mejoraMVPtoLegendario, mejoraVIPtoLegendario],
    order: 2,
    display_type: "grid",
  },
  {
    id: 103,
    name: "Mascotas",
    slug: "mascotas",
    parent: {},
    description: "Mascotas cosméticas que te acompañan",
    packages: [mascotaDragon, mascotaLobo, mascotaFenix],
    order: 3,
    display_type: "grid",
  },
  {
    id: 104,
    name: "Comandos",
    slug: "comandos",
    parent: {},
    description: "Comandos exclusivos para tu experiencia",
    packages: [comandoFly, comandoHeal, comandoRepair],
    order: 4,
    display_type: "grid",
  },
];
