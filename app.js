const newQuoteBtn = document.getElementById("newQuote");
const shareBtn = document.getElementById("share");
const exportBtn = document.getElementById("export");
const copyBtn = document.getElementById("copy");
const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const container = document.getElementById("container");

let quote = "";

//get a quote onLoad
window.onload = (event) => {
  getQuote();
};

newQuoteBtn.addEventListener("click", getQuote);

shareBtn.addEventListener("click", function () {
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    quote
  )}`;
  window.open(url, "_blank");
});

copyBtn.addEventListener("click", copyQuote);

exportBtn.addEventListener("click", exportQuote);

// get A quote
async function getQuote() {
  try {
    quoteElement.textContent = "Please Wait...";
    authorElement.classList.add("hidden");
    const res = await fetch(
      "https://api.freeapi.app/api/v1/public/quotes/quote/random"
    );
    const data = await res.json();
    quote = `${data.data.content} - ${data.data.author}`;
    quoteElement.textContent = `${data.data.content} `;
    authorElement.textContent = `- ${data.data.author} `;
    authorElement.classList.remove("hidden");
  } catch (error) {
    quoteElement.textContent = error.message;
    authorElement.textContent == "";
  }
}

function copyQuote() {
  console.log(quote);
  navigator.clipboard
    .writeText(quote)
    .then(() => {
      quoteElement.classList.add("bg-zinc-400");
      authorElement.classList.add("bg-zinc-400");
      showToast("success", "Copied!");

      setTimeout(function () {
        quoteElement.classList.remove("bg-zinc-400");
        authorElement.classList.remove("bg-zinc-400");
      }, 2000);
    })
    .catch((err) => {
      console.error("Copy failed", err);
    });
}

function showToast(type = "success", message = "") {
  const toast = document.getElementById(`toast-${type}`);
  if (!toast) return;

  const msgEl = toast.querySelector(".ms-3");
  if (msgEl && message) {
    msgEl.textContent = message;
  }

  toast.classList.remove("hidden", "opacity-0");
  toast.classList.add("opacity-100", "transition-opacity", "duration-300");

  setTimeout(() => {
    toast.classList.add("opacity-0");
    setTimeout(() => {
      toast.classList.add("hidden");
    }, 300);
  }, 2000);
}

function exportQuote() {
  html2canvas(container).then((canvas) => {
    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = image;
    link.download = "quote-screenshot.png";
    link.click();
  });
}
