import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton
} from "@clerk/clerk-react";

const UserProfile = () => {
  return (
    <nav className="flex items-center gap-2 sm:gap-3">

      <SignedOut>
        <SignInButton mode="modal">
          <button className="hidden sm:block rounded-lg border-2 border-blue-600 text-blue-400 px-5 py-2 text-sm font-medium transition-all duration-300 hover:bg-blue-600/10 hover:text-blue-300">
            Sign In
          </button>
        </SignInButton>

        <SignUpButton mode="modal">
          <button className="rounded-lg bg-blue-600 px-5 sm:px-6 py-2 text-sm sm:text-base font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50 active:scale-95">
            Sign Up
          </button>
        </SignUpButton>
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>

    </nav>
  );
};

export default UserProfile;