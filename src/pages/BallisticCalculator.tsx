import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calculator, TrendingDown, Zap, Target, Info, Shield, Award, Check, Phone, Mail, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";

interface BallisticResult {
  range: number;
  velocity: number;
  energy: number;
  drop: number;
  windDrift: number;
  timeOfFlight: number;
}

const BallisticCalculator = () => {
  const [searchParams] = useSearchParams();
  const [caliber, setCaliber] = useState("");
  const [bulletWeight, setBulletWeight] = useState("168");
  const [muzzleVelocity, setMuzzleVelocity] = useState("2650");
  const [bc, setBc] = useState("0.462");
  const [sightHeight, setSightHeight] = useState("1.5");
  const [zeroRange, setZeroRange] = useState("100");
  const [windSpeed, setWindSpeed] = useState("10");
  const [temperature, setTemperature] = useState("59");
  const [altitude, setAltitude] = useState("0");
  const [results, setResults] = useState<BallisticResult[]>([]);
  const [isFromProduct, setIsFromProduct] = useState(false);

  useEffect(() => {
    document.title = "Ballistic Calculator | Trajectory, Energy & Velocity Calculator | Arms Complex";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Advanced ballistic calculator for calculating bullet trajectory, energy, velocity, drop, and wind drift at various ranges. Input caliber, bullet weight, muzzle velocity, and ballistic coefficient for accurate results.");
    }

    // Auto-fill caliber from URL parameter
    const urlCaliber = searchParams.get('caliber');
    if (urlCaliber) {
      setCaliber(urlCaliber);
      setIsFromProduct(true);
      
      // Auto-select matching preset if available
      const matchingPreset = commonLoads.find(load => 
        load.caliber.toLowerCase().includes(urlCaliber.toLowerCase()) ||
        urlCaliber.toLowerCase().includes(load.caliber.toLowerCase())
      );
      
      if (matchingPreset) {
        setBulletWeight(matchingPreset.weight);
        setMuzzleVelocity(matchingPreset.mv);
        setBc(matchingPreset.bc);
      }
    }
  }, [searchParams]);

  const calculateBallistics = () => {
    const mv = parseFloat(muzzleVelocity);
    const weight = parseFloat(bulletWeight);
    const bcValue = parseFloat(bc);
    const sight = parseFloat(sightHeight);
    const zero = parseFloat(zeroRange);
    const wind = parseFloat(windSpeed);
    const temp = parseFloat(temperature);
    const alt = parseFloat(altitude);

    if (!mv || !weight || !bcValue) return;

    const ranges = [0, 25, 50, 75, 100, 150, 200, 250, 300, 400, 500, 600, 700, 800, 900, 1000];
    const gravity = 32.174; // ft/s²
    
    // Air density correction factor based on temperature and altitude
    const standardTemp = 59; // °F
    const standardAlt = 0;
    const tempFactor = (standardTemp + 460) / (temp + 460);
    const altFactor = Math.exp(-alt / 30000);
    const densityFactor = tempFactor * altFactor;

    // Drag coefficient (simplified G1 model)
    const dragCoefficient = 0.5191 / bcValue * densityFactor;

    const ballisticResults: BallisticResult[] = ranges.map((range) => {
      const rangeYards = range;
      const rangeFeet = rangeYards * 3;

      // Time of flight calculation (iterative)
      let tof = 0;
      let velocity = mv;
      let distance = 0;
      const dt = 0.001; // time step in seconds

      while (distance < rangeFeet && velocity > 0) {
        const deceleration = dragCoefficient * velocity * velocity;
        velocity = velocity - deceleration * dt;
        distance = distance + velocity * dt;
        tof = tof + dt;
      }

      // Velocity at range
      const velocityAtRange = velocity;

      // Energy calculation (ft-lbs)
      const energy = (weight * velocityAtRange * velocityAtRange) / 450240;

      // Trajectory drop calculation
      let dropDistance = 0;
      let dropVelocity = mv;
      let dropTime = 0;
      let verticalVelocity = 0;
      let verticalPosition = -sight / 12; // Convert sight height to feet, negative because below bore

      const dropDt = 0.001;
      
      while (dropDistance < rangeFeet && dropVelocity > 0) {
        const decel = dragCoefficient * dropVelocity * dropVelocity;
        dropVelocity = dropVelocity - decel * dropDt;
        dropDistance = dropDistance + dropVelocity * dropDt;
        
        verticalVelocity = verticalVelocity - gravity * dropDt;
        verticalPosition = verticalPosition + verticalVelocity * dropDt;
        dropTime = dropTime + dropDt;
      }

      // Zero adjustment - calculate the angle needed to hit zero range
      let zeroDropDistance = 0;
      let zeroDropVelocity = mv;
      let zeroVerticalPosition = -sight / 12;
      let zeroVerticalVelocity = 0;
      
      const zeroRangeFeet = zero * 3;
      
      while (zeroDropDistance < zeroRangeFeet && zeroDropVelocity > 0) {
        const decel = dragCoefficient * zeroDropVelocity * zeroDropVelocity;
        zeroDropVelocity = zeroDropVelocity - decel * dropDt;
        zeroDropDistance = zeroDropDistance + zeroDropVelocity * dropDt;
        
        zeroVerticalVelocity = zeroVerticalVelocity - gravity * dropDt;
        zeroVerticalPosition = zeroVerticalPosition + zeroVerticalVelocity * dropDt;
      }

      // The angle adjustment needed to zero at zero range
      const zeroAngle = -zeroVerticalPosition / zeroRangeFeet;
      
      // Apply zero angle to actual trajectory
      const adjustedDrop = (verticalPosition + (rangeFeet * zeroAngle)) * 12; // Convert to inches

      // Wind drift calculation (simplified)
      const windDrift = (wind * tof * 12) * (rangeFeet / 100); // Rough approximation in inches

      return {
        range: rangeYards,
        velocity: Math.round(velocityAtRange),
        energy: Math.round(energy),
        drop: Math.round(adjustedDrop * 10) / 10,
        windDrift: Math.round(windDrift * 10) / 10,
        timeOfFlight: Math.round(tof * 1000) / 1000
      };
    });

    setResults(ballisticResults);
  };

  const commonLoads = [
    { name: ".223 Rem 55gr", caliber: ".223", weight: "55", mv: "3240", bc: "0.243" },
    { name: "5.56 NATO 55gr", caliber: "5.56", weight: "55", mv: "3100", bc: "0.243" },
    { name: "5.56 NATO 62gr", caliber: "5.56", weight: "62", mv: "3000", bc: "0.307" },
    { name: ".308 Win 168gr Match", caliber: ".308", weight: "168", mv: "2650", bc: "0.462" },
    { name: ".308 Win 150gr", caliber: ".308", weight: "150", mv: "2820", bc: "0.392" },
    { name: ".30-06 180gr", caliber: ".30-06", weight: "180", mv: "2700", bc: "0.507" },
    { name: "6.5 Creedmoor 140gr", caliber: "6.5 CM", weight: "140", mv: "2710", bc: "0.587" },
    { name: ".300 Win Mag 190gr", caliber: ".300 WM", weight: "190", mv: "2900", bc: "0.533" },
    { name: ".338 Lapua 250gr", caliber: ".338 Lapua", weight: "250", mv: "2950", bc: "0.662" },
    { name: "9mm 115gr", caliber: "9mm", weight: "115", mv: "1200", bc: "0.125" },
    { name: ".45 ACP 230gr", caliber: ".45 ACP", weight: "230", mv: "850", bc: "0.162" },
  ];

  const loadPreset = (preset: typeof commonLoads[0]) => {
    setCaliber(preset.caliber);
    setBulletWeight(preset.weight);
    setMuzzleVelocity(preset.mv);
    setBc(preset.bc);
  };

  const chartData = results.map(r => ({
    range: r.range,
    drop: r.drop,
    velocity: r.velocity,
    energy: r.energy
  }));

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Branded Hero Section */}
        <div className="mb-12">
          <Card className="border-tactical/30 bg-gradient-to-br from-tactical/5 via-background to-primary/5 overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="rounded-full bg-tactical/10 p-6 border-2 border-tactical/20">
                    <Shield className="h-16 w-16 text-tactical" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left space-y-4">
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight">ARMS COMPLEX</h1>
                    <Badge variant="secondary" className="text-xs">PRO</Badge>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-semibold">Advanced Ballistic Calculator</h2>
                  {isFromProduct && caliber && (
                    <p className="text-lg text-tactical font-medium">
                      Calculating for: {caliber}
                    </p>
                  )}
                  <p className="text-muted-foreground max-w-2xl">
                    Professional-grade trajectory analysis with precision ballistic modeling. 
                    Calculate bullet drop, wind drift, velocity retention, and energy transfer at any range.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <Badge variant="outline" className="border-tactical text-tactical">
                      <Calculator className="mr-1 h-3 w-3" />
                      Precision Modeling
                    </Badge>
                    <Badge variant="outline" className="border-tactical text-tactical">
                      <Target className="mr-1 h-3 w-3" />
                      Long Range
                    </Badge>
                    <Badge variant="outline" className="border-tactical text-tactical">
                      <Zap className="mr-1 h-3 w-3" />
                      Instant Results
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Platform Features */}
        <Card className="mb-8 border-primary/30 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Why Choose Arms Complex Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-tactical mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Integrated Load Library</h4>
                    <p className="text-sm text-muted-foreground">Save and manage your custom reloading recipes with our exclusive load library</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-tactical mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Cost Calculator</h4>
                    <p className="text-sm text-muted-foreground">Compare factory vs reloading costs with ROI analysis - unique to Arms Complex</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-tactical mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Direct Product Integration</h4>
                    <p className="text-sm text-muted-foreground">Calculate ballistics directly from product pages with auto-filled data</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-tactical mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Reloading Guides</h4>
                    <p className="text-sm text-muted-foreground">Comprehensive downloadable safety checklists and process guides</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-tactical mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Licensed FFL Dealer</h4>
                    <p className="text-sm text-muted-foreground">Buy ammunition and firearms directly from us with full compliance</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-tactical mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Expert Support</h4>
                    <p className="text-sm text-muted-foreground">Professional guidance for ammunition selection and ballistic questions</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Alert className="mb-8">
          <Info className="h-4 w-4" />
          <AlertDescription>
            This calculator uses simplified ballistic models for educational purposes. For precision long-range shooting, 
            consult professional ballistic software and verify calculations with actual shooting data. Environmental conditions 
            significantly affect real-world results.
          </AlertDescription>
        </Alert>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Input Parameters</CardTitle>
                <CardDescription>Enter your ammunition and environmental data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Common Loads Preset */}
                <div className="space-y-2">
                  <Label>Load Presets</Label>
                  <Select onValueChange={(value) => {
                    const preset = commonLoads[parseInt(value)];
                    if (preset) loadPreset(preset);
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a common load" />
                    </SelectTrigger>
                    <SelectContent>
                      {commonLoads.map((load, idx) => (
                        <SelectItem key={idx} value={idx.toString()}>
                          {load.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="border-t pt-4 space-y-4">
                  <h4 className="font-semibold text-sm">Ammunition Data</h4>
                  
                  <div className="space-y-2">
                    <Label htmlFor="caliber">Caliber</Label>
                    <Input
                      id="caliber"
                      placeholder=".308 Win"
                      value={caliber}
                      onChange={(e) => setCaliber(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weight">Bullet Weight (grains)</Label>
                    <Input
                      id="weight"
                      type="number"
                      value={bulletWeight}
                      onChange={(e) => setBulletWeight(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mv">Muzzle Velocity (fps)</Label>
                    <Input
                      id="mv"
                      type="number"
                      value={muzzleVelocity}
                      onChange={(e) => setMuzzleVelocity(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bc">Ballistic Coefficient (G1)</Label>
                    <Input
                      id="bc"
                      type="number"
                      step="0.001"
                      value={bc}
                      onChange={(e) => setBc(e.target.value)}
                    />
                  </div>
                </div>

                <div className="border-t pt-4 space-y-4">
                  <h4 className="font-semibold text-sm">Rifle Setup</h4>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sight">Sight Height (inches)</Label>
                    <Input
                      id="sight"
                      type="number"
                      step="0.1"
                      value={sightHeight}
                      onChange={(e) => setSightHeight(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="zero">Zero Range (yards)</Label>
                    <Input
                      id="zero"
                      type="number"
                      value={zeroRange}
                      onChange={(e) => setZeroRange(e.target.value)}
                    />
                  </div>
                </div>

                <div className="border-t pt-4 space-y-4">
                  <h4 className="font-semibold text-sm">Environmental Conditions</h4>
                  
                  <div className="space-y-2">
                    <Label htmlFor="wind">Wind Speed (mph, 90° crosswind)</Label>
                    <Input
                      id="wind"
                      type="number"
                      value={windSpeed}
                      onChange={(e) => setWindSpeed(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="temp">Temperature (°F)</Label>
                    <Input
                      id="temp"
                      type="number"
                      value={temperature}
                      onChange={(e) => setTemperature(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="altitude">Altitude (feet)</Label>
                    <Input
                      id="altitude"
                      type="number"
                      value={altitude}
                      onChange={(e) => setAltitude(e.target.value)}
                    />
                  </div>
                </div>

                <Button 
                  onClick={calculateBallistics} 
                  className="w-full"
                  size="lg"
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate Ballistics
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-6">
            {results.length > 0 && (
              <>
                {/* Summary Cards */}
                <div className="grid md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Zap className="h-4 w-4 text-tactical" />
                        At 100 Yards
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Velocity:</span>
                          <span className="font-semibold">{results[4]?.velocity || 0} fps</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Energy:</span>
                          <span className="font-semibold">{results[4]?.energy || 0} ft-lbs</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Target className="h-4 w-4 text-tactical" />
                        At 500 Yards
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Velocity:</span>
                          <span className="font-semibold">{results[10]?.velocity || 0} fps</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Energy:</span>
                          <span className="font-semibold">{results[10]?.energy || 0} ft-lbs</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <TrendingDown className="h-4 w-4 text-tactical" />
                        At 1000 Yards
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Velocity:</span>
                          <span className="font-semibold">{results[15]?.velocity || 0} fps</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Energy:</span>
                          <span className="font-semibold">{results[15]?.energy || 0} ft-lbs</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Trajectory Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Bullet Drop (inches)</CardTitle>
                    <CardDescription>Vertical trajectory relative to line of sight</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis 
                          dataKey="range" 
                          label={{ value: 'Range (yards)', position: 'insideBottom', offset: -5 }}
                          className="text-xs"
                        />
                        <YAxis 
                          label={{ value: 'Drop (inches)', angle: -90, position: 'insideLeft' }}
                          className="text-xs"
                        />
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                          labelStyle={{ color: 'hsl(var(--foreground))' }}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="drop" 
                          stroke="hsl(var(--tactical))" 
                          strokeWidth={2}
                          dot={false}
                          name="Bullet Drop"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Velocity & Energy Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Velocity & Energy Retention</CardTitle>
                    <CardDescription>Remaining velocity and energy at distance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis 
                          dataKey="range" 
                          label={{ value: 'Range (yards)', position: 'insideBottom', offset: -5 }}
                          className="text-xs"
                        />
                        <YAxis 
                          yAxisId="left"
                          label={{ value: 'Velocity (fps)', angle: -90, position: 'insideLeft' }}
                          className="text-xs"
                        />
                        <YAxis 
                          yAxisId="right"
                          orientation="right"
                          label={{ value: 'Energy (ft-lbs)', angle: 90, position: 'insideRight' }}
                          className="text-xs"
                        />
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                          labelStyle={{ color: 'hsl(var(--foreground))' }}
                        />
                        <Legend />
                        <Line 
                          yAxisId="left"
                          type="monotone" 
                          dataKey="velocity" 
                          stroke="hsl(var(--tactical))" 
                          strokeWidth={2}
                          dot={false}
                          name="Velocity (fps)"
                        />
                        <Line 
                          yAxisId="right"
                          type="monotone" 
                          dataKey="energy" 
                          stroke="hsl(var(--destructive))" 
                          strokeWidth={2}
                          dot={false}
                          name="Energy (ft-lbs)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Detailed Results Table */}
                <Card>
                  <CardHeader>
                    <CardTitle>Detailed Ballistic Data</CardTitle>
                    <CardDescription>
                      Complete trajectory data for {caliber || "selected load"} - {bulletWeight}gr @ {muzzleVelocity} fps
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="font-semibold">Range (yd)</TableHead>
                            <TableHead className="font-semibold text-right">Velocity (fps)</TableHead>
                            <TableHead className="font-semibold text-right">Energy (ft-lbs)</TableHead>
                            <TableHead className="font-semibold text-right">Drop (in)</TableHead>
                            <TableHead className="font-semibold text-right">Wind Drift (in)</TableHead>
                            <TableHead className="font-semibold text-right">Time (s)</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {results.map((result, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="font-medium">{result.range}</TableCell>
                              <TableCell className="text-right">{result.velocity}</TableCell>
                              <TableCell className="text-right">{result.energy}</TableCell>
                              <TableCell className="text-right">
                                <span className={result.drop < 0 ? "text-red-500" : "text-green-500"}>
                                  {result.drop > 0 ? '+' : ''}{result.drop}
                                </span>
                              </TableCell>
                              <TableCell className="text-right">{result.windDrift}</TableCell>
                              <TableCell className="text-right">{result.timeOfFlight}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>

                {/* Interpretation Guide */}
                <Card>
                  <CardHeader>
                    <CardTitle>Understanding the Results</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Velocity</h4>
                        <p className="text-sm text-muted-foreground">
                          Bullet speed at each range. Higher velocity generally means flatter trajectory and better terminal performance. 
                          Most hunting bullets need 1800-2000 fps minimum for reliable expansion.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Energy</h4>
                        <p className="text-sm text-muted-foreground">
                          Kinetic energy available for terminal performance. General minimums: 1000 ft-lbs for deer, 
                          1500 ft-lbs for elk, 2000+ ft-lbs for large game.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Drop</h4>
                        <p className="text-sm text-muted-foreground">
                          Vertical bullet path relative to line of sight. Positive values mean bullet is above point of aim, 
                          negative means below. Use this data to adjust your scope or hold-over.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Wind Drift</h4>
                        <p className="text-sm text-muted-foreground">
                          Horizontal deflection caused by crosswind. Actual drift varies with wind angle. 
                          This calculation assumes 90° (full value) crosswind. Higher BC bullets drift less.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {results.length === 0 && (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <Calculator className="h-16 w-16 text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Results Yet</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Enter your ammunition data and environmental conditions, then click "Calculate Ballistics" 
                    to see trajectory, velocity, and energy data.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Contact & Support Section */}
        <Card className="mt-12 border-tactical/30 bg-tactical/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-tactical" />
              Arms Complex - Your Trusted Partner
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Get Expert Assistance</h3>
                <p className="text-muted-foreground">
                  Need help selecting the right ammunition for your application? Our team of experts is here to assist 
                  with ballistic questions, ammunition recommendations, and technical support.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-tactical" />
                    <div>
                      <p className="font-medium">Phone Support</p>
                      <p className="text-sm text-muted-foreground">1-800-ARMS-123</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-tactical" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">support@armscomplex.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-tactical" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">Licensed FFL Dealer - Nationwide Shipping</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Explore More Tools</h3>
                <p className="text-muted-foreground">
                  Take advantage of our complete suite of professional tools designed for shooters and reloaders.
                </p>
                <div className="grid gap-2">
                  <Link to="/load-recipes">
                    <Button variant="outline" className="w-full justify-start">
                      Save Your Custom Loads
                    </Button>
                  </Link>
                  <Link to="/reloading-cost-calculator">
                    <Button variant="outline" className="w-full justify-start">
                      Calculate Reloading Savings
                    </Button>
                  </Link>
                  <Link to="/reloading-guide">
                    <Button variant="outline" className="w-full justify-start">
                      Download Safety Checklists
                    </Button>
                  </Link>
                  <Link to="/products">
                    <Button variant="default" className="w-full bg-tactical hover:bg-tactical/90">
                      Shop Ammunition
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default BallisticCalculator;
