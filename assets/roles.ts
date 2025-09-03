// src/app/assets/roles.ts
// مسیرها باید ثابت باشند تا Metro بتونه bundle کنه

export const roleIcons = {
    zodiac: {
        al_capone: require('./images/roles/zodiac/alcapone.png'),
        bomber: require('./images/roles/zodiac/bomber.png'),
        magician: require('./images/roles/zodiac/magician.png'),
        doctor: require('./images/roles/zodiac/doctor.png'),
        detective: require('./images/roles/zodiac/detective.png'),
        professional: require('./images/roles/zodiac/sniper.png'),
        bodyguard: require('./images/roles/zodiac/bodyguard.png'),
        gunsmith: require('./images/roles/zodiac/gunsmith.png'),
        mason: require('./images/roles/zodiac/mason.png'),
        citizen: require('./images/roles/zodiac/citizen.png'),
        zodiac: require('./images/roles/zodiac/zodiac.png'),
    },
    nustradamus: {
        godfather: require('./images/roles/nustradamus/godfather.jpeg'),
        saul_goodman: require('./images/roles/nustradamus/SaulGoodman.jpeg'),
        matador: require('./images/roles/nustradamus/Matador.jpeg'),
        nostradamus: require('./images/roles/nustradamus/Nostradamoos.jpeg'),
        dr_watson: require('./images/roles/nustradamus/DrWatson.jpeg'),
        leon: require('./images/roles/nustradamus/Leon.jpeg'),
        citizen_kane: require('./images/roles/nustradamus/Kin.jpeg'),
        constantine: require('./images/roles/nustradamus/Constantine.jpeg'),
        citizen: require('./images/roles/nustradamus/City.jpeg'),
    },
    jack: {
        godfather: require('./images/roles/jack/JGodfather.webp'),
        matador: require('./images/roles/jack/JMatador.webp'),
        dr_watson: require('./images/roles/jack/JWatson.webp'),
        leon: require('./images/roles/jack/JLeon.webp'),
        citizen: require('./images/roles/jack/JCity.webp'),
        citizen_kane: require('./images/roles/jack/JKane.webp'),
        constantine: require('./images/roles/jack/JConstantine.webp'),
        saul_goodman: require('./images/roles/jack/JGoodman.webp'),
        jack_sparrow: require('./images/roles/jack/Jack.webp'),
    },
    elclasico: {
        pablo_escobar: require('./images/roles/elclasico/pablo.png'),
        juan: require('./images/roles/elclasico/juan.png'),
        blanco: require('./images/roles/elclasico/blanco.png'),
        churchill: require('./images/roles/elclasico/churchil.png'),
        dr_bridget: require('./images/roles/elclasico/drbridget.png'),
        moreno: require('./images/roles/elclasico/moreno.png'),
        bonaparte: require('./images/roles/elclasico/jeneral.png'),
        martinez: require('./images/roles/elclasico/martinez.png'),
        chaplin: require('./images/roles/elclasico/chaplin.png'),
        citizen: require('./images/roles/elclasico/citizen.png'),
    },
} as const;

export type ScenarioKey = keyof typeof roleIcons;
export type RoleKey<S extends ScenarioKey> = keyof typeof roleIcons[S];

export function getRoleIcon<S extends ScenarioKey>(scenario: S, role: RoleKey<S>) {
    return roleIcons[scenario][role];
}
