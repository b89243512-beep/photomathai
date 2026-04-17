import Image from "next/image";

export function Logo({ size = 32 }: { size?: number }) {
  return (
    <Image
      src="/logo.svg"
      alt="Free PhotoMath AI — AI-powered math problem solver logo"
      width={size}
      height={size}
      className="rounded-lg"
    />
  );
}
