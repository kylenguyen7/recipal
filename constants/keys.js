import AsyncStorage from '@react-native-async-storage/async-storage';

const Keys = {
    limitCaloriesKey: 'calories',
    limitTotalFatKey: 'total fat',
    limitSatFatKey: 'saturated fat',
    limitTransFatKey: 'trans fat',
    limitCholesterolKey: 'cholesterol',
    limitSodiumKey: 'sodium',
    limitTotalCarbsKey: 'total carbs',
    limitFiberKey: 'fiber',
    limitSugarsKey: 'sugar',
    limitProteinKey: 'protein',
    limitCalciumKey: 'calcium',
    limitIronKey: 'iron',
    limitVAKey: 'Vitamin A',
    limitVCKey: 'Vitamin C',
    limitVDKey: 'Vitamin D'
}

export default Keys;

export async function getAllLimits() {
    const limits = {};

    for(const key in Keys) {
        const stringValue = await AsyncStorage.getItem(Keys[key]);

        if(stringValue === null) {
            "";
        } else {
            limits[Keys[key]] = JSON.parse(stringValue).upper;
        }
    }

    return limits;
}


export async function resetLimits() {
    for(const key in Keys) {
        await AsyncStorage.setItem(Keys[key], "")
    }
}