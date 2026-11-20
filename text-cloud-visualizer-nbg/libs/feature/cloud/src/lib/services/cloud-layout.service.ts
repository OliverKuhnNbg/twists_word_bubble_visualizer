import { Injectable } from '@angular/core';
import { CloudWord } from '../models/cloud-word.model';

@Injectable()
export class CloudLayoutService {
  async calculateLayout(rawText: string): Promise<CloudWord[]> {
    const tokens = rawText
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);

    if (tokens.length === 0) {
      return [];
    }

    // Häufigkeit pro Wort zählen (case-insensitive)
    const counts = new Map<string, number>();
    for (const token of tokens) {
      const normalized = token.toLowerCase();
      counts.set(normalized, (counts.get(normalized) ?? 0) + 1);
    }

    // Platzhalter-Positionierung (wird im nächsten Schritt durch d3-cloud ersetzt)
    return Array.from(counts.entries()).map(([text, count], index) => {
      const col = index % 4;
      const row = Math.floor(index / 4);

      return {
        text,
        size: Math.min(16 + count * 8, 64),
        x: 120 + col * 180,
        y: 80 + row * 70,
        rotate: 0,
      };
    });
  }
}
