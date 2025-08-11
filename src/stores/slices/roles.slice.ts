import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {t} from 'i18next';

// Define the structure of duty
interface Duty {
  sixthSense?: boolean;
  buyCitizen?: boolean;
  getAbility?: boolean;
  guess?: boolean;
  saveOwn?: number;
  savePeople?: boolean;
  nightShot?: number;
  inquiry?: boolean;
  returns?: boolean;
}

// Define the structure of a Role
interface Role {
  id: number;
  title: string;
  active: boolean;
  shield: boolean;
  side: 'city' | 'mafia' | 'free';
  image: any; // You can replace this with a specific type for images if applicable
  description: string;
  duty?: Duty;
}

// Define the initial state type
interface RolesState {
  customRoles: Role[];
  nustraRoles: Role[];
  jackRoles: Role[];
  zodiacRoles: Role[];
}

// Initial state
const initialState: RolesState = {
  customRoles: [
    {
      id: 0,
      title: 'game.citizen',
      active: true,
      shield: false,
      side: 'city',
      image: require('../../assets/images/citizenrole.png'),
      description: 'game.rolecards.customRoles.citizenDesk',
    },
    {
      id: 1,
      title: 'game.mafia',
      active: true,
      shield: false,
      side: 'mafia',
      image: require('../../assets/images/mafiarole.png'),
      description: 'game.rolecards.customRoles.mafiaDesc',
    },
  ],
  nustraRoles: [
    {
      id: 0,
      title: 'game.godfather',
      image: require('../../assets/images/roles/nustraType/godfather.jpeg'),
      active: true,
      shield: true,
      side: 'mafia',
      duty: {
        sixthSense: true,
      },
      description: 'game.rolecards.nustraTypeDesc.godfatherDesc',
    },
    {
      id: 1,
      title: 'game.saul',
      active: true,
      shield: false,
      side: 'mafia',
      duty: {
        buyCitizen: true,
      },
      image: require('../../assets/images/roles/nustraType/SaulGoodman.jpeg'),
      description: 'game.rolecards.nustraTypeDesc.saulDesc',
    },
    {
      id: 2,
      title: 'game.matador',
      active: true,
      shield: false,
      side: 'mafia',
      duty: {
        getAbility: true,
      },
      image: require('../../assets/images/roles/nustraType/Matador.jpeg'),
      description: 'game.rolecards.nustraTypeDesc.matadorDesc',
    },
    {
      id: 3,
      title: 'game.nustradamus',
      active: true,
      shield: true,
      side: 'free',
      duty: {
        guess: true,
      },
      image: require('../../assets/images/roles/nustraType/Nostradamoos.jpeg'),
      description: 'game.rolecards.nustraTypeDesc.nustraDesc',
    },
    {
      id: 4,
      title: 'game.doctor',
      active: true,
      shield: false,
      side: 'city',
      duty: {
        saveOwn: 1,
        savePeople: true,
      },
      image: require('../../assets/images/roles/nustraType/DrWatson.jpeg'),
      description: 'game.rolecards.nustraTypeDesc.doctorDesc',
    },
    {
      id: 5,
      title: 'game.leon',
      active: true,
      side: 'city',
      shield: true,
      duty: {
        nightShot: 2,
      },
      image: require('../../assets/images/roles/nustraType/Leon.jpeg'),
      description: 'game.rolecards.nustraTypeDesc.leonDesc',
    },
    {
      id: 6,
      title: 'game.ckane',
      side: 'city',
      active: true,
      shield: false,
      duty: {
        inquiry: true,
      },
      image: require('../../assets/images/roles/nustraType/Kin.jpeg'),
      description: 'game.rolecards.nustraTypeDesc.ckaneDesc',
    },
    {
      id: 7,
      title: 'game.constantine',
      active: true,
      side: 'city',
      shield: false,
      duty: {
        returns: true,
      },
      image: require('../../assets/images/roles/nustraType/Constantine.jpeg'),
      description: 'game.rolecards.nustraTypeDesc.constantineDesc',
    },
    {
      id: 8,
      title: 'game.citizen',
      active: true,
      side: 'city',
      shield: false,
      image: require('../../assets/images/roles/nustraType/City.jpeg'),
      description: 'game.rolecards.nustraTypeDesc.citizenDesk',
    },
  ],
  jackRoles: [
    {
      id: 0,
      title: 'game.godfather',
      image: require('../../assets/images/roles/jackType/JGodfather.webp'),
      active: true,
      shield: true,
      side: 'mafia',
      duty: {
        sixthSense: true,
      },
      description: 'game.rolecards.jackTypeDesc.godfatherDesc',
    },
    {
      id: 1,
      title: 'game.saul',
      active: true,
      shield: false,
      side: 'mafia',
      duty: {
        buyCitizen: true,
      },
      image: require('../../assets/images/roles/jackType/JGoodman.webp'),
      description: 'game.rolecards.jackTypeDesc.saulDesc',
    },
    {
      id: 2,
      title: 'game.matador',
      active: true,
      shield: false,
      side: 'mafia',
      duty: {
        getAbility: true,
      },
      image: require('../../assets/images/roles/jackType/JMatador.webp'),
      description: 'game.rolecards.jackTypeDesc.matadorDesc',
    },
    {
      id: 3,
      title: 'game.jack',
      active: true,
      shield: true,
      side: 'free',
      duty: {
        guess: true,
      },
      image: require('../../assets/images/roles/jackType/Jack.webp'),
      description: 'game.rolecards.jackTypeDesc.jackDesc',
    },
    {
      id: 4,
      title: 'game.doctor',
      active: true,
      shield: false,
      side: 'city',
      duty: {
        saveOwn: 1,
        savePeople: true,
      },
      image: require('../../assets/images/roles/jackType/JWatson.webp'),
      description: 'game.rolecards.jackTypeDesc.doctorDesc',
    },
    {
      id: 5,
      title: 'game.leon',
      active: true,
      side: 'city',
      shield: true,
      duty: {
        nightShot: 2,
      },
      image: require('../../assets/images/roles/jackType/JLeon.webp'),
      description: 'game.rolecards.jackTypeDesc.leonDesc',
    },
    {
      id: 6,
      title: 'game.ckane',
      side: 'city',
      active: true,
      shield: false,
      duty: {
        inquiry: true,
      },
      image: require('../../assets/images/roles/jackType/JKane.webp'),
      description: 'game.rolecards.jackTypeDesc.ckaneDesc',
    },
    {
      id: 7,
      title: 'game.constantine',
      active: true,
      side: 'city',
      shield: false,
      duty: {
        returns: true,
      },
      image: require('../../assets/images/roles/jackType/JConstantine.webp'),
      description: 'game.rolecards.jackTypeDesc.constantineDesc',
    },
    {
      id: 8,
      title: 'game.citizen',
      active: true,
      side: 'city',
      shield: false,
      image: require('../../assets/images/roles/jackType/JCity.webp'),
      description: 'game.rolecards.jackTypeDesc.citizenDesk',
    },
  ],
  zodiacRoles: [],
};

// Create the slice
const rolesInfoSlice = createSlice({
  name: 'RolesInfo',
  initialState,
  reducers: {},
});

export const { actions: rolesInfoActions, reducer: RolesInfoReducer } = rolesInfoSlice;

