// utils/helpers/settingsHelper.js

export const getEffectiveSetting = ({
  settingKey,
  episode,
  project,
  user,
  defaultSettings,
}) => {
  if (episode?.settings?.[settingKey] != null) {
    return episode.settings[settingKey];
  }
  if (project?.settings?.[settingKey] != null) {
    return project.settings[settingKey];
  }
  if (user?.globalSettings?.[settingKey] != null) {
    return user.globalSettings[settingKey];
  }
  return defaultSettings[settingKey];
};

export const getEffectiveSettings = ({
  episode = null,
  project = null,
  user = null,
  defaultSettings,
}) => {
  const settingKeys = [
    "defaultPageCount",
    "readingDirection",
    "spreadStart",
    "pageView",
  ];

  const result = {};
  settingKeys.forEach((key) => {
    result[key] = getEffectiveSetting({
      settingKey: key,
      episode,
      project,
      user,
      defaultSettings,
    });
  });

  return result;
};
