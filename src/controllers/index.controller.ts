// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.
import { Handler } from "../types";

const pkg = require("../../package.json");

export const welcomeMessage: Handler = (req, res) => {
  return res.status(200).json({
    name: pkg.name,
    version: pkg.version,
    homepage: pkg.homepage
  });
};
