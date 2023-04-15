import initStore from '../stores';

const store = initStore();

const useStore = () => store;

export { useStore };