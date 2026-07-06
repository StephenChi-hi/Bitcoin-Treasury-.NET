using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Bitcoin_Treasury_.NET.Pages.Blog
{
    public class StoryModel : PageModel
    {
        public string? StoryTitle { get; private set; }
        public string? StoryContent { get; private set; }

        public IActionResult OnGet(string? slug)
        {
            if (string.IsNullOrEmpty(slug))
            {
                return RedirectToPage("/Community");
            }

            // Simple route dictionary mapping to simulate database records
            if (slug.ToLower() == "scaling-the-network")
            {
                StoryTitle = "L2 Solutions: Beyond the Lightning Network";
                StoryContent = "<p>As layer-2 scaling architectures advance, alternative protocols like <strong>RGB</strong> and <strong>Ark</strong> are emerging to handle higher throughput requirements without introducing centralized custodianship into the ecosystem.</p><p>This study analyzes state-channel settlement behaviors under highly restricted mempool environments, establishing optimization maps for modern transaction pipelines.</p>";
            }
            else if (slug.ToLower() == "global-adoption")
            {
                StoryTitle = "The Geopolitics of Sovereign Adoption";
                StoryContent = "<p>National-scale capital infrastructure transitions represent a monumental game-theoretic shift. This document examines emerging structural reserve allocations and computational power strategies deployed across emerging economic zones.</p>";
            }
            else if (slug.ToLower() == "mining-consensus")
            {
                StoryTitle = "Decentralization vs. The 51% Matrix";
                StoryContent = "<p>A rigorous evaluation of collective hash distribution curves. We map the statistical threshold variance required to enforce strict transaction finality parameters across non-cooperative mining networks.</p>";
            }
            else
            {
                // Fallback for unmapped custom slugs
                StoryTitle = "Decentralized Research Log";
                StoryContent = $"<p>Displaying dynamic context stream parameters for network identification slug: <code>{slug}</code>. Protocol mapping data is fully operational.</p>";
            }

            return Page();
        }
    }
}