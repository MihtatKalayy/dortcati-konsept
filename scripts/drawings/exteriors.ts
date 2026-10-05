/**
 * Mimari projelerin kütle modelleri. Her model; aksonometri (kapak),
 * cephe, kesit ve plan çizimlerine dönüştürülür.
 */
import type { Building, Opening, Volume } from './building.ts'

const zeytinlikEvi: Building = {
  site: { x: -3, y: -3, w: 32, d: 16 },
  volumes: [
    { x: 0, y: 0, z: 0, w: 8, d: 7, h: 2.4, material: 'stone', plan: false },
    {
      x: 0, y: 0, z: 2.4, w: 8, d: 7, h: 3,
      openings: [{ face: 'front', u: 1, v: 0, w: 5, h: 2.4 }, { face: 'right', u: 2, v: 0.2, w: 3, h: 2.2 }],
    },
    { x: 9, y: 0.5, z: 0, w: 9, d: 8, h: 1.2, material: 'stone', plan: false },
    {
      x: 9, y: 0.5, z: 1.2, w: 9, d: 8, h: 3,
      openings: [
        { face: 'front', u: 1, v: 0, w: 2.4, h: 2.4 },
        { face: 'front', u: 4, v: 0, w: 4, h: 2.4 },
        { face: 'right', u: 2.5, v: 0.2, w: 3, h: 2.2 },
      ],
    },
    {
      x: 19, y: 0, z: 0, w: 7, d: 7, h: 3,
      openings: [
        { face: 'front', u: 0.8, v: 0, w: 1.1, h: 2.3, accent: true },
        { face: 'front', u: 2.6, v: 0, w: 3.6, h: 2.4 },
        { face: 'right', u: 1.5, v: 0.2, w: 4, h: 2.2 },
      ],
    },
  ],
  trees: [
    { x: -1.5, y: 2.5, kind: 'olive', height: 4.5 },
    { x: 17.5, y: -1.8, kind: 'olive', height: 4 },
    { x: 3.5, y: 10, kind: 'olive', height: 4.2 },
    { x: 13.5, y: 11, kind: 'olive', height: 4.6 },
    { x: 22.5, y: 10.5, kind: 'olive', height: 4 },
    { x: 27.5, y: 4, kind: 'cypress', height: 8 },
  ],
  ground: [[-3, 2.4], [8.5, 2.4], [8.5, 1.2], [18.5, 1.2], [18.5, 0], [29, 0]],
  section: { axis: 'y', at: 3.5, people: [[13, 1.2]], light: [[30, 9], [24.5, 4.2], [21.5, 0.6]] },
  elevationPeople: [14.5],
  partitions: [[4.5, 0, 4.5, 4], [13, 0.5, 13, 5], [22.5, 0, 22.5, 3.5]],
}

function rowHouse(i: number): Volume {
  return {
    x: i * 7, y: 0, z: 0, w: 5, d: 10, h: 5.6,
    roof: { type: 'gable', axis: 'y', rise: 2.4 },
    floors: [2.9],
    openings: [
      { face: 'front', u: 1.9, v: 0, w: 1.2, h: 2.3, accent: i === 2 },
      { face: 'front', u: 1.2, v: 3.4, w: 2.6, h: 1.4 },
      { face: 'right', u: 3, v: 3.4, w: 1.2, h: 1.4 },
      { face: 'right', u: 6, v: 0.6, w: 1.6, h: 1.6 },
    ],
  }
}

const courtyardWalls: Volume[] = Array.from({ length: 6 }, (_, i) => [
  ...(i < 5 ? [{ x: i * 7 + 6.7, y: 10, z: 0, w: 0.3, d: 3.7, h: 1.8 }] : []),
  {
    x: i * 7, y: 13.7, z: 0, w: 7, d: 0.3, h: 1.8,
    openings: [{ face: 'front', u: 2.6, v: 0, w: 1.4, h: 1.6 } satisfies Opening],
  },
]).flat()

const avluluSiraEvler: Building = {
  site: { x: -2, y: -2, w: 46, d: 18 },
  volumes: [...Array.from({ length: 6 }, (_, i) => rowHouse(i)), ...courtyardWalls],
  trees: Array.from({ length: 6 }, (_, i) => ({ x: i * 7 + 4.6, y: 12, kind: 'round' as const, height: 4.4 })),
  ground: [[-4, 0], [45, 0]],
  section: { axis: 'y', at: 5, people: [[2.5, 0], [16.5, 2.9]], light: [[44, 11], [38.6, 4.2]] },
  elevationPeople: [20.5],
  partitions: Array.from({ length: 6 }, (_, i) => [i * 7, 5.5, i * 7 + 3.4, 5.5] as [number, number, number, number]),
}

const yamacEvi: Building = {
  volumes: [
    {
      x: 0, y: 0, z: 0, w: 7, d: 9, h: 3, material: 'wood',
      roof: { type: 'gable', axis: 'y', rise: 4.2 },
      floors: [3],
      openings: [
        { face: 'front', u: 0.6, v: 0, w: 1, h: 2.2, accent: true },
        { face: 'front', u: 2.4, v: 0, w: 3.4, h: 2.4 },
      ],
    },
    { x: 7, y: 0, z: 0, w: 8, d: 9, h: 1.6, material: 'stone', plan: false },
    {
      x: 7, y: 0, z: 1.6, w: 8, d: 9, h: 3, material: 'wood',
      roof: { type: 'gable', axis: 'y', rise: 4.6 },
      floors: [3],
      openings: [
        { face: 'front', u: 1, v: 0, w: 2.2, h: 2.4 },
        { face: 'front', u: 4.2, v: 0, w: 2.6, h: 2.4 },
        { face: 'right', u: 3, v: 0.4, w: 3, h: 2 },
      ],
    },
  ],
  trees: [
    { x: -2.5, y: 2, kind: 'pine', height: 8 },
    { x: 18, y: 1, kind: 'pine', height: 9 },
    { x: 16.5, y: 11, kind: 'pine', height: 7 },
    { x: 3, y: 12.5, kind: 'pine', height: 6 },
  ],
  ground: [[-4, -0.2], [0, 0], [7, 0.6], [15, 1.6], [19, 2.2]],
  section: { axis: 'y', at: 4.5, people: [[3.5, 0], [11, 1.6]], light: [[-3, 9.5], [1.5, 3.4], [3, 1]] },
  elevationPeople: [5.2],
  partitions: [[7, 0, 7, 9], [3.5, 0, 3.5, 4], [11, 0, 11, 5]],
}

const limanOfisleri: Building = {
  site: { x: -3, y: -3, w: 48, d: 28 },
  groundLines: [[-3, 24, 45, 24]],
  volumes: [
    {
      x: 0, y: 0, z: 0, w: 36, d: 18, h: 7, material: 'stone',
      roof: { type: 'saw', count: 6, rise: 3 },
      floors: [3.8],
      openings: [
        ...Array.from({ length: 6 }, (_, i): Opening => ({ face: 'front', u: i * 6 + 1.5, v: 0, w: 3, h: 4.2, accent: i === 2 })),
        ...Array.from({ length: 6 }, (_, i): Opening => ({ face: 'front', u: i * 6 + 1.8, v: 5, w: 2.4, h: 1.2 })),
      ],
    },
    { x: 36, y: 4, z: 0, w: 6, d: 8, h: 11, material: 'glass' },
  ],
  trees: [
    { x: 5, y: 21, kind: 'round', height: 6 },
    { x: 19, y: 21, kind: 'round', height: 6 },
    { x: 32, y: 21, kind: 'round', height: 6 },
  ],
  ground: [[-3, 0], [45, 0]],
  section: { axis: 'y', at: 9, people: [[8, 0], [15, 3.8], [28, 0], [39, 0]], light: [[19, 15], [24, 9.5], [21.5, 4]] },
  elevationPeople: [13.5, 40],
  partitions: [[12, 0, 12, 9], [24, 0, 24, 18]],
}

const carsiPasaji: Building = {
  volumes: [
    {
      x: 0, y: 0, z: 0, w: 24, d: 6, h: 7, floors: [3.5],
      openings: [{ face: 'right', u: 1.5, v: 4.2, w: 3, h: 1.8 }],
    },
    {
      x: 0, y: 6, z: 0, w: 24, d: 4, h: 7, material: 'glass', plan: false,
      roof: { type: 'barrel', axis: 'x', rise: 2 },
      openings: [{ face: 'right', u: 0.5, v: 0, w: 3, h: 5, accent: true }],
    },
    {
      x: 0, y: 10, z: 0, w: 24, d: 6, h: 7, floors: [3.5],
      openings: [
        ...Array.from({ length: 6 }, (_, i): Opening => ({ face: 'front', u: i * 4 + 0.6, v: 0, w: 2.8, h: 3 })),
        ...Array.from({ length: 6 }, (_, i): Opening => ({ face: 'front', u: i * 4 + 1.2, v: 4.2, w: 1.6, h: 1.8 })),
        { face: 'right', u: 1.5, v: 4.2, w: 3, h: 1.8 },
      ],
    },
  ],
  trees: [{ x: 27, y: 14, kind: 'round', height: 5 }],
  ground: [[-3, 0], [29, 0]],
  section: {
    axis: 'x', at: 10,
    ground: [[-3, 0], [19, 0]],
    people: [[8, 0], [3, 3.5], [13, 3.5]],
    light: [[8, 13], [8, 2.2]],
  },
  elevationPeople: [5, 17],
  partitions: [4, 8, 12, 16, 20].flatMap((x) => [[x, 0, x, 6], [x, 10, x, 16]] as [number, number, number, number][]),
}

const bagTadimSalonu: Building = {
  groundLines: Array.from({ length: 7 }, (_, i) => [-4, 17.5 + i * 1.3, 28, 17.5 + i * 1.3] as [number, number, number, number]),
  volumes: [
    { x: 0, y: 0, z: 0, w: 24, d: 0.8, h: 4.5, material: 'earth' },
    { x: 0, y: 0.8, z: 0, w: 0.8, d: 7.4, h: 4.5, material: 'earth' },
    {
      x: 0.8, y: 0.8, z: 0, w: 22.4, d: 7.4, h: 4.5, material: 'glass',
      openings: [{ face: 'front', u: 10.4, v: 0, w: 1.6, h: 2.6, accent: true }],
    },
    { x: 23.2, y: 0.8, z: 0, w: 0.8, d: 7.4, h: 4.5, material: 'earth' },
    { x: -3, y: -2, z: 4.5, w: 30, d: 12.2, h: 0.35, plan: false },
    { x: 0, y: 8.2, z: 0, w: 0.8, d: 8, h: 1.6, material: 'earth' },
    { x: 23.2, y: 8.2, z: 0, w: 0.8, d: 8, h: 1.6, material: 'earth' },
  ],
  trees: [
    { x: -6, y: -4, kind: 'round', height: 6 },
    { x: 30, y: 1, kind: 'round', height: 5 },
  ],
  ground: [[-6, 0], [30, 0]],
  section: {
    axis: 'x', at: 12,
    ground: [[-4, 0], [14, 0]],
    people: [[4, 0]],
    light: [[13.6, 7.8], [10.2, 4.5], [8.2, 2.6]],
  },
  elevationPeople: [8],
  partitions: [[8, 0.8, 8, 4], [16, 0.8, 16, 4]],
}

export const exteriors: Record<string, Building> = {
  'prj-001': zeytinlikEvi,
  'prj-002': avluluSiraEvler,
  'prj-003': yamacEvi,
  'prj-004': limanOfisleri,
  'prj-005': carsiPasaji,
  'prj-006': bagTadimSalonu,
}
