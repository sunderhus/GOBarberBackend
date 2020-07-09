import { container } from 'tsyringe';
import DiskStorageProvider from '@shared/providers/StorageProvider/implementations/DiskStorageProvider';
import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider';
import IMailProvider from '@shared/providers/MailProvider/models/IMailProvider';
import EtherialMailProvider from '@shared/providers/MailProvider/implementations/EtherialMailProvider';

import IMailTemplateProvider from '@shared/providers/MailTemplateProvider/models/IMailTemplateProvider';
import HandleBarsMailTemplateProvider from '@shared/providers/MailTemplateProvider/implementations/HandleBarsMailTemplateProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider
);
container.registerSingleton<IMailTemplateProvider>(
  'TemplateMailProvider',
  HandleBarsMailTemplateProvider
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherialMailProvider)
);
