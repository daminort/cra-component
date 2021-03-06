const inquirer = require('inquirer');
const fuzzyPath = require('inquirer-fuzzy-path');

const ConfigUtils = require('../utils/ConfigUtils');
const ValidateUtils = require('../utils/ValidateUtils');
const ConfirmUtils = require('../utils/ConfirmUtils');
const {
  ENTITY_LOCATION,
  QUESTION_FIELDS,
  QUESTION_MESSAGES,
  QUESTION_TYPES,
} = require('./constants');
const {
  choicesStart,
  choicesBoolean,
  choicesComponent,
  choicesContainer,
  choicesRedux,
} = require('./choices');

inquirer.registerPrompt('fuzzypath', fuzzyPath);

const fuzzyPathOptions = {
  excludePath : nodePath => nodePath.startsWith('node_modules'),
  rootPath    : 'src',
  itemType    : 'directory',
  suggestOnly : true,
};

// Inner Templates ------------------------------------------------------------
const questionsStart = [
  {
    name    : QUESTION_FIELDS.type,
    type    : QUESTION_TYPES.list,
    message : QUESTION_MESSAGES.start,
    choices : choicesStart,
  },
];

const questionsComponent = [
  {
    name        : QUESTION_FIELDS.templateName,
    type        : QUESTION_TYPES.list,
    message     : QUESTION_MESSAGES.componentStart,
    choices     : choicesComponent
  }, {
    name        : QUESTION_FIELDS.name,
    type        : QUESTION_TYPES.input,
    message     : QUESTION_MESSAGES.componentName,
    validate    : ValidateUtils.validateName,
  }, {
    name        : QUESTION_FIELDS.location,
    type        : QUESTION_TYPES.path,
    message     : QUESTION_MESSAGES.componentLocation,
    default     : ENTITY_LOCATION.component,
    ...fuzzyPathOptions,
  }, {
    name        : QUESTION_FIELDS.correct,
    type        : QUESTION_TYPES.list,
    message     : ConfirmUtils.confirmMessage,
    choices     : choicesBoolean,
  },
];

const questionsContainer = [
  {
    name     : QUESTION_FIELDS.templateName,
    type     : QUESTION_TYPES.list,
    message  : QUESTION_MESSAGES.containerStart,
    choices  : choicesContainer
  }, {
    name     : QUESTION_FIELDS.name,
    type     : QUESTION_TYPES.input,
    message  : QUESTION_MESSAGES.containerName,
    validate : ValidateUtils.validateName,
  }, {
    name     : QUESTION_FIELDS.location,
    type     : QUESTION_TYPES.path,
    message  : QUESTION_MESSAGES.containerLocation,
    default  : ENTITY_LOCATION.container,
    ...fuzzyPathOptions,
  }, {
    name     : QUESTION_FIELDS.correct,
    type     : QUESTION_TYPES.list,
    message  : ConfirmUtils.confirmMessage,
    choices  : choicesBoolean,
  },
];

const questionsReduxSection = [
  {
    name     : QUESTION_FIELDS.templateName,
    type     : QUESTION_TYPES.list,
    message  : QUESTION_MESSAGES.reduxSectionStart,
    choices  : choicesRedux
  }, {
    name     : QUESTION_FIELDS.name,
    type     : QUESTION_TYPES.input,
    message  : QUESTION_MESSAGES.reduxSectionName,
    validate : ValidateUtils.validateName,
  }, {
    name     : QUESTION_FIELDS.location,
    type     : QUESTION_TYPES.path,
    message  : QUESTION_MESSAGES.reduxSectionLocation,
    default  : ENTITY_LOCATION.reduxSection,
    ...fuzzyPathOptions,
  }, {
    name     : QUESTION_FIELDS.correct,
    type     : QUESTION_TYPES.list,
    message  : ConfirmUtils.confirmMessage,
    choices  : choicesBoolean,
  },
];

// User defined templates -----------------------------------------------------
const createUserTemplateChoices = () => {
  if (!ConfigUtils.isUserTemplates) {
    return [];
  }

  return ConfigUtils.userTemplates.map(item => ({
    value : item.type,
    name  : item.description,
  }));
};

const questionsUserTemplates = [
  {
    name     : QUESTION_FIELDS.templateName,
    type     : QUESTION_TYPES.list,
    message  : QUESTION_MESSAGES.userTemplateStart,
    choices  : createUserTemplateChoices(),
  }, {
    name     : QUESTION_FIELDS.name,
    type     : QUESTION_TYPES.input,
    message  : QUESTION_MESSAGES.userTemplateName,
    validate : ValidateUtils.validateName,
  }, {
    name     : QUESTION_FIELDS.location,
    type     : QUESTION_TYPES.path,
    message  : QUESTION_MESSAGES.userTemplateLocation,
    ...fuzzyPathOptions,
  }, {
    name     : QUESTION_FIELDS.correct,
    type     : QUESTION_TYPES.list,
    message  : ConfirmUtils.confirmMessage,
    choices  : choicesBoolean,
  },
];

module.exports = {
  questionsStart,
  questionsComponent,
  questionsContainer,
  questionsReduxSection,
  questionsUserTemplates,
};
