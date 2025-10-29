"use strict";

const cakeRecipes = require("./cake-recipes.json");
const prompt = require("prompt-sync")();

// Your functions here

const authors = (data) => {
  let list = [];
  data.forEach((item) => list.push(item["Author"]));
  const list_A = [...new Set(list)];
  return list_A;
};

const recipesNames = (data) => {
  let list = [];
  if (!data) {
    console.log("No recipes found");
    return null;
  };
  for (const { Name } of data) {
    list.push(Name);
  };
  return list;
};

const recipesByAuthor = (data, auth) => {
  let list = [];
  if (!data || !auth) {
    console.log("No recipes or author found");
    return null;
  }

  const recipes = data.filter((item) => item.Author === auth);
  for (const { Name } of recipes) {
    list.push(Name);
  }
  return recipes;
};

const recipeByIngredient = (data, ingredient) => {
  if (!data || !ingredient) {
    console.log("No recipes found");
    return null;
  };
  const found = data.filter((item) =>
    item.Ingredients.some((i) => i.includes(ingredient))
  );
  const showNames = recipesNames(found);
  return showNames;
};

const recipeByName = (data, recName) => {
  if (!data) {
    console.log("No recipe found");
    return null;
  }
  const rec = data.find((item) =>
    item.Name.toLowerCase().includes(recName.toLowerCase())
  );
  return rec;
};

const recipeIngredients = (data) => {
  if (!data) {
    console.log("No recipes found");
    return null;
  };
  return data.reduce((allIngredients, recipe) => {
    return allIngredients.concat(recipe.Ingredients);
  }, []);
};


//Part 2

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
let savedList = [];

do {
  choice = displayMenu();
  switch (choice) {
    case 1:
      console.log(authors(cakeRecipes));
      break;
    case 2:
      const authorName = prompt("Enter the author's name: ");
      console.log(recipesByAuthor(cakeRecipes, authorName));
      break;
    case 3:
      const ingredient = prompt("Enter the ingredient: ");
      console.log(recipeByIngredient(cakeRecipes, ingredient));
      break; 
    case 4:
      const recipeName = prompt("Enter recipe name: ");
      const foundRecipe = recipeByName(cakeRecipes, recipeName);
      if (!foundRecipe) {
        console.log("No recipes found");
      } else {
        console.log(foundRecipe);
        const save = prompt(
          "Do you want to save the ingerdients of this recipe? (y/n): "
        );
        if (save.toLowerCase() === "y") {
          savedList.push(foundRecipe);
          console.log("Saved");
        };
      };
      break;
    case 5:
      if(savedList.length > 0){
        console.log(recipeIngredients(savedList));
      } else {
        console.log("No ingredients saved")
      }
      break;
    case 0:
      console.log("Exiting...");
      break;
    default:
      console.log("Invalid input. Please enter a number between 0 and 5.");
  }
} while (choice !== 0);
