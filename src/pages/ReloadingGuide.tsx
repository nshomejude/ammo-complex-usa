import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, Wrench, Target, CheckCircle2, BookOpen, Gauge, Ruler, Scale, FlaskConical, Eye, Zap, Download } from "lucide-react";
import { useEffect } from "react";
import { generateSafetyChecklistPDF, generateProcessChecklistPDF, generateEquipmentChecklistPDF, generateLoadDataSheetPDF } from "@/utils/pdfGenerator";
import { ContactWidget } from "@/components/ContactWidget";

const ReloadingGuide = () => {
  useEffect(() => {
    document.title = "Complete Ammunition Reloading Guide | Safety, Equipment & Process | Arms Complex";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Comprehensive guide to ammunition reloading covering safety protocols, essential equipment, step-by-step process, load development, and troubleshooting. Learn how to reload ammunition safely and accurately.");
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute("content", "ammunition reloading, reloading guide, handloading, reloading safety, reloading equipment, brass reloading, bullet reloading, powder measure, reloading press, case preparation");
    }
  }, []);

  const equipment = [
    {
      icon: Wrench,
      name: "Reloading Press",
      description: "Single-stage or progressive press for resizing cases and seating bullets",
      examples: "RCBS Rock Chucker, Dillon XL750, Lee Classic Cast"
    },
    {
      icon: Scale,
      name: "Powder Scale",
      description: "Digital or balance beam scale for precise powder measurement",
      examples: "RCBS ChargeMaster, Frankford Arsenal Intellidropper"
    },
    {
      icon: Ruler,
      name: "Calipers",
      description: "Digital or dial calipers for measuring case length and overall length",
      examples: "Mitutoyo Digital, Hornady Digital, Starrett"
    },
    {
      icon: FlaskConical,
      name: "Case Tumbler",
      description: "For cleaning brass cases before reloading",
      examples: "Frankford Arsenal rotary, ultrasonic cleaners"
    },
    {
      icon: Gauge,
      name: "Dies Set",
      description: "Caliber-specific sizing, decapping, and seating dies",
      examples: "Redding, RCBS, Lee, Hornady die sets"
    },
    {
      icon: Eye,
      name: "Case Gauge",
      description: "Ensures proper case dimensions and headspace",
      examples: "Wilson case gauges, L.E. Wilson"
    }
  ];

  const safetyRules = [
    "Always wear safety glasses and follow manufacturer's load data exactly",
    "Work in a well-ventilated, organized area free from distractions",
    "Never exceed maximum published loads - start 10% below max",
    "Use only one powder type at a time and clearly label containers",
    "Inspect every case for cracks, splits, or defects before loading",
    "Double-check powder charges - never rely on volume alone",
    "Keep detailed records of all loads including date, components, and results",
    "Store primers and powder separately in approved containers",
    "Never smoke or use open flames near reloading components",
    "Test fire new loads at reduced velocity first before full-power loads"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-12 text-center space-y-4">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-tactical/10 p-4">
              <Wrench className="h-12 w-12 text-tactical" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Complete Ammunition Reloading Guide</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Master the art and science of handloading ammunition with comprehensive safety protocols, equipment guides, and step-by-step instructions
          </p>
        </div>

        {/* Critical Safety Alert */}
        <Alert className="mb-8 border-destructive bg-destructive/10">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <AlertDescription className="text-base">
            <strong className="font-semibold">SAFETY FIRST:</strong> Reloading ammunition involves hazardous materials and precise measurements. 
            Always consult multiple published load manuals, never exceed maximum loads, and understand that improper reloading can result in 
            serious injury or death. This guide is for educational purposes only.
          </AlertDescription>
        </Alert>

        {/* Downloadable Checklists */}
        <Card className="mb-8 bg-tactical/5 border-tactical/20">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-2xl flex items-center gap-2">
              <Download className="h-5 w-5 sm:h-6 sm:w-6 text-tactical" />
              Downloadable Checklists
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Print these checklists and keep them at your reloading bench for reference
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <Button 
                onClick={generateSafetyChecklistPDF}
                className="h-auto py-4 sm:py-6 flex flex-col items-center gap-2"
                variant="outline"
              >
                <Download className="h-5 w-5 sm:h-6 sm:w-6 text-tactical" />
                <div className="text-center">
                  <div className="font-semibold text-sm sm:text-base">Safety Checklist</div>
                  <div className="text-xs text-muted-foreground mt-1">Pre & post-session safety protocols</div>
                </div>
              </Button>

              <Button 
                onClick={generateProcessChecklistPDF}
                className="h-auto py-4 sm:py-6 flex flex-col items-center gap-2"
                variant="outline"
              >
                <Download className="h-5 w-5 sm:h-6 sm:w-6 text-tactical" />
                <div className="text-center">
                  <div className="font-semibold text-sm sm:text-base">Process Checklist</div>
                  <div className="text-xs text-muted-foreground mt-1">Step-by-step reloading workflow</div>
                </div>
              </Button>

              <Button 
                onClick={generateEquipmentChecklistPDF}
                className="h-auto py-4 sm:py-6 flex flex-col items-center gap-2"
                variant="outline"
              >
                <Download className="h-5 w-5 sm:h-6 sm:w-6 text-tactical" />
                <div className="text-center">
                  <div className="font-semibold text-sm sm:text-base">Equipment List</div>
                  <div className="text-xs text-muted-foreground mt-1">Essential & recommended tools</div>
                </div>
              </Button>

              <Button 
                onClick={generateLoadDataSheetPDF}
                className="h-auto py-4 sm:py-6 flex flex-col items-center gap-2"
                variant="outline"
              >
                <Download className="h-5 w-5 sm:h-6 sm:w-6 text-tactical" />
                <div className="text-center">
                  <div className="font-semibold text-sm sm:text-base">Load Data Sheet</div>
                  <div className="text-xs text-muted-foreground mt-1">Record test results & observations</div>
                </div>
              </Button>
            </div>
            <Alert className="mt-3 sm:mt-4 border-destructive bg-destructive/10">
              <BookOpen className="h-4 w-4 text-destructive" />
              <AlertDescription className="text-xs sm:text-sm">
                These PDF checklists are designed to be printed and laminated for use at your reloading bench. 
                Keep them visible and reference them during every reloading session for maximum safety and consistency.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Why Reload Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Target className="h-6 w-6 text-tactical" />
              Why Reload Your Own Ammunition?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-tactical" />
                  Cost Savings
                </h3>
                <p className="text-muted-foreground">
                  Reduce ammunition costs by 40-60% compared to factory loads, especially for high-volume shooters. 
                  Once equipment is purchased, components cost significantly less per round.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-tactical" />
                  Custom Performance
                </h3>
                <p className="text-muted-foreground">
                  Tailor loads specifically for your firearm and shooting discipline. Develop match-grade accuracy 
                  loads or optimize for hunting performance with exact bullet and powder combinations.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-tactical" />
                  Ammunition Availability
                </h3>
                <p className="text-muted-foreground">
                  Maintain shooting capability during ammunition shortages. Stock components ahead of time and 
                  produce ammunition as needed, ensuring you're never left without.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-tactical" />
                  Satisfaction & Knowledge
                </h3>
                <p className="text-muted-foreground">
                  Gain deep understanding of ballistics and ammunition performance. The process is rewarding 
                  and educational, improving your overall shooting knowledge and skills.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Essential Equipment */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Wrench className="h-6 w-6 text-tactical" />
              Essential Reloading Equipment
            </CardTitle>
            <CardDescription>
              Core tools and equipment needed to start reloading safely and accurately
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {equipment.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="space-y-3 p-4 rounded-lg border border-border bg-card hover:border-tactical/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-tactical/10 p-2">
                        <Icon className="h-5 w-5 text-tactical" />
                      </div>
                      <h3 className="font-semibold">{item.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    <div className="pt-2 border-t border-border">
                      <p className="text-xs font-medium text-muted-foreground">Examples:</p>
                      <p className="text-xs text-muted-foreground">{item.examples}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Alert className="mt-6 border-destructive bg-destructive/10">
              <BookOpen className="h-4 w-4 text-destructive" />
              <AlertDescription>
                <strong>Reloading Manuals:</strong> Essential references include Lyman Reloading Handbook, 
                Sierra Reloading Manual, Hornady Handbook, and powder manufacturer guides (Hodgdon, Alliant, Vihtavuori).
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Safety Rules */}
        <Card className="mb-8 border-destructive">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Shield className="h-6 w-6 text-destructive" />
              Critical Safety Rules
            </CardTitle>
            <CardDescription>
              Non-negotiable safety protocols every reloader must follow
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {safetyRules.map((rule, index) => (
                <div key={index} className="flex gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                  <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-sm">{rule}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Step-by-Step Process */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-tactical" />
              Step-by-Step Reloading Process
            </CardTitle>
            <CardDescription>
              Complete workflow from case preparation to finished ammunition
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="step1">
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="rounded-full">1</Badge>
                    Case Inspection & Sorting
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <p className="text-muted-foreground">
                    Begin by thoroughly inspecting all fired brass cases for defects that could compromise safety or performance.
                  </p>
                  <div className="space-y-3">
                    <div className="pl-4 border-l-2 border-tactical">
                      <h4 className="font-semibold mb-2">Visual Inspection</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Check for cracks in case mouth, body, or head</li>
                        <li>Discard split or damaged cases immediately</li>
                        <li>Look for signs of excessive pressure (bulged primer pockets)</li>
                        <li>Inspect case head for cracks or separation lines</li>
                      </ul>
                    </div>
                    <div className="pl-4 border-l-2 border-tactical">
                      <h4 className="font-semibold mb-2">Sorting by Headstamp</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Group cases by manufacturer for consistency</li>
                        <li>Different brass brands have varying case capacity</li>
                        <li>Mixed headstamps can affect accuracy and pressure</li>
                        <li>Track case usage count for brass lifespan management</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="step2">
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="rounded-full">2</Badge>
                    Case Cleaning
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <p className="text-muted-foreground">
                    Clean cases ensure proper die function, extend die life, and allow better inspection of brass condition.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border border-border">
                      <h4 className="font-semibold mb-2 text-tactical">Tumbling Method</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Traditional rotary or vibratory tumblers with media
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Use corn cob or walnut shell media</li>
                        <li>Add polishing compound for shine</li>
                        <li>Tumble 2-4 hours for dirty cases</li>
                        <li>Separate media from cases thoroughly</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-lg border border-border">
                      <h4 className="font-semibold mb-2 text-tactical">Ultrasonic Method</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Modern cleaning with ultrasonic waves
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Use proper cleaning solution</li>
                        <li>Removes carbon and primer residue</li>
                        <li>Cleans inside and outside thoroughly</li>
                        <li>Dry completely before processing</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="step3">
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="rounded-full">3</Badge>
                    Depriming & Sizing
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <p className="text-muted-foreground">
                    Resize cases to proper dimensions and remove spent primers using your reloading press and sizing die.
                  </p>
                  <div className="space-y-3">
                    <div className="pl-4 border-l-2 border-tactical">
                      <h4 className="font-semibold mb-2">Full-Length Sizing</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Lubricate cases with sizing lube (avoid excess)</li>
                        <li>Install full-length sizing die per manufacturer specs</li>
                        <li>Run case into die slowly with steady pressure</li>
                        <li>Remove all sizing lube after processing</li>
                        <li>Best for semi-auto rifles and mixed brass</li>
                      </ul>
                    </div>
                    <div className="pl-4 border-l-2 border-tactical">
                      <h4 className="font-semibold mb-2">Neck Sizing (Optional)</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Only sizes case neck, preserves brass life</li>
                        <li>Ideal for bolt-action precision rifles</li>
                        <li>Cases must be fired in same chamber</li>
                        <li>Provides best accuracy with properly fire-formed brass</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="step4">
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="rounded-full">4</Badge>
                    Case Trimming & Preparation
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <p className="text-muted-foreground">
                    Cases stretch during firing and sizing. Trim to proper length and prepare case mouth.
                  </p>
                  <div className="space-y-3">
                    <div className="pl-4 border-l-2 border-tactical">
                      <h4 className="font-semibold mb-2">Length Measurement</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Measure overall case length with calipers</li>
                        <li>Consult reloading manual for trim-to length</li>
                        <li>Maximum case length specifications are critical</li>
                        <li>Excessive length can cause pressure issues</li>
                      </ul>
                    </div>
                    <div className="pl-4 border-l-2 border-tactical">
                      <h4 className="font-semibold mb-2">Trimming & Chamfering</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Use case trimmer to cut to proper length</li>
                        <li>Chamfer inside case mouth (prevent bullet shaving)</li>
                        <li>Deburr outside case mouth for smooth edges</li>
                        <li>Uniform flash holes for precision loads (optional)</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="step5">
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="rounded-full">5</Badge>
                    Priming Cases
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <p className="text-muted-foreground">
                    Install new primers carefully - this is a critical step requiring attention and proper technique.
                  </p>
                  <Alert className="mb-4 border-destructive bg-destructive/5">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    <AlertDescription>
                      <strong>Safety Warning:</strong> Primers contain explosive compounds. Avoid contamination with oil or solvents. 
                      Never force primers - resistance indicates wrong size or debris in primer pocket.
                    </AlertDescription>
                  </Alert>
                  <div className="space-y-3">
                    <div className="pl-4 border-l-2 border-tactical">
                      <h4 className="font-semibold mb-2">Primer Selection</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Use primer type specified in load data (small/large rifle or pistol)</li>
                        <li>Standard vs. magnum primers affect pressure and velocity</li>
                        <li>Match primers (CCI BR, Federal Gold Medal) for precision loads</li>
                        <li>Never substitute primer types without reducing charge weight</li>
                      </ul>
                    </div>
                    <div className="pl-4 border-l-2 border-tactical">
                      <h4 className="font-semibold mb-2">Installation Technique</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Clean primer pocket if necessary (remove carbon)</li>
                        <li>Orient primer correctly (anvil side up)</li>
                        <li>Seat primer to proper depth (flush or slightly below)</li>
                        <li>Feel for proper seating - should seat smoothly then stop</li>
                        <li>Inspect each primer - must be seated uniformly</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="step6">
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="rounded-full">6</Badge>
                    Powder Charging
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <Alert className="mb-4 border-destructive bg-destructive/5">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    <AlertDescription>
                      <strong>CRITICAL:</strong> This is the most dangerous step. Always use published load data, start low, 
                      double-check every charge, and never exceed maximum loads. One mistake can cause serious injury or death.
                    </AlertDescription>
                  </Alert>
                  <div className="space-y-3">
                    <div className="pl-4 border-l-2 border-destructive">
                      <h4 className="font-semibold mb-2 text-destructive">Load Development Safety</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Start 10% below maximum published load</li>
                        <li>Work up in 0.5-1.0 grain increments</li>
                        <li>Watch for pressure signs (flattened primers, hard bolt lift)</li>
                        <li>Use only ONE powder type at a time on bench</li>
                        <li>Label containers clearly with powder type</li>
                      </ul>
                    </div>
                    <div className="pl-4 border-l-2 border-tactical">
                      <h4 className="font-semibold mb-2">Powder Measurement</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Weigh every charge on calibrated scale</li>
                        <li>For precision loads, use digital scale accurate to 0.1 grain</li>
                        <li>Powder measures are for convenience, always verify by weight</li>
                        <li>Keep detailed records of charge weights and powder lot numbers</li>
                        <li>Visual inspection - look in every case before seating bullets</li>
                      </ul>
                    </div>
                    <div className="pl-4 border-l-2 border-tactical">
                      <h4 className="font-semibold mb-2">Powder Selection</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Fast powders: pistol and light rifle loads (Bullseye, Unique)</li>
                        <li>Medium powders: general rifle (H4895, Varget, IMR 4064)</li>
                        <li>Slow powders: magnum rifle (H1000, Retumbo, IMR 7828)</li>
                        <li>Ball powders: consistent metering, temperature sensitive</li>
                        <li>Extruded powders: less sensitive, more accurate for precision</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="step7">
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="rounded-full">7</Badge>
                    Bullet Seating
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <p className="text-muted-foreground">
                    Seat bullets to proper depth for reliable feeding, accuracy, and safe pressure levels.
                  </p>
                  <div className="space-y-3">
                    <div className="pl-4 border-l-2 border-tactical">
                      <h4 className="font-semibold mb-2">Overall Length (OAL)</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Follow published OAL from reloading manuals</li>
                        <li>Too long may not feed or exceed magazine length</li>
                        <li>Too short increases pressure dramatically</li>
                        <li>Precision loads: measure distance to lands with comparator</li>
                        <li>Seat 0.010"-0.030" off lands for accuracy starting point</li>
                      </ul>
                    </div>
                    <div className="pl-4 border-l-2 border-tactical">
                      <h4 className="font-semibold mb-2">Seating Process</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Adjust seating die to desired depth</li>
                        <li>Seat test bullet and measure OAL with calipers</li>
                        <li>Seat bullets straight - avoid canting</li>
                        <li>Check every 5-10 rounds to maintain consistency</li>
                        <li>Mark test rounds if experimenting with different depths</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="step8">
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="rounded-full">8</Badge>
                    Crimping (Optional)
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <p className="text-muted-foreground">
                    Crimping secures bullets in place, especially important for magnum loads, tubular magazines, and semi-automatic actions.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border border-border">
                      <h4 className="font-semibold mb-2">When to Crimp</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Tubular magazine rifles (recoil can move bullets)</li>
                        <li>Heavy recoiling magnum cartridges</li>
                        <li>Semi-automatic rifles and pistols</li>
                        <li>Bullets with crimp groove or cannelure</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-lg border border-border">
                      <h4 className="font-semibold mb-2">When NOT to Crimp</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Bolt-action precision rifles (can reduce accuracy)</li>
                        <li>Bullets without crimp groove</li>
                        <li>Light target loads</li>
                        <li>When maximum accuracy is priority</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="step9">
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="rounded-full">9</Badge>
                    Final Inspection & Testing
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <p className="text-muted-foreground">
                    Thoroughly inspect finished ammunition and conduct safe test firing before using loads extensively.
                  </p>
                  <div className="space-y-3">
                    <div className="pl-4 border-l-2 border-tactical">
                      <h4 className="font-semibold mb-2">Quality Control</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Measure OAL on 10% sample - should be within 0.005"</li>
                        <li>Check that all rounds chamber smoothly in firearm</li>
                        <li>Use case gauge to verify proper dimensions</li>
                        <li>Visually inspect primers - all should be flush and uniform</li>
                        <li>Look for any defects, dents, or abnormalities</li>
                      </ul>
                    </div>
                    <div className="pl-4 border-l-2 border-tactical">
                      <h4 className="font-semibold mb-2">Test Firing Protocol</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Start with reduced loads (90% of max) if developing</li>
                        <li>Fire 3-5 rounds of each test load</li>
                        <li>Inspect fired cases for pressure signs after each shot</li>
                        <li>Watch for excessive primer flattening or piercing</li>
                        <li>Hard bolt lift or sticky extraction = excessive pressure</li>
                        <li>Document accuracy, velocity, and any observations</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Load Development */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Target className="h-6 w-6 text-tactical" />
              Load Development for Accuracy
            </CardTitle>
            <CardDescription>
              Systematic approach to finding the most accurate load for your firearm
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-tactical" />
                  Ladder Test Method
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Fire rounds loaded with incrementally increasing powder charges to find accuracy nodes (sweet spots where 
                  small charge variations produce minimal velocity/accuracy changes).
                </p>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Load 5-10 rounds starting 5% below max, increasing in 0.5 grain increments</li>
                  <li>Fire all rounds at same target at 100+ yards</li>
                  <li>Note which charges group closest together vertically</li>
                  <li>Accuracy nodes appear where multiple charge weights impact at same elevation</li>
                  <li>Test promising nodes with larger samples (10-20 rounds)</li>
                </ol>
              </div>

              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Target className="h-5 w-5 text-tactical" />
                  OCW (Optimal Charge Weight) Method
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Round-robin testing to find charge weight that's most forgiving of variations, producing consistent accuracy 
                  across a range of conditions.
                </p>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Load 3 rounds each at 5-7 different charge weights</li>
                  <li>Fire one round from each group in rotation on separate targets</li>
                  <li>Repeat for all three rounds at each target</li>
                  <li>Optimal charge shows tightest group with center closest to point of aim</li>
                  <li>This charge weight is most stable across temperature/conditions</li>
                </ol>
              </div>

              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Ruler className="h-5 w-5 text-tactical" />
                  Seating Depth Testing
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  After finding optimal powder charge, fine-tune bullet seating depth for maximum accuracy.
                </p>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Measure distance to lands with comparator or dummy round method</li>
                  <li>Load 5 rounds each at: lands, -0.010", -0.020", -0.030", -0.050"</li>
                  <li>Fire 5-shot groups with each seating depth</li>
                  <li>Most rifles shoot best 0.010"-0.040" off the lands</li>
                  <li>Fine-tune by testing 0.005" increments around best performer</li>
                </ol>
              </div>
            </div>

            <Alert>
              <BookOpen className="h-4 w-4" />
              <AlertDescription>
                <strong>Documentation is Critical:</strong> Keep detailed records of every load tested including powder type/lot, 
                charge weight, bullet, primer, brass brand, OAL, date, weather conditions, velocity, and group size. 
                This data is invaluable for future reference and safety.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Common Issues & Troubleshooting */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Common Issues & Troubleshooting</CardTitle>
            <CardDescription>Solutions to frequent reloading challenges</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="issue1">
                <AccordionTrigger>Primers Not Seating Properly</AccordionTrigger>
                <AccordionContent className="space-y-2">
                  <p className="text-muted-foreground">
                    <strong>Causes:</strong> Debris in primer pocket, wrong primer size, damaged primer pocket.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Solutions:</strong> Clean primer pockets thoroughly, verify correct primer size (small vs large, 
                    rifle vs pistol), inspect pocket for damage, don't force primers.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="issue2">
                <AccordionTrigger>Inconsistent Powder Charges</AccordionTrigger>
                <AccordionContent className="space-y-2">
                  <p className="text-muted-foreground">
                    <strong>Causes:</strong> Powder bridging in measure, static electricity, inconsistent technique.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Solutions:</strong> Tap measure gently, use anti-static spray, maintain consistent operation speed, 
                    always verify by weight on scale.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="issue3">
                <AccordionTrigger>Cases Not Sizing Properly</AccordionTrigger>
                <AccordionContent className="space-y-2">
                  <p className="text-muted-foreground">
                    <strong>Causes:</strong> Insufficient lube, die not adjusted correctly, excessive case stretch.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Solutions:</strong> Apply sizing lube evenly, adjust die per instructions (usually touching shell holder 
                    plus 1/4 turn), discard excessively stretched cases.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="issue4">
                <AccordionTrigger>Bullets Seating Crooked</AccordionTrigger>
                <AccordionContent className="space-y-2">
                  <p className="text-muted-foreground">
                    <strong>Causes:</strong> Die misalignment, inconsistent case length, debris in seating die.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Solutions:</strong> Ensure die is properly aligned with press, trim cases to uniform length, 
                    clean seating stem, start bullet straight before running into die.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="issue5">
                <AccordionTrigger>Accuracy Problems with Reloads</AccordionTrigger>
                <AccordionContent className="space-y-2">
                  <p className="text-muted-foreground">
                    <strong>Causes:</strong> Inconsistent powder charges, bullet runout, mixed brass, incorrect seating depth.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Solutions:</strong> Weigh every charge, use concentricity gauge, sort brass by headstamp, 
                    test different seating depths, ensure consistent bullet seating pressure.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Resources */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-tactical" />
                Essential Resources & References
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold">Reloading Manuals</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Lyman 51st Edition Reloading Handbook</li>
                    <li>• Sierra Reloading Manual (6th Edition)</li>
                    <li>• Hornady Handbook of Cartridge Reloading</li>
                    <li>• Nosler Reloading Guide</li>
                    <li>• Speer Reloading Manual #15</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold">Powder Manufacturer Data</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Hodgdon Load Data Center (online)</li>
                    <li>• Alliant Powder Reloading Guide</li>
                    <li>• Vihtavuori Reloading Manual</li>
                    <li>• IMR Powder Load Data</li>
                    <li>• Accurate Powder Load Guide</li>
                  </ul>
                </div>
              </div>

              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Always cross-reference load data from multiple sources. When starting a new load, begin at the starting 
                  (minimum) charge listed in manuals and work up carefully while monitoring for pressure signs. Never exceed 
                  maximum published loads.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
          <ContactWidget variant="compact" />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReloadingGuide;
