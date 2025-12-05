import * as React from "react"
const PriorityFav = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <mask
      id="a"
      width={24}
      height={24}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}
    >
      <path fill="#D9D9D9" d="M0 0h24v24H0z" />
    </mask>
    <g mask="url(#a)">
      <path
        fill="#1447E6"
        d="M12 17c.283 0 .52-.096.713-.288A.968.968 0 0 0 13 16a.968.968 0 0 0-.287-.713A.968.968 0 0 0 12 15a.967.967 0 0 0-.713.287A.967.967 0 0 0 11 16c0 .283.096.52.287.712.192.192.43.288.713.288Zm-1-4h2V7h-2v6Zm1 10.3L8.65 20H4v-4.65L.7 12 4 8.65V4h4.65L12 .7 15.35 4H20v4.65L23.3 12 20 15.35V20h-4.65L12 23.3Z"
      />
    </g>
  </svg>
)
export default PriorityFav
