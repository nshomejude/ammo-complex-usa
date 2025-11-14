import { jsPDF } from 'jspdf';
import logoImage from '@/assets/arms-complex-logo.png';

// Branding colors (RGB tuples)
const BRAND_COLORS = {
  tactical: [106, 144, 95] as [number, number, number],
  primary: [128, 128, 128] as [number, number, number],
  background: [9, 9, 11] as [number, number, number],
  foreground: [250, 250, 250] as [number, number, number]
};

// Convert image to base64 for PDF embedding
const getLogoDataUrl = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      } else {
        reject(new Error('Failed to get canvas context'));
      }
    };
    img.onerror = reject;
    img.src = logoImage;
  });
};

// Add branded header to PDF (async to load logo)
const addBrandedHeader = async (doc: jsPDF, title: string, subtitle?: string) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  
  // Header background bar
  doc.setFillColor(106, 144, 95); // tactical color
  doc.rect(0, 0, pageWidth, 25, 'F');
  
  // Add logo image
  try {
    const logoDataUrl = await getLogoDataUrl();
    doc.addImage(logoDataUrl, 'PNG', margin, 6, 15, 15);
  } catch (error) {
    console.error('Failed to load logo:', error);
    // Fallback to text if image fails
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text('🛡', margin, 16);
  }
  
  // Company name
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('ARMS COMPLEX', margin + 18, 16);
  
  // PRO badge
  doc.setFontSize(8);
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin + 68, 10, 12, 6, 2, 2, 'F');
  doc.setTextColor(106, 144, 95); // tactical color
  doc.text('PRO', margin + 69.5, 14.5);
  
  // Contact info (top right)
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'normal');
  const contactY = 12;
  doc.text('1-800-ARMS-123', pageWidth - margin - 30, contactY);
  doc.text('armscomplex.com', pageWidth - margin - 30, contactY + 4);
  
  // Title
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text(title, pageWidth / 2, 40, { align: 'center' });
  
  // Subtitle if provided
  if (subtitle) {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(subtitle, pageWidth / 2, 48, { align: 'center' });
  }
  
  // Decorative line
  doc.setDrawColor(106, 144, 95); // tactical color
  doc.setLineWidth(0.5);
  doc.line(margin, subtitle ? 53 : 45, pageWidth - margin, subtitle ? 53 : 45);
  
  return subtitle ? 60 : 52;
};

// Add branded footer to PDF
const addBrandedFooter = (doc: jsPDF, pageNum?: number) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const footerY = pageHeight - 15;
  
  // Decorative line
  doc.setDrawColor(106, 144, 95); // tactical color
  doc.setLineWidth(0.3);
  doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);
  
  // Footer text
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  
  // Left: Company info
  doc.text('Arms Complex | Licensed FFL Dealer', margin, footerY);
  doc.text('Professional Ammunition & Firearms', margin, footerY + 4);
  
  // Center: Support
  doc.text('Expert Support: support@armscomplex.com', pageWidth / 2, footerY, { align: 'center' });
  doc.text('Visit us: armscomplex.com', pageWidth / 2, footerY + 4, { align: 'center' });
  
  // Right: Page number if provided
  if (pageNum) {
    doc.text(`Page ${pageNum}`, pageWidth - margin, footerY, { align: 'right' });
  }
  doc.text(new Date().toLocaleDateString(), pageWidth - margin, footerY + 4, { align: 'right' });
};

export const generateSafetyChecklistPDF = async () => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPos = await addBrandedHeader(doc, 'Reloading Safety Checklist', 'Professional Safety Guidelines for Reloaders');

  // Critical Safety Rules
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Critical Safety Rules - Review Before EVERY Session', margin, yPos);
  yPos += 8;

  const safetyRules = [
    'Wear safety glasses and follow manufacturer\'s load data exactly',
    'Work in well-ventilated, organized area free from distractions',
    'Never exceed maximum published loads - start 10% below max',
    'Use only one powder type at a time and clearly label containers',
    'Inspect every case for cracks, splits, or defects',
    'Double-check powder charges - never rely on volume alone',
    'Keep detailed records of all loads (date, components, results)',
    'Store primers and powder separately in approved containers',
    'Never smoke or use open flames near reloading components',
    'Test fire new loads at reduced velocity before full-power loads'
  ];

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  safetyRules.forEach((rule) => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    // Checkbox
    doc.rect(margin, yPos - 3, 4, 4);
    // Rule text
    const lines = doc.splitTextToSize(rule, pageWidth - margin * 2 - 10);
    doc.text(lines, margin + 8, yPos);
    yPos += (lines.length * 5) + 3;
  });

  // Pre-Session Setup Checklist
  yPos += 10;
  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Pre-Session Setup Checklist', margin, yPos);
  yPos += 8;

  const setupChecks = [
    'Clean, organized workspace with adequate lighting',
    'All tools and equipment within easy reach',
    'Reloading manual(s) readily available',
    'Scale calibrated and verified with check weight',
    'Dies properly installed and adjusted for caliber',
    'Only ONE powder container on bench (clearly labeled)',
    'Primer tray organized and accessible',
    'Case gauge and calipers within reach',
    'Logbook and pen ready for documentation',
    'First aid kit nearby',
    'Phone available for emergencies',
    'No distractions (TV off, minimal interruptions)'
  ];

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  setupChecks.forEach((check) => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    doc.rect(margin, yPos - 3, 4, 4);
    const lines = doc.splitTextToSize(check, pageWidth - margin * 2 - 10);
    doc.text(lines, margin + 8, yPos);
    yPos += (lines.length * 5) + 3;
  });

  // Post-Session Checklist
  yPos += 10;
  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Post-Session Checklist', margin, yPos);
  yPos += 8;

  const postChecks = [
    'All ammunition properly labeled with load data',
    'Powder container sealed and stored properly',
    'Primers returned to storage container',
    'All cases cleaned and stored appropriately',
    'Dies cleaned and stored',
    'Scale returned to protective case',
    'Work area cleaned and organized',
    'All load data recorded in logbook',
    'Loaded ammunition stored safely away from heat/sparks'
  ];

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  postChecks.forEach((check) => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    doc.rect(margin, yPos - 3, 4, 4);
    const lines = doc.splitTextToSize(check, pageWidth - margin * 2 - 10);
    doc.text(lines, margin + 8, yPos);
    yPos += (lines.length * 5) + 3;
  });

  // Add footer
  addBrandedFooter(doc, 1);

  doc.save('Arms-Complex-Safety-Checklist.pdf');
};

export const generateProcessChecklistPDF = () => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPos = addBrandedHeader(doc, 'Step-by-Step Reloading Process', 'Complete Process Checklist for Each Batch');

  // Batch Information
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Batch Information', margin, yPos);
  yPos += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const infoFields = [
    'Date: _______________',
    'Caliber: _______________',
    'Bullet: _______________ Weight: _____ gr',
    'Powder: _______________ Lot #: _______________',
    'Charge Weight: _____ gr',
    'Primer: _______________',
    'Brass: _______________ Firings: _____',
    'OAL: _____ inches',
    'Quantity: _____ rounds'
  ];

  infoFields.forEach((field) => {
    doc.text(field, margin, yPos);
    yPos += 6;
  });

  yPos += 10;
  doc.setLineWidth(0.5);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 10;

  // Step-by-step process
  const steps = [
    {
      title: 'Step 1: Case Inspection & Sorting',
      items: [
        'Visually inspect all cases for cracks or splits',
        'Check case mouths for damage',
        'Inspect case heads for cracks or separation',
        'Sort by headstamp/manufacturer',
        'Discard damaged cases',
        'Count cases: _____ accepted, _____ rejected'
      ]
    },
    {
      title: 'Step 2: Case Cleaning',
      items: [
        'Load cases into tumbler/ultrasonic cleaner',
        'Clean for appropriate time (2-4 hours)',
        'Separate cases from media thoroughly',
        'Inspect for remaining debris',
        'Dry cases completely if wet cleaned'
      ]
    },
    {
      title: 'Step 3: Depriming & Sizing',
      items: [
        'Lubricate cases with sizing lube',
        'Verify sizing die is properly adjusted',
        'Run each case through sizing die',
        'Inspect sized cases for proper dimensions',
        'Remove all sizing lube from cases'
      ]
    },
    {
      title: 'Step 4: Case Trimming & Preparation',
      items: [
        'Measure case length with calipers',
        'Trim cases exceeding max length',
        'Chamfer inside of case mouth',
        'Deburr outside of case mouth',
        'Verify all cases within spec: _____'
      ]
    },
    {
      title: 'Step 5: Priming',
      items: [
        'Clean primer pockets if needed',
        'Select proper primer type',
        'Verify primer orientation (anvil up)',
        'Seat primers to proper depth',
        'Inspect for uniform seating',
        'Count primed cases: _____'
      ]
    },
    {
      title: 'Step 6: Powder Charging (CRITICAL)',
      items: [
        'Verify only ONE powder on bench',
        'Calibrate scale with check weight',
        'Set target charge weight: _____ gr',
        'Weigh each charge individually',
        'Visual inspection of EVERY case',
        'Record min/max charges: _____ / _____ gr'
      ]
    },
    {
      title: 'Step 7: Bullet Seating',
      items: [
        'Adjust seating die to target OAL',
        'Seat test bullet and verify OAL',
        'Seat bullets in all cases',
        'Check OAL every 10 rounds',
        'Verify OAL range: _____ to _____ inches'
      ]
    },
    {
      title: 'Step 8: Crimping (If Applicable)',
      items: [
        'Adjust crimp die per instructions',
        'Crimp test round and verify',
        'Apply crimp to all rounds',
        'Inspect crimp uniformity'
      ]
    },
    {
      title: 'Step 9: Final Inspection',
      items: [
        'Measure sample of completed rounds',
        'Check all rounds chamber smoothly',
        'Use case gauge to verify dimensions',
        'Visual inspection for defects',
        'Label ammunition with load data',
        'Record in logbook'
      ]
    }
  ];

  steps.forEach((step, index) => {
    if (yPos > 250 || (index > 0 && yPos > 200)) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(step.title, margin, yPos);
    yPos += 7;

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    
    step.items.forEach((item) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.rect(margin + 5, yPos - 3, 3, 3);
      const lines = doc.splitTextToSize(item, pageWidth - margin * 2 - 12);
      doc.text(lines, margin + 10, yPos);
      yPos += (lines.length * 4) + 2;
    });

    yPos += 5;
  });

  // Footer
  addBrandedFooter(doc, 1);

  doc.save('Arms-Complex-Process-Checklist.pdf');
};

export const generateEquipmentChecklistPDF = () => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPos = addBrandedHeader(doc, 'Reloading Equipment Checklist', 'Essential and Recommended Equipment Guide');

  // Essential Equipment
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Essential Equipment (Required)', margin, yPos);
  yPos += 8;

  const essentialEquipment = [
    { item: 'Reloading Press', note: 'Single-stage or progressive' },
    { item: 'Die Set', note: 'Caliber-specific sizing and seating dies' },
    { item: 'Shell Holder', note: 'Matches your cartridge rim diameter' },
    { item: 'Powder Scale', note: 'Digital or balance beam (0.1 grain accuracy)' },
    { item: 'Powder Measure', note: 'For consistent charge dispensing' },
    { item: 'Powder Funnel', note: 'Caliber-specific' },
    { item: 'Case Trimmer', note: 'Manual or powered' },
    { item: 'Chamfer/Deburr Tool', note: 'Inside and outside' },
    { item: 'Calipers', note: 'Digital recommended (0.001" accuracy)' },
    { item: 'Priming Tool', note: 'Hand primer or press-mounted' },
    { item: 'Case Lube', note: 'For sizing operations' },
    { item: 'Loading Block', note: 'Hold cases during process' },
    { item: 'Reloading Manuals', note: 'Multiple sources recommended' },
    { item: 'Safety Glasses', note: 'ANSI-rated' }
  ];

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  
  essentialEquipment.forEach((equip) => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    doc.rect(margin, yPos - 3, 4, 4);
    doc.text(equip.item, margin + 8, yPos);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100);
    doc.text(`(${equip.note})`, margin + 55, yPos);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0);
    yPos += 6;
  });

  // Highly Recommended Equipment
  yPos += 10;
  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Highly Recommended Equipment', margin, yPos);
  yPos += 8;

  const recommendedEquipment = [
    { item: 'Case Tumbler/Ultrasonic', note: 'For cleaning brass' },
    { item: 'Case Gauge', note: 'Verify proper dimensions' },
    { item: 'Bullet Puller', note: 'Kinetic or collet type' },
    { item: 'Powder Trickler', note: 'Fine charge adjustment' },
    { item: 'Dial Indicator', note: 'For precise die adjustment' },
    { item: 'Case Neck Brush', note: 'Clean inside case necks' },
    { item: 'Primer Pocket Tool', note: 'Clean primer pockets' },
    { item: 'Media Separator', note: 'If using tumbler' },
    { item: 'Headspace Gauge', note: 'Check case dimensions' },
    { item: 'Logbook/Notebook', note: 'Document all loads' }
  ];

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  
  recommendedEquipment.forEach((equip) => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    doc.rect(margin, yPos - 3, 4, 4);
    doc.text(equip.item, margin + 8, yPos);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100);
    doc.text(`(${equip.note})`, margin + 55, yPos);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0);
    yPos += 6;
  });

  // Advanced/Precision Equipment
  yPos += 10;
  if (yPos > 240) {
    doc.addPage();
    yPos = 20;
  }
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Advanced/Precision Equipment (Optional)', margin, yPos);
  yPos += 8;

  const advancedEquipment = [
    { item: 'Concentricity Gauge', note: 'Check bullet runout' },
    { item: 'Annealing Machine', note: 'Brass case annealing' },
    { item: 'Chronograph', note: 'Measure velocity' },
    { item: 'Powder Dispenser', note: 'Automatic electronic' },
    { item: 'Case Comparator', note: 'Measure to ogive' },
    { item: 'Flash Hole Deburr', note: 'Uniform flash holes' },
    { item: 'Neck Turner', note: 'Uniform case neck thickness' },
    { item: 'Arbor Press', note: 'Precision seating' }
  ];

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  
  advancedEquipment.forEach((equip) => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    doc.rect(margin, yPos - 3, 4, 4);
    doc.text(equip.item, margin + 8, yPos);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100);
    doc.text(`(${equip.note})`, margin + 55, yPos);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0);
    yPos += 6;
  });

  // Components Checklist
  if (yPos > 220) {
    doc.addPage();
    yPos = 20;
  } else {
    yPos += 10;
  }
  
  doc.setLineWidth(0.5);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 10;
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Reloading Components', margin, yPos);
  yPos += 8;

  const components = [
    'Brass Cases (new or once-fired)',
    'Bullets (appropriate weight and type)',
    'Powder (appropriate for caliber and bullet weight)',
    'Primers (correct size: small/large, rifle/pistol)',
    'Case Lube',
    'Cleaning Media (if using tumbler)'
  ];

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  
  components.forEach((component) => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    doc.rect(margin, yPos - 3, 4, 4);
    doc.text(component, margin + 8, yPos);
    yPos += 6;
  });

  // Notes section
  yPos += 10;
  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }
  
  doc.setLineWidth(0.5);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 10;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Notes / Equipment to Purchase:', margin, yPos);
  yPos += 8;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  for (let i = 0; i < 6; i++) {
    doc.text('_____________________________________________________________', margin, yPos);
    yPos += 7;
  }

  // Footer
  addBrandedFooter(doc, 1);

  doc.save('Arms-Complex-Equipment-Checklist.pdf');
};

export const generateLoadDataSheetPDF = () => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPos = 20;

  // Header
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Load Development Data Sheet', pageWidth / 2, yPos, { align: 'center' });
  
  yPos += 10;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Record and track your load development results', pageWidth / 2, yPos, { align: 'center' });
  
  yPos += 15;
  doc.setLineWidth(0.5);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 10;

  // Session Information
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Session Information', margin, yPos);
  yPos += 7;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const sessionFields = [
    'Date: _______________ Time: _______________',
    'Location/Range: _______________________________________________',
    'Temperature: ______°F   Wind: ______mph   Direction: ___________',
    'Humidity: ______%   Altitude: ____________ ft',
    ''
  ];

  sessionFields.forEach((field) => {
    doc.text(field, margin, yPos);
    yPos += 5;
  });

  yPos += 5;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Firearm Information', margin, yPos);
  yPos += 7;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const firearmFields = [
    'Firearm: _______________________________________________',
    'Caliber: _______________ Barrel Length: ______"   Twist: 1:_____"',
    'Action Type: _______________________________________________',
    'Scope/Sights: _______________________________________________',
    'Zero Distance: _________ yds'
  ];

  firearmFields.forEach((field) => {
    doc.text(field, margin, yPos);
    yPos += 5;
  });

  yPos += 5;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Load Components', margin, yPos);
  yPos += 7;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const loadFields = [
    'Brass: _______________ Lot#: _______ Firings: _____ Trim: _____"',
    'Bullet: _______________ Weight: _____ gr   Type: _______________',
    'Powder: _______________ Lot#: _______________ Type: ___________',
    'Primer: _______________ Type: _______________',
    'Overall Length (OAL): ________"   Coal vs Lands: _______"',
    'Crimp: Yes / No   Amount: _______________'
  ];

  loadFields.forEach((field) => {
    doc.text(field, margin, yPos);
    yPos += 5;
  });

  // Test Results Table
  yPos += 10;
  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }

  doc.setLineWidth(0.5);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 8;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Test Results', margin, yPos);
  yPos += 7;

  // Table headers
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  const colWidths = [15, 20, 20, 25, 25, 25, 20];
  const headers = ['Load#', 'Charge(gr)', 'Velocity(fps)', 'Group Size(in)', 'ES(fps)', 'SD(fps)', 'Notes'];
  let xPos = margin;
  
  headers.forEach((header, i) => {
    doc.text(header, xPos, yPos);
    xPos += colWidths[i];
  });
  
  yPos += 2;
  doc.setLineWidth(0.3);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 5;

  // Table rows (10 rows)
  doc.setFont('helvetica', 'normal');
  for (let i = 1; i <= 10; i++) {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
      // Repeat headers
      xPos = margin;
      doc.setFont('helvetica', 'bold');
      headers.forEach((header, j) => {
        doc.text(header, xPos, yPos);
        xPos += colWidths[j];
      });
      yPos += 2;
      doc.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 5;
      doc.setFont('helvetica', 'normal');
    }
    
    xPos = margin;
    doc.text(i.toString(), xPos, yPos);
    xPos += colWidths[0];
    
    for (let j = 1; j < headers.length; j++) {
      doc.text('________', xPos, yPos);
      xPos += colWidths[j];
    }
    
    yPos += 6;
  }

  // Observations section
  yPos += 5;
  if (yPos > 240) {
    doc.addPage();
    yPos = 20;
  }

  doc.setLineWidth(0.5);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 8;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Observations & Notes', margin, yPos);
  yPos += 7;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const observations = [
    'Pressure Signs: _______________________________________________',
    '______________________________________________________________',
    'Accuracy Notes: _______________________________________________',
    '______________________________________________________________',
    'Best Performing Load: _________________________________________',
    'Issues/Problems: ______________________________________________',
    '______________________________________________________________',
    'Next Steps: ___________________________________________________',
    '______________________________________________________________'
  ];

  observations.forEach((line) => {
    if (yPos > 275) {
      doc.addPage();
      yPos = 20;
    }
    doc.text(line, margin, yPos);
    yPos += 5;
  });

  // Footer
  addBrandedFooter(doc, 1);

  doc.save('Arms-Complex-Load-Development-Sheet.pdf');
};

export const generateProductLoadDataPDF = (product: any) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPos = addBrandedHeader(doc, 'Load Data Sheet', product.name);

  // Product Specifications
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Product Specifications', margin, yPos);
  yPos += 10;

  const specs = [
    ['Product Name:', product.name],
    ['Caliber:', product.caliber],
    ['Rounds per Box:', product.rounds.toString()],
    ['Price per Box:', `$${product.price.toFixed(2)}`],
    ['Price per Round:', `$${(product.price / product.rounds).toFixed(3)}`],
    ['Category:', product.category],
    ['SKU:', product.id],
    ['Stock Status:', product.inStock ? 'In Stock' : 'Out of Stock']
  ];

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  specs.forEach(([label, value]) => {
    doc.setFont('helvetica', 'bold');
    doc.text(label, margin, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(value, margin + 50, yPos);
    yPos += 7;
  });

  // Safety Warning
  yPos += 10;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setFillColor(220, 53, 69);
  doc.rect(margin - 5, yPos - 5, pageWidth - 2 * margin + 10, 50, 'F');
  doc.setTextColor(255, 255, 255);
  doc.text('CRITICAL SAFETY WARNING', pageWidth / 2, yPos, { align: 'center' });
  yPos += 8;
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const safetyText = [
    'Always follow manufacturer\'s load data exactly. Never exceed published maximum loads.',
    'Inspect all cases for cracks, splits, or defects before loading.',
    'Use only components specified in reliable reloading manuals.',
    'Start loads 10% below maximum and work up carefully while watching for pressure signs.',
    'Keep detailed records of all components and results for every loading session.'
  ];
  
  safetyText.forEach(text => {
    const lines = doc.splitTextToSize(text, pageWidth - 2 * margin - 10);
    doc.text(lines, pageWidth / 2, yPos, { align: 'center' });
    yPos += lines.length * 4 + 2;
  });

  doc.setTextColor(0, 0, 0);
  yPos += 15;

  // Reloading Log Section
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Reloading Log', margin, yPos);
  yPos += 10;

  // Create table for logging
  const tableHeaders = ['Date', 'Powder Type', 'Powder Charge', 'Primer', 'Bullet Weight', 'OAL', 'Notes'];
  const colWidth = (pageWidth - 2 * margin) / 7;
  
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  tableHeaders.forEach((header, i) => {
    doc.text(header, margin + (i * colWidth) + 2, yPos);
  });
  
  yPos += 5;
  doc.setLineWidth(0.3);
  
  // Draw 10 blank rows for logging
  for (let i = 0; i < 10; i++) {
    // Draw horizontal line
    doc.line(margin, yPos, pageWidth - margin, yPos);
    
    // Draw vertical lines
    for (let j = 0; j <= 7; j++) {
      doc.line(margin + (j * colWidth), yPos, margin + (j * colWidth), yPos + 10);
    }
    
    yPos += 10;
  }
  
  // Bottom line of table
  doc.line(margin, yPos, pageWidth - margin, yPos);

  // Recommended Usage Notes
  yPos += 15;
  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Recommended Usage & Storage', margin, yPos);
  yPos += 10;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const usageNotes = [
    'Store in cool, dry location away from direct sunlight and heat sources',
    'Keep ammunition in original packaging or clearly labeled containers',
    'Rotate stock - use oldest ammunition first (FIFO method)',
    'Inspect rounds before use for any signs of corrosion or damage',
    'Test fire new loads at reduced velocity before full-power loads',
    'Record all load data and results for future reference',
    'Clean firearms regularly when using reloaded ammunition',
    'Never exceed SAAMI pressure specifications for this caliber'
  ];

  usageNotes.forEach(note => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    doc.text('\u2022 ' + note, margin + 5, yPos);
    yPos += 7;
  });

  // Footer
  addBrandedFooter(doc, 1);

  doc.save(`Arms-Complex-${product.id}-Load-Data.pdf`);
};
