using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Bitcoin_Treasury_.NET.Pages
{
    public class LoginModel : PageModel
    {
        [BindProperty]
        public string? IdentityPayload { get; set; }

        [BindProperty]
        public string? Passphrase { get; set; }

        public void OnGet()
        {
        }

        public IActionResult OnPost()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            // Authentication logic placeholder
            // If successful, re-route to main account layout summary dashboard
            return RedirectToPage("/Index");
        }
    }
}