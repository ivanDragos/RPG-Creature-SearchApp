const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const creatureName = document.getElementById("creature-name");
const creatureId = document.getElementById("creature-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const types = document.getElementById("types");
const specialName = document.getElementById("special-name");
const specialDescription = document.getElementById("special-description");
const output = document.querySelector(".output")

searchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const query = input.value.trim().toLowerCase()
    if (!query) {
        return;
    }

    fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${query}`)
        .then(response => {
            console.log("Response object:", response);
            console.log("Response status:", response.status);
            return response.json();


        })
        .then(data => {
            console.log("DATA FROM API:", data);
            if (data.error || !data.name || !data.id) {
                throw new Error("Creature not found");
            }
            output.style.display = "block";
            creatureName.textContent = data.name.toUpperCase();
            creatureId.textContent = "#" + data.id;
            weight.textContent = "Weight: " + data.weight;
            height.textContent = "Height: " + data.height;
            if(data.special){
            specialName.textContent = data.special.name;
            specialDescription.textContent = data.special.description;
            }

            types.innerHTML = "";


            if (data.types && data.types.length > 0) {
                        data.types.forEach((typeObj) => {
                            const typeSpan = document.createElement("span");
                            typeSpan.textContent = typeObj.name.toUpperCase();
                            typeSpan.classList.add("type");
                            typeSpan.classList.add(typeObj.name.toLowerCase());
                            types.appendChild(typeSpan);
                        });
                    }
            if (data.stats && data.stats.length > 0) {
                        data.stats.forEach((statObj) => {
                            const statName = statObj.name;
                            const statValue = statObj.base_stat;
                            if (statName === "hp") {
                                hp.textContent = statValue;
                            } else if (statName === "attack") {
                                attack.textContent = statValue;
                            } else if (statName === "defense") {
                                defense.textContent = statValue;
                            } else if (statName === "special-attack") {
                                specialAttack.textContent = statValue;
                            } else if (statName === "special-defense") {
                                specialDefense.textContent = statValue;
                            } else if (statName === "speed") {
                                speed.textContent = statValue;
                            }
                        });
                    }
                })
      .catch(error => {
            console.error("Error caught:", error);
            output.style.display = "none";
            alert("Creature not found");
        });

})