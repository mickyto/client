import { dictionary } from './dictionary'
import cookie from 'react-cookie';

export const locales = [
    {
        alias: 'en_EN',
        name: 'English'
    }, {
        alias: 'ru_RU',
        name: 'Русский'
    }
];

export const t = (word) => {

    const currentLang = cookie.load('locale');
    if (currentLang) {
        const currentLang = cookie.load('locale');

        if (!dictionary[currentLang.alias][word])
            console.log(`Warning: We do not have translation for word '${word}'`);
        return dictionary[currentLang.alias][word]
    }
    else {
        return dictionary['en_EN'][word]
    }
};

