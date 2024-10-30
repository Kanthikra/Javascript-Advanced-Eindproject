"use strict";

const cakeRecipes = require("./cake-recipes.json");

// Function that returns all authors of a given recipe list.
function getUniqueAuthors(recipes) {
  const authors = [];
  recipes.forEach((recipe) => {
    if (!authors.includes(recipe.Author)) {
      authors.push(recipe.Author);
    }
  });

  return authors;
}
const uniqueAuthors = getUniqueAuthors(cakeRecipes);
console.log(uniqueAuthors);

// Function that logs the name of each recipe.
function recipeName(recipes) {
  if (recipes.length === 0) {
    console.log("No recipes found.");
    return;
  }
  recipes.forEach(({ Name }) => {
    console.log(Name);
  });
}
recipeName(cakeRecipes);
recipeName([]);

// Function that returns all recipe of a given author.
function getRecipesByAuthor(recipes, author) {
  return recipes.filter((recipe) => recipe.Author === author);
}
const authors = uniqueAuthors;
authors.forEach((author) => {
  const recipesByAuthor = getRecipesByAuthor(cakeRecipes, author);
  console.log(`${author}'s recipes:`);
  recipeName(recipesByAuthor);
  console.log("");
});

// Function that returns a list of recipes that contain a given ingredient.
function getRecipesByIngredient(recipes, ingredient) {
  return recipes.filter((recipe) =>
    recipe.Ingredients.some((ing) =>
      ing.toLowerCase().includes(ingredient.toLowerCase())
    )
  );
}

// Function that takes  a list of recipe and a name as input.
function getRecipeByName(recipes, name = "") {
  if (!name) {
    console.log("No recipe name provided.");
    return null;
  }

  return recipes.find((recipe) =>
    recipe.Name.toLowerCase().includes(name.toLowerCase())
  );
}

const recipeNameToSearch = "";
const foundRecipe = getRecipeByName(cakeRecipes, recipeNameToSearch);

if (foundRecipe) {
  console.log(`Recipe found:`, foundRecipe);
} else {
  console.log(`No recipe found for '${recipeNameToSearch}'.`);
}

// Function that returns all the ingredient of a given recipe list into a single array.
function getAllIngredients(recipes) {
  return recipes.reduce((allIngredients, recipe) => {
    return [...allIngredients, ...recipe.Ingredients];
  }, []);
}
const specificAuthorRecipes = cakeRecipes;
const allIngredientsFromSpecificAuthor = getAllIngredients(
  specificAuthorRecipes
);
console.log(allIngredientsFromSpecificAuthor);

// Part 2

let savedIngredients = [];

const displayMenu = () => {
  console.log("\nRecipe Management System Menu:");
  console.log("1. Show All Authors");
  console.log("2. Show Recipe names by Author");
  console.log("3. Show Recipe names by Ingredient");
  console.log("4. Get Recipe by Name");
  console.log("5. Get All Ingredients of Saved Recipes");
  console.log("0. Exit");
  const choice = prompt("Enter a number (1-5) or 0 to exit: ");
  return parseInt(choice);
};

let choice;

do {
  choice = displayMenu();

  switch (choice) {
    case 1:
      console.log("Unique authors: ", getUniqueAuthors(cakeRecipes));
      break;
    case 2:
      const author = prompt("Enter the author's name: ");
      const recipesByAuthor = getRecipesByAuthor(cakeRecipes, author);
      if (recipesByAuthor.length > 0) {
        console.log(`${author}'s recipes:`, recipesByAuthor);
      } else {
        console.log(`No recipes found for ${author}.`);
      }
      break;
    case 3:
      const ingredient = prompt("Enter the ingredient: ");
      const foundRecipe = getRecipesByIngredient(cakeRecipes, ingredient);
      console.log(`Recipe containing "${ingredient}":`);
      recipeName(foundRecipe);
      break;
    case 4:
      const recipeNameToSearch = prompt("Enter the recipe name: ");
      const recipe = getRecipeByName(cakeRecipes, recipeNameToSearch);
      if (recipe) {
        console.log("Recipe found: ", recipe);
        savedIngredients = recipe.Ingredients;
        console.log("Saved Ingredient: ", savedIngredients.join(","));
      } else {
        console.log("No recipe found.");
      }
      break;
    case 5:
      if (savedIngredients.length > 0) {
        console.log("All saved ingredients: ", savedIngredients.join(","));
      } else {
        console.log("No ingredients saved yet.");
      }
      break;
    case 0:
      console.log("Exiting...");
      break;
    default:
      console.log("Invalid input. Please enter a number between 0 and 5.");
  }
} while (choice !== 0);
