
import Keys from './keys';

const ingredientsData = [
  {
    title: "fettuccine pasta",
    image: require('../assets/ingredients/fettuccine.png'),
    defaultAmount: 16,
    units: 'oz',
    category: 'pasta',
    nutrient: Keys.limitTotalCarbsKey,
    nutrientPerUnit: 7
  },
  {
    title: "macaroni pasta",
    image: require('../assets/ingredients/macaroni.png'),
    defaultAmount: 16,
    units: 'oz',
    category: 'pasta',
    nutrient: Keys.limitTotalCarbsKey,
    nutrientPerUnit: 7
  },
  {
    title: "butter",
    image: require('../assets/ingredients/butter.png'),
    defaultAmount: 8,
    units: 'Tablespoon',
    category: 'fat',
    nutrient: Keys.limitTotalFatKey,
    nutrientPerUnit: 14
  },
  {
    title: "minced garlic",
    image: require('../assets/ingredients/garlic.png'),
    defaultAmount: 1,
    units: 'clove',
    category: 'garlic',
    nutrient: null,
    nutrientPerUnit: 0
  },
  {
    title: "heavy cream",
    image: require('../assets/ingredients/heavy-cream.png'),
    defaultAmount: 1.5,
    units: 'cups',
    category: 'cream',
    nutrient: Keys.limitTotalFatKey,
    nutrientPerUnit: 88.1
  },
  {
    title: "salt",
    image: require('../assets/ingredients/salt.png'),
    defaultAmount: 0.5,
    units: 'tsp',
    category: 'salt',
    nutrient: Keys.limitSodiumKey,
    nutrientPerUnit: 1163
  },
  {
    title: "shredded parmesan cheese",
    image: require('../assets/ingredients/parmesan.png'),
    defaultAmount: 1,
    units: 'cup',
    category: 'cheese',
    nutrient: Keys.limitTotalFatKey,
    nutrientPerUnit: 8
  },
  {
    title: "pepper",
    image: require('../assets/ingredients/black-pepper.png'),
    defaultAmount: 0.5,
    units: 'tsp',
    category: 'pepper',
    nutrient: null,
    nutrientPerUnit: 0
  },
  {
    title: "italian parsley",
    image: require('../assets/ingredients/parsley.png'),
    defaultAmount: 2,
    units: 'Tablespoon',
    category: 'parsley',
    nutrient: null,
    nutrientPerUnit: 0
  }
]

export default ingredientsData;

export function findIngredientByTitle(title) {
  for(let i = 0; i < ingredientsData.length; i++) {
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