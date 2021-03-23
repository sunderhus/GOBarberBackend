import { RedisOptions } from 'ioredis';

interface IChacheConfig {
  driver: string;
  config: {
    redis: RedisOptions;
  };
}

export default {
  driver: 'redis',
  config: {
    redis: {
      host: '192.168.99.102',
      port: 6379,
      password: undefined,
    },
  },
} as IChacheConfig;
