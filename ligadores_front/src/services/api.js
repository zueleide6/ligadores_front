// Em algum lugar do seu código (pode ser um arquivo separado como api.js)
import axios from "axios";

const useAxios = () => {

  const instance = axios.create({
    baseURL: "https://verbose-space-eureka-7r47wj957hp56x-3000.app.github.dev/", // Sua URL base do servidor
      
  });

  return instance;
};

export default useAxios;