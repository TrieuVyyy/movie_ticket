import React from "react";
import FormLogin from "./FormLogin";

export default function LoginPage() {
  return (
    <div
      style={{
        backgroundImage: `url(https://store-images.s-microsoft.com/image/apps.29381.14253076346048674.6983b2cc-5012-4d3e-8819-f0d9db941b00.630ed2b2-996e-4918-9000-ae0fe00383b1?mode=scale&q=90&h=720&w=1280)`,
        minHeight: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <FormLogin />
    </div>
  );
}
