import { container } from 'tsyringe';
import DiskStorageProvider from '@shared/providers/StorageProvider/implementations/DiskStorageProvider';
import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider';
import IMailProvider from '@shared/providers/MailProvider/models/IMailProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider
);
container.registerSingleton<IMailProvider>('MailProvider', MailTrapProvider);
