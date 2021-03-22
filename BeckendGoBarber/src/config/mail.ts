interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'matheus.sunderhus@gmail.com',
      name: 'Matheus Sunderhus',
    },
  },
} as IMailConfig;
