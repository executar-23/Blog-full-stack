/**
 * Recommendations contract — BLOCKED: strategy/provider not defined (G11).
 */
export interface RecommendationRequest {
  articleSlug: string;
  limit: number;
}

export interface RecommendationsService {
  recommend(request: RecommendationRequest): Promise<string[]>;
}
