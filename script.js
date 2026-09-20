// ---------- data: at least 4 objects, 3+ properties each ----------
const concepts = [
  {
    term: "Phishing",
    category: "Social Engineering",
    description: "A fake email, message, or site designed to trick someone into giving up passwords or personal info."
  },
  {
    term: "Firewall",
    category: "Network Security",
    description: "A system that filters incoming and outgoing network traffic based on a set of security rules."
  },
  {
    term: "Malware",
    category: "Threats",
    description: "Software built to damage, disrupt, or gain unauthorized access to a device or network."
  },
  {
    term: "Encryption",
    category: "Cryptography",
    description: "Scrambling data so only someone with the right key can read it, even if it's intercepted."
  },
  {
    term: "Two-Factor Authentication",
    category: "Access Control",
    description: "Requiring a second proof of identity (like a code on your phone) in addition to a password."
  },
  {
    term: "VPN",
    category: "Network Security",
    description: "A Virtual Private Network that encrypts your connection and hides your traffic from your local network."
  }
];

// ---------- pure function: takes a value in, returns a value, never touches the page ----------
function filterConcepts(query) {
  const q = (query || "").trim().toLowerCase();
  if (!q) {
    return concepts;
  }
  return concepts.filter(function (c) {
    return (
      c.term.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
    );
  });
}

// ---------- draws a list of concepts into the empty container ----------
function renderConcepts(list) {
  const container = document.getElementById("concepts-container");
  if (!container) {
    return;
  }

  // guard: empty or bad input never shows "undefined" or breaks the page
  if (!list || list.length === 0) {
    container.innerHTML = '<p class="concepts-empty">No concepts match that search — try a different term.</p>';
    return;
  }

  container.innerHTML = list
    .map(function (c) {
      return (
        '<div class="concept-card">' +
          "<h3>" + c.term + ' <span class="tag">' + c.category + "</span></h3>" +
          "<p>" + c.description + "</p>" +
        "</div>"
      );
    })
    .join("");
}

// ---------- build the list from data on load, then react to the search control ----------
document.addEventListener("DOMContentLoaded", function () {
  renderConcepts(concepts);

  const searchInput = document.getElementById("concept-search");
  if (searchInput) {
    searchInput.addEventListener("input", function (event) {
      const results = filterConcepts(event.target.value);
      renderConcepts(results);
    });
  }
});
