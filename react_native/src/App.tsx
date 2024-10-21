import React from 'react'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import RootNavigation from './navigation'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import theme from './theme.json'
import { CurrentUserContext } from './context'
import { useAuthentication } from './utils/hooks/useAuthentication'
import { registerRootComponent } from 'expo'

function App (): React.JSX.Element {
  const { user, setUser } = useAuthentication()
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <CurrentUserContext.Provider value={{ user, setUser }}>
          <SafeAreaProvider>
            <RootNavigation />
          </SafeAreaProvider>
        </CurrentUserContext.Provider>
      </ApplicationProvider>
    </>
  )
}

registerRootComponent(App)
