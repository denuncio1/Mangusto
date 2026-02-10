// API mock para CRUD de NC e 5W2H
import type { NonConformity, ActionPlan5W2H } from '../types/nonConformity';

let ncList: NonConformity[] = [];

export function getNCs(): Promise<NonConformity[]> {
  return Promise.resolve(ncList);
}

export function getNCById(id: string): Promise<NonConformity | undefined> {
  return Promise.resolve(ncList.find(nc => nc.id === id));
}

export function createNC(nc: NonConformity): Promise<void> {
  ncList.push(nc);
  return Promise.resolve();
}

export function updateNC(id: string, data: Partial<NonConformity>): Promise<void> {
  const idx = ncList.findIndex(nc => nc.id === id);
  if (idx >= 0) ncList[idx] = { ...ncList[idx], ...data };
  return Promise.resolve();
}

export function deleteNC(id: string): Promise<void> {
  ncList = ncList.filter(nc => nc.id !== id);
  return Promise.resolve();
}

export function addActionPlan(ncId: string, plan: ActionPlan5W2H): Promise<void> {
  const nc = ncList.find(nc => nc.id === ncId);
  if (nc) nc.planos.push(plan);
  return Promise.resolve();
}

export function updateActionPlan(ncId: string, planId: string, data: Partial<ActionPlan5W2H>): Promise<void> {
  const nc = ncList.find(nc => nc.id === ncId);
  if (nc) {
    const idx = nc.planos.findIndex(p => p.id === planId);
    if (idx >= 0) nc.planos[idx] = { ...nc.planos[idx], ...data };
  }
  return Promise.resolve();
}

export function deleteActionPlan(ncId: string, planId: string): Promise<void> {
  const nc = ncList.find(nc => nc.id === ncId);
  if (nc) nc.planos = nc.planos.filter(p => p.id !== planId);
  return Promise.resolve();
}
