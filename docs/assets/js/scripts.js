// Robust copy with iOS/old-browser fallback + toast feedback
function copyLink(url) {
const text = url || window.location.href;

const showToast = (msg = "Link copied") => {
let t = document.querySelector(".toast");
if (!t) {
t = document.createElement("div");
t.className = "toast";
document.body.appendChild(t);
}
t.textContent = msg;
t.classList.add("is-visible");
setTimeout(() => t.classList.remove("is-visible"), 1400);
};

const legacyCopy = () => {
const ta = document.createElement("textarea");
ta.value = text;
ta.style.position = "fixed";
ta.style.top = "-9999px";
document.body.appendChild(ta);
ta.focus();
ta.select();
try {
const ok = document.execCommand("copy");
ok ? showToast() : window.prompt("Copy this link:", text);
} catch (e) {
window.prompt("Copy this link:", text);
}
document.body.removeChild(ta);
};

if (navigator.clipboard && window.isSecureContext) {
navigator.clipboard.writeText(text).then(
() => showToast(),
() => legacyCopy()
);
} else {
legacyCopy();
}
}

