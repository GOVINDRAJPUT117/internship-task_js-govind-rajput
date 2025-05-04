const recipes = [
    {
      name: "Tomato Egg Sandwich",
      ingredients: ["tomato", "egg", "bread"],
      type: "Breakfast"
    },
    {
      name: "Grilled Chicken Salad",
      ingredients: ["chicken", "lettuce", "tomato"],
      type: "Lunch"
    },
    {
      name: "Pasta Alfredo",
      ingredients: ["pasta", "cream", "cheese"],
      type: "Dinner"
    }
  ];
  
  const input = document.getElementById("ingredientInput");
  const filter = document.getElementById("typeFilter");
  const recipeList = document.getElementById("recipeList");
  
  function renderRecipes(recipesToRender) {
    recipeList.innerHTML = "";
  
    if (recipesToRender.length === 0) {
      recipeList.innerHTML = "<p>No matching recipes found.</p>";
      return;
    }
  
    recipesToRender.forEach(recipe => {
      const div = document.createElement("div");
      div.className = "recipe";
      div.innerHTML = `<h3>${recipe.name}</h3><p>Type: ${recipe.type}</p>`;
      recipeList.appendChild(div);
    });
  }
  
  function filterRecipes() {
    const ingredientsInput = input.value.toLowerCase().split(",").map(s => s.trim());
    const selectedType = filter.value;
  
    const filtered = recipes.filter(recipe => {
      const hasIngredients = ingredientsInput.every(ing =>
        recipe.ingredients.includes(ing)
      );
      const typeMatch = selectedType ? recipe.type === selectedType : true;
      return hasIngredients && typeMatch;
    });
  
    renderRecipes(filtered);
  }
  
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") filterRecipes();
  });
  
  filter.addEventListener("change", filterRecipes);
  