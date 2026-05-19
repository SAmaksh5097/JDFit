import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton
} from "@clerk/clerk-react";

const UserProfile = () => {
  return (
    <nav className="flex items-center gap-1.5 sm:gap-2 md:gap-3">

      <SignedOut>
        <SignInButton mode="modal">
          <button className="hidden sm:block rounded-lg border-2 border-blue-600 text-blue-400 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-300 hover:bg-blue-600/10 hover:text-blue-300">
            Sign In
          </button>
        </SignInButton>

        <SignUpButton mode="modal">
          <button className="rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 px-3 sm:px-4 md:px-5 lg:px-6 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 active:scale-95">
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