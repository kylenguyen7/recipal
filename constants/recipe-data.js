const recipeData = [
  {
    title: "Fettuccine Alfredo",
    category: "Italian",
    image: require('../assets/fettucine.png'),
    time: 1.5,
    calories: 800,
    yield: 4,
    difficulty: '⭐⭐⭐⭐⭐',
    steps: [
      {
        title: "Boil",
        text: [
          "In a large pot, heat water over high heat until boiling.",
          "Add {salt} to season the water.",
          "Once it is boiling, add {pasta} and cook according to package instructions."],
        image: require('../assets/boil.jpg'),
        ingredients: [
          {
            title: "fettuccine pasta",
            amount: 8,
            isEssential: true,
          }
        ]
      },

      {
        title: "Heat",
        text: [
          "In a large skillet or pan, heat {fat} over medium heat.",
          "Add {garlic} and cook for 1 to 2 minutes.",
          "Stir in {cream} and cook for 5 to 8 minutes."],
        image: require('../assets/butter-pan.jpg'),
        ingredients: [
          {
            title: "butter",
            amount: 6,
            isEssential: true
          },
          {
            title: "minced garlic",
            amount: 1,
            isEssential: false
          },
          {
            title: "heavy cream",
            amount: 1.5,
            isEssential: false
          }
        ]
      },

      {
        title: "Add",
        text: [
          "Add {cheese} to the mixture and whisk well until smooth. Keep over heat and whisk well until cheese is melted.",
          "From the boiling pasta, save some pasta water!",
        ],
        image: require('../assets/cheese-pan.jpg'),
        ingredients: [
          {
            title: "shredded parmesan cheese",
            amount: 0.75,
            isEssential: false
          },
        ]
      },

      {
        title: "Toss",
        text: [
          "Toss alfredo sauce with pasta and add most of the {cheese}. Once it is tossed, garnish with remaining cheese.",
          "Add a little pasta water to the sauce if it needs to be thinned out."
        ],
        image: require('../assets/toss.jpg'),
        ingredients: [
          {
            title: "shredded parmesan cheese",
            amount: 0.75,
            isEssential: false
          },
        ]
      },

      {
        title: "Garnish",
        text: [
          "Garnish with {parsley}, if so desired. Plate to your liking!"
        ],
        image: require('../assets/garnish.jpg'),
        ingredients: [
          {
            title: "italian parsley",
            amount: 1.5,
            isEssential: false
          },
        ]
      }
    ]
  },
  {
    title: "Homemade Pizza",
    category: "Italian",
    image: require('../assets/homemade-pizza-finish.png'),
    time: 1.5,
    calories: 2400,
    yield: 4,
    difficulty: '⭐⭐⭐⭐⭐',
    steps: [
      {
        title: "Preheat & Prepare",
        text: [
          "Preheat the oven to 500°F.",
          "Slice {cheese} into thin slices.",
          "Prepare {meat} according to preferred topping size."],
        image: require('../assets/homemade-pizza-ingredients.png'),
        ingredients: [
          {
            title: "mozzarella cheese",
            amount: 8,
            isEssential: false,
          },
          {
            title: "pepperoni",
            amount: 20,
            isEssential: false,
          }
        ]
      },

      {
        title: "Knead",
        text: [
          "Let {dough} rest for 15 minutes before kneading.",
          "Knead the dough for 5 minutes until dough is a smooth ball.",
          "If homemade dough, let dough rise for 1 hour.",
          "Turn the dough out onto a floured surface. Stretch to fit a 14-inch pizza pan or similar."],
        image: require('../assets/homemade-pizza-knead.png'),
        ingredients: [
          {
            title: "pizza dough",
            amount: 8,
            isEssential: true
          }
        ]
      },

      {
        title: "Spread",
        text: [
          "Spread a thin layer of the {sauce} onto the dough.",
          "To make this process easier, use a spoon to spread the sauce in circular motions",
        ],
        image: require('../assets/homemade-pizza-sauce.png'),
        ingredients: [
          {
            title: "pizza sauce",
            amount: 0.5,
            isEssential: true
          }
        ]
      },

      {
        title: "Add Toppings",
        text: [
          "Place {cheese} on top of the sauce.",
          "Place {meat} on top, as desired."
        ],
        image: require('../assets/homemade-pizza-toppings.png'),
        ingredients: [
          {
            title: "mozzarella cheese",
            amount: 8,
            isEssential: false,
          },
          {
            title: "pepperoni",
            amount: 20,
            isEssential: false,
          }
        ]
      },

      {
        title: "Bake",
        text: [
          "Bake 10 to 12 minutes, or until the crust is browned.",
          "Remove carefully from the oven and top with fresh {basil}.",
          "Finally, add a pinch of the {topping}."],
        image: require('../assets/homemade-pizza-bake.png'),
        ingredients: [
          {
            title: "basil leaves",
            amount: 10,
            isEssential: false
          },
          {
            title: "red pepper flakes",
            amount: 1,
            isEssential: false
          },
        ]
      }
    ]
  }
]

export default recipeData;

export function findRecipeByTitle(title) {
  for(let i = 0; i < recipeData.length; i++) {
    if(recipeData[i].title === title) {
      return recipeData[i];
    }
  }

  return null;
}