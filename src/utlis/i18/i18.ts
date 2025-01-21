import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      Movies: "Movies",
      TVShows: "TV Shows",
      Search: "Search",
      Login: "Login",
      Planned: "Planned",
      InProgress: "In Progress",
      Watched: "Watched",
      Back: "Back",
      Email: "Email",
      Password: "Password",
      SignIn: "Sign In",
      LoginFailed: "Login failed:",
      NoAccount: "No account?",
      SignUp: "Sign up!",
      Username: "Username",
      FullName: "Full Name",
      SignUpFailed: "Sign-up failed:",
      HaveAccount: "Have an account?",
    },
  },
  ka: {
    translation: {
      Movies: "ფილმები",
      TVShows: "სერიალები",
      Search: "ძებნა",
      Login: "შესვლა",
      Planned: "გეგმაში",
      InProgress: "პროცესშია",
      Watched: "ნანახი",
      Back: "უკან",
      Email: "იმეილი",
      Password: "პაროლი",
      SignIn: "შესვლა",
      LoginFailed: "შესვლა ვერ მოხერხდა:",
      NoAccount: "არ გაქვთ ანგარიში?",
      SignUp: "დარეგისტრირდით!",
      Username: "მომხმარებლის სახელი",
      FullName: "სრული სახელი",
      SignUpFailed: "რეგისტრაცია ვერ მოხერხდა:",
      HaveAccount: "გაქვთ ანგარიში?",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
