import {observable, action, makeAutoObservable} from 'mobx';
import {translate} from '../i18n';

class RoleStore {
  @observable nustraRoles = [
    {
      id: 0,
      title: translate('game.rolecards.godfather'),
      image: require('../assets/images/roles/nustraType/godfather.jpeg'),
      active: true,
      shield: true,
      side: 'mafia',
      duty: {
        sixthSense: true,
      },
      description: translate('game.rolecards.nustraTypeDesc.godfatherDesc'),
    },
    {
      id: 1,
      title: translate('game.rolecards.saul'),
      active: true,
      shield: false,
      side: 'mafia',
      duty: {
        buyCitizen: true,
      },
      image: require('../assets/images/roles/nustraType/SaulGoodman.jpeg'),
      description: translate('game.rolecards.nustraTypeDesc.saulDesc'),
    },
    {
      id: 2,
      title: translate('game.rolecards.matador'),
      active: true,
      shield: false,
      side: 'mafia',
      duty: {
        getAbility: true,
      },
      image: require('../assets/images/roles/nustraType/Matador.jpeg'),
      description: translate('game.rolecards.nustraTypeDesc.matadorDesc'),
    },
    {
      id: 3,
      title: translate('game.rolecards.nustradamus'),
      active: true,
      shield: true,
      side: 'free',
      duty: {
        guess: true,
      },
      image: require('../assets/images/roles/nustraType/Nostradamoos.jpeg'),
      description: translate('game.rolecards.nustraTypeDesc.nustraDesc'),
    },
    {
      id: 4,
      title: translate('game.rolecards.doctor'),
      active: true,
      shield: false,
      side: 'city',
      duty: {
        saveOwn: 1,
        savePeople: true,
      },
      image: require('../assets/images/roles/nustraType/DrWatson.jpeg'),
      description: translate('game.rolecards.nustraTypeDesc.doctorDesc'),
    },
    {
      id: 5,
      title: translate('game.rolecards.leon'),
      active: true,
      side: 'city',
      shield: true,
      duty: {
        nightShot: 2,
      },
      image: require('../assets/images/roles/nustraType/Leon.jpeg'),
      description: translate('game.rolecards.nustraTypeDesc.leonDesc'),
    },
    {
      id: 6,
      title: translate('game.rolecards.ckane'),
      side: 'city',
      active: true,
      shield: false,
      duty: {
        inquiry: true,
      },
      image: require('../assets/images/roles/nustraType/Kin.jpeg'),
      description: translate('game.rolecards.nustraTypeDesc.ckaneDesc'),
    },
    {
      id: 7,
      title: translate('game.rolecards.constantine'),
      active: true,
      side: 'city',
      shield: false,
      duty: {
        returns: true,
      },
      image: require('../assets/images/roles/nustraType/Constantine.jpeg'),
      description: translate('game.rolecards.nustraTypeDesc.constantineDesc'),
    },
    {
      id: 8,
      title: translate('game.rolecards.citizen'),
      active: true,
      side: 'city',
      shield: false,
      image: require('../assets/images/roles/nustraType/City.jpeg'),
      description: translate('game.rolecards.nustraTypeDesc.citizenDesk'),
    },
  ];
  @observable jackRoles = [
    {
      id: 0,
      title: translate('game.rolecards.godfather'),
      image: require('../assets/images/roles/jackType/JGodfather.webp'),
      active: true,
      shield: true,
      side: 'mafia',
      duty: {
        sixthSense: true,
      },
      description: translate('game.rolecards.jackTypeDesc.godfatherDesc')
    },
    {
      id: 1,
      title: translate('game.rolecards.saul'),
      active: true,
      shield: false,
      side: 'mafia',
      duty: {
        buyCitizen: true,
      },
      image: require('../assets/images/roles/jackType/JGoodman.webp'),
      description:translate('game.rolecards.jackTypeDesc.saulDesc')
    },
    {
      id: 2,
      title: translate('game.rolecards.matador'),
      active: true,
      shield: false,
      side: 'mafia',
      duty: {
        getAbility: true,
      },
      image: require('../assets/images/roles/jackType/JMatador.webp'),
      description:translate('game.rolecards.jackTypeDesc.matadorDesc')
    },
    {
      id: 3,
      title: translate('game.rolecards.jack'),
      active: true,
      shield: true,
      side: 'free',
      duty: {
        guess: true,
      },
      image: require('../assets/images/roles/jackType/Jack.webp'),
      description:translate('game.rolecards.jackTypeDesc.jackDesc')
    },
    {
      id: 4,
      title: translate('game.rolecards.doctor'),
      active: true,
      shield: false,
      side: 'city',
      duty: {
        saveOwn: 1,
        savePeople: true,
      },
      image: require('../assets/images/roles/jackType/JWatson.webp'),
      description: translate('game.rolecards.jackTypeDesc.doctorDesc')
    },
    {
      id: 5,
      title: translate('game.rolecards.leon'),
      active: true,
      side: 'city',
      shield: true,
      duty: {
        nightShot: 2,
      },
      image: require('../assets/images/roles/jackType/JLeon.webp'),
      description: translate('game.rolecards.jackTypeDesc.leonDesc')
    },
    {
      id: 6,
      title: translate('game.rolecards.ckane'),
      side: 'city',
      active: true,
      shield: false,
      duty: {
        inquiry: true,
      },
      image: require('../assets/images/roles/jackType/JKane.webp'),
      description: translate('game.rolecards.jackTypeDesc.ckaneDesc')
    },
    {
      id: 7,
      title: translate('game.rolecards.constantine'),
      active: true,
      side: 'city',
      shield: false,
      duty: {
        returns: true,
      },
      image: require('../assets/images/roles/jackType/JConstantine.webp'),
      description: translate('game.rolecards.jackTypeDesc.constantineDesc')
    },
    {
      id: 8,
      title: translate('game.rolecards.citizen'),
      active: true,
      side: 'city',
      shield: false,
      image: require('../assets/images/roles/jackType/JCity.webp'),
      description: translate('game.rolecards.jackTypeDesc.citizenDesk')
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  @action getJackRoles() {
    return this.jackRoles;
  }
  @action getNustraRoles() {
    return this.nustraRoles;
  }
}
export default new RoleStore();
