export interface User {
  uid: string
  onboardingStage: OnboardingStage
  displayName: string
  profilePictureUrl: string
}

export const LoggedOutUser: User = {
  uid: '0',
  onboardingStage: 0,
  displayName: '',
  profilePictureUrl: ''
}

export enum OnboardingStage {
  Welcome = 0,
  Finished = 100,
}
