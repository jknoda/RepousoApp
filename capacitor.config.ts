import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.jknsoftware.repouso',
  appName: 'Repouso',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
