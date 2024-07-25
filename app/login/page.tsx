// import React from "react";
// import { input, TERipple } from "tw-elements-react";

import Button from "../(components)/button";
import Input from "../(components)/input";

export default function BasicExample(): JSX.Element {
  return (
    <section className="h-screen">
      <div className="h-full">
        {/* <!-- Left column container with background--> */}
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-start gap-20 p-10">
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>

          {/* <!-- Right column container --> */}
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 max-w-96">
            <form>
              {/* <!--Sign in section--> */}

              <div className="flex flex-col">
                <Input
                    type="email"
                    placeholder="Email address"
                    className="mb-6 h-10 grow p-2 border-black border-2 rounded focus:border-primary outline-none transition-colors"
                />

                <Input
                    type="password"
                    placeholder="Password"
                    className="mb-6 h-10 grow p-2 border-black border-2 rounded focus:border-primary outline-none transition-colors"
                />
              </div>

              <div className="text-center">
                  <Button label="LOGIN" />
                {/* <!-- Register link --> */}
                <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                  Don&apos;t have an account?{" "}
                  <a
                    href="#!"
                    className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                  >
                    Register
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}