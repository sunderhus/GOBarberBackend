import { container } from 'tsyringe';
import DiskStorageProvider from '@shared/container/providers/StorageProvider/implementations/DiskStorageProvider';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import EtherialMailProvider from '@shared/container/providers/MailProvider/implementations/EtherialMailProvider';

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import HandleBarsMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/implementations/HandleBarsMailTemplateProvider';

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
