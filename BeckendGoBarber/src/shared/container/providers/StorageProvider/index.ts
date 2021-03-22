import { container } from 'tsyringe';
import DiskStorageProvider from '@shared/container/providers/StorageProvider/implementations/DiskStorageProvider';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

const providers = {
  disk: container.resolve(DiskStorageProvider),
};

container.registerInstance<IStorageProvider>('StorageProvider', providers.disk);
