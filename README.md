# MockInterview - AI-Powered Job Interview Preparation Platform

MockInterview is an innovative platform designed to help candidates prepare for job interviews by conducting mock interviews with AI. 

---

## Tech Stack

- **Next.js**: For building the user interface and backend logic.
- **Firebase**: For authentication and data storage.
- **Tailwind CSS**: For styling and responsive design.
- **Vapi AI**: For voice agents and AI-driven interviews.
- **shadcn/ui**: For reusable UI components.
- **Google Gemini**: For advanced AI capabilities.
- **Zod**: For schema validation.

---

## 🔋 Features

- **Authentication**: Sign Up and Sign In using password/email authentication handled by Firebase.
- **Create Interviews**: Easily generate job interviews with the help of Vapi voice assistants and Google Gemini.
- **Get Feedback from AI**: Take the interview with an AI voice agent and receive instant feedback based on your conversation.
- **Modern UI/UX**: A sleek and user-friendly interface designed for a great experience.
- **Interview Page**: Conduct AI-driven interviews with real-time feedback and detailed transcripts.
- **Dashboard**: Manage and track all your interviews with easy navigation.
- **Responsiveness**: Fully responsive design that works seamlessly across devices.
- **Code Architecture**: Designed for reusability and scalability.

---

## Quick Start

Follow these steps to set up the project locally on your machine.

### Prerequisites

Make sure you have the following installed on your machine:

- **Git**
- **Node.js**
- **npm** (Node Package Manager)

### Cloning the Repository

```bash
git clone https://github.com/ngnamquoc/mock-interview-app.git
cd mock-interview-app
```

### Installation

Install the project dependencies using npm:

```bash
npm install
```

### Set Up Environment Variables

Create a new file named `.env.local` in the root of your project and add the following content:

```env
NEXT_PUBLIC_VAPI_WEB_TOKEN=
NEXT_PUBLIC_VAPI_WORKFLOW_ID=

GOOGLE_GENERATIVE_AI_API_KEY=

NEXT_PUBLIC_BASE_URL=

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
```

Replace the placeholder values with your actual Firebase and Vapi credentials.

### Running the Project

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

---

## 📚 Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vapi AI Documentation](https://vapi.ai/docs)
- [Google Gemini](https://ai.google/tools/gemini/)
- [Zod Documentation](https://zod.dev/)

---

## 🚀 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new). Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## 📄 License

This project is licensed under the MIT License.