import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Target, Zap, TrendingDown } from "lucide-react";

interface EngagementSimulatorProps {
  effectiveRange: string;
  maxRange?: string;
  muzzleEnergy: string;
  accuracy?: string;
}

export const EngagementSimulator = ({
  effectiveRange,
  maxRange,
  muzzleEnergy,
  accuracy
}: EngagementSimulatorProps) => {
  const effectiveRangeMeters = parseInt(effectiveRange.replace(/[^\d]/g, ''));
  const maxRangeMeters = maxRange ? parseInt(maxRange.replace(/[^\d]/g, '')) : effectiveRangeMeters * 2;
  const muzzleEnergyJoules = parseInt(muzzleEnergy.replace(/[^\d]/g, ''));
  
  const [distance, setDistance] = useState([effectiveRangeMeters]);
  const currentDistance = distance[0];

  // Calculate hit probability based on effective range
  const calculateHitProbability = (dist: number): number => {
    if (dist <= effectiveRangeMeters * 0.5) return 98;
    if (dist <= effectiveRangeMeters) return 95;
    if (dist <= effectiveRangeMeters * 1.2) return 85;
    if (dist <= effectiveRangeMeters * 1.5) return 70;
    if (dist <= effectiveRangeMeters * 2) return 50;
    if (dist <= effectiveRangeMeters * 2.5) return 30;
    return 15;
  };

  // Calculate energy on target (simplified ballistic coefficient model)
  const calculateEnergyOnTarget = (dist: number): number => {
    const distanceRatio = dist / 100;
    const energyRetention = Math.exp(-0.15 * distanceRatio);
    return Math.round(muzzleEnergyJoules * energyRetention);
  };

  const hitProbability = calculateHitProbability(currentDistance);
  const energyOnTarget = calculateEnergyOnTarget(currentDistance);
  const energyRetentionPercent = Math.round((energyOnTarget / muzzleEnergyJoules) * 100);

  const getProbabilityColor = (prob: number): string => {
    if (prob >= 90) return "text-tactical";
    if (prob >= 70) return "text-warning";
    return "text-destructive";
  };

  const getEngagementStatus = (prob: number): string => {
    if (prob >= 90) return "Optimal";
    if (prob >= 70) return "Effective";
    if (prob >= 50) return "Marginal";
    return "Unreliable";
  };

  return (
    <Card className="border-tactical/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-tactical" />
          Engagement Distance Simulator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Target Distance</span>
            <span className="text-2xl font-bold text-tactical">{currentDistance}m</span>
          </div>
          <Slider
            value={distance}
            onValueChange={setDistance}
            min={100}
            max={Math.min(maxRangeMeters, 3000)}
            step={50}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>100m</span>
            <span className="text-tactical">Effective: {effectiveRangeMeters}m</span>
            <span>{Math.min(maxRangeMeters, 3000)}m</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Target className="h-4 w-4" />
              Hit Probability
            </div>
            <div className="flex items-baseline gap-2">
              <span className={`text-3xl font-bold ${getProbabilityColor(hitProbability)}`}>
                {hitProbability}%
              </span>
              <Badge variant={hitProbability >= 70 ? "default" : "destructive"} className="bg-tactical text-tactical-foreground">
                {getEngagementStatus(hitProbability)}
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="h-4 w-4" />
              Energy on Target
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">{energyOnTarget.toLocaleString()}</span>
              <span className="text-sm text-muted-foreground">J</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingDown className="h-3 w-3 text-warning" />
              <span className="text-muted-foreground">{energyRetentionPercent}% retention</span>
            </div>
          </div>
        </div>

        {currentDistance > effectiveRangeMeters && (
          <div className="pt-4 border-t border-border">
            <p className="text-sm text-warning">
              ⚠️ Target beyond effective range. Wind drift, bullet drop, and environmental factors significantly impact accuracy.
            </p>
          </div>
        )}

        {accuracy && (
          <div className="pt-2 text-xs text-muted-foreground">
            <p>Based on {accuracy} accuracy at 100m</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
