import { useRoute, useRouter } from 'vue-router';

const useNavigation = () => {
  const router = useRouter();
  const route = useRoute();

  const navigateTo = (routeName, params = {}, query = {}) => {
    router.push({ name: routeName, params, query });
  };

  return { navigateTo, currentRoute: route };
};

export { useNavigation };