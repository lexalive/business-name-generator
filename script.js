const generateButton = document.getElementById("generateButton");
const results = document.getElementById("results");
const toast = document.getElementById("toast");

function renderEmptyState(title, description) {
    results.innerHTML = `
        <div class="empty-state" role="status">
            <h3>${title}</h3>
            <p>${description}</p>
        </div>
    `;
    results.classList.remove("has-results");
}

function setLoadingState(isLoading) {
    generateButton.disabled = isLoading;
    generateButton.innerHTML = isLoading
        ? '<span class="spinner" aria-hidden="true"></span>Generating...'
        : "Generate Names";
}

function generateNames() {
    const keyword = document.getElementById("idea").value.trim();

    if (keyword === "") {
        renderEmptyState("Start with an idea", "Enter a word like coffee, travel, or tech to get inspired.");
        return;
    }

    setLoadingState(true);
    results.innerHTML = `
        <div class="loading-state" role="status">
            <span class="spinner" aria-hidden="true"></span>
            <span>Generating polished name ideas...</span>
        </div>
    `;
    results.classList.remove("has-results");

    const prefixes = [
        "Nova",
        "Prime",
        "Blue",
        "Bright",
        "Smart",
        "Urban",
        "Elite",
        "Next",
        "True",
        "Peak"
    ];

    const suffixes = [
        "Hub",
        "Labs",
        "Studio",
        "Works",
        "Co",
        "Group",
        "Solutions",
        "Media",
        "HQ",
        "Central"
    ];

    window.setTimeout(() => {
        results.innerHTML = "";
        const usedNames = new Set();

        for (let i = 0; i < 10; i++) {
            let prefix, suffix, businessName;

            do {
                prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
                suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
                businessName = `${prefix} ${keyword} ${suffix}`;
            } while (usedNames.has(businessName));

            usedNames.add(businessName);

            const div = document.createElement("div");
            div.className = "name";
            div.style.animationDelay = `${i * 70}ms`;

            const strong = document.createElement("strong");
            strong.textContent = businessName;

            const button = document.createElement("button");
            button.type = "button";
            button.textContent = "Copy";
            button.setAttribute("aria-label", `Copy business name ${businessName}`);
            button.addEventListener("click", () => copyName(businessName, button));

            div.appendChild(strong);
            div.appendChild(button);
            results.appendChild(div);
        }

        results.classList.add("has-results");
        setLoadingState(false);
    }, 450);
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    window.clearTimeout(showToast.timeoutId);
    showToast.timeoutId = window.setTimeout(() => {
        toast.classList.remove("show");
    }, 1600);
}

function copyName(name, button) {
    navigator.clipboard.writeText(name).then(() => {
        const originalText = button.textContent;
        button.textContent = "Copied!";
        button.setAttribute("aria-label", `Copied ${name}`);
        showToast(`Copied “${name}”`);

        window.setTimeout(() => {
            button.textContent = originalText;
            button.setAttribute("aria-label", `Copy business name ${name}`);
        }, 1400);
    }).catch(() => {
        button.textContent = "Try again";
        showToast("Copy failed. Please try again.");
    });
}

generateButton.addEventListener("click", generateNames);
renderEmptyState("Your ideas will appear here", "Type a keyword and generate polished business name ideas in a moment.");
