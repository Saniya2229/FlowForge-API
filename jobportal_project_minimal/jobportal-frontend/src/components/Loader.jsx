// src/components/Loader.jsx
import React from "react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="text-center">
        <svg
          id="cloud"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          className="w-28 h-28 mx-auto"
        >
          <defs>
            {/* mask shapes: polygon + two cloud circles */}
            <mask id="shapes">
              <g fill="white">
                <polygon points="50 37.5 80 75 20 75 50 37.5" />
                <circle cx="20" cy="60" r="15" />
                <circle cx="80" cy="60" r="15" />
              </g>
            </mask>

            {/* lines used for clipping effect (same visual idea as before) */}
            <clipPath id="clip">
              <rect x="0" y="0" width="100" height="100" />
            </clipPath>
          </defs>

          {/* moving lines group behind mask — we animate the group using the "lines" animation */}
          <g clipPath="url(#clip)" mask="url(#shapes)">
            <g className="transform -rotate-[65deg] animate-lines">
              {/* create multiple horizontal lines spaced vertically */}
              <line
                x1={-50}
                y1={-40}
                x2={150}
                y2={-40}
                stroke="#ffffff"
                strokeWidth="5"
              />
              <line
                x1={-50}
                y1={-31}
                x2={150}
                y2={-31}
                stroke="#ffffff"
                strokeWidth="5"
              />
              <line
                x1={-50}
                y1={-22}
                x2={150}
                y2={-22}
                stroke="#ffffff"
                strokeWidth="5"
              />
              <line
                x1={-50}
                y1={-13}
                x2={150}
                y2={-13}
                stroke="#ffffff"
                strokeWidth="5"
              />
              <line
                x1={-50}
                y1={-4}
                x2={150}
                y2={-4}
                stroke="#ffffff"
                strokeWidth="5"
              />
              <line
                x1={-50}
                y1={5}
                x2={150}
                y2={5}
                stroke="#ffffff"
                strokeWidth="5"
              />
              <line
                x1={-50}
                y1={14}
                x2={150}
                y2={14}
                stroke="#ffffff"
                strokeWidth="5"
              />
              <line
                x1={-50}
                y1={23}
                x2={150}
                y2={23}
                stroke="#ffffff"
                strokeWidth="5"
              />
              <line
                x1={-50}
                y1={32}
                x2={150}
                y2={32}
                stroke="#ffffff"
                strokeWidth="5"
              />
              {/* you can add more lines if needed */}
            </g>
          </g>

          {/* colored rectangle masked by shapes (gives the upstream fill inside cloud shape) */}
          <rect
            x="0"
            y="0"
            width="100"
            height="100"
            className="fill-[#4387f4]"
            mask="url(#shapes)"
          />

          {/* Now the rotating arrow/shape group placed on top of mask - give it rotation animation */}
          <g
            className="animate-rotation fill-[#80b1ff] drop-shadow-glow-black"
            transform="translate(0, -6)"
          >
            <path d="M33.52,68.12 C35.02,62.8 39.03,58.52 44.24,56.69 C49.26,54.93 54.68,55.61 59.04,58.4 C59.04,58.4 56.24,60.53 56.24,60.53 C55.45,61.13 55.68,62.37 56.63,62.64 C56.63,62.64 67.21,65.66 67.21,65.66 C67.98,65.88 68.75,65.3 68.74,64.5 C68.74,64.5 68.68,53.5 68.68,53.5 C68.67,52.51 67.54,51.95 66.75,52.55 C66.75,52.55 64.04,54.61 64.04,54.61 C57.88,49.79 49.73,48.4 42.25,51.03 C35.2,53.51 29.78,59.29 27.74,66.49 C27.29,68.08 28.22,69.74 29.81,70.19 C30.09,70.27 30.36,70.31 30.63,70.31 C31.94,70.31 33.14,69.44 33.52,68.12Z" />
            <path d="M69.95,74.85 C68.35,74.4 66.7,75.32 66.25,76.92 C64.74,82.24 60.73,86.51 55.52,88.35 C50.51,90.11 45.09,89.43 40.73,86.63 C40.73,86.63 43.53,84.51 43.53,84.51 C44.31,83.91 44.08,82.67 43.13,82.4 C43.13,82.4 32.55,79.38 32.55,79.38 C31.78,79.16 31.02,79.74 31.02,80.54 C31.02,80.54 31.09,91.54 31.09,91.54 C31.09,92.53 32.22,93.09 33.01,92.49 C33.01,92.49 35.72,90.43 35.72,90.43 C39.81,93.63 44.77,95.32 49.84,95.32 C52.41,95.32 55,94.89 57.51,94.01 C64.56,91.53 69.99,85.75 72.02,78.55 C72.47,76.95 71.54,75.3 69.95,74.85Z" />
          </g>

          {/* Small animated circles (cloud puffs) placed visually above to get 'wobble' using cloud animation */}
          <g transform="translate(0,0)">
            <circle
              cx="20"
              cy="60"
              r="15"
              className="fill-[#4387f4] opacity-90 animate-cloud"
              style={{ animationDelay: "0s" }}
            />
            <circle
              cx="50"
              cy="45"
              r="20"
              className="fill-[#4387f4] opacity-90 animate-cloud"
              style={{ animationDelay: "0.4s" }}
            />
            <circle
              cx="80"
              cy="60"
              r="15"
              className="fill-[#4387f4] opacity-90 animate-cloud"
              style={{ animationDelay: "0.8s" }}
            />
          </g>
        </svg>

        <p className="mt-4 text-purple-600 font-semibold text-lg tracking-wide">
          LOADING ...
        </p>
      </div>
    </div>
  );
}
