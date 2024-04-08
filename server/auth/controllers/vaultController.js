const vaultController = {};

vaultController.initReq = (req, res, next) => {

  // req.dataVault = req.dataVault || {};
  // req.dataVault.response = req.dataVault.response || {};
  // req.dataVault.accessToken = req.dataVault.accessToken || {};
  // req.dataVault.user = req.dataVault.user || {};
  // req.dataVault.user._id = req.dataVault.user._id || {};
  // req.dataVault.user.username = req.dataVault.user.username || {};
  // req.dataVault.user.password = req.dataVault.user.password || {};
  // req.dataVault.user.roles = req.dataVault.user.roles || [];
  // req.dataVault.user.oauthProviders = req.dataVault.user.oauthProviders || [];

  return next();
};

vaultController.initRes = (req, res, next) => {

  res.dataVault = res.dataVault || {};
  res.dataVault.response = res.dataVault.response || {};
  res.dataVault.accessToken = res.dataVault.accessToken || {};
  res.dataVault.user = res.dataVault.user || {};
  res.dataVault.user._id = res.dataVault.user._id || {};
  res.dataVault.user.username = res.dataVault.user.username || {};
  res.dataVault.user.password = res.dataVault.user.password || {};
  res.dataVault.user.roles = res.dataVault.user.roles || [];
  res.dataVault.user.oauthProviders = res.dataVault.user.oauthProviders || []; 

  return next();
};

export default vaultController;