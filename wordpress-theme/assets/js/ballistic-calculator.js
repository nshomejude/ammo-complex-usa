/**
 * Arms Complex - Ballistic Calculator
 * 
 * Advanced ballistic calculations for bullet trajectory, energy, velocity,
 * drop, and wind drift at various ranges.
 * 
 * @package Arms_Complex
 */

(function($) {
    'use strict';

    // Common load presets
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
        { name: "9mm 115gr", caliber: "9mm", weight: "115", mv: "1200", bc: "0.147" },
        { name: ".45 ACP 230gr", caliber: ".45 ACP", weight: "230", mv: "850", bc: "0.185" }
    ];

    $(document).ready(function() {
        initBallisticCalculator();
    });

    /**
     * Initialize Ballistic Calculator
     */
    function initBallisticCalculator() {
        // Check if we're on the ballistic calculator page
        if (!$('.ballistic-calculator').length) {
            return;
        }

        // Populate preset loads dropdown
        populatePresets();

        // Handle preset selection
        $('#preset-load').on('change', handlePresetChange);

        // Handle calculate button
        $('#calculate-ballistics').on('click', calculateBallistics);

        // Handle clear button
        $('#clear-results').on('click', clearResults);

        // Auto-fill from URL parameter if present
        const urlParams = new URLSearchParams(window.location.search);
        const caliber = urlParams.get('caliber');
        if (caliber) {
            $('#caliber').val(caliber);
            autoSelectPreset(caliber);
        }
    }

    /**
     * Populate preset loads dropdown
     */
    function populatePresets() {
        const $select = $('#preset-load');
        if (!$select.length) return;

        $select.empty();
        $select.append('<option value="">Select a preset load...</option>');
        
        commonLoads.forEach((load, index) => {
            $select.append(`<option value="${index}">${load.name}</option>`);
        });
    }

    /**
     * Handle preset load selection
     */
    function handlePresetChange() {
        const selectedIndex = $(this).val();
        if (selectedIndex === '') return;

        const load = commonLoads[parseInt(selectedIndex)];
        if (!load) return;

        // Fill in the form fields
        $('#caliber').val(load.caliber);
        $('#bullet-weight').val(load.weight);
        $('#muzzle-velocity').val(load.mv);
        $('#ballistic-coefficient').val(load.bc);
    }

    /**
     * Auto-select matching preset based on caliber
     */
    function autoSelectPreset(caliber) {
        const matchingIndex = commonLoads.findIndex(load => 
            load.caliber.toLowerCase().includes(caliber.toLowerCase()) ||
            caliber.toLowerCase().includes(load.caliber.toLowerCase())
        );

        if (matchingIndex !== -1) {
            $('#preset-load').val(matchingIndex).trigger('change');
        }
    }

    /**
     * Calculate ballistics
     */
    function calculateBallistics() {
        // Get input values
        const mv = parseFloat($('#muzzle-velocity').val());
        const weight = parseFloat($('#bullet-weight').val());
        const bcValue = parseFloat($('#ballistic-coefficient').val());
        const sight = parseFloat($('#sight-height').val()) || 1.5;
        const zero = parseFloat($('#zero-range').val()) || 100;
        const wind = parseFloat($('#wind-speed').val()) || 10;
        const temp = parseFloat($('#temperature').val()) || 59;
        const alt = parseFloat($('#altitude').val()) || 0;

        // Validate required inputs
        if (!mv || !weight || !bcValue) {
            alert('Please fill in all required fields (Muzzle Velocity, Bullet Weight, and Ballistic Coefficient)');
            return;
        }

        // Range array in yards
        const ranges = [0, 25, 50, 75, 100, 150, 200, 250, 300, 400, 500, 600, 700, 800, 900, 1000];
        const gravity = 32.174; // ft/s²
        
        // Air density correction factor based on temperature and altitude
        const standardTemp = 59; // °F
        const tempFactor = (standardTemp + 460) / (temp + 460);
        const altFactor = Math.exp(-alt / 30000);
        const densityFactor = tempFactor * altFactor;

        // Drag coefficient (simplified G1 model)
        const dragCoefficient = 0.5191 / bcValue * densityFactor;

        // Calculate ballistics for each range
        const results = ranges.map(function(range) {
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
            let verticalVelocity = 0;
            let verticalPosition = -sight / 12; // Convert sight height to feet, negative because below bore

            const dropDt = 0.001;
            
            while (dropDistance < rangeFeet && dropVelocity > 0) {
                const decel = dragCoefficient * dropVelocity * dropVelocity;
                dropVelocity = dropVelocity - decel * dropDt;
                dropDistance = dropDistance + dropVelocity * dropDt;
                
                verticalVelocity = verticalVelocity - gravity * dropDt;
                verticalPosition = verticalPosition + verticalVelocity * dropDt;
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

        // Display results
        displayResults(results);
    }

    /**
     * Display calculation results
     */
    function displayResults(results) {
        const $resultsTable = $('#ballistics-results-table tbody');
        const $resultsSection = $('#ballistics-results');

        if (!$resultsTable.length) return;

        // Clear existing results
        $resultsTable.empty();

        // Populate table with results
        results.forEach(function(result) {
            const row = `
                <tr>
                    <td class="range-cell">${result.range} yds</td>
                    <td class="velocity-cell">${result.velocity} fps</td>
                    <td class="energy-cell">${result.energy} ft-lbs</td>
                    <td class="drop-cell">${result.drop > 0 ? '+' : ''}${result.drop}"</td>
                    <td class="wind-drift-cell">${result.windDrift}"</td>
                    <td class="tof-cell">${result.timeOfFlight}s</td>
                </tr>
            `;
            $resultsTable.append(row);
        });

        // Show results section with animation
        $resultsSection.removeClass('hidden').hide().slideDown(400);

        // Scroll to results
        $('html, body').animate({
            scrollTop: $resultsSection.offset().top - 100
        }, 600);

        // Generate chart if chart library is available
        generateChart(results);
    }

    /**
     * Generate trajectory chart
     */
    function generateChart(results) {
        const $chartContainer = $('#trajectory-chart');
        if (!$chartContainer.length) return;

        // Extract data for chart
        const ranges = results.map(r => r.range);
        const drops = results.map(r => r.drop);
        const velocities = results.map(r => r.velocity);
        const energies = results.map(r => r.energy);

        // Clear existing chart
        $chartContainer.empty();

        // Create simple canvas-based chart or use Chart.js if available
        if (typeof Chart !== 'undefined') {
            createChartJS($chartContainer[0], ranges, drops, velocities, energies);
        } else {
            createSimpleChart($chartContainer, ranges, drops);
        }
    }

    /**
     * Create Chart.js chart (if library is loaded)
     */
    function createChartJS(canvas, ranges, drops, velocities, energies) {
        const ctx = canvas.getContext('2d');
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ranges,
                datasets: [
                    {
                        label: 'Drop (inches)',
                        data: drops,
                        borderColor: 'rgb(239, 68, 68)',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        yAxisID: 'y-drop',
                    },
                    {
                        label: 'Velocity (fps)',
                        data: velocities,
                        borderColor: 'rgb(59, 130, 246)',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        yAxisID: 'y-velocity',
                    }
                ]
            },
            options: {
                responsive: true,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Range (yards)'
                        }
                    },
                    'y-drop': {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Drop (inches)'
                        }
                    },
                    'y-velocity': {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Velocity (fps)'
                        },
                        grid: {
                            drawOnChartArea: false,
                        }
                    }
                }
            }
        });
    }

    /**
     * Create simple SVG chart (fallback)
     */
    function createSimpleChart($container, ranges, drops) {
        const width = $container.width();
        const height = 300;
        const padding = 40;

        const maxRange = Math.max(...ranges);
        const maxDrop = Math.max(...drops.map(Math.abs));
        const minDrop = Math.min(...drops);

        // Create SVG
        const svg = `
            <svg width="${width}" height="${height}" class="trajectory-chart">
                <g class="chart-content">
                    ${createGrid(width, height, padding)}
                    ${createDropLine(ranges, drops, width, height, padding, maxRange, maxDrop, minDrop)}
                    ${createAxes(width, height, padding)}
                </g>
            </svg>
        `;

        $container.html(svg);
    }

    function createGrid(width, height, padding) {
        let grid = '';
        const gridLines = 10;
        
        for (let i = 0; i <= gridLines; i++) {
            const y = padding + (height - 2 * padding) * i / gridLines;
            grid += `<line x1="${padding}" y1="${y}" x2="${width - padding}" y2="${y}" stroke="#e5e7eb" stroke-width="1"/>`;
        }
        
        return grid;
    }

    function createDropLine(ranges, drops, width, height, padding, maxRange, maxDrop, minDrop) {
        const points = ranges.map((range, i) => {
            const x = padding + (width - 2 * padding) * (range / maxRange);
            const normalizedDrop = (drops[i] - minDrop) / (maxDrop - minDrop);
            const y = height - padding - (height - 2 * padding) * normalizedDrop;
            return `${x},${y}`;
        }).join(' ');

        return `<polyline points="${points}" fill="none" stroke="#ef4444" stroke-width="2"/>`;
    }

    function createAxes(width, height, padding) {
        return `
            <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="#374151" stroke-width="2"/>
            <line x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}" stroke="#374151" stroke-width="2"/>
        `;
    }

    /**
     * Clear results
     */
    function clearResults() {
        $('#ballistics-results').slideUp(400, function() {
            $('#ballistics-results-table tbody').empty();
            $('#trajectory-chart').empty();
        });
    }

    /**
     * Print results
     */
    window.printBallisticsResults = function() {
        window.print();
    };

    /**
     * Export results to CSV
     */
    window.exportBallisticsCSV = function() {
        const $table = $('#ballistics-results-table');
        if (!$table.length) return;

        let csv = 'Range (yds),Velocity (fps),Energy (ft-lbs),Drop (in),Wind Drift (in),Time of Flight (s)\n';
        
        $table.find('tbody tr').each(function() {
            const row = [];
            $(this).find('td').each(function() {
                let text = $(this).text().trim();
                // Remove units and clean up
                text = text.replace(/\s*(yds|fps|ft-lbs|"|s)\s*$/, '');
                row.push(text);
            });
            csv += row.join(',') + '\n';
        });

        // Create download link
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ballistics-results.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

})(jQuery);
