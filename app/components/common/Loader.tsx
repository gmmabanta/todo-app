type LoaderProps = {
  type?: "page" | "component";
  size?: string;
};

export default function Loader({
  type = "component",
  size = "10",
}: LoaderProps) {
  return (
    <div
      className={`flex justify-center items-center m-[-8px] ${
        type == "page" ? "h-screen" : ""
      }`}
    >
      <svg
        fill="none"
        className={`w-${size} h-${size} m-0 p-0 text-gray-500 animate-spin`}
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clipRule="evenodd"
          d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </svg>
    </div>
  );
}
