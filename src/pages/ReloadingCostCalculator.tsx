import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingDown, Calculator, AlertCircle } from "lucide-react";

const ReloadingCostCalculator = () => {
  // Factory ammo
  const [factoryPrice, setFactoryPrice] = useState("30.00");
  const [factoryRounds, setFactoryRounds] = useState("20");

  // Reloading components
  const [brassPrice, setBrassPrice] = useState("0.35");
  const [bulletPrice, setBulletPrice] = useState("0.35");
  const [powderPricePerPound, setPowderPricePerPound] = useState("35.00");
  const [powderChargeGrains, setPowderChargeGrains] = useState("43.5");
  const [primerPrice, setPrimerPrice] = useState("0.06");

  // Equipment costs
  const [pressPrice, setPressPrice] = useState("350.00");
  const [diesPrice, setDiesPrice] = useState("50.00");
  const [scalePrice, setScalePrice] = useState("50.00");
  const [otherEquipment, setOtherEquipment] = useState("150.00");

  // Usage
  const [roundsPerMonth, setRoundsPerMonth] = useState("200");
  const [brassReuses, setBrassReuses] = useState("5");

  // Calculations
  const factoryCostPerRound = parseFloat(factoryPrice) / parseFloat(factoryRounds);
  const brassUsageCost = parseFloat(brassPrice) / parseFloat(brassReuses);
  
  // 7000 grains per pound
  const powderCostPerRound = (parseFloat(powderPricePerPound) / 7000) * parseFloat(powderChargeGrains);
  
  const reloadCostPerRound = brassUsageCost + parseFloat(bulletPrice) + powderCostPerRound + parseFloat(primerPrice);
  
  const savingsPerRound = factoryCostPerRound - reloadCostPerRound;
  const savingsPerMonth = savingsPerRound * parseFloat(roundsPerMonth);
  const savingsPerYear = savingsPerMonth * 12;
  
  const totalEquipmentCost = parseFloat(pressPrice) + parseFloat(diesPrice) + parseFloat(scalePrice) + parseFloat(otherEquipment);
  const breakEvenRounds = Math.ceil(totalEquipmentCost / savingsPerRound);
  const breakEvenMonths = Math.ceil(breakEvenRounds / parseFloat(roundsPerMonth));

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
            <Calculator className="h-8 w-8 text-tactical" />
            Reloading Cost Calculator
          </h1>
          <p className="text-muted-foreground">
            Calculate your savings and break-even point for reloading ammunition
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 mb-6">
          {/* Summary Cards */}
          <Card className="border-tactical/30 bg-tactical/5">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-tactical" />
                Cost Per Round
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Factory</p>
                  <p className="text-2xl font-bold">${factoryCostPerRound.toFixed(3)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Reloaded</p>
                  <p className="text-2xl font-bold text-tactical">${reloadCostPerRound.toFixed(3)}</p>
                </div>
                <Badge variant={savingsPerRound > 0 ? "default" : "destructive"} className="w-full justify-center">
                  {savingsPerRound > 0 ? "Save" : "Loss"} ${Math.abs(savingsPerRound).toFixed(3)} per round
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/30 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Annual Savings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Per Month</p>
                  <p className="text-2xl font-bold">${savingsPerMonth.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Per Year</p>
                  <p className="text-2xl font-bold text-primary">${savingsPerYear.toFixed(2)}</p>
                </div>
                <Badge variant="outline" className="w-full justify-center">
                  Based on {roundsPerMonth} rounds/month
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-destructive/30 bg-destructive/5">
            <CardHeader>
              <CardTitle className="text-lg">Break-Even Point</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Equipment Cost</p>
                  <p className="text-2xl font-bold">${totalEquipmentCost.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Break-Even</p>
                  <p className="text-2xl font-bold text-destructive">{breakEvenRounds.toLocaleString()} rounds</p>
                </div>
                <Badge variant="secondary" className="w-full justify-center">
                  {breakEvenMonths} months at current usage
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Factory Ammunition */}
          <Card>
            <CardHeader>
              <CardTitle>Factory Ammunition</CardTitle>
              <CardDescription>Enter the cost of factory ammunition</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="factoryPrice">Price per Box ($)</Label>
                  <Input
                    id="factoryPrice"
                    type="number"
                    step="0.01"
                    value={factoryPrice}
                    onChange={(e) => setFactoryPrice(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="factoryRounds">Rounds per Box</Label>
                  <Input
                    id="factoryRounds"
                    type="number"
                    value={factoryRounds}
                    onChange={(e) => setFactoryRounds(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reloading Components */}
          <Card>
            <CardHeader>
              <CardTitle>Reloading Components</CardTitle>
              <CardDescription>Enter the cost of reloading components</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="brassPrice">Brass per Case ($)</Label>
                  <Input
                    id="brassPrice"
                    type="number"
                    step="0.01"
                    value={brassPrice}
                    onChange={(e) => setBrassPrice(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brassReuses">Brass Reuses</Label>
                  <Input
                    id="brassReuses"
                    type="number"
                    value={brassReuses}
                    onChange={(e) => setBrassReuses(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bulletPrice">Bullet per Piece ($)</Label>
                  <Input
                    id="bulletPrice"
                    type="number"
                    step="0.01"
                    value={bulletPrice}
                    onChange={(e) => setBulletPrice(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="primerPrice">Primer per Piece ($)</Label>
                  <Input
                    id="primerPrice"
                    type="number"
                    step="0.01"
                    value={primerPrice}
                    onChange={(e) => setPrimerPrice(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="powderPrice">Powder per Pound ($)</Label>
                  <Input
                    id="powderPrice"
                    type="number"
                    step="0.01"
                    value={powderPricePerPound}
                    onChange={(e) => setPowderPricePerPound(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="powderCharge">Powder Charge (grains)</Label>
                  <Input
                    id="powderCharge"
                    type="number"
                    step="0.1"
                    value={powderChargeGrains}
                    onChange={(e) => setPowderChargeGrains(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Equipment Costs */}
          <Card>
            <CardHeader>
              <CardTitle>Equipment Investment</CardTitle>
              <CardDescription>One-time equipment costs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pressPrice">Reloading Press ($)</Label>
                  <Input
                    id="pressPrice"
                    type="number"
                    step="0.01"
                    value={pressPrice}
                    onChange={(e) => setPressPrice(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="diesPrice">Die Set ($)</Label>
                  <Input
                    id="diesPrice"
                    type="number"
                    step="0.01"
                    value={diesPrice}
                    onChange={(e) => setDiesPrice(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scalePrice">Scale ($)</Label>
                  <Input
                    id="scalePrice"
                    type="number"
                    step="0.01"
                    value={scalePrice}
                    onChange={(e) => setScalePrice(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="otherEquipment">Other Equipment ($)</Label>
                  <Input
                    id="otherEquipment"
                    type="number"
                    step="0.01"
                    value={otherEquipment}
                    onChange={(e) => setOtherEquipment(e.target.value)}
                  />
                </div>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total Equipment Cost:</span>
                <span className="text-2xl font-bold text-tactical">${totalEquipmentCost.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Usage Pattern */}
          <Card>
            <CardHeader>
              <CardTitle>Usage Pattern</CardTitle>
              <CardDescription>How often do you shoot?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="roundsPerMonth">Rounds Fired per Month</Label>
                <Input
                  id="roundsPerMonth"
                  type="number"
                  value={roundsPerMonth}
                  onChange={(e) => setRoundsPerMonth(e.target.value)}
                />
              </div>
              
              <Alert className="border-destructive bg-destructive/10">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <AlertTitle className="text-destructive">Cost Breakdown</AlertTitle>
                <AlertDescription>
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Brass (amortized):</span>
                      <span className="font-medium">${brassUsageCost.toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bullet:</span>
                      <span className="font-medium">${parseFloat(bulletPrice).toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Powder:</span>
                      <span className="font-medium">${powderCostPerRound.toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Primer:</span>
                      <span className="font-medium">${parseFloat(primerPrice).toFixed(3)}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-bold">
                      <span>Total per Round:</span>
                      <span className="text-tactical">${reloadCostPerRound.toFixed(3)}</span>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Analysis Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold mb-2">Cost Comparison</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span>Factory cost per round:</span>
                    <span className="font-medium">${factoryCostPerRound.toFixed(3)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Reload cost per round:</span>
                    <span className="font-medium text-tactical">${reloadCostPerRound.toFixed(3)}</span>
                  </li>
                  <li className="flex justify-between border-t pt-2">
                    <span className="font-semibold">Savings per round:</span>
                    <span className={`font-bold ${savingsPerRound > 0 ? 'text-tactical' : 'text-destructive'}`}>
                      ${Math.abs(savingsPerRound).toFixed(3)}
                    </span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">ROI Timeline</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span>Monthly savings:</span>
                    <span className="font-medium">${savingsPerMonth.toFixed(2)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Annual savings:</span>
                    <span className="font-medium text-tactical">${savingsPerYear.toFixed(2)}</span>
                  </li>
                  <li className="flex justify-between border-t pt-2">
                    <span className="font-semibold">Payback period:</span>
                    <span className="font-bold">{breakEvenMonths} months ({breakEvenRounds.toLocaleString()} rounds)</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {savingsPerRound <= 0 && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  At current prices, reloading costs more than factory ammunition. Consider bulk component purchases or higher volume shooting to improve economics.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default ReloadingCostCalculator;