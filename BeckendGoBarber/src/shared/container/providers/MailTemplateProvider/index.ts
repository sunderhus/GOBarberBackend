import { container } from 'tsyringe';
import HandleBarsMailTemplateProvider from './implementations/HandleBarsMailTemplateProvider';
import IMailTemplateProvider from './models/IMailTemplateProvider';

const providers = {
  handlebars: container.resolve(HandleBarsMailTemplateProvider),
};

container.registerInstance<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars
);
