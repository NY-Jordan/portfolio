import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// PLACEHOLDER favicon mark — swap for a cropped real brand mark asset when available.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0b",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
          <path d="M7 24V8L16 17" stroke="#f5f5f3" strokeWidth="3.5" strokeLinecap="square" />
          <path d="M25 24V8L16 17" stroke="#f5f5f3" strokeWidth="3.5" strokeLinecap="square" />
          <path d="M9 10L16 17" stroke="#cffa3c" strokeWidth="3.5" strokeLinecap="square" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
