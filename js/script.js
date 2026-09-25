const plants = [
    {
        name: "Sunflower",
        scientificName: "Helianthus annuus",
        sunlight : "Full Sun",
        soil: "Well-drained soil",
        height: "5-12 feet",
        bloomSeason: "Summer",
        wildlifeBenefits: "Provides nectar and pollen for bees and butterflies during the growing season. The large seed heads also serve as a food source for birds such as finches after blooming."
    },
    {
        name: "Jade",
        scientificName: "Crassula ovata",
        sunlight: "Full Sun to Partial Sun",
        soil: "Well-drained, sandy or succulent soil",
        height: "1-3 feet",
        bloomSeason: "Winter",
        wildlifeBenefits: "Occasionally attracts bees when in bloom, though it is primarily grown as an ornamental succulent with limited wildlife value."
    },
    {
        name: "Daisy",
        scientificName: "Bellis perennis",
        sunlight: "Full Sun",
        soil: "Well-drained soil",
        height: "6-12 inches",
        bloomSeason: "Spring to Summer",
        wildlifeBenefits: "Attracts bees, butterflies, and other pollinators with its nectar-rich flowers. Daisies help support local pollinator populations and contribute to a healthy garden ecosystem."
    },
    {
        name: "Jasmine",
        scientificName: "Jasminum",
        sunlight : "4 to 6 hours",
        soil: "Rich and well-draining soil",
        height: "1 to 30 feet groud covers and vines",
        bloomSeason: "Late winter to fall",
        wildlifeBenefits: "providing nectar and pollen for pollinators during the growing season and nutritious seeds that feed birds and small mammals through the autumn and winter"
    },
    {
        name: "Marigold",
        scientificName: "Tagetes erecta",
        sunlight: "Full Sun",
        soil: "Well-drained, moderately fertile soil",
        height: "1-3 feet",
        bloomSeason: "Summer to Fall",
        wildlifeBenefits: "Attracts bees, butterflies, and ladybugs. Also known to repel certain garden pests, making it a popular companion plant."
    },
    {
        name: "Lavender",
        scientificName: "Lavandula angustifolia",
        sunlight: "Full Sun",
        soil: "Well-drained, sandy or gravelly soil; tolerates poor soil",
        height: "1-3 feet",
        bloomSeason: "Late Spring to Summer",
        wildlifeBenefits: "Highly attractive to bees, butterflies, and other pollinators. Deer and rabbit resistant due to its strong fragrance."
    },
    {
        name: "Coneflower",
        scientificName: "Echinacea purpurea",
        sunlight: "Full Sun to Partial Sun",
        soil: "Well-drained soil; tolerates clay and drought once established",
        height: "2-5 feet",
        bloomSeason: "Summer to Early Fall",
        wildlifeBenefits: "Attracts bees, butterflies, and hummingbirds. Seed heads left standing in fall and winter provide food for finches and other songbirds."
    },
    {
        name: "Milkweed",
        scientificName: "Asclepias syriaca",
        sunlight: "Full Sun",
        soil: "Well-drained soil; tolerates poor and dry soil",
        height: "2-4 feet",
        bloomSeason: "Summer",
        wildlifeBenefits: "The essential host plant for Monarch butterfly caterpillars. Flowers also attract bees and a wide range of other pollinators."
    },
    {
        name: "Black-Eyed Susan",
        scientificName: "Rudbeckia hirta",
        sunlight: "Full Sun to Partial Sun",
        soil: "Well-drained soil; adaptable to many soil types",
        height: "1-3 feet",
        bloomSeason: "Summer to Fall",
        wildlifeBenefits: "Attracts bees, butterflies, and other pollinating insects. Seed heads provide winter food for birds like goldfinches."
    },
    {
        name: "Aster",
        scientificName: "Symphyotrichum novae-angliae",
        sunlight: "Full Sun to Partial Sun",
        soil: "Well-drained, moist soil; tolerates clay",
        height: "1-6 feet",
        bloomSeason: "Late Summer to Fall",
        wildlifeBenefits: "Important late-season nectar source for bees, butterflies, and migrating Monarchs preparing for winter."
    },
];

const searchInput = document.getElementById("search");
const soilFilter = document.getElementById("soil-filter");
const heightFilter = document.getElementById("height-filter");
const resetButton = document.getElementById("reset-button");
const plantCount = document.getElementById("plant-count");
const plantContainer = document.getElementById("plant-container");

function displayPlants(plantList) {
    plantContainer.innerHTML = "";

    if (plantList.length === 0) {
        plantContainer.innerHTML = "<p>No plants found. Try a different search.</p>";
        return;
    }

    plantList.forEach(plant => {
        const plantElement = document.createElement("div");
        plantElement.classList.add("plant-card");
        plantElement.innerHTML = `
            <h3>${plant.name}</h3>
            <p><strong>Scientific Name:</strong> ${plant.scientificName}</p>
            <p><strong>Sunlight:</strong> ${plant.sunlight}</p>
            <p><strong>Soil:</strong> ${plant.soil}</p>
            <p><strong>Height:</strong> ${plant.height}</p>
            <p><strong>Bloom Season:</strong> ${plant.bloomSeason}</p>
            <p><strong>Wildlife Benefits:</strong> ${plant.wildlifeBenefits}</p>
        `;
        plantContainer.appendChild(plantElement);
    });
}

function filterPlants() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedSoil = soilFilter.value;
    const selectedHeight = heightFilter.value;

    const filteredPlants = plants.filter(plant => {
        const matchesSearch = plant.name.toLowerCase().includes(searchTerm);
        const matchesSoil = selectedSoil === "all" || plant.soil === selectedSoil;

        let matchesHeight = true;
        const firstNumber = parseInt(plant.height); // grabs the first number in "5-12 feet"

        if (selectedHeight === "short") {
            matchesHeight = firstNumber < 2;
        } else if (selectedHeight === "tall") {
            matchesHeight = firstNumber >= 2;
        }

        return matchesSearch && matchesSoil && matchesHeight;
    });

    displayPlants(filteredPlants);
    plantCount.textContent = `Showing: ${filteredPlants.length} plants`;
}

// Run these functions whenever the user types or changes a filter
searchInput.addEventListener("input", filterPlants);
soilFilter.addEventListener("change", filterPlants);
heightFilter.addEventListener("change", filterPlants);

resetButton.addEventListener("click", () => {
    searchInput.value = "";
    soilFilter.value = "all";
    heightFilter.value = "all";
    filterPlants();
});

filterPlants();

