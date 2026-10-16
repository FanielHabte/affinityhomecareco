/* Affinity Home Care — site script */

// ---- Settings ----
// Where the contact form sends submissions:
//   null  = preview mode: the form validates and shows a thank-you, but sends nothing.
//   "/"   = Netlify Forms (the form already carries data-netlify="true").
//   Or a Formspree URL, e.g. "https://formspree.io/f/xxxxxxx".
const FORM_ENDPOINT = null;
const PHONE_DISPLAY = "(720) 555-1234";

// ---- Mobile menu ----
(function () {
  const btn = document.querySelector(".menu-btn");
  const nav = document.getElementById("site-nav");
  if (!btn || !nav) return;

  function close() {
    nav.classList.remove("open");
    btn.setAttribute("aria-expanded", "false");
  }
  btn.addEventListener("click", function () {
    const open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("open")) { close(); btn.focus(); }
  });
  window.addEventListener("resize", function () { if (window.innerWidth > 880) close(); });
})();

// ---- Contact form ----
(function () {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const topic = document.getElementById("topic");
  const status = document.getElementById("form-status");

  // Links such as contact.html#provider pre-select the topic.
  const fromHash = (location.hash || "").replace("#", "");
  if (["care", "referral", "provider", "other"].indexOf(fromHash) !== -1) topic.value = fromHash;

  function setError(input, message) {
    const err = document.getElementById(input.id + "-error");
    if (message) {
      input.setAttribute("aria-invalid", "true");
      if (err) { err.textContent = message; err.hidden = false; }
    } else {
      input.removeAttribute("aria-invalid");
      if (err) { err.textContent = ""; err.hidden = true; }
    }
  }

  function validate() {
    let firstBad = null;
    const name = form.elements["name"];
    const email = form.elements["email"];
    const phone = form.elements["phone"];

    setError(topic, topic.value ? "" : "Please choose what you're reaching out about.");
    if (!topic.value) firstBad = firstBad || topic;

    setError(name, name.value.trim() ? "" : "Please enter your name.");
    if (!name.value.trim()) firstBad = firstBad || name;

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    const phoneOk = phone.value.replace(/\D/g, "").length >= 10;
    if (!emailOk && !phoneOk) {
      setError(email, email.value.trim() ? "This email doesn't look complete." : "Please give an email or a phone number so we can reach you.");
      firstBad = firstBad || email;
    } else {
      setError(email, "");
    }

    if (firstBad) firstBad.focus();
    return !firstBad;
  }

  function showStatus(html) {
    status.innerHTML = html;
    status.hidden = false;
    status.focus();
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    if (!validate()) return;

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;

    if (!FORM_ENDPOINT) {
      form.hidden = true;
      showStatus("<strong>Thank you, we have your message.</strong><br>A coordinator will follow up soon. " +
        "<span class='muted'>(Preview mode: this form isn't connected yet, so nothing was sent.)</span>");
      return;
    }

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded", "Accept": "application/json" },
        body: new URLSearchParams(new FormData(form)).toString()
      });
      if (!res.ok) throw new Error("Request failed");
      form.hidden = true;
      showStatus("<strong>Thank you, we have your message.</strong><br>A coordinator will follow up soon.");
    } catch (err) {
      btn.disabled = false;
      showStatus("<strong>We couldn't send your message.</strong><br>Please try again, or call us at " + PHONE_DISPLAY + ".");
    }
  });
})();
