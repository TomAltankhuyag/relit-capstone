import {
  autoSignIn,
  confirmSignUp,
  type ConfirmSignUpInput,
  fetchAuthSession,
  getCurrentUser,
  signIn,
  type SignInOutput,
  signOut,
  signUp,
} from "aws-amplify/auth";
import {openURL} from 'expo-linking'

export async function currentAuthenticatedUser() {
  try {
    const { username, userId, signInDetails } = await getCurrentUser();
    console.log(`The username: ${username}`);
    console.log(`The userId: ${userId}`);
    console.log(`The signInDetails: ${signInDetails?.authFlowType}, ${signInDetails?.loginId}`);
  } catch (err) {
    console.log(err);
  }
}

export async function currentSession() {
  try {
    const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
    console.log(`idToken: ${idToken}`);
    console.log(`accessToken: ${accessToken}`);
  } catch (err) {
    console.log(err);
  }
}

type SignUpParameters = {
  username: string,
  password: string,
  email: string
}

export async function handleSignUp({username, password, email}: SignUpParameters) {
  const { userId, nextStep } = await signUp({
    username,
    password,
    options: {
      userAttributes: {
        email,
      },
      // optional
      autoSignIn: true, // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
    }
  });

  console.log(`userID: ${userId}`);
  console.log(`nextStep: ${nextStep.signUpStep}`);
  return {
    userID: userId,
    nextStep: nextStep.signUpStep
  }
}

export async function handleSignUpConfirmation({username, confirmationCode}: ConfirmSignUpInput) {
  try {
    const { nextStep } = await confirmSignUp({
      username,
      confirmationCode
    });
    console.log(`nextStep: ${nextStep.signUpStep}`)
  } catch (error) {
    console.log('error confirming sign up', error);
  }
}

export async function handleAutoSignIn() {
  try {
    const signInOutput = await autoSignIn();
    // handle sign-in steps

    console.log(`autosignin: ${signInOutput.isSignedIn}, ${signInOutput.nextStep.signInStep}`)
  } catch (error) {
    console.log(error);
  }
}

export async function handleSignIn(username: string, password: string) {
  try {
    const output = await signIn({
      username,
      password
    });

    await handleSignInNextSteps(output);
  } catch (error) {
    console.log(error);
  }
}

export async function handleSignInNextSteps(output: SignInOutput) {
  const { nextStep } = output;
  
  console.log(`handleSignIn nextStep: ${nextStep.signInStep}`)
  switch (nextStep.signInStep) {
    // ...
    case 'CONTINUE_SIGN_IN_WITH_TOTP_SETUP':
      console.log("Setting up TOTP")
      const totpSetupDetails = nextStep.totpSetupDetails;
      const appName = 'relit';
      const setupUri = totpSetupDetails.getSetupUri(appName);
      // Open setupUri with an authenticator app to retrieve an OTP code
      // assumes an authenticator app is already downloaded on mobile
      // if not, there is a bug here

      // there is a react-native library that deals with this issue, when not find app on phone, 
      // opens app store for the app to download
      openURL(setupUri.toString())
      break;
    // ...
    case 'CONFIRM_SIGN_IN_WITH_TOTP_CODE':
      console.log("Asking for TOTP")
      break
  }
}

export async function handleSignOut() {
  try {
    await signOut();
  } catch (error) {
    console.error('error signing out: ', error);
  }
}