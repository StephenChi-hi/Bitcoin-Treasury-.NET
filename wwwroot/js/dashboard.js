// --- Dashboard Mock Tracker Ticks ---
const priceEl = document.getElementById("btc-price");
const syncEl = document.getElementById("btc-updated-time");

if (priceEl && syncEl) {
  let currentPrice = 61619.0;
  let elapsedSeconds = 0;

  // Count up elapsed timer
  setInterval(() => {
    elapsedSeconds++;
    syncEl.textContent = `UPDATED ${elapsedSeconds}S AGO`;
  }, 1000);

  // Fluctuate price subtly every 4 seconds
  setInterval(() => {
    const movement = Math.random() * 24 - 12;
    currentPrice += movement;

    // Fade effect on update
    priceEl.style.opacity = 0.85;
    setTimeout(() => {
      priceEl.textContent = `$${currentPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      priceEl.style.opacity = 1;
    }, 150);

    elapsedSeconds = 0; // reset indicator
    syncEl.textContent = `UPDATED ${elapsedSeconds}S AGO`;
  }, 4000);
}


// --- Section 2 Liquid Table Loading Engine & Segment Switches ---
    const compFilter = document.getElementById("filter-companies");
    const govFilter = document.getElementById("filter-governments");
    const entitySub = document.getElementById("entity-count-display");
    const tableBody = document.getElementById("treasury-table-body");

    // Sample Datasets reflecting your image properties
    const companyData = [
        { rank: 1, name: "Strategy", ticker: "MSTR.US", country: "US", holdings: "843.77K", entry: "$63.68B", current: "$52.14B", pnl: "-$11,542,466,714", direction: "down", supply: "4.0180%" },
        { rank: 2, name: "XXI", ticker: "XXI.US", country: "US", holdings: "43.51K", entry: "$0", current: "$2.69B", pnl: "+$2.69B", direction: "up", supply: "0.2070%" },
        { rank: 3, name: "Metaplanet", ticker: "3350.T", country: "JP", holdings: "43.00K", entry: "$3.81B", current: "$2.66B", pnl: "-$1,153,517,898", direction: "down", supply: "0.2050%" },
        { rank: 4, name: "MARA Holdings", ticker: "MARA.US", country: "US", holdings: "35.30K", entry: "$0", current: "$2.18B", pnl: "+$2.18B", direction: "up", supply: "0.1680%" }
    ];

    const governmentData = [
        { rank: 1, name: "United States Government", ticker: "GOV.US", country: "US", holdings: "213.24K", entry: "$0", current: "$13.14B", pnl: "+$13.14B", direction: "up", supply: "1.0150%" },
        { rank: 2, name: "Chinese Government", ticker: "GOV.CN", country: "CN", holdings: "190.00K", entry: "$0", current: "$11.70B", pnl: "+$11.70B", direction: "up", supply: "0.9048%" }
    ];

    const renderTableRows = (dataset) => {
        tableBody.innerHTML = dataset.map(row => `
            <tr>
                <td style="opacity: 0.5;">${row.rank}</td>
                <td style="font-weight: 700; font-family: 'Space Grotesk';">${row.name}</td>
                <td style="opacity: 0.8; font-size:0.8rem;">${row.ticker}</td>
                <td><span class="badge-country">${row.country}</span></td>
                <td class="text-end" style="font-weight:700;">${row.holdings}</td>
                <td class="text-end">${row.entry}</td>
                <td class="text-end">
                    <span>${row.current}</span>
                    <span class="pnl-value ${row.direction}">${row.pnl}</span>
                </td>
                <td class="text-end" style="color: #00d2ff; font-weight: 600;">${row.supply}</td>
            </tr>
        `).join('');
    };

    // Load Simulation Process
    setTimeout(() => {
        // Hide Skeleton Text containers, reveal live data tokens
        document.querySelectorAll(".skeleton-wrapper").forEach(el => el.classList.add("d-none"));
        document.querySelectorAll(".loaded-content").forEach(el => el.classList.remove("d-none"));
        
        // Render base initial company collection
        renderTableRows(companyData);
    }, 2200); // 2.2 second simulated wire latency

    // Toggle segment switch action patterns
    if (compFilter && govFilter) {
        compFilter.addEventListener("click", () => {
            compFilter.classList.add("active");
            govFilter.classList.remove("active");
            entitySub.textContent = "175";
            renderTableRows(companyData);
        });

        govFilter.addEventListener("click", () => {
            govFilter.classList.add("active");
            compFilter.classList.remove("active");
            entitySub.textContent = "12";
            renderTableRows(governmentData);
        });
    }

    // --- Section 3 Voting Action Simulation (Temporary Mock) ---
    // Usage in HTML: onclick="voteIdea(312, 'up')"
    window.voteIdea = (ideaId, direction) => {
        const votesEl = document.getElementById(`votes-${ideaId}`);
        if (!votesEl) return;
        
        const stackEl = votesEl.closest('.vote-stack');
        
        // Block multiple clicks in a single session
        if (stackEl.getAttribute('data-voted')) return;
        
        // Basic increment/decrement simulation
        let currentVotes = parseFloat(votesEl.textContent.replace('K', '')) * (votesEl.textContent.includes('K') ? 1000 : 1);
        
        if (direction === 'up') {
            currentVotes += 1;
            stackEl.setAttribute('data-voted', 'up');
        } else {
            currentVotes -= 1;
            stackEl.setAttribute('data-voted', 'down');
        }
        
        // Reformat back to dynamic string representation
        votesEl.textContent = (currentVotes >= 1000) ? (currentVotes / 1000).toFixed(1) + 'K' : currentVotes;
        
        // Log consensus shift simulation
        console.log(`CONSENSUS CHANGE EVENT: IDEA ${ideaId} | DELTA ${direction === 'up' ? '+1' : '-1'} | FINAL ${votesEl.textContent}`);
    }