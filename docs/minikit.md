MiniKit
MiniKit
MiniKit is easiest way to build Mini Apps on Base, allowing developers to easily build applications without needing to know the details of the SDK implementation. It integrates seamlessly with OnchainKit components and provides Coinbase Wallet-specific hooks.

Why MiniKit?
MiniKit streamlines mini-app development by providing a comprehensive toolkit that makes complex Frames SDK interactions intuitive:

Simplified Development: Build apps with minimal knowledge of the Frames SDK
Coinbase Wallet Integration: Access Coinbase Wallet-specific hooks
Component Compatibility: Use OnchainKit components out of the box with MiniKit
Automatic Setup: CLI tool for quick project scaffolding with webhooks and notifications
Account Association: Simplified generation of account associations
Use Cases
Gaming mini apps
Social mini apps
Payment mini apps
And many more possibilities!
Quick Start
The fastest way to get started with MiniKit is to use the CLI to bootstrap a new project:

npx create-onchain --mini
You can also follow our Quick Start guide here

This command will:

Set up a new project with both frontend and backend components
Configure webhooks and notifications
Set up account association generation
Create a demo app showcasing onchain abilities using OnchainKit
After running the command, follow the prompts to configure your project.

We recommend using Vercel to deploy your MiniKit app, as it integrates seamlessly with the upstash/redis backend required for frames, webhooks, and notifications. The CLI will guide you through setting up the necessary environment variables for your Redis database.

Provider
The MiniKitProvider wraps your application and provides global access to the SDK's context. It handles initialization, events, and automatically applies client safeAreaInsets to ensure your app doesn't overlap parent application elements.

import { MiniKitProvider } from '@coinbase/onchainkit/minikit';

function App({ children }) {
return (
<MiniKitProvider
      projectId="your-project-id"
      notificationProxyUrl="/api/notification"
    >
{children}
</MiniKitProvider>
);
}
Props
The MiniKitProvider accepts the following props:

export type MiniKitProviderReact = {
children: React.ReactNode;
notificationProxyUrl?: string;
...OnchainKitProviderProps
};
children: React components to be wrapped by the provider
notificationProxyUrl: Optional URL to override the default /api/notification proxy
All props from OnchainKitProvider are also supported
The provider sets up wagmi and react-query providers automatically. It configures connectors to use the Farcaster connector if sdk.context is set, with a fallback to CoinbaseWallet. This allows the same application to run both in frames and as a standalone application.

Hooks
MiniKit provides several utility hooks that wrap the SDK functionality, making it easy to access different features.

useMiniKit
This hook handles initialization of the application and provides access to the SDK context.

const { setFrameReady, isFrameReady, context, updateClientContext, notificationProxyUrl } = useMiniKit();

// Call setFrameReady() when your app is ready to be shown
useEffect(() => {
if (!isFrameReady) {
setFrameReady();
}
}, [isFrameReady, setFrameReady]);
Returns:

{
ready: () => Promise<MiniKitContextType>; // Removes splash screen and shows the application
isReady: boolean; // Whether the app is ready to be shown
context: FrameContext | null; // The current frame context
updateClientContext: (params: UpdateClientContextParams) => void; // Update client context
notificationProxyUrl: string; // The notification proxy URL
}
useAddFrame
This hook adds a frame to the user's list of frames and returns notification details.

const addFrame = useAddFrame();

// Usage
const handleAddFrame = async () => {
const result = await addFrame();
if (result) {
console.log('Frame added:', result.url, result.token);
}
};
Returns:

() => Promise<{
url: string;
token: string;
} | null>
useNotification
This hook allows sending notifications to users who have added your frame. It requires a token and URL, which are returned when a user adds your frame.

const sendNotification = useNotification();

// Usage
const handleSendNotification = () => {
sendNotification({
title: 'New High Score!',
body: 'Congratulations on your new high score!'
});
};
Notifications require a backend proxy to avoid CORS restrictions. The CLI automatically sets up this proxy at /api/notification, but you can override this in the MiniKitProvider.

useOpenUrl
This hook wraps sdk.actions.openUrl and falls back to window.open when outside a frame context.

const openUrl = useOpenUrl();

// Usage
<button onClick={() => openUrl('https://example.com')}>Visit Website</button>
useClose
This hook wraps the sdk.actions.close functionality.

const close = useClose();

// Usage
<button onClick={close}>Close</button>
usePrimaryButton
This hook accepts primary button options and a callback which will be called on click.

usePrimaryButton(
{ text: 'Submit Score' },
() => {
// Handle button click
submitScore();
}
);
useViewProfile
This hook wraps sdk.actions.viewProfile, accepting an FID but falling back to the client's FID.

const viewMyProfile = useViewProfile(); // Uses client's FID
const viewUserProfile = useViewProfile(123456); // Uses specified FID

// Usage
<button onClick={viewMyProfile}>View My Profile</button>
<button onClick={viewUserProfile}>View User Profile</button>
useAuthenticate
This hook allows users to sign in with Farcaster. It wraps the SDK's signIn message, adding a default nonce and verification.

const { signIn } = useAuthenticate();

// Usage
const handleSignIn = async () => {
const result = await signIn({
domain: 'your-domain.com',
siweUri: 'https://your-domain.com/login'
});

if (result) {
// Handle successful authentication
console.log('Authenticated:', result);
}
};
Authentication requires additional setup utilizing an auth framework like next/auth or manually integrating session storage and route/component authentication.

CLI
The MiniKit CLI is the easiest way to get started. It automatically creates a sample application that integrates different parts of the SDK and some OnchainKit components.

npx create-onchain --mini
Features
The CLI creates an application with:

Frontend and Backend Integration
Complete setup for adding frames, webhooks, and notifications
Uses upstash/redis for data storage (compatible with Vercel)
Requires users to sign up for an upstash/redis account and add their key and URL to the .env file
The CLI creates both frontend and backend components to support adding frames, webhooks, and notifications. While a frontend-only option was considered, the ability to add frames and handle notifications requires backend support. If you don't need these features, you can easily remove the database and related routes after project creation.

Account Association Generation
Automatically generates valid account associations
Configures the necessary environment variables
.well-known/farcaster.json Configuration
Sets up the required configuration file:

{
"accountAssociation": {
"header": "eyJmaWQiOjgxODAyNiwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDU4YjU1MTNjMzk5OTYzMjU0MjMzMmU0ZTJlRDAyOThFQzFmRjE4MzEifQ",
"payload": "eyJkb21haW4iOiI4MGI2LTI2MDAtMWYxOC0yNGM5LTYxMDUtNS0wLTQtNzA2Lm5ncm9rLWZyZWUuYXBwIn0",
"signature": "MHhmOGQ1YzQyMmU3ZTZlMWNhMzU1ZmNmN2ZjYzFmYjMyZWRhZmEyNWU1NjJiMzlhYzE4OWNlMmM5ODU3Y2JjZWViNzlkZTk2ZjhiNTc5NzZjMDM2NzM4Y2UwYjhhOGQxZmMyZDFhYzA2NTdiZTU5N2VhZjFhZDE1ODBmMGQyYjJhODFi"
},
"frame": {
"version": "next",
"name": "MiniKit",
"iconUrl": "https://onchainkit.xyz/favicon/48x48.png?v4-19-24",
"splashImageUrl": "https://onchainkit.xyz/favicon/48x48.png?v4-19-24",
"splashBackgroundColor": "#000000",
"homeUrl": "https://your-domain.app/minikit"
}
}
Notification Proxy
Automatically sets up a proxy route at /api/notification
Used by the useNotification hook when sending notifications
Webhooks
Implements webhooks using the Farcaster key registry contract for verification
Allows applications to respond to events such as FRAME_ADDED
Demo Application
The CLI also creates a demo snake game application that showcases:

Buttons to add the frame and connect your wallet
High score tracking with attestations using OnchainKit's <Transaction/> component
Score display using OnchainKit's <Identity/> components to resolve ENS names
Notifications for high scores (rate limited to one every 30 seconds)
Next Steps
Now that you have MiniKit set up, you can:

Explore the demo application to understand how the hooks work
Customize the application to fit your needs
Deploy your application to a hosting provider like Vercel
Enjoy building!
