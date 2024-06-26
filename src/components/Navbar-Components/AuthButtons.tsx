/** @format */
"use client";
import { Flex } from "@radix-ui/themes";
import AuthButton from "./AuthButton";

const AuthButtons = () => (
  <Flex gap="4" style={{ marginLeft: "auto" }}>
    <AuthButton
      onKeyDown={(e) => console.log(e.key)}
      variant="outline"
      content="Register"
    />
    <AuthButton content="Login" />
  </Flex>
);

export default AuthButtons;
