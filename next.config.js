module.exports = {
  // for netlify
  target: "serverless",
  images: {
    domains: ["dummyimage.com", "firebasestorage.googleapis.com"],
  },
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.resolve.fallback.fs = false;
  //     config.resolve.fallback.child_process = false;
  //     config.resolve.fallback.net = false;
  //     config.resolve.fallback.tls = false;
  //   }
  //   return config;
  // },
};
