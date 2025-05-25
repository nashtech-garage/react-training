import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Modal from "../../components/Modal";
import { Link } from "react-router-dom";
import * as yup from "yup";
import useFetch from "../../hooks/useFetch";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  remember: boolean;
  errors: Record<string, string>;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required")
    .test("checkEmailExists", "Email already exists", async (value) => {
      if (!value) return true;
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}p/check-email/${value}`
      );
      const data = await response.json();
      return data.success; // Return true if email does not exist
    }),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  remember: yup.boolean(),
  agreeTos: yup
    .boolean()
    .oneOf([true], "You must agree to the terms and conditions")
    .required("Agreement to terms is required"),
});
const SignUp = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    remember: false,
    errors: {},
  });

  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    schema
      .validate(formData, { abortEarly: false })
      .then(() => {
        console.log("Validation successful", formData);
      })
      .catch((err) => {
        const errors: Record<string, string> = {};
        err.inner.forEach((error: yup.ValidationError) => {
          if (error.path) {
            errors[error.path] = error.message;
          }
        });
        setFormData((prev) => ({
          ...prev,
          errors,
        }));
        console.error("Validation errors:", errors);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900">
      <a
        href=""
        className="flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white"
      >
        <img src="/logo.png" className="mr-4 h-11" alt="Simple KYC Logo" />
        <span>Sign-up for Simple KYC</span>
      </a>
      <div className="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Create a Free Account {openModal ? " - Terms Accepted" : ""}
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="name@company.com"
              required
              value={formData.email}
              onChange={handleChange}
            />
            {formData.errors?.email && (
              <div className="mt-2">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {formData.errors.email}
                </p>
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
              value={formData.password}
              onChange={handleChange}
            />
            {formData.errors?.password && (
              <div className="mt-2">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {formData.errors.password}
                </p>
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {formData.errors?.confirmPassword && (
              <div className="mt-2">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {formData.errors.confirmPassword}
                </p>
              </div>
            )}
          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="remember"
                aria-describedby="remember"
                name="remember"
                type="checkbox"
                className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                checked={formData.remember}
                onChange={handleChange}
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="remember"
                className="font-medium text-gray-900 dark:text-white"
              >
                I accept the{" "}
              </label>
              <a
                onClick={() => {
                  console.log("Terms clicked");
                  setOpenModal(true);
                }}
                className="text-primary-700 hover:underline dark:text-primary-500 cursor-pointer"
              >
                Terms and Conditions
              </a>
            </div>
          </div>
          <div>
            {formData.errors?.agreeTos && (
              <p className="text-sm text-red-600 dark:text-red-400 ml-0">
                {formData.errors.agreeTos}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="border border-gray-300 w-full px-5 py-3 text-base font-medium border-gray-300 text-center dark:text-white dark:bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Create account
          </button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/auth/login?redirectTo=/auth/signup"
              className="text-primary-700 hover:underline dark:text-primary-500"
            >
              Login here
            </Link>
          </div>
        </form>
        <Modal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          title="Terms of Service"
        >
          <div className="terms-of-service">
            <h1>📜 Terms of Service</h1>
            <p>
              Welcome to our platform! By using our services, you agree to the
              following terms, whether you've read them or not (we know you
              haven't).
            </p>
            <ol>
              <li>
                <strong>Acceptance of Terms</strong>
                <p>
                  By accessing our services, you automatically agree to these
                  terms. It's like a secret handshake, but with more legal
                  implications.
                </p>
              </li>
              <li>
                <strong>User Responsibilities</strong>
                <p>
                  You're responsible for all activities under your account. If
                  your cat walks across your keyboard and posts something
                  embarrassing, that's on you.
                </p>
              </li>
              <li>
                <strong>Privacy Policy</strong>
                <p>
                  We respect your privacy. Any data we collect is purely for
                  enhancing your experience... and maybe for our amusement.
                </p>
              </li>
              <li>
                <strong>Content Ownership</strong>
                <p>
                  Anything you post is still yours, but we reserve the right to
                  use it in our marketing materials, especially if it's
                  hilarious.
                </p>
              </li>
              <li>
                <strong>Service Modifications</strong>
                <p>
                  We may change or discontinue services at any time. Think of it
                  as us keeping things fresh and unpredictable.
                </p>
              </li>
              <li>
                <strong>Limitation of Liability</strong>
                <p>
                  We're not liable for any damages, including but not limited
                  to, your coffee spilling due to laughter from our content.
                </p>
              </li>
              <li>
                <strong>Governing Law</strong>
                <p>
                  These terms are governed by the laws of the universe, or at
                  least the ones that make sense.
                </p>
              </li>
              <li>
                <strong>Final Clause</strong>
                <p>
                  If you've read this far, congratulations! You're among the
                  0.0001% who do. As a reward, here's a virtual high-five. ✋
                </p>
              </li>
            </ol>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default SignUp;
