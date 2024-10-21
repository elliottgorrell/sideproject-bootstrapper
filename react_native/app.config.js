import * as dotenv from 'dotenv'
dotenv.config()

module.exports = ({ config }) => {
  const secrets = {
    fbAppId: process.env.FB_APP_ID,
    fbClientToken: process.env.FB_CLIENT_TOKEN,
    easProjectId: process.env.EAS_PROJECT_ID
  }

  console.log(`secrets are: ${JSON.stringify(secrets)}`)

  return {
    expo: {
      name: config.name,
      slug: config.name,
      version: config.version,
      orientation: 'portrait',
      icon: './src/assets/icon.png',
      userInterfaceStyle: 'light',
      splash: {
        image: './src/assets/splash.png',
        resizeMode: 'contain',
        backgroundColor: '#ffffff'
      },
      assetBundlePatterns: [
        '**/*'
      ],
      ios: {
        supportsTablet: true,
        bundleIdentifier: config.bundleIdentifier,
        googleServicesFile: './GoogleService-Info.plist'
      },
      android: {
        package: config.bundleIdentifier,
        googleServicesFile: './google-services.json'
      },
      plugins: [
        '@react-native-firebase/app',
        '@react-native-firebase/auth',
        ['expo-build-properties', { ios: { useFrameworks: 'static' } }],
        ['@react-native-google-signin/google-signin'],
        [
          'react-native-fbsdk-next',
          {
            appID: secrets.fbAppId,
            clientToken: secrets.fbClientToken,
            displayName: config.name,
            scheme: `fb${config.fbAppId}`
          }
        ]
      ],
      extra: {
        environment: 'local',
        eas: {
          projectId: secrets.easProjectId
        }
      }
    }
  }
}
