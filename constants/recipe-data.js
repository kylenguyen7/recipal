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
  },
  {
    title: "Homemade Ravioli",
    category: "Italian",
    image: require('../assets/ravioli-finish.png'),
    time: 2,
    calories: 800,
    yield: 4,
    difficulty: '⭐⭐⭐⭐⭐',
    steps: [
      {
        title: "Make Dough",
        text: [
          "Form a well with the flour.",
	  "Crack the eggs into the well.",
	  "Slowly incorporate the ingredients until a ball of dough is formed. Split in two.",
          "Cover, and set aside in the refrigerator 20 minutes."],
        image: require('../assets/ravioli-make-dough.png'),
        ingredients: [
          {
            title: "flour",
            amount: 2.5,
            isEssential: true,
          },
	  {
            title: "eggs",
            amount: 4,
            isEssential: true,
          }
        ]
      },

      {
        title: "Prepare Filling",
        text: [
          "In a large pan, cook {meat} over medium heat.",
          "Chop {vegetable} to prepare it for the food processor.",
          "Mix {cheese} with other filling ingredients and blend until smooth."],
        image: require('../assets/ravioli-prepare-filling.png'),
        ingredients: [
          {
            title: "chicken",
            amount: 6,
            isEssential: false
          },
          {
            title: "mushroom",
            amount: 5,
            isEssential: false
          },
          {
            title: "ricotta",
            amount: 2,
            isEssential: true
          }
        ]
      },

      {
        title: "Assemble Ravioli",
        text: [
          "Using a pasta machine or rolling pin, roll out the dough into two long, flat sheets.",
	  "On top of the first sheet, make scoops of 1 tbsp of filling 1 inch apart from one end of the sheet to the other.",
	  "Lay the second sheet on top of the first and press around the filling scoops, sealing them.",
	  "Cut each ravioli with a ravioli cutter. Dust with flour to keep the ravioli from sticking together."
        ],
        image: require('../assets/ravioli-assemble-ravioli.png'),
        ingredients: [
          {
            title: "flour",
            amount: 0.25,
            isEssential: false
          },
        ]
      },

      {
        title: "Boil Ravioli",
        text: [
	  "Boil the ravioli for 3 to 4 minutes. They should rise to the top when they're ready to serve.",
          "Top with {cheese}, if so desired. Enjoy!"
        ],
        image: require('../assets/ravioli-boil-ravioli.png'),
        ingredients: [
          {
            title: "shredded parmesan cheese",
            amount: 3,
            isEssential: false
          },
        ]
      }

    ]
  },
  {
    title: "Peanut Butter Cookies",
    category: "Dessert",
    image: require('../assets/cookies-finish.png'),
    time: 0.75,
    calories: 3240,
    yield: 24,
    difficulty: '⭐⭐',
    steps: [
      {
        title: "Preheat & Prepare",
        text: [
          "Preheat oven to 350°F.",
	  "Line baking sheet with partchment paper.",
	  "Dust with flour to prevent cookies from sticking to the sheet."],
        image: require('../assets/cookies-preheat-n-prepare.png'),
        ingredients: [
          {
            title: "flour",
            amount: 0.5,
            isEssential: false
          }
        ]
      },

      {
        title: "Make Dough",
        text: [
          "In the bowl of an electric stand mixer fitted with the paddle attachment cream butter.",
	  "Slowly add in brown sugar as the mixer mixes.",
          "Slowly add in flour as the mixer mixes.",
	  "Slowly add in {nut butter} as the mixer mixes."],
        image: require('../assets/cookies-make-dough.png'),
        ingredients: [
          {
            title: "butter",
            amount: 0.5,
            isEssential: true
          },
          {
            title: "brown sugar",
            amount: 1,
            isEssential: true
          },
          {
            title: "flour",
            amount: 1.33,
            isEssential: true
          },
	  {
            title: "peanut butter",
            amount: 0.75,
            isEssential: true
          }
        ]
      },
    //   {
    //     title: "Shape & Bake",
    //     text: [
    //       "Scoop dough out and shape into balls, then place on baking sheet spacing them 2 inches apart.",
	  // "Using a fork, flatten cookies slightly in opposite directions to create criss cross patterns.",
	  // "Bake cookies in preheated oven, for about 9 minutes.",
	  // "Let cool on baking sheet 5 minutes then transfer to a wire rack to cool completely. Store cookies in an airtight container."
    //     ],
    //     image: require('../assets/cookies-shape-n-bake.png'),
    //     ingredients: [
    //       {

    //       },
    //     ]
    //   }
    ]
  },
  {
    title: "Dairy-Free Strawberry Banana Smoothie",
    category: "Drink",
    image: require('../assets/smoothie.png'),
    time: 0.5,
    calories: 168,
    yield: 2,
    difficulty: '⭐',
    steps: [
      {
        title: "Prepare",
        text: [
          "Measure 1 cup of frozen {strawberry}.",
          "Slice 1 {banana} into 1-inch thin slices.",
          "Measure 1/2 cup of {milk} into the blender.",
          "Do not add sugar - the fruit has sufficient sugar for this recipe."],
        image: require('../assets/smoothie-ingredients.png'),
        ingredients: [
          {
            title: "strawberries",
            amount: 8,
            isEssential: true,
          },
          {
            title: "banana",
            amount: 1,
            isEssential: true,
          },
          {
            title: "almond milk",
            amount: 0.5,
            isEssential: false,
          }
        ]
      },
      {
        title: "Add",
        text: [
          "Add {strawberry} and {banana} into the blender first.",
           "Pour {milk} on top of fruit in the blender."],
        image: require('../assets/add-to-blender.png'),
        ingredients: [
          {
            title: "strawberries",
            amount: 8,
            isEssential: true,
          },
          {
            title: "banana",
            amount: 1,
            isEssential: true,
          },
          {
            title: "almond milk",
            amount: 0.5,
            isEssential: false,
          }
        ]
      },
      {
        title: "Blend",
        text: [
          "Blend the ingredients until smooth and creamy.",
           "This should take about one minute depending on your blender.",
           "Add a few ice cubes if the smoothie is too thin.", 
           "Add more liquid ({milk} or water) if the smoothie is too thick."],
        image: require('../assets/blender-finished.png'),
        ingredients: [
          {
            title: "almond milk",
            amount: 0.5,
            isEssential: false,
          }
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