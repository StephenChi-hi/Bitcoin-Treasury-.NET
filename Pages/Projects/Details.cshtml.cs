using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Bitcoin_Treasury_.NET.Pages.Projects
{
    public class DetailsModel : PageModel
    {
        public string? ProjectName { get; private set; }
        public string? ProjectDescription { get; private set; }
        public string? TotalRaised { get; private set; }
        public int ContributorCount { get; private set; }
        public string? ImpactScore { get; private set; }
        public string? ValidationState { get; private set; }

        public IActionResult OnGet(string? slug)
        {
            if (string.IsNullOrEmpty(slug))
            {
                return RedirectToPage("/Community");
            }

            // Route execution parsing
            if (slug.ToLower() == "bip340")
            {
                ProjectName = "BIP-340 Schnorr Signatures";
                TotalRaised = "₿ 1.15 M";
                ContributorCount = 45;
                ImpactScore = "88%";
                ValidationState = "TESTNET_A";
                ProjectDescription = "<p>BIP-340 introduces native Schnorr signature parameters to the core protocol layer, providing massive structural optimization optimizations for multi-signature schemes and scaling primitives.</p><p>Our current initiative targets cross-platform validation bottlenecks to reduce memory footprint by up to 25% across non-custodial node deployments.</p>";
            }
            else if (slug.ToLower() == "cypherpunk-lib")
            {
                ProjectName = "The Bitcoin Privacy Library";
                TotalRaised = "₿ 0.45 M";
                ContributorCount = 12;
                ImpactScore = "74%";
                ValidationState = "RESEARCH_PHASE";
                ProjectDescription = "<p>An open-source repository consolidating cryptographic implementations, transaction obfuscation models, and transaction mapping defenses to safeguard sovereign peer-to-peer data flow.</p>";
            }
            else
            {
                // Generic project fallback baseline
                ProjectName = $"Initiative Code: {slug.ToUpper()}";
                TotalRaised = "₿ 0.00 M";
                ContributorCount = 1;
                ImpactScore = "0%";
                ValidationState = "SANDBOX_MOCK";
                ProjectDescription = "<p>Custom community contribution pipeline initialized. Core system validation tests are awaiting manual deployment clearance.</p>";
            }

            return Page();
        }
    }
}