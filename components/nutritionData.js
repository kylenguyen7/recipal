
import keys from "../constants/keys"
import Keys from "../constants/keys"

export const nutritionData = [
    {
        id: 0,
        title: 'Calories', 
        description:'Units commonly used to measure energy content of foods and beverages as well as energy use (expenditure) by the body. A kilocalorie is equal to the amount of energy (heat) required to raise the temperature of 1 kilogram of water 1 degree centigrade. Energy is required to sustain the body\'s various functions, including metabolic processes and physical activity. Carbohydrate, fat, protein, and alcohol provide all of the energy supplied by foods and beverages. If not specified explicitly, references to "calories" refer to "kilocalories."',
        units: 'cal',
        image: '[IMAGE HERE]',
        key: Keys.limitCaloriesKey
    },
    {
        id: 1,
        title: 'Total Fat', 
        description:'Indicates how much fat is in a single serving of food or drink. Fat is one of three main nutrients in food that provide calories, or "energy," for the body. Each gram of fat provides 9 calories. Fat is necessary for proper growth and development, helps the body absorb fat-soluble vitamins, and supports key body processes (such as blood clotting, nervous system function, reproduction, and immune response).',
        units: 'g',
        image: '[IMAGE HERE]',
        key: Keys.limitTotalFatKey
    },
    {
        id: 2,
        title: 'Saturated Fat', 
        description:'Fatty acids that have no double bonds. Fats high in saturated fatty acids are usually solid at room temperature. Sources include animal products (such as meat and dairy products) and tropical oils (such as coconut and palm oils).',
        units: 'g',
        image: '[IMAGE HERE]',
        key: Keys.limitSatFatKey
    },
    {
        id: 3,
        title: 'Trans Fat', 
        description:'Unsaturated fatty acids that are structurally different from the unsaturated fatty acids that occur naturally in plant foods and that have detrimental health effects. Sources of trans fatty acids include partially hydrogenated vegetable oils, which were used in a variety of foods (such as baked goods, coffee creamer, ready-to use frostings, snack foods, and stick margarine). As of 2018, most uses of partially hydrogenated oils have been phased out. Trans fatty acids are also present naturally in foods that come from ruminant animals (such as dairy products, beef, and lamb) and at very low levels in refined vegetable oils.',
        units: 'g',
        image: '[IMAGE HERE]',
        key: Keys.limitTransFatKey
    },
    {
        id: 4,
        title: 'Cholesterol', 
        description:'A natural sterol present in all animal tissues. Free cholesterol is a component of cell membranes and serves as a precursor for steroid hormones (estrogen, testosterone, aldosterone), and for bile acids. Humans are able to synthesize sufficient cholesterol to meet biologic requirements, and there is no evidence for a dietary requirement for cholesterol.',
        units: 'mg',
        image: '[IMAGE HERE]',
        key: Keys.limitCholesterolKey
    },
    {
        id: 5,
        title: 'Sodium', 
        description:'A mineral and one of the chemical elements found in salt. Sodium is an essential nutrient needed by the human body in relatively small amounts (provided that substantial sweating does not occur) and is important for many body processes, such as fluid balance, muscle contraction, and nervous system function.',
        units: 'mg',
        image: '[IMAGE HERE]',
        key: Keys.limitSodiumKey
    },
    {
        id: 6,
        title: 'Total Carbohydrates', 
        description:'Indicates how many grams of carbohydrate are in a single serving of food or drink. Carbohydrates are one of three main nutrients in food that provide calories, or "energy" for the body. Each gram of carbohydrate provides 4 calories. The human body breaks down carbohydrates into glucose, which is the primary energy source for the body\'s cells, tissues, and organs.',
        units: 'g',
        image: '[IMAGE HERE]',
        key: Keys.limitTotalCarbsKey
    },
    {
        id: 7,
        title: 'Dietary Fiber', 
        description:'A type of carbohydrate that cannot be easily digested in the small intestine. Dietary fiber can increase the frequency of bowel movements, lower blood glucose and cholesterol levels, and reduce calorie intake. Dietary Fiber on the Nutrition Facts label includes naturally occurring fibers in plants (such as beans, fruits, nuts, peas, vegetables, seeds, whole grains, and foods made with whole grain ingredients) and certain isolated or synthetic non-digestible carbohydrates added to food that the U.S. Food and Drug Administration has determined have beneficial physiological effects to human health. ',
        units: 'g',
        image: '[IMAGE HERE]',
        key: Keys.limitFiberKey
    },
    {
        id: 8,
        title: 'Total Sugars', 
        description:'Sugars are the smallest and simplest type of carbohydrate and provide a sweet taste. The human body breaks down sugars into glucose, which is the main energy source for the body\'s cells, tissues, and organs.',
        units: 'g',
        image: '[IMAGE HERE]',
        key: Keys.limitSugarsKey
    },
    {
        id: 9,
        title: 'Protein', 
        description:'One of three main nutrients in food that provide calories, or "energy," for the body. Each gram of protein provides 4 calories. Proteins are made up of amino acids and are needed for the body to function properly. They are the basis of body structures, such as skin and hair, and are important for many body processes.',
        units: 'g',
        image: '[IMAGE HERE]',
        key: Keys.limitProteinKey
    },
    {
        id: 10,
        title: 'Calcium', 
        description:'A mineral important for optimal bone health. It is also important for many body processes, such as blood clotting, hormone secretion, muscle contraction, and nervous system function.',
        units: 'mg',
        image: '[IMAGE HERE]',
        key: Keys.limitCalciumKey
    },
    {
        id: 11,
        title: 'Iron', 
        description:'A mineral important for red blood cell formation. It is also important for many body processes, such as growth and development, immune function, reproduction, and wound healing.',
        units: 'mg',
        image: '[IMAGE HERE]',
        key: Keys.limitIronKey
    },
    // {
    //     id: 12,
    //     title: 'Potassium', 
    //     description:'[DESCRIPTION HERE]',
    //     units: 'mg',
    //     image: '[IMAGE HERE]'
    // },
    {
        id: 13,
        title: 'Vitamin A', 
        description:'Vitamin A is a fat-soluble vitamin that is naturally present in many foods. Vitamin A is important for normal vision, the immune system, and reproduction. Vitamin A also helps the heart, lungs, kidneys, and other organs work properly.',
        units: 'mg',
        image: '[IMAGE HERE]',
        key: Keys.limitVAKey
    },
    // {
    //     id: 14,
    //     title: 'Vitamin B', 
    //     description:'[DESCRIPTION HERE]',
    //     units: 'mg',
    //     image: '[IMAGE HERE]'
    // },
    {
        id: 15,
        title: 'Vitamin C', 
        description:'Vitamin C, also known as ascorbic acid, is a water-soluble nutrient found in some foods. In the body, it acts as an antioxidant, helping to protect cells from the damage caused by free radicals. Free radicals are compounds formed when our bodies convert the food we eat into energy. The body also needs vitamin C to make collagen, a protein required to help wounds heal. In addition, vitamin C improves the absorption of iron from plant-based foods and helps the immune system work properly to protect the body from disease.',
        units: 'mg',
        image: '[IMAGE HERE]',
        key: Keys.limitVCKey
    },
    {
        id: 16,
        title: 'Vitamin D', 
        description:'A vitamin that helps your body absorb calcium and is important for optimal bone health. It is also important for many body processes, such as blood pressure regulation, hormone production, and immune and nervous system function. Vitamin D is found in many foods and is also produced by the body when your skin is exposed to sunlight.',
        units: 'mg',
        image: '[IMAGE HERE]',
        key: Keys.limitVDKey
    },
  ]