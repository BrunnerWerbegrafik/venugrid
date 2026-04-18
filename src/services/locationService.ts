import type { Location } from '../types';
import { locations } from '../data/mockData';

/**
 * Location service. Currently returns mock data, but the shape mirrors
 * how a REST/GraphQL API would be called. Components must always go
 * through this service and never touch mockData directly.
 */
export const locationService = {
  async getBySlug(slug: string): Promise<Location | null> {
    await simulateLatency();
    return locations.find((l) => l.slug === slug) ?? null;
  },

  async getAll(): Promise<Location[]> {
    await simulateLatency();
    return locations;
  },
};

async function simulateLatency(ms = 40): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
