// src/app/assets/roles.ts
// مسیرها باید ثابت باشند تا Metro بتونه bundle کنه

export const roleIcons = {
    zodiac: {
        al_capone: require('./images/roles/zodiac/alcapone.png'),
        bomber: require('./assets/images/roles/zodiac/bomber.png'),
        magician: require('./assets/images/roles/zodiac/magician.png'),
        doctor: require('./assets/images/roles/zodiac/doctor.png'),
        detective: require('./assets/images/roles/zodiac/detective.png'),
        professional: require('./assets/images/roles/zodiac/professional.png'),
        bodyguard: require('./assets/images/roles/zodiac/bodyguard.png'),
        gunsmith: require('./assets/images/roles/zodiac/gunsmith.png'),
        mason: require('./assets/images/roles/zodiac/mason.png'),
        citizen: require('./assets/images/roles/zodiac/citizen.png'),
        zodiac: require('./assets/images/roles/zodiac/zodiac.png'),
    },
    nustradamus: {
        godfather: require('./assets/images/roles/nustradamus/godfather.png'),
        saul_goodman: require('./assets/images/roles/nustradamus/saul_goodman.png'),
        matador: require('./assets/images/roles/nustradamus/matador.png'),
        nostradamus: require('./assets/images/roles/nustradamus/nostradamus.png'),
        dr_watson: require('./assets/images/roles/nustradamus/dr_watson.png'),
        leon: require('./assets/images/roles/nustradamus/leon.png'),
        citizen_kane: require('./assets/images/roles/nustradamus/citizen_kane.png'),
        constantine: require('./assets/images/roles/nustradamus/constantine.png'),
        citizen: require('./assets/images/roles/nustradamus/citizen.png'),
    },
    jack: {
        godfather: require('./assets/images/roles/jack/godfather.png'),
        matador: require('./assets/images/roles/jack/matador.png'),
        dr_watson: require('./assets/images/roles/jack/dr_watson.png'),
        leon: require('./assets/images/roles/jack/leon.png'),
        citizen: require('./assets/images/roles/jack/citizen.png'),
        citizen_kane: require('./assets/images/roles/jack/citizen_kane.png'),
        constantine: require('./assets/images/roles/jack/constantine.png'),
        jack_sparrow: require('./assets/images/roles/jack/jack_sparrow.png'),
    },
    elclasico: {
        pablo_escobar: require('./assets/images/roles/elclasico/pablo_escobar.png'),
        juan: require('./assets/images/roles/elclasico/juan.png'),
        blanco: require('./assets/images/roles/elclasico/blanco.png'),
        churchill: require('./assets/images/roles/elclasico/churchill.png'),
        dr_bridget: require('./assets/images/roles/elclasico/dr_bridget.png'),
        moreno: require('./assets/images/roles/elclasico/moreno.png'),
        bonaparte: require('./assets/images/roles/elclasico/bonaparte.png'),
        martinez: require('./assets/images/roles/elclasico/martinez.png'),
        chaplin: require('./assets/images/roles/elclasico/chaplin.png'),
        citizen: require('./assets/images/roles/elclasico/citizen.png'),
    },
} as const;

export type ScenarioKey = keyof typeof roleIcons;
export type RoleKey<S extends ScenarioKey> = keyof typeof roleIcons[S];

export function getRoleIcon<S extends ScenarioKey>(scenario: S, role: RoleKey<S>) {
    return roleIcons[scenario][role];
}
