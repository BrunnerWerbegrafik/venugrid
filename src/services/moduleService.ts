import type { Module } from '../types';
import { modules } from '../data/mockData';

export const moduleService = {
  async getByAreaId(areaId: string): Promise<Module[]> {
    await simulateLatency();
    return modules
      .filter((m) => m.areaId === areaId)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  },

  async getById(moduleId: string): Promise<Module | null> {
    await simulateLatency();
    return modules.find((m) => m.id === moduleId) ?? null;
  },
};

async function simulateLatency(ms = 30): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
