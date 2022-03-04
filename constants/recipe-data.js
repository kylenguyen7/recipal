const recipeData = [
  {
    title: "Fettuccine Alfredo",
    restrictions: ["Dairy Free", "Vegan", "Gluten Free", "Paleo", "Kosher", "Coeliac"],
    category: "Italian",
    image: require('../assets/fettucine.png'),
    time: '1.5 hours',
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
        image: require('../assets/fettucine.png'),
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
        image: require('../assets/fettucine.png'),
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
        image: require('../assets/fettucine.png'),
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
        image: require('../assets/fettucine.png'),
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
        image: require('../assets/fettucine.png'),
        ingredients: [
          {
            title: "italian parsley",
            amount: 1.5,
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