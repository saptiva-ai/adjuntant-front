"use client";

import Dropzone from "@/components/Dropzone";
import Uppy from "@uppy/core";
import { useState } from "react";

export default function App() {
  const [uppy] = useState(() => new Uppy());
  return (
    <div>
      <Dropzone uppy={uppy}></Dropzone>
    </div>
  );
}
