type Options = "userNoPass";

function defaultSettings(setting: Options) {
  const settings = {
    userNoPass: {
      id: true,
      name: true,
      nick: true,
      email: true,
      pass: false,
      created_at: true,
      updated_at: true,
    },
  };
  return settings[setting];
}

export default defaultSettings;
