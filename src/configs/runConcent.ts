import { run } from 'concent';
import reduxDevToolPlugin from 'concent-plugin-redux-devtool';
import * as msgService from 'services/message';
import * as commonUtil from 'utils/common';
import models from '../models';

const plugins = [];
if (commonUtil.isLocalMode()) {
  plugins.push(reduxDevToolPlugin);
}

// load all models by concent.run api
run(models, {
  errorHandler: (err) => {
    msgService.error(err.message);
  },
  plugins,
  alwaysRenderCaller: true,
  isStrict: true,
});
