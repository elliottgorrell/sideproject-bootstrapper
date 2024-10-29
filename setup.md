# Using my boilerplate app setup

1. Create a new gmail account for app and save credentials
2. Create chrome profile with new account
3. Create dashlane account (password manager) using this email and link to family plan
4. Create a gcloud account with new gmail
5. `gcloud auth application-default login` This will take you to chrome to login and generates a service key for terraform to use
6. Create an app in the Meta Developer portal for fb sso. For purpose of app choose "Authenticate and request data from users with Facebook Login".
7. Add config for an ios and android app in your fb app and MAKE SURE BUNDLE ID IS CORRECT otherwise fb login page will complain about an invalid redirect when trying to do the oauth flow.
8. Grab the fb client token and app id and add them to `mobile/.env`. The client secret can be found in advanced settings
9. Signup for an expo account linked to the app email and create a new project in the web portal. You will then get a popup with the project id.
10. Add the expo project id into the `mobile/.env`
11. Fill in `infra/vars.tfvars.json`.
12. Create a `infra/.env` with the template

    ``` .env
    billing_account=<google cloud billing account id>
    project_id=<make up something unique (no idea why this isn't auto generated)>
    fb_app_id=<fb app id>
    fb_app_secret=<This can be found in the basic settings of your fb app in meta dev portal>
    ```

13. Bootstrap a gcloud project with firebase setup including auth (email and social signin), a firestore db and a storage bucket. `cd infra && terraform init && terraform apply -var-file="vars.tfvars.json"`
14. Manual steps are required to finish oauth setup for FB and Google
    - Google: Go to firebase console > Authentication > Sign-in Method and enable the google sign in provider
    - FB: Go to firebase console > Authentication > Sign-in Method and grab the oauth url for FB. Then go to the meta developer portal and add this url to the allowlist for oauth urls (should be in setting for login usecase)
15. Grab the config files for ios and android to setup the firebase react native sdk. The GoogleService-Info.plist and google-services.json files can be downloaded from the [firebase console](https://console.firebase.google.com). They will go inside the root of the `mobile` folder
16. `cd mobile && npm i && npm run clean && npm run ios`
