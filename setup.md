# Using my boilerplate app setup

1. Create a new gmail account for app and save credentials
2. Create chrome profile with new account
3. Create dashlane account (password manager) using this email and link to family plan
4. Create a gcloud account with new gmail
5. From terminal run `gcloud auth login` this will open the browser with new chrome session and loging to new account
6. Create an app in the Meta Developer portal for fb sso. For purpose of app choose "Authenticate and request data from users with Facebook Login".
7. TODO (Meta Developer portal was ratelimiting me so just used tilp creds for now)
8. Fill in `infra/vars.tfvars.json`. Note: For project_id you have to make up something unique (no idea why this isn't auto generated)
9. Bootstrap a gcloud project with firebase setup including auth (email and social signin), a firestore db and a storage bucket. `cd infra && terraform init && terraform apply -var-file="vars.tfvars.json"`
10. Grab the config files for ios and android to setup the firebase react native sdk. You can see the guide [here](https://rnfirebase.io/). It will involved downloading a GoogleService-Info.plist and google-services.json file from the [firebase console](https://console.firebase.google.com) for the iso and android app respectively. They will go inside the `react_native` folder
11. Signup for an expo account linked to the app email and create a new project in the web portal. You will then get a popup with how to init the eas cli with this project
12. Add this in `react_native/app.json`