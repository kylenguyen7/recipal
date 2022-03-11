
import Keys from './keys';

const ingredientsData = [
  {
    title: "fettuccine pasta",
    restrictions: ["Gluten Free","Paleo","Coeliac","FODMAP"],
    image: require('../assets/ingredients/fettuccine.png'),
    defaultAmount: 16,
    units: 'oz',
    category: 'pasta',
    nutrient: Keys.limitTotalCarbsKey,
    nutrientPerUnit: 7
  },
  {
    title: "macaroni pasta",
    restrictions: ["Gluten Free","Paleo","Coeliac","FODMAP"],
    image: require('../assets/ingredients/macaroni.png'),
    defaultAmount: 16,
    units: 'oz',
    category: 'pasta',
    nutrient: Keys.limitTotalCarbsKey,
    nutrientPerUnit: 7
  },
  {
    title: "butter",
    restrictions: ["Dairy Free","Vegan","Lactose Free","Paleo"],
    image: require('../assets/ingredients/butter.png'),
    defaultAmount: 8,
    units: 'Tablespoon',
    category: 'fat',
    nutrient: Keys.limitTotalFatKey,
    nutrientPerUnit: 14
  },
  {
    title: "minced garlic",
    restrictions: [],
    image: require('../assets/ingredients/garlic.png'),
    defaultAmount: 1,
    units: 'clove',
    category: 'garlic',
    nutrient: null,
    nutrientPerUnit: 0
  },
  {
    title: "heavy cream",
    restrictions: ["Dairy Free","Vegan","Lactose Free","Paleo"],
    image: require('../assets/ingredients/heavy-cream.png'),
    defaultAmount: 1.5,
    units: 'cups',
    category: 'cream',
    nutrient: Keys.limitTotalFatKey,
    nutrientPerUnit: 88.1
  },
  {
    title: "salt",
    restrictions: [],
    image: require('../assets/ingredients/salt.png'),
    defaultAmount: 0.5,
    units: 'tsp',
    category: 'salt',
    nutrient: Keys.limitSodiumKey,
    nutrientPerUnit: 1163
  },
  {
    title: "shredded parmesan cheese",
    restrictions: ["Dairy Free", "Lactose Free", "Vegan"],
    image: require('../assets/ingredients/parmesan.png'),
    defaultAmount: 1,
    units: 'cup',
    category: 'cheese',
    nutrient: Keys.limitTotalFatKey,
    nutrientPerUnit: 8
  },
  {
    title: "pepper",
    restrictions: [],
    image: require('../assets/ingredients/black-pepper.png'),
    defaultAmount: 0.5,
    units: 'tsp',
    category: 'pepper',
    nutrient: null,
    nutrientPerUnit: 0
  },
  {
    title: "italian parsley",
    restrictions: [],
    image: require('../assets/ingredients/parsley.png'),
    defaultAmount: 2,
    units: 'Tablespoon',
    category: 'parsley',
    nutrient: null,
    nutrientPerUnit: 0
  },
  {
    title: "pizza sauce",
    restrictions: ["Paleo"],
    image: require('../assets/ingredients/mids-jars-pizza-sauce.png'),
    defaultAmount: 0.5,
    units: 'cup',
    category: 'sauce',
    nutrient: Keys.limitCaloriesKey,
    nutrientPerUnit: 70
  },
  {
    title: "pizza dough",
    restrictions: ["Vegan","Gluten Free","Paleo","Coeliac","FODMAP"],
    image: require('../assets/ingredients/Pizza-Dough.png'),
    defaultAmount: 8,
    units: 'oz',
    category: 'dough',
    restrictions: ["Gluten Free","Paleo","Coeliac","FODMAP"],
    nutrient: Keys.limitTotalCarbsKey,
    nutrientPerUnit: 26
  },
  {
    title: "mozzarella cheese",
    restrictions: ["Dairy Free","Vegan","Lactose Free","Paleo"],
    image: require('../assets/ingredients/Mozzarella-Cheese.png'),
    defaultAmount: 8,
    units: 'oz',
    category: 'cheese',
    restrictions:  ["Dairy Free", "Lactose Free", "Vegan"],
    nutrient: Keys.limitTotalFatKey,
    nutrientPerUnit: 44.8
  },
  {
    title: "basil leaves",
    restrictions: [],
    image: require('../assets/ingredients/basil-leaves.png'),
    defaultAmount: 10,
    units: 'leaves',
    category: 'basil',
    nutrient: null,
    nutrientPerUnit: 0
  },
  {
    title: "red pepper flakes",
    restrictions: [],
    image: require('../assets/ingredients/crushed_red_pepper.png'),
    defaultAmount: 1,
    units: 'Tablesoon',
    category: 'topping',
    nutrient: Keys.limitTotalFatKey,
    nutrientPerUnit: 8
  },
  {
    title: "pepperoni",
    restrictions: ["Vegetarian","Vegan","Pescatarian","Paleo","Kosher","Halal"],
    image: require('../assets/ingredients/pepperoni.png'),
    defaultAmount: 5,
    units: 'slice',
    category: 'meat',
    restrictions:  ["Vegetarian", "Vegan"],
    nutrient: Keys.limitProteinKey,
    nutrientPerUnit: 0.6
  },
  {
    title: "banana",
    restrictions: [],
    image: require('../assets/ingredients/banana.png'),
    defaultAmount: 1,
    units: '',
    category: 'banana',
    nutrient: Keys.limitSugarsKey,
    nutrientPerUnit: 12.2,
  },
  {
    title: "strawberries",
    restrictions: [],
    image: require('../assets/ingredients/strawberry.png'),
    defaultAmount: 1,
    units: '',
    category: 'strawberry',
    nutrient: Keys.limitSugarsKey,
    nutrientPerUnit: 0.6,
  },
  {
    title: "almond milk",
    restrictions: ["Nut Free","Paleo"],
    image: require('../assets/ingredients/almondmilk.png'),
    defaultAmount: 1,
    units: 'cup',
    category: 'milk',
    nutrient: Keys.limitCalciumKey,
    nutrientPerUnit: 450,
  },
  {
    title: "soy milk",
    restrictions: ["Paleo", "FODMAP"],
    image: require('../assets/ingredients/soymilk.png'),
    defaultAmount: 1,
    units: 'cup',
    category: 'milk',
    nutrient: Keys.limitCalciumKey,
    nutrientPerUnit: 450,
  },
  {
    title: "coconut milk",
    restrictions: ["Paleo"],
    image: require('../assets/ingredients/coconutmilk.png'),
    defaultAmount: 1,
    units: 'cup',
    category: 'milk',
    nutrient: Keys.limitCalciumKey,
    nutrientPerUnit: 460,
  },
  {
    title: "oat milk",
    restrictions: ["Paleo", "FODMAP"],
    image: require('../assets/ingredients/oatmilk.png'),
    defaultAmount: 1,
    units: 'cup',
    category: 'milk',
    nutrient: Keys.limitCalciumKey,
    nutrientPerUnit: 350,
  },
  {
    title: "flour",
    image: require('../assets/ingredients/flour.png'),
    defaultAmount: 1,
    units: 'cup',
    category: 'flour',
    nutrient: Keys.limitTotalCarbsKey,
    restrictions: ["Gluten Free","Paleo","Coeliac","FODMAP"],
    nutrientPerUnit: 95,
  },
  {
    title: "eggs",
    image: require('../assets/ingredients/eggs.png'),
    defaultAmount: 1,
    units: '',
    category: 'egg',
    restrictions: ["Vegan", "Egg Free", ""],
    nutrient: Keys.limitProteinKey,
    nutrientPerUnit: 6,
  },
  {
    title: "mushroom",
    image: require('../assets/ingredients/mushroom.png'),
    defaultAmount: 4,
    units: '',
    category: 'vegetable',
    restrictions: ["FODMAP"],
    nutrient: null,
    nutrientPerUnit: 0,
  },
  {
    title: "spinach",
    image: require('../assets/ingredients/spinach.png'),
    defaultAmount: 1,
    units: 'cup',
    category: 'vegetable',
    restrictions: [],
    nutrient: null,
    nutrientPerUnit: 0,
  },
  {
    title: "chicken",
    image: require('../assets/ingredients/chicken.png'),
    defaultAmount: 4,
    units: 'oz',
    category: 'meat',
    restrictions: ["Vegetarian", "Vegan", "Pescatarian"],
    nutrient: Keys.limitProteinKey,
    nutrientPerUnit: 32,
  },
  {
    title: "pork",
    image: require('../assets/ingredients/pork.png'),
    defaultAmount: 4,
    units: 'oz',
    category: 'meat',
    restrictions: ["Vegetarian", "Vegan", "Pescatarian", "Kosher", "Halal"],
    nutrient: Keys.limitProteinKey,
    nutrientPerUnit: 32,
  },
  {
    title: "beef",
    image: require('../assets/ingredients/beef.png'),
    defaultAmount: 4,
    units: 'oz',
    category: 'meat',
    restrictions: ["Vegetarian", "Vegan", "Pescatarian"],
    nutrient: Keys.limitProteinKey,
    nutrientPerUnit: 28,
  },
  {
    title: "tofu",
    image: require('../assets/ingredients/tofu.png'),
    defaultAmount: 4,
    units: 'oz',
    category: 'meat',
    nutrient: Keys.limitProteinKey,
    restrictions: ["Paleo"],
    nutrientPerUnit: 8,
  },
  {
    title: "ricotta",
    image: require('../assets/ingredients/ricotta.png'),
    defaultAmount: 1,
    units: 'cup',
    category: 'cheese',
    restrictions: ["Dairy Free", "Vegan", "Lactose Free", "Paleo"],
    nutrient: Keys.limitTotalFatKey,
    nutrientPerUnit: 32,
  },
  {
    title: "brown sugar",
    image: require('../assets/ingredients/brown-sugar.png'),
    defaultAmount: 1,
    units: 'cup',
    category: 'sugar',
    restrictions: [],
    nutrient: Keys.limitSugarsKey,
    nutrientPerUnit: 213,
  },
  {
    title: "peanut butter",
    image: require('../assets/ingredients/peanut-butter.png'),
    defaultAmount: 1,
    units: 'cup',
    category: 'nut butter',
    restrictions: ["Nut free"],
    nutrient: Keys.limitTotalFatKey,
    nutrientPerUnit: 130,
  },
  {
    title: "sunflower butter",
    image: require('../assets/ingredients/sunflower-butter.png'),
    defaultAmount: 1,
    units: 'cup',
    category: 'nut butter',
    restrictions: [],
    nutrient: Keys.limitTotalFatKey,
    nutrientPerUnit: 128,
  },
  {
    title: "almond butter",
    image: require('../assets/ingredients/almond-butter.png'),
    defaultAmount: 1,
    units: 'cup',
    category: 'nut butter',
    restrictions: ["Nut Free"],
    nutrient: Keys.limitTotalFatKey,
    nutrientPerUnit: 139,
  },
]

export default ingredientsData;

export function findIngredientByTitle(title) {
  for(let i = 0; i < ingredientsData.length; i++) {
    console.log("Pass in: " + title)
    console.log("Data check: " + ingredientsData[i].title)
    if(ingredientsData[i].title === title) {
      return ingredientsData[i];
    }
  }

  return null;
}

export function findIngredientsByCategory(category) {
  if(category === "none") {}
  const result = [];

  for(let i = 0; i < ingredientsData.length; i++) {
    if(ingredientsData[i].category === category) {
      result.push(ingredientsData[i]);
    }
  }

  return result;
}