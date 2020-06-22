import { container } from 'tsyringe';
import IStorageProvider from '@shared/Providers/StorageProvider/models/IStorageProvider';
import DiskStorageProvider from '@shared/Providers/StorageProvider/implementarions/DiskStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider
);
