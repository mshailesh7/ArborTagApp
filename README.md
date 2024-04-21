DetectedTagScreen
Functionality: After the user selects a tree species and captures or enters the necessary geographical data (latitude, longitude, height, and width), they can save this data.
User Interaction: On clicking the "Save" button, the user is alerted that the data has been saved successfully. The alert provides two options:
"Continue": Redirects the user to the LocationInputScreen for further data entry.
"Stop": Navigates the user back to the MenuScreen, effectively ending the current session of data input.

LoginScreen
Functionality: Users can log in using their credentials. If the user forgets their password, they can recover it through a series of steps.
User Interaction: A "Forgot Password?" option is available. When clicked, it navigates the user to the ForgotPasswordScreen.
On the ForgotPasswordScreen, users are prompted to enter their email address to receive a 4-digit OTP. After the OTP is verified, the user is redirected to the ResetPasswordScreen where they can set a new password.

SignupScreen
Functionality: Allows new users to create an account by entering required details and agreeing to the terms and conditions.
User Interaction: Upon entering details and clicking "Signup," a 4-digit OTP is sent to the user's email. Users must enter the OTP to verify their account.
Once verified, the user is redirected to the HomeScreen to log in and begin using the app.

ForgotPasswordScreen (Addition Required)
Description: Allows users to initiate a password reset by entering their registered email to receive an OTP.
Details: Input for email address. Sends a 4-digit OTP to the provided email.
Navigation to ResetPasswordScreen upon OTP verification.

ResetPasswordScreen (Addition Required)
Description: Allows users to set a new password after verifying their identity via OTP on the ForgotPasswordScreen.
Details: Inputs for new password and confirmation of the new password.
Verifies that the passwords match before allowing the reset.
On successful reset, potentially navigates the user back to the login screen.

AppNavigator (Addition Required)
Description: Manages the navigation and routing for the app, connecting all screens and managing user flow.
Details: Defines routes and navigation logic for transitioning between LoginScreen, SignupScreen, ForgotPasswordScreen, ResetPasswordScreen, DetectedTagScreen, MenuScreen, and LocationInputScreen.

