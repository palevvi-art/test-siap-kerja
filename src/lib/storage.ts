export interface TestResult {
  id: string;
  testType: string;
  testName: string;
  date: string;
  duration: number; // seconds
  totalResponses: number;
  correctResponses: number;
  accuracy: number;
  avgResponseTime: number; // ms
  segmentData: SegmentData[];
}

export interface SegmentData {
  segment: number;
  correct: number;
  incorrect: number;
  avgTime: number;
}

const STORAGE_KEY = 'cognitive-test-results';

export function saveResult(result: TestResult): void {
  const results = getResults();
  results.push(result);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
}

export function getResults(): TestResult[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function getResultById(id: string): TestResult | undefined {
  return getResults().find(r => r.id === id);
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
