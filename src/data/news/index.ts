import type { NewsItem } from '@/types';
import { news202607 } from './2026-07';
import { news202606 } from './2026-06';
import { news202605 } from './2026-05';
import { news202604 } from './2026-04';
import { news202603 } from './2026-03';
import { news202602 } from './2026-02';
import { news202601 } from './2026-01';
import { news2025 } from './2025';
import { news2024 } from './2024';
import { news2022 } from './2022';

export const allNews: NewsItem[] = [
  ...news202607,
  ...news202606,
  ...news202605,
  ...news202604,
  ...news202603,
  ...news202602,
  ...news202601,
  ...news2025,
  ...news2024,
  ...news2022,
];
