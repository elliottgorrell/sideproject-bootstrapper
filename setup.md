# Using my boilerplate app setup

1. Create a new gmail account for app and save credentials
2. Create chrome profile with new account
3. Create dashlane account (password manager) using this email and link to family plan
4. Create a gcloud account with new gmail
5. `gcloud auth application-default login` This will take you to chrome to login and generates a service key for terraform to use
6. Create an app in the Meta Developer portal for fb sso. For purpose of app choose "Authenticate and request data from users with Facebook Login".
7. Grab the fb client token and app id and add them to `mobile/.env`. The client secret can be found in advanced settings
8. Signup for an expo account linked to the app email and create a new project in the web portal. You will then get a popup with the project id.
9. Add the expo project id into the `mobile/.env`
10. Fill in `infra/vars.tfvars.json`.
11. Fill in `infra/.env`
    - For project_id you have to make up something unique (no idea why this isn't auto generated)
    - For billing_account this has to be setup in google cloud
12. Bootstrap a gcloud project with firebase setup including auth (email and social signin), a firestore db and a storage bucket. `cd infra && terraform init && terraform apply -var-file="vars.tfvars.json"`
13. Manual steps are required to finish oauth setup for FB and Google
    - Google: Go to firebase console > Authentication > Sign-in Method and enable the google sign in provider
    - FB: Go to firebase console > Authentication > Sign-in Method and grab the oauth url for FB. Then go to the meta developer portal and add this url to the allowlist for oauth urls (should be in setting for login usecase)
14. Grab the config files for ios and android to setup the firebase react native sdk. The GoogleService-Info.plist and google-services.json files can be downloaded from the [firebase console](https://console.firebase.google.com). They will go inside the root of the `mobile` folder
15. `cd mobile && npm i && npm run clean && npm run ios`
