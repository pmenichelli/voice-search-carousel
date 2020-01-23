
import { h } from '@stencil/core';

export default {
  search: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 50 50"
    >
      <path d="M21 3C11.6 3 4 10.6 4 20s7.6 17 17 17 17-7.6 17-17S30.4 3 21 3zm0 30c-7.2 0-13-5.8-13-13S13.8 7 21 7s13 5.8 13 13-5.8 13-13 13z"></path>
      <path
        fill="currentColor"
        stroke="#000"
        strokeMiterlimit="10"
        strokeWidth="6"
        d="M31.2 31.2l13.3 13.3"
      ></path>
    </svg>
  ),
  mic: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        stroke="none"
        strokeWidth="1"
        d="M733 54v3c0 2-2 4-4 4v2h3v1h-7v-1h3v-2c-2 0-4-2-4-4v-3h1v3c0 1.5 1.5 3 3 3h1c1.5 0 3-1.5 3-3v-3zm-4.995-6h.99c1.111 0 2.005.892 2.005 1.992v7.016A2.004 2.004 0 01728.995 59h-.99A1.996 1.996 0 01726 57.008v-7.016c0-1.092.898-1.992 2.005-1.992zm0 0"
        transform="translate(-720 -48)"
      ></path>
    </svg>
  ),
  chevronLeft: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      enableBackground="new 0 0 512 512"
      version="1.1"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
    >
      <path d="M352 115.4L331.3 96 160 256 331.3 416 352 396.7 201.5 256z"></path>
    </svg>
  ),
  chevronRight: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      enableBackground="new 0 0 512 512"
      version="1.1"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
    >
      <path d="M160 115.4L180.7 96 352 256 180.7 416 160 396.7 310.5 256z"></path>
    </svg>
  )
}
