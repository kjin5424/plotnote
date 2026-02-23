import { defineStore } from "pinia";
import defaultProfileImg from "@/assets/images/common/default_profile.jpg";

export const useConfigStore = defineStore("config", {
  state: () => ({
    fileServerIp: "http://192.168.0.130",
    apiBaseUrl: "http://localhost:80",
  }),
  getters: {
    getFileUrl: (state) => (logiPath: string, fileName: string) => {
      if (!fileName || fileName.trim() === "" || fileName === "null") {
        return defaultProfileImg;
      }
      return `${state.fileServerIp}/serverfile${logiPath}${fileName}`;
    },
  },
});
