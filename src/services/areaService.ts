import type { Area } from '../types';
import { areas } from '../data/mockData';

export const areaService = {
  async getByLocationId(locationId: string): Promise<Area[]> {
    await simulateLatency();
    return areas
      .filter((a) => a.locationId === locationId)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  },

  async getById(areaId: string): Promise<Area | null> {
    await simulateLatency();
    return areas.find((a) => a.id === areaId) ?? null;
  },

  async getBySlug(locationId: string, slug: string): Promise<Area | null> {
    await simulateLatency();
    return areas.find((a) => a.locationId === locationId && a.slug === slug) ?? null;
  },
};

async function simulateLatency(ms = 30): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
